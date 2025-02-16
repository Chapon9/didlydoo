import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {
  const { eventId } = useParams();  // Récupère l'ID de l'événement depuis l'URL
  const [event, setEvent] = useState({
    name: '',
    author: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Pour rediriger après la mise à jour

  useEffect(() => {
    // Charger les détails de l'événement à partir de l'API
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${eventId}`);
        setEvent(response.data);  // Remplir le formulaire avec les données actuelles
      } catch (err) {
        setError("❌ Événement introuvable.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [eventId]);

  // Gérer la modification du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const updatedEvent = { 
      name: event.name, 
      author: event.author, 
      description: event.description 
    };
  
    try {
      // Send PATCH request to update the event
      await axios.patch(`http://localhost:3000/api/events/${eventId}`, updatedEvent);
      navigate(`/event/${eventId}`); // Redirect after successful update
    } catch (err) {
      setError("❌ Erreur lors de la mise à jour de l'événement.");
      console.error("Error updating event:", err);
    }
  };
  

  if (loading) return <div>⏳ Chargement...</div>;
  if (error) return <div>❌ {error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Modifier l'événement</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Nom de l'événement</label>
          <input
            type="text"
            id="name"
            name="name"
            value={event.name}
            onChange={handleChange}
            placeholder="Nom de l'événement"
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="author" style={styles.label}>Auteur</label>
          <input
            type="text"
            id="author"
            name="author"
            value={event.author}
            onChange={handleChange}
            placeholder="Auteur de l'événement"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Description de l'événement"
            style={styles.textarea}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Mettre à jour</button>
      </form>
    </div>
  );
};

// Styles pour le formulaire
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '100px',
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',  // Green color for the submit button
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default EditEvent;
