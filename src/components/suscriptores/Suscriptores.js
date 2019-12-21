import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner/Spinner'
import PropTypes from 'prop-types';

const Suscriptores = ({suscriptores, firestore}) => {
    
    if(!suscriptores) return <Spinner/>;


    // Funcion de eliminar
    const eliminarSuscriptor = id => {
        // Eliminar
        firestore.delete({
            collection : 'suscriptores',
            doc : id
        })

    }
    
    return ( 
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link
                to={`/suscriptores/nuevo`}
                className="btn btn-primary"
                >
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Suscriptor
                </Link>
            </div>
            
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Suscriptores
                </h2>
            </div>

            <table className="table table-striped-mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {suscriptores.map(suscriptor => (
                        <tr key={suscriptor.id}>
                            <td>{suscriptor.nombre} {suscriptor.apellido}</td>
                            <td>{suscriptor.carrera}</td>
                            <td>
                                <Link
                                to={`/suscriptores/mostrar/${suscriptor.id}`}
                                className="btn btn-success btn-block"
                                >
                                <i className="fa fa-angle-double-right"></i> {''}
                                 Mas Información
                                </Link>

                                <button
                                type="button"
                                className="btn btn-danger btn-block"
                                onClick={() => eliminarSuscriptor(suscriptor.id)}
                                >
                                    <i className="fas fa-trash-alt"></i> {''}
                                    Eliminar
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}


Suscriptores.prototype = {
    firestore : PropTypes.object.isRequired,
    suscriptores : PropTypes.array.isRequired
}

// firestoreConnect se le especifica que consultas queremos hacer 
// compose es para aplicar multiples potenciadores al store
// connect va a conectar con el store
export default compose(
    firestoreConnect([{ collection : 'suscriptores' }]),
    connect((state, props) => ({
        suscriptores : state.firestore.ordered.suscriptores
    }))
)(Suscriptores);
