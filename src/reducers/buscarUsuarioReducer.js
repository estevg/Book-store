import {BUSCAR_USUARIO} from '../actions/types'

const initialState = {};

export default function buscarusuario(state = initialState, action) {
    switch(action.type){
        case BUSCAR_USUARIO: 
        return {
            ...state,
            nombre: action.usuario.nombre,
            apellido: action.usuario.apellido,
            codigo: action.usuario.codigo,
            carrera: action.usuario.carrera,
            
        }
        default: 
            return state
    }
}