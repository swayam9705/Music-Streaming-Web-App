import { createContext, useContext, useReducer } from "react"

const intialState = {
    searchedSong: null,
    currentSong: null,
    loading: false,
    isUserLoggedIn: false,
    user: null
}

const StateContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_SONG':
            return {
                ...state,
                currentSong: action.currentSong
            }
        case 'SET_SEARCHED_SONG':
            return {
                ...state,
                searchedSong: action.searchedSong
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'UNSET_LOADING':
            return {
                ...state,
                loading: false
            }
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