import React from 'react';
import { Outlet, Link } from 'react-router-dom'

const Brew = ({ playlistId, name, color }) => {
  return (
    <Link to={`/brews/${name}`} state={{ playlistId: playlistId, name: name, color: color }}>
    <div style={{...styles.brew, backgroundColor: color}}>
      <h1 style={styles.brewTitle}>{name}</h1>
    </div>
    </Link>
  )
}

const styles = {
  brew: {
    borderStyle: 'solid',
    borderWidth: '1px',
    width: '144px',
    height: '144px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px',
  },
  brewTitle: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 400,
    margin: '16px',
    textAlign: 'center',
  },
}

export default Brew
