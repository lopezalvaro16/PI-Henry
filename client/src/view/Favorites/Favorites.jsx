import { useSelector, useDispatch } from "react-redux";
import { sortById, filterByGender, reset } from "../../redux/actions/actions";
import Cards from "../../components/Cards/Cards";
import styles from "./Favorites.module.css";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  function sortHandler(event) {
    dispatch(sortById(event.target.value));
  }

  function filterHandler(event) {
    dispatch(filterByGender(event.target.value));
  }

  function resetHandler() {
    dispatch(reset());
  }

  return (
    <div className={styles.padre}>
      <select
        className={styles.selector}
        placeholder="Gender"
        onChange={filterHandler}
      >
        {["Male", "Female", "unknown", "Genderless"].map((gender) => (
          <option className={styles.option} key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      <select
        className={styles.selector}
        placeholder="Sort"
        onChange={sortHandler}
      >
        {["Ascendente", "Descendente"].map((order) => (
          <option className={styles.option} key={order} value={order}>
            {order}
          </option>
        ))}
      </select>
      <button className={styles.boton} onClick={resetHandler}>
        RESET
      </button>

      <Cards characters={favorites} />
    </div>
  );
}

export default Favorites;
