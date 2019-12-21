import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner/Spinner'
import PropTypes from 'prop-types';


class EditarSuscriptor extends Component {
    state = {  }

    // crear los refs
    nombreInput = React.createRef();
    apellidoInput = React.createRef();
    carreraInput = React.createRef();
    codigoInput = React.createRef();

    // Editar suscriptor en la base de datos 
    editarSuscriptor = e => {
        e.preventDefault();

        // Crear el objeto que se va utilizar
        const suscriptorActualizado = {
            nombre: this.nombreInput.current.value,
            apellido: this.apellidoInput.current.value,
            carrera: this.carreraInput.current.value,
            codigo: this.codigoInput.current.value
        }
        // console.log(suscriptorActualizado)

        const {history, firestore, suscriptor} = this.props

        //Almacenar en la base de datos
        firestore.update({
            collection : 'suscriptores',
            doc : suscriptor.id
        }, suscriptorActualizado)
        .then(history.push('/suscriptores'))
    }

    render() { 

        const { suscriptor } = this.props
    

        if(!suscriptor) return <Spinner />
        return ( 
        <div className="row">
                <div className="col-12 mb-4">
                    <Link
                    to={'/suscriptores'}
                    className="btn btn-secondary"
                    >
                    <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fa fa-user"></i> {''}
                        Editar Suscriptor
                    </h2>
                
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form className="mb-5" onSubmit={this.editarSuscriptor}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input type="text" 
                                className="form-control"
                                name="nombre"
                                placeholder="Nombre del Suscriptor"
                                required
                                ref={this.nombreInput}
                                defaultValue={suscriptor.nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido:</label>
                                <input type="text" 
                                className="form-control"
                                name="apellido"
                                placeholder="Apellido del Suscriptor"
                                required
                                ref={this.apellidoInput}
                                defaultValue={suscriptor.apellido}
                                />
                            </div>
                            <div className="form-group">
                                <label>Carrera:</label>
                                <input type="text" 
                                className="form-control"
                                name="carrera"
                                placeholder="Carrera del Suscriptor"
                                required
                                ref={this.carreraInput}
                                defaultValue={suscriptor.carrera}
                                />
                            </div>
                            <div className="form-group">
                                <label>Codigo:</label>
                                <input type="text" 
                                className="form-control"
                                name="codigo"
                                placeholder="Codigo del Suscriptor"
                                required
                                ref={this.codigoInput}
                                defaultValue={suscriptor.codigo}
                                />
                            </div>

                            <input type="submit" value="Agregar suscriptor" className="btn btn-success"/>

                        </form>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

EditarSuscriptor.propTypes = {
    firestore : PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [
        {
            collection : 'suscriptores',
            storeAs : 'suscriptor',
            doc : props.match.params.id
        }
    ]),
    connect(({firestore : { ordered }}, props) => ({
        suscriptor : ordered.suscriptor && ordered.suscriptor[0]
    }))
)(EditarSuscriptor);