import React from "react";
import { NavLink } from "react-router-dom";
import { GymLogo } from "../GymLogo/GymLogo";

import "./GymNav.css";
import "./css/stylesheet.css";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../../actions/auth";

export const GymNav = () => {

  

  
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <header className="header__gymNav">
      <GymLogo />
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">Clientes</NavLink>
          </li>
          <li>
            <NavLink to="/admin/regcliente"  exact activeClassName="active">Crear Clientes</NavLink>
          </li>
        </ul>
      </nav>
      <div className="login-area">
        <ul>
          {!!uid ? (
            <button onClick={handleLogout}>Salir</button>
          ) : (
            <>
              <li>
                <NavLink to="/login">Iniciar Sesion</NavLink>
              </li>
              <li>
                <NavLink to="/crearcuenta">Crear Cuenta</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};
