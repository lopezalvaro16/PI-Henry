import React, { useState } from "react";
import axios from "axios";
import Nav from "./components/Nav.jsx";
import Cards from "./components/Cards";
import { Route, Routes } from "react-router-dom";
import About from "./components/About.jsx";
import Detail from "./components/Detail.jsx";
import "./App.css";

function App() {
  // Estado para almacenar la lista de personajes
  const [characters, setCharacters] = useState([]);

  // Función para buscar un personaje por su ID
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

    // Realizar una solicitud HTTP para obtener el personaje por su ID
    axios(
      `https://rym2-production.up.railway.app/api/character/${numericId}?key=henrym-lopezalvaro16`
    ).then(({ data }) => {
      if (data.name) {
        // Agregar el personaje a la lista si se encuentra
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert("¡No hay personajes con este ID!");
      }
    });
  }

  // Función para cerrar un personaje
  function closeHandler(id) {
    // Filtrar los personajes para eliminar el que coincide con el ID dado
    let filteredCharacters = characters.filter(
      (character) => character.id !== Number(id)
    );
    setCharacters(filteredCharacters);
  }

  // Función para agregar un personaje aleatorio a la lista
  function randomHandler() {
    let memory = [];

    // Generar un ID de personaje aleatorio
    let randomId = (Math.random() * 826).toFixed();
    randomId = Number(randomId);

    if (!memory.includes(randomId)) {
      // Evitar duplicados verificando en la memoria
      memory.push(randomId);
      // Realizar una solicitud HTTP para obtener el personaje aleatorio
      axios(
        `https://rym2-production.up.railway.app/api/character/${randomId}?key=henrym-lopezalvaro16`
      ).then(({ data }) => {
        if (data.name) {
          // Agregar el personaje a la lista si se encuentra
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      });
    }
  }

  return (
    <div className="App">
      {/* Componente de navegación con funciones de búsqueda y aleatorización */}
      <Nav onSearch={searchHandler} randommize={randomHandler} />
      {/* Definición de rutas en la aplicación */}
      <Routes>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={closeHandler} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
