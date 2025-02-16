import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  

const EventCreationPage = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [dates, setDates] = useState(['']);
  const navigate = useNavigate();

  const handleAddDate = () => {
    setDates([...dates, '']);
  };

  const handleDateChange = (index, newDate) => {
    const updatedDates = [...dates];
    updatedDates[index] = newDate;
    setDates(updatedDates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName || !eventDescription || !author || dates.some((date) => !date)) {
      alert('Tous les champs doivent être remplis.');
      return;
    }

    try {
      const newEvent = {
        name: eventName,  
        description: eventDescription, 
        author: author,  
        dates: dates,  
      };

      const response = await axios.post('http://localhost:3000/api/events/', newEvent);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
      alert('Erreur lors de la création de l\'événement.');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
    margin: '0 auto',
  };

  const divStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    padding: '8px',
    fontSize: '1rem',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#45a049',
  };

  return (
    <div className="event-creation-page">
      <h2>Créer un nouvel événement</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={divStyle}>
          <label style={labelStyle}>Nom de l'événement</label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required style={inputStyle} />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Description de l'événement</label>
          <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required style={inputStyle} />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Auteur</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required style={inputStyle} />
        </div>

        <div style={divStyle}>
          <label style={labelStyle}>Dates de l'événement</label>
          {dates.map((date, index) => (
            <div key={index}>
              <input type="date" value={date} onChange={(e) => handleDateChange(index, e.target.value)} required style={inputStyle} />
            </div>
          ))}
          <button type="button" onClick={handleAddDate} style={buttonStyle}>Ajouter une date</button>
        </div>

        <button type="submit" style={buttonStyle}>Créer l'événement</button>
      </form>
    </div>
  );
};

export default EventCreationPage;
