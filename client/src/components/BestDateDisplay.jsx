import React from "react";

const BestDateDisplay = ({ availability }) => {
  if (!availability || Object.keys(availability).length === 0) {
    return <p>🚫 Aucune date renseignée.</p>;
  }

  const votes = {};
  Object.keys(availability).forEach(date => {
    if (availability[date] === "✅") {
      votes[date] = (votes[date] || 0) + 1;
    }
  });

  const bestDate = Object.keys(votes).reduce((best, date) =>
    votes[date] > (votes[best] || 0) ? date : best, Object.keys(votes)[0]
  );

  return (
    <h3>
      🏆 Date la plus populaire : {bestDate} ({votes[bestDate]} votes)
    </h3>
  );
};

export default BestDateDisplay;