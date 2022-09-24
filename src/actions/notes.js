import { db } from "../firebase/firebase-congig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types"

import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
                    //getState funciona para obtener el state del store, similar al useSlector, pero sin ninguna importacion
  return async( dispatch, getState ) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );

        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );
  }
}

export const startLoadingNotes = (uid) => {
    return async( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }

}

export const startSaveNote = ( note ) => {
    
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
            //si no viene ningun url
        if( !note.url ) {
            delete note.url;//entonces que elmine ese campo ya que es undefined y nos da error al moemento de guardar
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;//pasamos los valores al note que se va a guardar en el firestore sin su id, ya este ya lleva su id

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, note ) );
        Swal.fire('Saved', note.title, 'success');
        //dispatch( addNewNote( doc.id, newNote ) );
    }
}

export const startUploading = (file) =>{

    return async( dispatch, getState ) =>{

          const { active: activeNote } = getState().notes;
          
          Swal.fire({
              title: 'Uploading...',
              text: 'Please wait...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                  Swal.showLoading();//muestra animación de carga
              }
          })

          const fileUrl = await fileUpload (file);
          activeNote.url = fileUrl;//al active le creamos la propiedad url, para añadirle el url del archvo que extreamos a cloudinary

          dispatch( startSaveNote( activeNote ) );

          Swal.close();
    }

}

export const startDeleting = (id) => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote(id) );
    }
}



export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({//este action es para agregar las notes a a la lista sin necesiadd de recargar la pagina
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {//le colocamos el objeto con spread  mas el id de nuevo para asegurarnos que no le falte el id
            id,
            ...note
        }
    }
});

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});
export const noteLogout = () => ({
    type: types.notesLogoutCleanig
});

export const screenClear = () => ({
    type: types.activeNull
});              