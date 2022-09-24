import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm"
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";


export const RegisterScreen = () => {

  const [{name, email, password, password2}, handleInputChange] = useForm();

  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui);//con el useSelector podemos acceder al store e indicar cual state queremos seleccionar para extraer sus propiedades

  const handleRegister = (e) => {
    e.preventDefault();

    if ( isFormValid() ) {
        dispatch( startRegisterWithEmailPasswordName(email, password, name));
    }

  }

  const isFormValid = () => {
    if (name === undefined || email === undefined || password === undefined || password2 === undefined) {
      dispatch( setError('empty field') );
      return false;
    }else if (name.trim().length === 0) {
        dispatch( setError('name is required') );
        return false;
    }else if ( !validator.isEmail(email) ) {
        dispatch( setError('email is not valid') );
        return false;
    }else if ( password !== password2 || password.length < 5 ) {
        dispatch( setError('Password should be at least 5 characters and match each other') );
        return false;
    }

    dispatch(removeError()); 

      return true;
  }



  return (
    <>
        <h3 className="auth__title">Register</h3>
        <form  
          onSubmit={handleRegister}
          className="animate__animated animate__fadeIn animete__faster"
        >
            { //si msgError es diferente de null, debe mostrarse el div con el msgError
              msgError && 
                <div className="auth__alert-error">
                    { msgError }
                </div>

            }

            <input 
              type="text"
              placeholder="Name"
              name="name"
              className="auth__input"
              autoComplete="off"
              onChange={handleInputChange} 
            />

            <input 
              type="email"
              placeholder="Email"
              name="email"
              className="auth__input"
              autoComplete="off"
              onChange={handleInputChange} 
            />

            <input 
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              className="auth__input"
              onChange={handleInputChange} 
            />
            <input 
              type="password"
              placeholder="Confirm password"
              name="password2"
              autoComplete="off"
              className="auth__input"
              onChange={handleInputChange} 
            />

            <button
                type="submit"
                className="btn btn-primary btn-block mb-5" 
            >
              Register  
            </button>

            <Link 
            to="/auth/login"
            className="link"
            >
                Already registered?
            </Link>
            
        </form>
    </>
  )
}
