import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { BrowserRouter, Switch } from 'react-router-dom'
import { startChecking } from '../actions/auth'
import { ActualizarCliente } from '../Components/Clientes/ActualizarCliente'
import { ClientesPage } from '../Components/Clientes/ClientesPage'
import { CrearClientesPage } from '../Components/CrearClientes/CrearClientesPage'
import { CrearCuenta } from '../Components/LoginPage/CrearCuenta'
import { LoginPage } from '../Components/LoginPage/LoginPage'
import { GymNav } from '../Components/UIComponents/GymNavigation/GymNav'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const GymRutas = () => {

    const dispatch = useDispatch()
    const { uid} = useSelector(state => state.auth)
    const state = useSelector(state => state.auth)
    
console.log(state)
    useEffect(()=>{
        dispatch(startChecking())
    }, [dispatch])


    
    return (
        <BrowserRouter>
        <GymNav />

        <Switch>
          <PublicRoute path="/login" exact component={LoginPage} isAuthenticated={!!uid} />
          <PublicRoute path="/crearcuenta" exact component={CrearCuenta} isAuthenticated={!!uid} />
          <PrivateRoute path="/clientes/:id" exact component={ClientesPage} isAuthenticated={!!uid}/>
          <PrivateRoute
            path="/admin/actcliente/:id"
            exact
            component={ActualizarCliente}
            isAuthenticated={!!uid}
          />
          <PrivateRoute path="/admin/regcliente" exact component={CrearClientesPage} isAuthenticated={!!uid} />
          <PrivateRoute path="/" exact component={ClientesPage} isAuthenticated={!!uid}/>
        </Switch>
      </BrowserRouter>
    )
}
