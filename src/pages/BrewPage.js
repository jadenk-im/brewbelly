import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Player } from '../components'

const BrewPage = () => {
  const location = useLocation()
  const { playlistId, name, color } = location.state

  return (
    <div style={styles.wrapper}>
      <Link to="/brews" style={styles.back}>Back</Link>
      <Player playlistId={playlistId} name={name} color={color} />
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
  back: {
    position: 'fixed',
    top: '32px',
    left: '32px',
  },
}

export default BrewPage
