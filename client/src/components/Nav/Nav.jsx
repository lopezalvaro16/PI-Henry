import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

function Nav({ onSearch, randommize }) {
  return (
    <div className="padre-nav">
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
          <Link className="/link" to="/favorites">
            Favorites
          </Link>
        </button>
        <button>
          <Link className="link" to="/">
            Log out
          </Link>
        </button>
      </nav>
    </div>
  );
}

export default Nav;
