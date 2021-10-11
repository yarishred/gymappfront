import moment from "moment";
import { Link } from "react-router-dom";

export const TableComponent = ({ campos, data, eliminar }) => {

 

 
  return (
    <table className="animate__animated animate__fadeIn animate__slow-1s">
      <thead>
        <tr>
          {campos.map((t) => (
            <th key={t}>{t}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((data) => (
          <tr key={data._id}>
            <td>{data.nombre}</td>
            <td>{data.numeroDoc}</td>
            <td>{data.direccion}</td>
            <td>{data.telefono}</td>
            <td>{data.email}</td>
            <td>{data.plan.plan}</td>
            <td>{moment(data.fechaInicio).format('YYYY-MM-DD') }</td>
            <td>{moment(data.fechaFinal).format('YYYY-MM-DD')}</td>
            <td className={data.status === true ? "activo" : "inactivo"}>
              {data.status === true ? "Activo" : "Inactivo"}
            </td>
            <td>
              <div className="clientes-btn">
                <Link
                  to={`/admin/actcliente/${data._id}`}
                  className="btn btn-edit"
                >
                  Editar
                </Link>
                <Link
                  to={`/clientes/${data._id}`}
                  className="btn btn-delete"
                  onClick={()=>eliminar(data._id)}
                >
                  Borrar
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
