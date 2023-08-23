import { useState } from "react";

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
        onClick={() => {
          onSearch(id);
        }}
      >
        Agregar
      </button>
    </div>
  );
}
