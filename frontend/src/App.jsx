import { useEffect, useState } from 'react'

// componants
import Navbar from './Navbar/Navbar'
import Sidebar from "./Sidebar/Sidebar"
import Hero from './Hero/Hero'
import MusicPlayer from './MusicPlayer/MusicPlayer'

// style
import "./App.css"

// context
import { useStateValue } from './ContextManager'

function App() {

	const [ state, _] = useStateValue()

	return (
		<>
			<div className='App'>
				<Navbar />
				<Sidebar />
				<Hero />
				{
					state.currentSong && 
					<MusicPlayer />
				}
			</div>
		</>
	)
}

export default App
