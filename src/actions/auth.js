import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from "../firebase/firebase-congig";
import { types } from "../types/types";
import { noteLogout } from './notes';
import { finishLoading, startLoading } from "./ui";

//EN ESTE ARCHIVO MANEJAREMOS TODAS LAS ACCIONES DE lOGIN Y REGISTER QUE RECIBIRÁ EL REDUCER authReducer.js

export const startLoginEmailPasswords = (email, password) => {
          //este dispatch nos lo probee thunk
    return (dispatch) => {
        dispatch( startLoading() );//las actions startLoading y finishLoading son para desabilitar el botón de login por cierto tiempo
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then ( ({ user }) => {
                dispatch( login( user.uid , user.displayName) );
                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e)
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })   
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
                      //esta funcion nos permite autentincarnos con el email y password, dado que es de firebase es asincrona
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) => {
                         //con esta funcion podemos extraer el nombre del form y colocarselo al user.displayName
                await user.updateProfile({ displayName: name} );

                dispatch(
                    login( user.uid , user.displayName)
                )
            })
            .catch( e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startGoogleLogin = () => {
    return (dispatch) => {
                     //esta funcion nos despliega un popup, el cual es una ventana que contiene correos a elegir, dado que es de firebase es asincrona
        firebase.auth().signInWithPopup( googleAuthProvider )
             //con userCred podemos ver todas las credenciales del usuario que se autenticó, pero desestructuramos para obetener solo los datos que necesitamos del user 
        .then ( ({ user }) => {
            dispatch( 
                login( user.uid , user.displayName)
                )
        });
    }
}

export const login = (uid, displayName) => ({//envolviendo todo en parentesis, podemos ahorrarnos poner return, con los parantesis indicamos que regresa ese objeto 
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


//----------------------- actions para el logout--------------------------------------------------

export const startLogout = () => {

    return async ( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );

    }

}

export const logout = () => ({
    type: types.logout
})






