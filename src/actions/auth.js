import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../fetch/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "loginusuario",
      { email, password },
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          nombre: body.nombre,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (email, password, nombre) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "crearusuario",
      { email, password, nombre },
      "POST"
    );
    const body = await resp.json();
    console.log(body);
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          nombre: body.nombre,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('renew');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          nombre: body.nombre,
        })
      );
    } else {
      dispatch(checkingFinish())
    }
  };
};

const checkingFinish = () =>({
  type: types.authCheckingFinish,
})

export const startLogout = () =>{
  return  (dispatch)=>{
    localStorage.clear()
    dispatch(logout())
  }
}

const logout = ()=>({type: types.authLogout})

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
