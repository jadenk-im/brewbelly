import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, BrewPage, BrewsPage } from './pages'
import firebase from './firebase'

const App = () => {
  const [brews, setBrews] = useState([])
  const [latestPlaylistId, setLatestPlaylistId] = useState('')
  const [latestName, setLatestName] = useState('')
  const [latestColor, setLatestColor] = useState('#ffffff')
  const [loading, setLoading] = useState(false)

  const db = firebase.firestore()
  const brewsRef = db.collection("brews")

  const getBrews = () => {
    setLoading(true)

    let newBrews = [];

    brewsRef.get().then((querySnapshot) => {
      // Sort the documents by date in descending order
      const sortedDocs = querySnapshot.docs.sort((a, b) => {
        return b.data().date - a.data().date;
      })

      sortedDocs.forEach(doc => {
        const playlistId = doc.data().playlistId
        const name = doc.data().name
        const color = doc.data().color
        const brew = {
          playlistId: playlistId,
          name: name,
          color: color,
        }

        newBrews.push(brew)
      })

      setBrews(newBrews)

      // Get the data from the latest document
      const latestBrew = sortedDocs[0].data()

      // Use the latestPlaylist data as needed
      setLatestPlaylistId(latestBrew.playlistId)
      setLatestName(latestBrew.name)
      setLatestColor(latestBrew.color)
    })
    setLoading(false)
  }

  useEffect(() => {
    getBrews()
  })

  if (loading) <h1>Loading...</h1>

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage playlistId={latestPlaylistId} name={latestName} color={latestColor} />} />
        <Route path='brews' element={<BrewsPage brews={brews} />} />
        <Route path='brews/:name' element={<BrewPage />} />
      </Routes>
    </Router>
  )
}

export default App
