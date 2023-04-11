import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Player } from '../components'

const HomePage = ({ playlistId, name, color }) => {
  return (
    <div style={styles.wrapper}>
      <Player playlistId={playlistId} name={name} color={color} />
      <Link to="/brews" style={styles.previousBrews}>Previous brews</Link>
    </div>
  )
}

const styles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previousBrews: {
    margin: '32px 0 0',
  },
}

export default HomePage
