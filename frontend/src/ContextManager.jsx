import { createContext, useContext, useReducer } from "react"

const initialState = {
    isUserLoggedIn: true,
    user: {
        displayName: "Swayam Bhoir"
    },
    songList: [],
    currentSong: null,
    recents: []
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
        case 'ADD_SONGS':
            return {
                ...state,
                songList: action.songs
            }
        case 'SET_CURRENT_SONG':
            return {
                ...state,
                currentSong: action.currentSong
            }
        case 'ADD_RECENT':
            let list = state.recents
            if (list.length == 5) {
                list.pop()
            }
            list.unshift(action.song)
            return {
                ...state,
                recents: list
                
            }
        default:
            return state
    }
}

export function ContextProvider(props) {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            { props.children }
        </StateContext.Provider>
    )
}

export function useStateValue() {
    return useContext(StateContext)
}