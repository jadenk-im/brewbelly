import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Brew, Player } from '../components'

const BrewsPage = ({ brews }) => {
  return (
    <div style={styles.wrapper}>
      <Link to="/" style={styles.back}>Back</Link>
      <div style={styles.brewContainer}>
        {brews.map((brew, index) => <Brew
          key={index + 1}
          playlistId={brew.playlistId}
          name={brew.name}
          color={brew.color}
          />)
        }
      </div>
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
  brewContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '1088px',
    margin: '16px',
  },
}

export default BrewsPage
