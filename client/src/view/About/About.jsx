import React, { useState, useEffect } from "react";
import styles from "./About.module.css";
import Instagram from "../../assets/instagram.png";
import Gmail from "../../assets/gmail.png";
import Github from "../../assets/github.png";
import starBackground from "../../assets/fondo.gif";

const About = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    // Simula la aparición de la tarjeta después de un tiempo (por ejemplo, 1 segundo)
    const timer = setTimeout(() => {
      setIsCardVisible(true);
    }, 1000); // Cambia el valor en milisegundos según tus preferencias

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${starBackground})` }}
    >
      <div className={styles.container}>
        <div className={styles.background}>
          {/* Mantén el fondo fijo y agrega un contenedor para el efecto de portal */}
          <div className={styles.portalContainer}>
            {/* La tarjeta que sale del portal */}
            <div
              className={`${styles.flipCard} ${
                isCardVisible ? styles.portalEnterDone : ""
              }`}
            >
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <h2>ABOUT ME</h2>
                  <div className={styles.perfil}>
                    <img
                      src="https://scontent.ftuc4-1.fna.fbcdn.net/v/t1.6435-9/53267003_2370747342959500_3466609503514918912_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gKYajqP9JO8AX_OA8OR&_nc_ht=scontent.ftuc4-1.fna&oh=00_AfCWDsNi03r29271x-6aCTeWaZzDN8SRT-8qYRFYQbR1Qw&oe=653085CA"
                      alt="Tu Imagen"
                      className={styles.perfilImg}
                    />
                  </div>
                  <div className={styles.overlay}></div>
                </div>
                <div className={styles.flipCardBack}>
                  <div className={styles.perfil}>
                    <img
                      src="https://scontent.ftuc4-1.fna.fbcdn.net/v/t1.6435-9/53267003_2370747342959500_3466609503514918912_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gKYajqP9JO8AX_OA8OR&_nc_ht=scontent.ftuc4-1.fna&oh=00_AfCWDsNi03r29271x-6aCTeWaZzDN8SRT-8qYRFYQbR1Qw&oe=653085CA"
                      alt="Tu Imagen"
                      className={styles.perfilImg}
                    />
                  </div>
                  <div className={styles.text}>
                    <p>
                      Soy Alvaro Mauricio Lopez, un apasionado estudiante de
                      desarrollo de software con experiencia en React,
                      JavaScript, Node.js, CSS y más. Mi último proyecto es una
                      aplicación web basada en la API de Rick and Morty,
                      diseñada para explorar y obtener información de personajes
                      de manera intuitiva. Únete a mí en este emocionante viaje
                      tecnológico.
                    </p>
                    <div className={styles.socialLinks}>
                      <a
                        href="https://instagram.com/lopezalvaro16"
                        target="_blank"
                      >
                        <img
                          src={Instagram}
                          alt="instagram"
                          className={styles.logo}
                        />
                      </a>
                      <a href="mailto:alvaromauriciolopez@gmail.com">
                        <img src={Gmail} alt="gmail" className={styles.logo} />
                      </a>
                      <a
                        href="https://github.com/lopezalvaro16"
                        target="_blank"
                      >
                        <img
                          src={Github}
                          alt="github"
                          className={styles.logo}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
