import { useState } from 'react'

// componants
import Navbar from './Navbar/Navbar'
import Sidebar from "./Sidebar/Sidebar"
import Hero from './Hero/Hero'
import MusicPlayer from './MusicPlayer/MusicPlayer'

// style
import "./App.css"

function App() {
	return (
		<>
			<div className='App'>
				<Navbar />
				<Sidebar />
				<Hero />
				<MusicPlayer
					link="https://aac.saavncdn.com/304/f31ba5ffe986d0feb95b3059ad05f4d5_320.mp4"
					img="https://picsum.photos/536/354"
					artist="Adele"
					title="Skyfall"
				/>
			</div>
		</>
	)
}

export default App
