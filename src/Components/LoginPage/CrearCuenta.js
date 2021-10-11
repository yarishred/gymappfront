import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const CrearCuenta = () => {
  const dispatch = useDispatch();

  const [regClienteData, handleRegisterInputChange, resetData] = useForm({
    rNombre: "",
    rEmail: "",
    rPassword1: "",
    rPassword2: "",
  });

  const { rNombre, rEmail, rPassword1, rPassword2 } = regClienteData;

  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword1 !== rPassword2) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    } else {
      resetData();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cliente creado",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    console.log("?");
    dispatch(startRegister(rEmail, rPassword1, rNombre));
  };

  return (
    <div className="crearclientes__main animate__animated animate__fadeIn animate__slow-1s">
      <div className="crearclientes__wrapper">
        <div className="crearclientes__wrapper-description-form">
          <h2>Thunder Balance</h2>
          <h5>Crear Cuenta</h5>

          <div className="image"></div>
        </div>

        <div className="crearclientes__wrapper-form">
          <form onSubmit={handleRegister}>
            <label htmlFor="nombre">Nombres</label>
            <input
              type="text"
              name="rNombre"
              id="rNombre"
              value={rNombre}
              onChange={handleRegisterInputChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="rEmail"
              id="rEmail"
              value={rEmail}
              onChange={handleRegisterInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="rPassword1"
              id="rPassword1"
              value={rPassword1}
              onChange={handleRegisterInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="rPassword2"
              id="rPassword2"
              value={rPassword2}
              onChange={handleRegisterInputChange}
            />
            <input type="submit" value="Crear Cuenta" />
          </form>
          <div className="crear-cuenta">
            <h5>Si ya tienes una cuenta, inicia sesion.</h5>
            <br />
            <Link to="/login">
              <button className="btn">Iniciar Sesion</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
