import { useState } from "react";
import { validar } from "../../helpers";
import styles from "./Form.module.css";

function Form({ login }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "ingresa un email",
    password: "ingresa un password",
  });

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

    if (!errors.email && !errors.password) {
      login(userData);
    } else {
      alert("Datos incorrectos");
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Inicia secion</h2>
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
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
