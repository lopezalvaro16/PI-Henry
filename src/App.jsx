import React, { useState } from "react";
import axios from "axios";
import Nav from "./components/Nav.jsx";
import Cards from "./components/Cards";
import "./App.css";
// https://rym2-production.up.railway.app/api/character/${id}?key=henrym-lopezalvaro16

function App() {
  const [characters, setCharacters] = useState([]);

  function searchHandler(id) {
    // Convierte el ID a un número si es una cadena
    const numericId = parseInt(id, 10);

    // Comprobar si el ID ya existe en la lista de personajes
    const isDuplicate = characters.some(
      (character) => character.id === numericId
    );

    if (isDuplicate) {
      window.alert("¡Este ID ya está en la lista!");
      return; // Salir de la función si el ID ya está en la lista
    }

    axios(
      `https://rym2-production.up.railway.app/api/character/${numericId}?key=henrym-lopezalvaro16`
    ).then(({ data }) => {
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert("¡No hay personajes con este ID!");
      }
    });
  }

  function closeHandler(id) {
    let filterdCharacters = characters.filter(
      (character) => character.id !== Number(id)
    );
    setCharacters(filterdCharacters);
  }

  function randomHandler() {
    let memoria = [];

    let randomId = (Math.random() * 826).toFixed();

    randomId = Number(randomId);

    if (!memoria.includes(randomId)) {
      memoria.push(randomId);
      axios(
        `https://rym2-production.up.railway.app/api/character/${randomId}?key=henrym-lopezalvaro16`
      ).then(({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      });
    }
  }
  return (
    <div className="App">
      <Nav onSearch={searchHandler} randommize={randomHandler} />
      <Cards characters={characters} onClose={closeHandler} />
    </div>
  );
}

export default App;
