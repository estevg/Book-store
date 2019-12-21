import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types';

class Login extends Component {
    state = { 
        email: '',
        password: ''
     }

     iniciarSesion = e => {
         e.preventDefault();

         // extraer el firebase 
         const { firebase } = this.props;
         
         // extraer el state 
         const { email, password } = this.state;

         // Autenticar el usuario
         firebase.login({
             email,
             password
         }).then( resultado => console.log('Iniciaste'))
         .catch(error => console.log('Hubo un error'))
     }

     // Almacena lo que el usuario escriba en el state
     leerDatos = e => {
         this.setState({
             [e.target.name] : e.target.value
         })
     }

    render() { 
        return ( 
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i> {''}
                                Iniciar Sesion
                            </h2>

                            <form onSubmit={this.iniciarSesion}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="text" 
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.leerDatos}
                                    required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" 
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.leerDatos}
                                    required
                                    />
                                </div>
                                <input type="submit" className="btn btn-success btn-block" value="Iniciar Sesión"/>

                                <div className=" my-2">
                                <p>
                                    <span className="font-weight-bold">Correo:</span> correo@correo.com
                                </p>
                                <p>
                                <span className="font-weight-bold">Contraseña:</span> 123123
                                </p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
Login.propTypes = {
    firebase : PropTypes.object.isRequired,
}

export default firebaseConnect()(Login);