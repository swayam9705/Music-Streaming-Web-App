import { useEffect, useState } from 'react'
import { Routes, Route} from 'react-router-dom'

// componants
import Navbar from './Navbar/Navbar'
import Sidebar from "./Sidebar/Sidebar"
import Hero from './Hero/Hero'
import MusicPlayer from './MusicPlayer/MusicPlayer'
import SignUp from './SignUp/SignUp'

// style
import "./App.css"

// context
import { useStateValue } from './ContextManager'

function App() {

	const [ state, _] = useStateValue()

	const content = (
		state.isUserLoggedIn ?
		<div className='App'>
				<Navbar />
				<Sidebar />
				<Hero />
		</div>
		:
		<SignUp />
	)

	return (
		<Routes>
			<Route path='*' element={content} />
		</Routes>
	)
}

export default App
