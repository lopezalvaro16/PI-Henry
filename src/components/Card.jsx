import { Link } from "react-router-dom";

export default function Card(props) {
  const { name, status, species, origin, gender, image, onClose, id } = props;
  return (
    <div className="padre-card">
      <div className="card">
        <button
          onClick={() => {
            onClose(id);
          }}
        >
          X
        </button>
        <h2>Nombre: {name}</h2>
        <Link to={`/detail/${id}`}>
          <h2>{name}</h2>
        </Link>
        <h2>Status: {status}</h2>
        <h2>Especie: {species}</h2>
        <h2>Genero: {gender}</h2>
        <h2>Origen: {origin}</h2>
        <img src={image} alt={name} />
      </div>
    </div>
  );
}
