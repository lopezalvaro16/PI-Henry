import React from "react";
import SearchBar from "./SearchBar";

function Nav({ onSearch, randommize }) {
  return (
    <nav>
      <SearchBar onSearch={onSearch} />
      <button onClick={randommize}>RANDOM</button>
    </nav>
  );
}

export default Nav;
