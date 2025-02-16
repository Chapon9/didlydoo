// Importation des hooks React
import React, { useState } from 'react'; 

// Pour la navigation vers d'autres pages
import { useNavigate } from 'react-router-dom';  

// Pour effectuer des requêtes HTTP
import axios from 'axios';  

// Importation de UUID v4 pour générer un identifiant unique
import { v4 as uuidv4 } from 'uuid';  


// Composant principal pour la création d'événements
const EventCreationPage = () => {
  // Définition des états pour chaque champ du formulaire
  const [eventName, setEventName] = useState('');  // Nom de l'événement
  const [eventDescription, setEventDescription] = useState('');  // Description de l'événement
  const [author, setAuthor] = useState('');  // Auteur de l'événement
  const [dates, setDates] = useState(['']);  // Tableau contenant les dates de l'événement

  // Utilisation du hook useNavigate pour rediriger l'utilisateur après la soumission du formulaire
  const navigate = useNavigate();

  // Fonction pour ajouter une nouvelle date dans le tableau des dates
  const handleAddDate = () => {
    setDates([...dates, '']);  // Ajoute une nouvelle date vide au tableau
  };

  // Fonction pour mettre à jour une date spécifique dans le tableau des dates
  const handleDateChange = (index, newDate) => {
    const updatedDates = [...dates];  // Crée une copie du tableau des dates
    updatedDates[index] = newDate;  // Remplace la date à l'index spécifié
    setDates(updatedDates);  // Met à jour l'état avec le nouveau tableau de dates
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();  // Empêche le comportement par défaut du formulaire

    // Validation des données du formulaire
    if (!eventName || !eventDescription || !author || dates.some((date) => !date)) {
      alert('Tous les champs doivent être remplis.');  // Affiche une alerte si un champ est manquant
      return;
    }

    try {
      // Création d'un nouvel objet événement avec les données du formulaire
      const newEvent = {
        name: eventName,  
        description: eventDescription, 
        author: author,  
        dates: dates,  
      };

      // Envoi des données de l'événement à l'API 
      const response = await axios.post('http://localhost:3000/api/events/', newEvent);

      // Redirection vers la page d'accueil après la création de l'événement
      navigate('/');  // Cette ligne redirige vers la page d'accueil
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);  // Affiche l'erreur dans la console
      alert('Erreur lors de la création de l\'événement.');  // Affiche une alerte en cas d'erreur
    }
  };

  return (
    <div className="event-creation-page">
      <h2>Créer un nouvel événement</h2> 
      <form onSubmit={handleSubmit}>  {/* Formulaire de création d'événement */}
        <div>
          <label>Nom de l'événement</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}  // Mise à jour du nom de l'événement
            required  // Champ requis
          />
        </div>

        <div>
          <label>Description de l'événement</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}  // Mise à jour de la description
            required  // Champ requis
          />
        </div>

        <div>
          <label>Auteur</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}  // Mise à jour de l'auteur
            required  // Champ requis
          />
        </div>

        <div>
          <label>Dates de l'événement</label>
          {dates.map((date, index) => (
            <div key={index}>
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}  // Mise à jour de la date à l'index spécifié
                required  // Champ requis
              />
            </div>
          ))}
          <button type="button" onClick={handleAddDate}>  
            Ajouter une date
          </button>
        </div>

        <button type="submit">Créer l'événement</button>  
      </form>
    </div>
  );
};

export default EventCreationPage;
