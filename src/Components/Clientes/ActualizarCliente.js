import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import {  useParams } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
export const ActualizarCliente = () => {
  const [userData, setUserData] = useState("");
  const [myPlan, setMyPlan] = useState([]);
  
  const [regClienteData, handleInputChange, resetData] = useForm();

  const {
    nombre = userData.nombre,
    tipoDocumento = userData.tipoDocumento,
    numeroDoc = userData.numeroDoc,
    direccion = userData.direccion,
    email = userData.email,
    telefono = userData.telefono,
    plan = userData.plan,
    fechaInicio = userData.fechaInicio,
    fechaFinal = userData.fechaFinal,
    status = userData.status,
  } = regClienteData;



  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:7000/admin/actcliente/${id}`, {
      method: "PUT",
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
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

      resetData()
    
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cliente Modificado",
        showConfirmButton: false,
        timer: 1500,
      });
  };

 

  useEffect(
    () =>
      axios
        .get(`http://localhost:7000/admin/actcliente/${id}`)
        .then((res) => res.data)
        .then((res) => setUserData(res))
        .catch((err) => console.log(err)),
    [id]
  );

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
            <h5>Modificar Cliente</h5>

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
              <label>Tipo de Documento</label>
              <br />
              <label htmlFor="tipoDocumento">T.I.</label>
              <input
                type="radio"
                name="tipoDocumento"
                id="tipoDocumento"
                value="T.I."
                checked={tipoDocumento === 'T.I.' && true}
                onChange={handleInputChange}
              />
              <label htmlFor="tipoDocumento">C.C.</label>
              <input
                type="radio"
                name="tipoDocumento"
                id="tipoDocumento"
                value="C.C."
                checked={tipoDocumento === 'C.C.' && true}
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
                value={moment(fechaInicio).format("YYYY-MM-DD")}
                onChange={handleInputChange}
              />
              <label htmlFor="fechaFinal">Finalizacion del Plan</label>
              <input
                type="date"
                name="fechaFinal"
                id="fechaFinal"
                value={moment(fechaFinal).format("YYYY-MM-DD")}
                onChange={handleInputChange}
              />
              <label htmlFor="status">Estado</label>
              <br />
              <label htmlFor="status">Activo</label>
              <input
                type="radio"
                name="status"
                id="status"
                value={true}
                checked={status === true ? true : null}
                onChange={handleInputChange}
              />
              <label htmlFor="tipoDocumento">Inactivo</label>
              <input
                type="radio"
                name="status"
                id="status"
                value={false} 
                checked={status === false ? true : null}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="submit"
                value="Modificar Cliente"
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

