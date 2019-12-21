import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner/Spinner'
import PropTypes from 'prop-types'


import {buscarUsuario} from '../../actions/buscarUsuarioActions'


import FichaSuscriptor from '../suscriptores/FichaSuscriptor';


class PrestamoLibro extends Component {
    state = { 
        noResultado: false,
        busqueda : ''
     }
    
     buscarAlumno = e => {
         e.preventDefault();

         // obtener el valor a buscar
        const {busqueda} = this.state

         // extraer el firestore
        const { firestore, buscarUsuario } = this.props;

         // hacer la conuslta
        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo", "==", busqueda).get();

         // leer los resultados
         consulta.then(res => {
             if(res.empty){
                // almacenar en redux un objeto vacio
                buscarUsuario({})
                // actualizar el state en base al resultado 
                 this.setState({
                     noResultado: true,
                 })

             } else {
                 // si hay resultado
                 const datos = res.docs[0]
                 buscarUsuario(datos.data())
                 // actualizar el state en base al resultado 
                 this.setState({
                     noResultado : false
                 })
             }
         })
     }

     // Almacena los datos del alumno para solicitar el libro
     solicitarPrestamo = () => {
         const { usuario } = this.props

         // fecha de alta
         usuario.fecha_solicitud = new Date().toLocaleDateString();

         // No se pueden mutar los props, tomar una copia y crear un arreglo nuevo
         let prestados = [];
         prestados = [...this.props.libro.prestados, usuario];

         // Copiar el objeto y agregar los prestados
         const libro = {...this.props.libro}

         // ELiminar los prestados anteriores
         delete libro.prestados;

         // Asignar los prestados
         libro.prestados = prestados;

         const { firestore, history} = this.props


         // Almacenar en la bd
         firestore.update({
             collection : 'libros',
             doc: libro.id
         }, libro)
         .then(history.push('/'))



     }


     leerDato = e => {
         this.setState({
             [e.target.name] : e.target.value
         })
     }
    
    render() { 

        // Extraer el libro
        const { libro } = this.props
        

        if(!libro) return <Spinner/>;

        // Extraer los datos de los alumnos 
        const { usuario } = this.props;
        // console.log(usuario)
        let fichaAlumno, btnSolicitar;
        if(usuario.nombre) {
            fichaAlumno = <FichaSuscriptor alumno={usuario} />
            btnSolicitar = <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={this.solicitarPrestamo}
                            >Solicitar Prestamo
                           </button>
        } else {
            fichaAlumno = null;
            btnSolicitar = null;
        }

        const { noResultado } = this.state;
        let error = ''
        if(noResultado){
             error = <div className="alert alert-danger text-center font-weight-bold my-4"> No hay resultados para ese código </div>
        } else {
            error = null
        }
        
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
                        <i className="fas fa-book"></i> {''} Solicitar Prestamo : {libro.titulo}
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.buscarAlumno}>
                                <legend className="color-primary text-center">
                                    Busca el suscriptor por codigo
                                </legend>

                                <div className="form-group">
                                    <input type="text"
                                           name="busqueda"
                                           className="form-control"
                                           onChange={this.leerDato}
                                    />
                                </div>
                                <input type="submit" className="btn btn-success btn-block"/>
                            </form>
                            {/* Muestra la ficha de alumno y el boton para solicitar el prestamo */}
                            {fichaAlumno}
                            {btnSolicitar}


                            {error}
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}




PrestamoLibro.propTypes = {
    firestore : PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [
        {
            collection : 'libros',
            storeAs : 'libro',
            doc : props.match.params.id
        }
    ]),
    connect(({firestore : { ordered }, usuario}, props) => ({
        libro : ordered.libro && ordered.libro[0],
        usuario : usuario
    }), {buscarUsuario})
)(PrestamoLibro);