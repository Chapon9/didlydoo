import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import CreateEventPage from "./pages/CreateEventPage"; // Ajout de la page de création
import NotFoundPage from "./pages/NotFoundPage"; // Page 404 à ajouter
import AttendeesPage from './pages/AttendeesPage'; // Make sure the path is correct
import AttendeePage from './pages/AttendeePage'; // Import AttendeePage here
import EditEvent from './pages/EditEvent';  // Adjust the path to the actual location of EditEvent.jsx


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Page d'accueil */}
        <Route path="/event/:eventId" element={<EventPage />} /> {/* Page d'événement */}
        <Route path="/attendees" element={<AttendeesPage />} /> {/* Attendees list page */}
        <Route path="/attendees/:name" element={<AttendeePage />} /> {/* Attendee's detailed page */}
        <Route path="/create-event" element={<CreateEventPage />} /> {/* Page de création d'événement */}
        <Route path="/event/:eventId/edit" element={<EditEvent />} /> {/* Page de création d'événement */}
        <Route path="*" element={<NotFoundPage />} /> {/* Page 404 */}
      </Routes>
    </Router>
  );
};

export default App;
