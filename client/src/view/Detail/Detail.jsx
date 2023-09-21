import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      }
    );
    return setCharacter({});
  }, []);

  return (
    <div className={styles.padre}>
      <div className={`${styles.card} ${styles.cardContainer}`}>
        <div className={styles.imagen}>
          <img src={character?.image} alt={character?.name} />
        </div>
        <div className={styles.descripcion}>
          <h2>Name: {character?.name}</h2>
          <h2>Status: {character?.status}</h2>
          <h2>Specie: {character?.species}</h2>
          <h2>Gender: {character?.gender}</h2>
          <h2>Origin: {character?.origin?.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default Detail;
