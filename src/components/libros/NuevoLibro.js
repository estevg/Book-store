import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types';

class NuevoLibro extends Component {
    state = { 
        titulo: '',
        ISBN: '',
        editorial: '',
        existencia: ''
    }
    // guarda el lirbo en la bd

    agregarLibro = e => {
        e.preventDefault();

        // tomar una copia del state
        const nuevolibro = this.state;
        nuevolibro.prestados = []; 

        // extrar firestore con sus metodos
        const { firestore, history } = this.props;


        // añadirlo a la base de datos y redireccionar
        firestore.add({ collection : 'libros' }, nuevolibro)
        .then(() => history.push('/'))
    }

    // Almacena lo que el usuario escribe en el State
    leerDatos = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() { 
        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link
                    to={'/'}
                    className="btn btn-secondary"
                    >
                    <i className="fas fa-arrow-circle-left"></i> {''} Volver a listado
                    </Link>
                </div>
                <div className="col-12 mb-4 ">
                    <h2>
                        <i className="fas fa-book"></i> {''} Nuevo Libro
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.agregarLibro}>
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input type="text"
                                           className="form-control"
                                           name="titulo"
                                           placeholder="Titulo o Nombre del libro"
                                           required
                                           value={this.state.titulo}
                                           onChange={this.leerDatos}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input type="text"
                                           className="form-control"
                                           name="editorial"
                                           placeholder="Editorial de Libro"
                                           required
                                           value={this.state.editorial}
                                           onChange={this.leerDatos}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input type="text"
                                           className="form-control"
                                           name="ISBN"
                                           placeholder="ISBN de Libro"
                                           required
                                           value={this.state.ISBN}
                                           onChange={this.leerDatos}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input type="number"
                                           min="0"
                                           className="form-control"
                                           name="existencia"
                                           placeholder="Cantida en Existencia"
                                           required
                                           value={this.state.existencia}
                                           onChange={this.leerDatos}
                                    />
                                </div>

                                <input type="submit" value="Agregar Libro" className="btn btn-success"/>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
         );
    }
}

NuevoLibro.propTypes = {
    firestore : PropTypes.object.isRequired,
}
 
export default firestoreConnect()( NuevoLibro );