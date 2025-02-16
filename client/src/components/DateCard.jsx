// src/components/DateCard.jsx

import React from 'react';

const DateCard = ({ date }) => {
  const { date: eventDate, available } = date; // Supposons que chaque objet `date` a ces propriétés

  return (
    <div>
      <p>{eventDate}</p>
      <p>{available ? 'Available' : 'Not Available'}</p>
    </div>
  );
};

export default DateCard;
