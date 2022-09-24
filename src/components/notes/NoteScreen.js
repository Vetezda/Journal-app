import { NotesAppBar } from './NotesAppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useEffect, useRef } from 'react';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.notes);

    const [ formValues, handleInputChange, reset] = useForm( note ); 

    const { title, body } = formValues;

                    //useRef alamacena una variable motable que redibujará el componente si cambia
    const activeId = useRef( note.id);//atrapamos el id del note acutal

    //ya el useform mantiene su state, a psesar de que cambiemos los notes, no se van visualizar en pantalla
    //para esto un useEffect para cambiarlo cada vez que cambiamos un note 
    useEffect(() => {
            //si el id del note llega cambiar lo comparamos con el actual
            //si son diferentes se debe resetear el formulario
        if( note.id !== activeId.current ) {
            reset( note );//se lo establecemos al reset para que actuualice los datos del note que aparece em pantalla 
            activeId.current = note.id;// y le psamos el nuevo id al actual 
        }
    }, [note, reset])

    
    useEffect(() => {//grabamos en el state del store los cambios del form como el tile o el body del note
      
       dispatch( activeNote( formValues.id, {...formValues} ) ); 

    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting(activeId.current) );
    }
    


  return (
    <div className="notes__main-content animate__animated animate__fadeIn animete__faster">
        <NotesAppBar />

        <div className="notes__content">
            <input 
                className="notes__title-input"
                type="text"
                name="title"
                placeholder="Some awesome title"
                autoComplete="off"
                value={ title }
                onChange={ handleInputChange }
            />

            <textarea  
                className="notes__textarea"
                name="body"
                placeholder="What hapenned today"
                value={ body }
                onChange={ handleInputChange }
            />
            
            {
              note.url &&
                <div className="notes__image">
                    <img 
                    src={note.url}
                    alt="image"
                    />
                </div>
            }

        </div>
            
            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

    </div>
  )
}
