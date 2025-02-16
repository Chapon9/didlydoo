import React from 'react';

// Pour la navigation vers la page de détail de l'événement
import { Link, useNavigate } from 'react-router-dom'; 

// Pour le style du composant
import styled from 'styled-components'; 

// Importation de la bibliothèque axios pour faire des requêtes HTTP
import axios from 'axios'; 

// Importation des fonctions format de date-fns pour formater les dates
import { format } from 'date-fns'; 

// Composant stylisé pour afficher un "card" (carte) pour chaque événement
const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  max-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 1.5em;
  margin: 0;
  color: #333;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
  margin: 10px 0;
`;

const Author = styled.p`
  font-size: 0.9em;
  color: #999;
`;

// Composant principal qui affiche la carte d'un événement
const EventCard = ({ event, onDelete }) => {
  // Utilisation de la fonction de navigation de React Router
  const navigate = useNavigate();

  // Affiche dans la console les dates de l'événement pour vérifier la structure des données
  console.log('Event dates:', event.dates);

  // Formate chaque date de l'événement en utilisant 'date-fns'
  const formattedDates = event.dates
    .map((dateObj) => {
      // Vérifie si l'objet contient une propriété 'date'
      if (dateObj.date) {
        return format(new Date(dateObj.date), 'yyyy-MM-dd');  // Formate la date au format 'yyyy-MM-dd'
      }
      return null;  // Si aucune date n'est présente, renvoie null
    })
    .filter(Boolean);  // Filtre les valeurs nulles (pour ne pas les afficher dans la liste)

    const handleDelete = async () => {
      if (window.confirm("❗ Voulez-vous vraiment supprimer cet événement ?")) {
        try {
          // Envoie de la requête DELETE pour supprimer l'événement
          await axios.delete(`http://localhost:3000/api/events/${event.id}`);
          console.log("Événement supprimé avec succès");
    
          // Rechargement de la page pour rafraîchir l'état
          window.location.reload();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
          alert("Une erreur s'est produite lors de la suppression de l'événement.");
        }
      }
    };
    

  return (
    <Card>
      <h3>🎉 {event.name}</h3>
      <p>👤 Créé par : {event.author || "Inconnu"}</p>
      {/* Affiche les dates formatées de l'événement. Si aucune date n'est disponible, affiche 'No dates available' */}
      <p> 📅 {formattedDates.length > 0 ? formattedDates.join(', ') : 'No dates available'}</p>

      <Link to={`/event/${event.id}`}>🔗 Voir l'événement ➡️</Link>
      <br />

      <button onClick={handleDelete} style={{
        marginTop: "10px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
      }}>
        🗑 Supprimer
      </button>
    </Card>
  );
};

export default EventCard;
