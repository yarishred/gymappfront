import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

import "./CreaClientes.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useHistory } from "react-router-dom";

export const CrearClientesPage = () => {


  const history = useHistory()

  const [regClienteData, handleInputChange, resetData] = useForm({
    nombre: "",
    tipoDocumento: "",
    numeroDoc: "",
    direccion: "",
    email: "",
    telefono: "",
    plan: "60df1238b3c66428c47e7753",
    fechaInicio: "",
    fechaFinal: "",
  });

  const {
    nombre,
    tipoDocumento,
    numeroDoc,
    direccion,
    telefono,
    email,
    plan,
    fechaInicio,
    fechaFinal,
  } = regClienteData;

  const [myPlan, setMyPlan] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:7000/admin/regcliente", {
      method: "POST",
      body: JSON.stringify({
        nombre,
        tipoDocumento,
        numeroDoc,
        direccion,
        telefono,
        email,
        plan,
        fechaInicio,
        fechaFinal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok === false) {
          Swal.fire("Error", "Debes llenar los campos correctamente", "error");
        } else {
          resetData();
        }
      })
      .catch((err) => console.log(err));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cliente Agregado",
      showConfirmButton: false,
      timer: 1500,
    });


    history.push("/");
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/admin/planes")
      .then((res) => setMyPlan((p) => (p = res.data)));
  }, []);

  return (
    <>
      <div className="crearclientes__main animate__animated animate__fadeIn animate__slow-1s">
        <div className="crearclientes__wrapper">
          <div className="crearclientes__wrapper-description-form">
            <h2>Thunder Balance</h2>
            <h5>{"Agregar Cliente"}</h5>

            <div className="image"></div>
          </div>

          <div className="crearclientes__wrapper-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="tipoDocumento">Tipo de Documento</label>
              <br />
              <label htmlFor="tipoDocumento">T.I.</label>
              <input
                type="radio"
                name="tipoDocumento"
                value="T.I."
                onChange={handleInputChange}
              />
              <label htmlFor="tipoDocumento">C.C.</label>
              <input
                type="radio"
                name="tipoDocumento"
                value="C.C."
                onChange={handleInputChange}
              />
              <br />
              <label htmlFor="numeroDoc">Numero de Documento</label>
              <input
                type="text"
                name="numeroDoc"
                id="numeroDoc"
                value={numeroDoc}
                onChange={handleInputChange}
              />
              <label htmlFor="direccion">Direccion</label>
              <input
                type="text"
                name="direccion"
                id="direccion"
                value={direccion}
                onChange={handleInputChange}
              />
              <label htmlFor="telefono">Telefono</label>
              <input
                type="text"
                name="telefono"
                id="telefono"
                value={telefono}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
              />
              <label htmlFor="plan">Selecciona el plan:</label>
              <select name="plan" onChange={handleInputChange}>
                {myPlan.map((p) => (
                  <option key={p._id} id={p._id} value={p._id}>
                    {p.plan}
                  </option>
                ))}
              </select>
              <label htmlFor="fechaInicio">Inicio del Plan</label>
              <input
                type="date"
                name="fechaInicio"
                id="fechaInicio"
                value={fechaInicio}
                onChange={handleInputChange}
                min={moment()}
              />
              <label htmlFor="fechaFinal">Finalizacion del Plan</label>
              <input
                type="date"
                name="fechaFinal"
                id="fechaFinal"
                value={fechaFinal}
                onChange={handleInputChange}
                min={moment()}
              />
              <br />
              <input
                type="submit"
                value="Agregar Cliente"
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
