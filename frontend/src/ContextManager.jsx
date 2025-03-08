import { createContext, useContext, useReducer } from "react"

const intialState = {
    isUserLoggedIn: false,
    user: {},
    songList: []
}

const StateContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                ...state,
                isUserLoggedIn: true,
                user: action.user
            }
        case 'LOGGED_OUT':
            return {
                ...state,
                isUserLoggedIn: false,
                user: null
            }
        case 'ADD_SONG':
            return {
                ...state,
                songList: action.songs
            }
        default:
            return state
    }
}

export function ContextProvider(props) {
    return (
        <StateContext.Provider value={useReducer(reducer, intialState)}>
            { props.children }
        </StateContext.Provider>
    )
}

export function useStateValue() {
    return useContext(StateContext)
}