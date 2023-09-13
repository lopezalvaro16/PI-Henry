import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");

  function changeHandler(evento) {
    setId(evento.target.value);
  }

  return (
    <div>
      <input
        type="search"
        onChange={changeHandler}
        value={id}
        placeholder="Search Character"
      />
      <button
        className={styles.search}
        onClick={() => {
          onSearch(id);
        }}
      ></button>
    </div>
  );
}
