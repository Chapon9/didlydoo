import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AttendeesPage = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/attendees');
        setAttendees(response.data);
      } catch (err) {
        setError("❌ Erreur lors de la récupération des participants.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  if (loading) return <div>⏳ Chargement des participants...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Participants et Événements</h2>
      <ul style={styles.attendeesList}>
        {attendees.map((attendee) => (
          <li key={attendee.id} style={styles.attendeeItem}>
            <strong>
              <Link to={`/attendees/${attendee.name}`} style={styles.attendeeName}>
                {attendee.name}
              </Link>
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  attendeesList: {
    listStyle: "none",
    padding: 0,
  },
  attendeeItem: {
    marginBottom: "20px",
  },
  attendeeName: {
    color: "#007bff", // Link color
    textDecoration: "underline", // Added underline to the name link
  },
};

export default AttendeesPage;

