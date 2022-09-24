import { types } from "../types/types";

//EN ESTE ARCHIVO MANEJAREMOS TODAS LAS ACCIONES QUE RECIBIRÁ EL REDUCER uiReducer.js

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
});


export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
});

export const finishLoading = () => ({
    type: types.uiFinishLoading
});


