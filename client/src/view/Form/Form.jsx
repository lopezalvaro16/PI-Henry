import { useState } from "react";
import { validar } from "../../helpers";
import styles from "./Form.module.css";
function Form({ login }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "Ingresa un email",
    password: "Ingresa un password",
  });

  //Audio
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const playSoundSubmit = () => {
    const audioElement = document.getElementById("sonidoSubmit");
    if (audioElement) {
      audioElement.play();
    }
  };

  function toggleAudio() {
    var audio = document.getElementById("myAudio");
    if (audio.paused) {
      audio.play();
      setIsAudioPlaying(true);
    } else {
      audio.pause();
      setIsAudioPlaying(false);
    }
  }

  function handleAudioEnded() {
    var audio = document.getElementById("myAudio");
    audio.currentTime = 0;
    audio.play();
  }

  function handleChange(event) {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validar({ ...userData, [event.target.name]: event.target.value })
    );
  }

  function submitHandler(event) {
    event.preventDefault();
    playSoundSubmit();
    setTimeout(() => {
      if (!errors.email && !errors.password) {
        login(userData);
        playMusic();
      } else {
        alert("Datos incorrectos");
      }
    }, 500);
  }

  return (
    <>
      <audio
        id="myAudio"
        src="https://archive.org/download/md_music_animaniacs/01%20-%20Konami%20Logo%20-%20Seiya%20Murai.mp3"
        onMouseEnter={handleAudioEnded}
        onMouseLeave={handleAudioEnded}
      ></audio>

      <div
        onMouseEnter={toggleAudio}
        onMouseLeave={toggleAudio}
        className={styles.container}
      >
        <h2>Inicia sesion</h2>
        <form onSubmit={submitHandler}>
          <div className={styles.email}>
            <input
              placeholder="email"
              name="email"
              onChange={handleChange}
              type="text"
              value={userData.email}
            />
            {errors.email && <h5 className={styles.error}>{errors.email}</h5>}
          </div>
          <div className={styles.password}>
            <input
              placeholder="contrasena"
              name="password"
              type="password"
              onChange={handleChange}
              value={userData.password}
            />
            {errors.password && (
              <h5 className={styles.error}>{errors.password}</h5>
            )}
          </div>
          <div>
            <audio
              id="sonidoSubmit"
              src="https://archive.org/download/real-war-game-rip/mseOVER3.mp3"
              onClick={submitHandler}
            ></audio>
            <button
              onClick={submitHandler}
              className={styles.submit}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
