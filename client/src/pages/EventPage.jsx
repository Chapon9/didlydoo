import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AvailabilityList from "../components/AvailabilityList";
import BestDateDisplay from "../components/BestDateDisplay";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState({});
  const [username, setUsername] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        setError("Erreur de chargement de l'événement");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleDelete = async () => {
    if (window.confirm("❗ Voulez-vous vraiment supprimer cet événement ?")) {
      try {
        await axios.delete(`http://localhost:3000/api/events/${eventId}`);
        navigate("/"); 
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const handleConfirmAvailability = async () => {
    if (!username) {
      alert("⚠️ Veuillez entrer votre prénom avant de confirmer.");
      return;
    }

    const formattedAvailability = Object.entries(availability).map(([date, attendees]) => ({
      date,
      attendees,
    }));

    console.log("📤 Données envoyées :", { name: username, dates: formattedAvailability });

    try {
      await axios.post(`http://localhost:3000/api/events/${eventId}/attend`, {
        name: username,
        dates: formattedAvailability,
      });

      alert("✅ Disponibilités enregistrées !");
      setRefreshData((prev) => !prev);
    } catch (error) {
      console.error("❌ Erreur lors de l'enregistrement :", error.response?.data || error);
      alert("❌ Une erreur s'est produite lors de l'enregistrement des disponibilités.");
    }
  };

  if (loading) return <div>⏳ Chargement...</div>;
  if (error) return <div>❌ {error}</div>;
  if (!event) return <div>🚫 Événement non trouvé.</div>;

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.link}>⬅️ Retour</Link>
      <h1 style={styles.heading}>📌 {event.name}</h1>
      <p style={styles.description}>📝 {event.description}</p>
      <p style={styles.author}>👤 Créé par : {event.author || "Inconnu"}</p>

      <button onClick={handleDelete} style={styles.deleteButton}>
        🗑️ Supprimer l'événement
      </button>

      <h2 style={styles.subtitle}>📅 Calendrier des disponibilités</h2>

      <AvailabilityList availability={availability} setAvailability={setAvailability} username={username} eventId={eventId} />

      {/* 
      <BestDateDisplay availability={availability} />
      */}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
    fontSize: "16px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#555",
  },
  author: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#777",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "24px",
    fontWeight: "600",
    marginTop: "20px",
    marginBottom: "20px",
  },
};

export default EventPage;
