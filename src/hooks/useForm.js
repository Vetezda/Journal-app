import { useState } from "react"

//Este hook extrae lo que se escribe dentro de Input, tambien puede limpiar el input una vez se presione enter o el boton
export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

                               
    const handleInputChange = ( { target } ) => {

        setValues({
            ...values, 
            [ target.name ]: target.value 
        });
    }

    const reset = ( newFormState = initialState) => {
        setValues( newFormState );
    }

    return [ values, handleInputChange, reset ];

}