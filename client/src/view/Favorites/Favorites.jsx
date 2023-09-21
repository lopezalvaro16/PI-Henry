import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortById, filterByGender, reset } from "../../redux/actions/actions";
import Cards from "../../components/Cards/Cards";
import Select from "react-select"; // Importa el componente de react-select
import styles from "./Favorites.module.css";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Unknown", value: "unknown" },
    { label: "Genderless", value: "Genderless" },
  ];

  const orderOptions = [
    { label: "Ascendente", value: "Ascendente" },
    { label: "Descendente", value: "Descendente" },
  ];

  function sortHandler(selectedOption) {
    dispatch(sortById(selectedOption.value));
  }

  function filterHandler(selectedOption) {
    dispatch(filterByGender(selectedOption.value));
  }

  function resetHandler() {
    dispatch(reset());
  }

  return (
    <div className={styles.padre}>
      <div className={styles.padreSelect}>
        {/* Dropdown para género */}
        <Select
          className={styles.selector}
          options={genderOptions}
          placeholder="Gender"
          onChange={filterHandler}
        />

        {/* Dropdown para orden */}
        <Select
          className={styles.selector}
          options={orderOptions}
          placeholder="Sort"
          onChange={sortHandler}
        />

        <button className={styles.boton} onClick={resetHandler}>
          Reset
        </button>
      </div>
      <Cards characters={favorites} />
    </div>
  );
}

export default Favorites;
