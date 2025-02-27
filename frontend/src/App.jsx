import { useEffect, useState } from 'react'

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

	return (
		<>
		{
			state.isUserLoggedIn ?
			<div className='App'>
				<Navbar />
				<Sidebar />
				<Hero />
				{
					state.currentSong && 
					<MusicPlayer />
				}
			</div>
			:
			<SignUp />
		}
		</>
	)
}

export default App
