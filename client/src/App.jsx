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
import Swal from "sweetalert2";
import Footer from "./components/Footer/Footer";
import Landing from "./view/Landing/Landing";
import style from "./App.module.css";
import AudioPlayer from "./components/SonidoInput/SonidoIni";

function App() {
  // Estado para almacenar la lista de personajes
  const location = useLocation();
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const EMAIL = "alvaro@gmail.com";
  const PASSWORD = "12345678";

  async function loginHandler(userData) {
    const { email, password } = userData;
    const URL = `http://localhost:3001/rickandmorty/login/?email=${email}&password=${password}`;

    try {
      const { email, password } = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(access);
      if (access) {
        navigate("/home");
      }
    } catch (error) {
      alert(error);
    }
  }

  function logoutHandler() {
    setAccess(false);
  }
  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  // Función para buscar un personaje por su ID
  async function searchHandler(id) {
    try {
      if (!id) {
        // El usuario no ingresó un ID
        Swal.fire("Por favor, ingresa un ID de personaje.");
        return; // Salimos de la función para evitar más procesamiento
      }

      const { data } = await axios.get(
        `http://localhost:3001/rickandmorty/character/${id}`
      );

      if (data.error) {
        // El personaje no fue encontrado
        Swal.fire("No se encontró un personaje con este ID.");
        return; // Salimos de la función
      }

      // Verificar si el personaje ya existe en la lista
      const isCharacterAlreadyAdded = characters.some(
        (character) => character.id === data.id
      );

      if (isCharacterAlreadyAdded) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Este personaje ya fue agregado!",
        });
      } else {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          Swal.fire("¡No hay personajes con este ID!");
        }
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
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
    let memoria = [];

    let randomId = (Math.random() * 826).toFixed();

    randomId = Number(randomId);

    if (!memoria.includes(randomId)) {
      memoria.push(randomId);
      searchHandler(randomId);
    } else {
      alert("Ese personaje ya fue agregado");
      return;
    }
  }

  return (
    <div className={style.App}>
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
