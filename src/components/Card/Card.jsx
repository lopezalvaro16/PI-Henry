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
    <div className={styles.padre}>
      <div className={styles.card}>
        <div className={styles.header}>
          {closeBtn && (
            <button
              onClick={() => {
                onClose(character.id);
              }}
            >
              X
            </button>
          )}

          <h2>{character.name}</h2>
          {isFav ? (
            <button
              onClick={() => {
                handleFavorite(character.id);
              }}
            >
              ❤️
            </button>
          ) : (
            <button
              onClick={() => {
                handleFavorite(character);
              }}
            >
              🤍
            </button>
          )}
        </div>
        <h2>Species: {character.species}</h2>
        <h2>Gender: {character.gender}</h2>
        <img
          className={styles.image}
          src={character.image}
          alt={name}
          onClick={navigateHandler}
        />
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
