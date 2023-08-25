import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Nav({ onSearch, randommize }) {
  return (
    <nav className="nav">
      <SearchBar onSearch={onSearch} />
      <button onClick={randommize}>RANDOM</button>

      <button>
        <Link className="link" to="/about">
          ABOUT
        </Link>
      </button>

      <button>
        <Link className="link" to="/home">
          HOME
        </Link>
      </button>
      <button>
        <Link className="link" to="/log out">
          Log out
        </Link>
      </button>
    </nav>
  );
}

export default Nav;
