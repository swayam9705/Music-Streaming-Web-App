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

	
	useEffect(() => {

		async function getCollection() {
			const querySnapshot = await getDocs(collection(db, "songs"))
			const fetchedSongs = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}))
			setSongs(fetchedSongs)
		}

		getCollection()
	}, [])

	useEffect(() => {
		if (songs.length > 0) {
			dispatch({
				type: "ADD_SONGS",
				songs: songs
			})
		}
	}, [songs, dispatch])
	
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
