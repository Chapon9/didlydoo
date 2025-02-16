import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns'; // Importing the format function

const AvailabilityList = ({ availability, setAvailability, eventId }) => {
  const [username, setUsername] = useState("");
  const [attendeeDates, setAttendeeDates] = useState({});
  const [eventDates, setEventDates] = useState([]); // To store the fetched event dates
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(""); // Add error state

  // Fetch event details when the component mounts or eventId changes
  useEffect(() => {
    console.log("📡 FetchEventDetails lancé pour eventId :", eventId);

    const fetchEventDetails = async () => {
      try {
        setLoading(true); // Set loading state to true before starting the request
        console.log("🚀 Tentative d'appel API...");
        const response = await axios.get(`http://localhost:3000/api/events/${eventId}`);

        console.log("📥 Réponse API reçue :", response.data);

        if (response.data.dates) {
          console.log("📥 Réponse API Dates :", response.data.dates);
          setEventDates(response.data.dates); // Set event dates
        } else {
          console.error("❌ No dates found in response");
          setError("No dates available for this event.");
        }
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des données :", err);
        setError("Événement introuvable.");
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]); // Only re-fetch if eventId changes

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleDateToggle = (date) => {
    setAttendeeDates((prev) => {
      const newDates = { ...prev };
      newDates[date] = !newDates[date]; // Toggle the availability for the date
      return newDates;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const availableDates = Object.keys(attendeeDates).filter((date) => attendeeDates[date]);
    if (availableDates.length === 0) {
      alert("Veuillez sélectionner au moins une date.");
      return;
    }

    // Send the data to the backend
    try {
      const response = await axios.post(`http://localhost:3000/api/events/${eventId}/attend`, {
        name: username,
        dates: availableDates,
      });

      console.log("Attendee added:", response.data);
      alert("Disponibilités confirmées !");
    } catch (error) {
      console.error("Error posting attendee data:", error);
      alert("Échec de l'enregistrement des disponibilités. Essayez plus tard.");
    }
  };

  if (loading) {
    return <div>⏳ Chargement des dates...</div>; // Show loading text while data is being fetched
  }

  if (error) {
    return <div>❌ {error}</div>; // Display error message if there was an issue fetching data
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <label style={styles.label}>
          Ton prénom :
          <input
            type="text"
            value={username}
            onChange={handleNameChange}
            placeholder="Entrez votre prénom"
            required
            style={styles.input}
          />
        </label>
        <br />
        {/* Render checkboxes for each event date */}
        {eventDates.map((event, index) => {
          const formattedDate = format(new Date(event.date), 'yyyy-MM-dd'); // Ensure date is a unique string
          return (
            <div key={formattedDate}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={attendeeDates[formattedDate] || false}
                  onChange={() => handleDateToggle(formattedDate)} // Pass formatted date to toggle
                  style={styles.checkbox}
                />
                {formattedDate}
              </label>
            </div>
          );
        })}

        <button type="submit" style={styles.button}>
          ✅ Confirmer les votes
        </button>
      </form>
    </div>
  );
};

// CSS-in-JS styles object
const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
    backgroundColor: "lightgrey",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginTop: "10px",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  checkboxLabel: {
    display: "block",
    fontSize: "14px",
    marginTop: "10px",
  },
  checkbox: {
    marginRight: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AvailabilityList;
