import React, { useReducer } from "react";

// context will be used in useContext in the consumer
const initialState = {
    nomicAPIKey: process.env.REACT_APP_API_KEY,
    showCoinsList: false
}
export const Context = React.createContext(initialState);

// this will be wrapped by CustomProvider
const Provider = Context.Provider;

export default function CustomProvider(props) {
    const [store, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            // case "CHANGE_CURRENCY":
            //     return {...state, ...{currency:action.payload}};
            case "TOGGLE_COINS_LIST":
                return {...state, ...{showCoinsList: !state.showCoinsList}}
            default:
                return state
        }
    }, initialState)

    return (
        <Context.Provider value={{store, dispatch}}>
            {props.children}
        </Context.Provider>
    )
}