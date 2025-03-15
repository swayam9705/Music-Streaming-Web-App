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

import { collection, getDocs } from 'firebase/firestore'
import { db } from './config/firebase_config'

function App() {

	const [ state, dispatch] = useStateValue()
	const [ songs, setSongs ] = useState([])
	
	// const getCollection = async() => {
	// 	const querySnapshot = await getDocs(collection(db, "songs"))
	// 	querySnapshot.forEach((doc) => {
	// 		setSongs(song => [...song, {id: doc.id, ...doc.data()}])
	// 	})
	// }

	// useEffect(() => {
	// 	getCollection()
	// 	dispatch({
	// 		type: "ADD_SONG",
	// 		songs: songs
	// 	})
	// }, [])

	const content = (
		state.isUserLoggedIn ?
		<div className='App'>
				<Navbar />
				<Sidebar />
				<Hero />
				<Routes>
					<Route path="/song/:id" element={<MusicPlayer />} />
				</Routes>
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
