import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";


import "./LoginPage.css";

console.log(moment())



export const LoginPage = () => {

  const dispatch = useDispatch()

  const [loginUsuario, handleLoginInputChange] = useForm({
    lemail: "",
    lpassword: "",
  });

  const {lemail, lpassword} = loginUsuario

  const handleLogin = (e)=>{
    e.preventDefault();

    dispatch( startLogin(lemail, lpassword) )
  }

 
  
  return (
    <div className="crearclientes__main animate__animated animate__fadeIn animate__slow-1s">
      <div className="crearclientes__wrapper">
        <div className="crearclientes__wrapper-description-form">
          <h2>Thunder Balance</h2>
          <h5>Iniciar Sesion</h5>

          <div className="image"></div>
        </div>

        <div className="crearclientes__wrapper-form">
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" name="lemail" id="email" value={lemail} onChange={handleLoginInputChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="lpassword" id="password" value={lpassword} onChange={handleLoginInputChange}/>
            <input type="submit" value="Iniciar Sesion" />
          </form>
          <div className="crear-cuenta">
            <h5>Si no tienes una cuenta, por favor crea una.</h5>
            <br />
            <Link to="/crearcuenta"><button className="btn">Crear Cuenta</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
