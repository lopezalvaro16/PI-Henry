import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/actions/actions";
import { useState, useEffect } from "react";
import styles from "./Card.module.css";

function Card(props) {
  const navigate = useNavigate();
  // const location = useLocation()
  const { character, onClose, favorites, addFavorite, removeFavorite } = props;
  const [isFav, setFav] = useState(false);
  const [closeBtn, setCloseBtn] = useState(true);

  const playSoundCorazon = () => {
    const audioElement = document.getElementById("sonidoCorazon");
    if (audioElement) {
      audioElement.play();
    }
  };
  const playSoundEliminar = () => {
    const audioElement = document.getElementById("sonidoEliminar");
    if (audioElement) {
      audioElement.play();
    }
  };
  const playSoundCerrar = () => {
    const audioElement = document.getElementById("sonidoCerrar");
    if (audioElement) {
      audioElement.play();
    }
  };

  function navigateHandler() {
    navigate(`/detail/${character.id}`);
  }

  useEffect(() => {
    if (!onClose) {
      setCloseBtn(false);
    }
  }, []);

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === character.id) {
        setFav(true);
      }
    });
  }, [favorites]);

  function handleFavorite(character) {
    if (isFav) {
      playSoundEliminar(); // Reproduce el sonido de eliminación
      removeFavorite(character);
      setFav(false); // Marca que el personaje ya no es un favorito
    } else {
      playSoundCorazon(); // Reproduce el sonido del corazón
      addFavorite(character);
      setFav(true); // Marca que el personaje es un favorito
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.component}>
        <div className={styles.buttons}>
          <audio
            id="sonidoCorazon"
            src="https://ia803107.us.archive.org/21/items/maelstrom_mac_game_sounds/Pause.mp3"
          ></audio>
          <audio
            id="sonidoEliminar"
            src="https://archive.org/download/maelstrom_mac_game_sounds/Photon%20Shot.mp3"
          ></audio>
          <audio
            id="sonidoCerrar"
            src="https://archive.org/download/maelstrom_mac_game_sounds/Multiplier%20Appears.mp3"
          ></audio>
          {closeBtn && (
            <button
              className={styles.fav}
              onClick={() => {
                playSoundCerrar();
                setTimeout(() => {
                  onClose(character.id);
                }, 700);
              }}
            >
              X
            </button>
          )}

          {isFav ? (
            <button
              className={styles.fav}
              onClick={() => {
                handleFavorite(character.id);
              }}
            >
              ❤️
            </button>
          ) : (
            <button
              className={styles.close}
              onClick={() => {
                handleFavorite(character);
              }}
            >
              🤍
            </button>
          )}
        </div>
        <div className={styles.id}>
          <h2>Id: {character.id}</h2>
        </div>
        <div className={styles.image}>
          <img
            src={character.image}
            alt={character.name}
            onClick={navigateHandler}
          />
        </div>
        <div className={styles.dataContainer}>
          <h2 className={styles.name}>{character.name}</h2>
          <h2 className={styles.data}>
            <span>Status: </span>
            <span className={styles.Value}>{character.status}</span>
          </h2>
          <h2 className={styles.data}>
            <span>Gender: </span>
            <span className={styles.Value}>{character.gender}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (character) => dispatch(addFavorite(character)),
    removeFavorite: (id) => dispatch(removeFavorite(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
