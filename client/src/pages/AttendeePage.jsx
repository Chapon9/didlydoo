import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AttendeePage = () => {
  const { name } = useParams(); // Get the attendee's name from the URL params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch all attendees and their events from the backend
        const response = await axios.get(`http://localhost:3000/api/attendees/${name}`);
        
        // Log the response to inspect the structure
        console.log(response.data);  // This will output the data structure to the console

        setEvent(response.data);

        if (!response.data || Object.keys(response.data).length === 0) {
          setError("❌ Participant non trouvé dans les événements.");
        }
      } catch (err) {
        setError("❌ Impossible de récupérer les événements.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [name]);

  // Inline CSS styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '20px',
      padding: '20px',
      backgroundColor: '#f4f4f9',
      borderRadius: '8px',
    },
    heading: {
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
    },
    eventItem: {
      backgroundColor: '#fff',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    paragraph: {
      fontSize: '16px',
      color: '#666',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      fontSize: '18px',
    },
    loading: {
      textAlign: 'center',
      fontSize: '20px',
      color: '#888',
    },
  };

  if (loading) return <div style={styles.loading}>⏳ Chargement de l'événement...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  // Check if event data exists
  if (!event || Object.keys(event).length === 0) return <div style={styles.error}>🚫 Aucune donnée trouvée pour ce participant.</div>;

  // Check if the event's name matches the 'name' from URL parameters
  if (event.name !== name) {
    return <div style={styles.error}>🚫 Aucun événement trouvé pour ce participant.</div>;
  }

  // Now that we have the event data, access the attendee's name and events
  const { name: attendeeName, events: attendeeEvents } = event; // Destructure to get name and events

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{attendeeName}</h2> {/* Display the attendee's name */}
      <h3 style={styles.heading}>Événements :</h3>
      {attendeeEvents && attendeeEvents.length > 0 ? (
        attendeeEvents.map((event, index) => (
          <div key={index} style={styles.eventItem}>
    
            {/* Render event details here */}
            <p style={styles.paragraph}><strong>{event.name}</strong> </p>
            <p style={styles.paragraph}>Dates: {event.dates.join(', ')}</p>
          </div>
        ))
      ) : (
        <p style={styles.error}>🚫 Aucun événement trouvé pour ce participant.</p>
      )}
    </div>
  );
};

export default AttendeePage;
