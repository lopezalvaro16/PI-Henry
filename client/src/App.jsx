import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./components/Nav/Nav";
import Cards from "./components/Cards/Cards";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import About from "./view/About/About";
import Detail from "./view/Detail/Detail";
// import Form from "./view/Form/Form";
import ErrorPage from "./view//ErrorPage/ErrorPage";
import Favorites from "./view/Favorites/Favorites";

import Footer from "./components/Footer/Footer";
import Landing from "./view/Landing/Landing";

import "./App.css";

function App() {
  // Estado para almacenar la lista de personajes
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const EMAIL = "alvaro@gmail.com";
  const PASSWORD = "12345678";

  function loginHandler(userData) {
    const { email, password } = userData;
    const URL = "http://localhost:3001/rickandmorty/login/";
    axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    });
  }

  function logoutHandler() {
    setAccess(false);
  }
  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  // Función para buscar un personaje por su ID
  function searchHandler(id) {
    // // Convierte el ID a un número si es una cadena
    // const numericId = parseInt(id, 10);

    // // Comprobar si el ID ya existe en la lista de personajes
    // const isDuplicate = characters.some(
    //   (character) => character.id === numericId
    // );

    // if (isDuplicate) {
    //   window.alert("¡Este ID ya está en la lista!");
    //   return; // Salir de la función si el ID ya está en la lista
    // }

    // Realizar una solicitud HTTP para obtener el personaje por su ID
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("¡No hay personajes con este ID!");
        }
      }
    );
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
      {location.pathname !== "/" && (
        <Nav
          onSearch={searchHandler}
          randommize={randomHandler}
          logout={logoutHandler}
        />
      )}

      {/* Definición de rutas en la aplicación */}
      <Routes>
        {/* <Route path="/" element={<Form login={loginHandler} />} /> */}
        <Route
          path="/"
          element={
            <>
              <Landing login={loginHandler} />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={closeHandler} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
