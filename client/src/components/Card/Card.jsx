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

  function navigateHandler() {
    navigate(`/detail/${character.id}`);
  }

  useEffect(() => {
    if (!onClose) {
      setCloseBtn(false);
    }
  }, []);

  useEffect(() => {
    //[rick, morty, mr poppybutthole]
    favorites.forEach((fav) => {
      if (fav.id === character.id) {
        setFav(true);
      }
    });
  }, [favorites]);

  function handleFavorite(character) {
    if (!isFav) {
      addFavorite(character); //{}
      setFav(true);
    } else {
      removeFavorite(character); //id
      setFav(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.component}>
        <div className={styles.buttons}>
          {closeBtn && (
            <button
              className={styles.fav}
              onClick={() => {
                onClose(character.id);
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
