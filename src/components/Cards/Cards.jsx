import Card from "../Card/Card";

export default function Cards({ characters, onClose }) {
  return (
    <div className="padre-card">
      {characters.map((character) => (
        <Card key={character.id} character={character} onClose={onClose} />
      ))}
    </div>
  );
}
