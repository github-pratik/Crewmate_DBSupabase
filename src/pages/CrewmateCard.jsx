import { Link } from 'react-router-dom';

function CrewmateCard({ crewmate, onDelete }) {
  return (
    <div className="crewmate-card">
      <h3>{crewmate.name}</h3>
      <p>Speed: {crewmate.speed}</p>
      <p>Color: {crewmate.color}</p>
      <div className="crewmate-actions">
        <Link to={`/crewmate/${crewmate.id}`} className="view-btn">View</Link>
        <Link to={`/edit/${crewmate.id}`} className="edit-btn">Edit</Link>
        <button onClick={() => onDelete(crewmate.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default CrewmateCard;