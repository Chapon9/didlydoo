import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../components/EventCard';
import styled from 'styled-components';
import logo from '../assets/Doodly-logo.png';

// 📌 Composant principal de la page d'accueil
const HomePage = () => {
  // Déclaration de l'état pour les événements et leur chargement
  const [events, setEvents] = useState([]);  // État pour stocker la liste des événements
  const [loading, setLoading] = useState(true);  // État pour indiquer si les événements sont en cours de chargement

  // 📌 Utilisation de `useEffect` pour charger les événements au moment où le composant est monté
  useEffect(() => {
    // Fonction asynchrone pour récupérer les événements via une requête GET
    const fetchEvents = async () => {
      try {
        // Effectue la requête GET pour récupérer la liste des événements
        const response = await axios.get('http://localhost:3000/api/events'); // URL complète de l'API
        console.log('Events response:', response.data); 

        // Vérifie si la réponse est bien un tableau d'événements
        if (Array.isArray(response.data)) {
          setEvents(response.data);  // Met à jour l'état avec la liste des événements
        } else {
          console.error('La réponse n\'est pas un tableau:', response.data);
        }
      } catch (error) {
        // Gère les erreurs de la requête
        console.error('Erreur lors de la récupération des événements:', error);
      } finally {
        // Modifie l'état pour indiquer que le chargement est terminé
        setLoading(false);
      }
    };

    // Appel de la fonction pour récupérer les événements
    fetchEvents();
  }, []);  // L'effet ne se déclenche qu'une seule fois lors du montage du composant

  // 📌 Si les événements sont encore en train d'être chargés, on affiche un message "Loading..."
  if (loading) {
    return <div>Loading...</div>;  // Affiche un message de chargement
  }

  return (
    <PageContainer>
      <Logo src={logo} alt="Didlydoo" />
      <Title>All Events</Title>
      <EventsContainer>
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>No events available</p>
        )}
      </EventsContainer>
      <p>
        <Link to="/attendees">Voir les participants et les événements</Link>
      </p>
      <AddEventButton to="/create-event">ADD an event</AddEventButton>
    </PageContainer>
  );
};

// Styled-components pour la mise en page
const PageContainer = styled.div`
  text-align: center;
  font-family: 'Arial', sans-serif;
  padding: 20px;
`;

const Logo = styled.img`
  width: 200px; 
  margin-top: 20px;
  margin-bottom: 40px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 30px;
`;

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const AddEventButton = styled(Link)`
  display: inline-block;
  background-color: #28a745;  
  color: white;
  text-align: center;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 40px;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export default HomePage;
