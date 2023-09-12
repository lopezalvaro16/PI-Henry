import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.padre}>
      <h2 className={styles.h2}>Sobre Mí</h2>
      <p>
        ¡Hola! Soy Alvaro. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit..
      </p>
      <img
        className={styles.img}
        src="https://es.web.img3.acsta.net/pictures/18/10/31/17/34/2348073.jpg"
        alt="Tu Imagen"
      />
    </div>
  );
};

export default About;
