import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}


export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {

        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload//se coloca el id y ...note 
                }
            }

        case types.notesAddNew://actualiza la lista de notes en tiempo real cada vez que se agrega un nuevo note o se realiza cambios en uno existente 
            return {
                ...state,                //cargamos las demas notas por si hubieran mas    
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
            
            case types.notesUpdate:
                return {
                    ...state,
                    notes: state.notes.map( //mapeamos todas las notes del sideBar
                    note => note.id === action.payload.id //si el note.id es igual al que estamos buscando
                    ? action.payload.note//que se coloquen los nuevos datos de la nosta que estamos buscando
                    : note//caso contrario que quede igual
                    ),
                    active: null
                }

            case types.notesDelete:
                return {
                    ...state, 
                    active: null,      
                    notes: state.notes.filter( note => note.id !== action.payload )//nos regresa un arreglo con todos los notes excepto el que tiene el id que buscamos
                }

            case types.notesLogoutCleanig:
                return {
                    ...state,       
                    active: null, 
                    notes: []
                }

                default:
                     return state;
    }

}

