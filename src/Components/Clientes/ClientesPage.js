import axios from "axios";
import React, { useEffect, useState } from "react";
import { TableComponent } from "../Tables/TableComponent";

import "./ClientesPage.css";

export const ClientesPage = () => {
  const [data, setData] = useState([]);

  const [buscarCliente, setBuscarCliente] = useState("");


  const getClientes = () => {
    axios
      .get("http://localhost:7000/admin")
      .then((res) => res.data)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClientes();
    return data;
  }, [data]);

  const campos = [
    "Nombre",
    "Documento",
    "Direccion",
    "Telefono",
    "Email",
    "Plan",
    "Inicio Plan",
    "Final Plan",
    "Estado",
    "Acciones",
  ];

  const EliminarCliente = (id) => {
    console.log(id);
    // //aca voy
    fetch(`http://localhost:7000/admin/clientes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => console.log(res));

  };

  const busquedaCliente = (filas) => {
    const columnas = filas[0] && Object.keys(filas[0]);
    return filas.filter((fila) =>
      columnas.some(
        (columna) =>
          fila[columna].toString().toLowerCase().indexOf(buscarCliente) > -1
      )
    );
  };

  return (
    <div className="main-container animate__animated animate__fadeIn animate__slow-1s">
      <div className="clientes-description-form">
        <div>
          <h2>Thunder Balance</h2>
          <h5>Visualizacion de Clientes</h5>
        </div>
        <div className="image"></div>
      </div>
      <div className="wrapper-search">
        <h5>Buscar Clientes</h5>
        <p>Puedes buscar por nombre o documento de identidad</p>
        <input
          type="text"
          value={buscarCliente}
          onChange={(e) => setBuscarCliente(e.target.value)}
        />
      </div>
      <div className="container-table">
        <TableComponent
          data={busquedaCliente(data)}
          campos={campos}
          eliminar={EliminarCliente}
        />
      </div>
    </div>
  );
};
