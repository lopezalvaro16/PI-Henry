import React from "react";
import Form from "../Form/Form";
import style from "./Landing.module.css";
import Logo from "../../assets/logo.jpg";

export default function LandingPage({ login }) {
  return (
    <>
      <div className={style.logo}>
        <img src={Logo}></img>
        <h3 className={style.by}>By Alvaro Lopez</h3>
      </div>
      <div className={style.container}>
        <Form login={login}></Form>
      </div>
    </>
  );
}
