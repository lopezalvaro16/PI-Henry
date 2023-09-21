// Nav.js
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav({ onSearch, randommize, toggleAudio }) {
  return (
    <div className={styles.padre}>
      <nav className={styles.nav}>
        <button>
          <Link className={styles.link} to="/about">
            ABOUT
          </Link>
        </button>

        <button>
          <Link className={styles.link} to="/home">
            HOME
          </Link>
        </button>

        <button>
          <Link className={styles.link} to="/favorites">
            FAVORITES
          </Link>
        </button>

        <SearchBar onSearch={onSearch} />
        <button onClick={randommize}>
          <Link className={styles.link}>RANDOM</Link>
        </button>

        <button>
          <Link className={styles.link} to="/">
            LOG OUT
          </Link>
        </button>
      </nav>
    </div>
  );
}

export default Nav;
