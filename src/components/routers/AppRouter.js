import { useEffect, useState } from "react";
import { firebase } from "../../firebase/firebase-congig";
import { Routes, Route, BrowserRouter,Navigate } from "react-router-dom";
import { JournalScreen } from "../journal/JournalScreen"
import { AuthRouter } from "./AuthRouter"
import { login } from '../../actions/auth';
import { useDispatch} from "react-redux";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../../actions/notes"


export const AppRouter = () => {
  const dispatch = useDispatch();

  const [ checking, setChecking ] = useState(true);//variable para mostrar una pantalla de espera mientras espera comprabar si el susario esta autenticado
  const [ isLogged, setIsLogged ] = useState(false);//esta variable es para indicarle a los Route si el usuario esta auntenticado o no

  //codigo para guardar un usuario autenticado en el store
  useEffect(() => {
                  //onAuthStateChanged dispara un callback cada vez que el state de autenticacion sufre un cambio, ya sea un login, un logout , etc
    firebase.auth().onAuthStateChanged( async(user) => {
          //pregunta si el user tiene algo, entoces pregunta si tiene el uid
      if ( user?.uid) {
          dispatch( login(user.uid , user.displayName));//y mandamos los datos del user que necetiamos al state del store
          setIsLogged(true);
          dispatch( startLoadingNotes( user.uid ) );

      } else {
          setIsLogged(false);
      }

      setChecking(false);
  
    });
  
  }, [ dispatch, setChecking, setIsLogged ])

  if ( checking ) { 
      return(
         <h1>Espere...</h1>
      )
  }
  
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/auth/*" element={

                        <PublicRoute isAuth={isLogged}>
                            <AuthRouter />
                        </PublicRoute>
               
               
            } />

            <Route path="/" element={

              <PrivateRoute isAuth={isLogged}>

                  <JournalScreen />
                  
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate replace to="/auth/" />} />
        </Routes>
    </BrowserRouter>
  )
}
