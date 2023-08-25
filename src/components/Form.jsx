import { useState } from "react";
import { validar } from "../helpers";

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

    login(userData);
  }

  return (
    <div className="padre-form">
      <form onSubmit={submitHandler}>
        <img
          src="https://es.web.img3.acsta.net/pictures/18/10/31/17/34/2348073.jpg"
          alt=""
        />
        <label>USERNAME</label>
        <input
          placeholder="email"
          name="email"
          onChange={handleChange}
          type="text"
          value={userData.email}
        />
        <span>{errors.email}</span>
        <label>PASSWORD</label>
        <input
          placeholder="contrasena"
          name="password"
          type="password"
          onChange={handleChange}
          value={userData.password}
        />
        <span>{errors.password}</span>
        {errors.email || errors.password ? null : (
          <button type="submit">INGRESAR</button>
        )}
      </form>
    </div>
  );
}

export default Form;
