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
					link="https://aac.saavncdn.com/632/2c5537d265bb8d9e4722e26e422aa505_160.mp4"
					img="https://picsum.photos/536/354"
					artist="Adele"
					title="Skyfall"
				/>
			</div>
		</>
	)
}

export default App
