import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
  
  const dispatch = useDispatch();
  const { active, date } = useSelector( state => state.notes);
  const noteDate = moment(date);
  
  const handleSave = () => {
    
      dispatch( startSaveNote( active ) );
  }

  const handleAddPicture = () => {
      document.querySelector('#fileSelector').click();

  }

  const handleFileChange = (e) => {
      const file = e.target.files[0]; 
      if( file ) {
        dispatch( startUploading( file ) );
      }
  }

  return (
    <div className="notes__appbar">
        <span>{noteDate.format('Do MMM YY') }</span>

        {/*este input nos sirve para elegir archivos */}
        <input 
          id="fileSelector" 
          type="file"
          style={ {display: 'none'} }
          onChange={ handleFileChange }
        />

        <div>
            <button 
              className="btn"
              onClick={handleAddPicture}
            >
                Picture
            </button>
            <button 
              className="btn"
              onClick={handleSave}
            >
                Save
            </button>
        </div>
    </div>
  )
}


