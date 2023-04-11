import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Player = ({ playlistId, name, color }) => {
  const [playlist, setPlaylist] = useState([])
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const YOUTUBE_API_KEY = 'AIzaSyB7fFZ0tKyzlfUa1EJkO4iMhVqnmfFMzYE'

  useEffect(() => {
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=PLGL1RS_tj0UH6RRpimrDTXc9tP8FIx8LQ&key=${YOUTUBE_API_KEY}`)
      .then(res => {
        const tracks = res.data.items.map(item => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          artist: item.snippet.videoOwnerChannelTitle
        }))
        setPlaylist(tracks)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const audio = document.getElementById('audio')
    if (audio) isPlaying ? audio.play() : audio.pause()
  }, [isPlaying])

  useEffect(() => {
    const audio = document.getElementById('audio')
    if (audio) audio.currentTime = trackProgress
  }, [trackProgress])

  const createTimeInfo = () => {
    const audio = document.getElementById('audio')
    if (audio) {
      return `${formatTime(trackProgress)} / ${formatTime(audio.duration)}`
    }
  }

  const handleLoad = () => {
    const audio = document.getElementById('audio')
    setDuration(audio.duration)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevTrack = () => {
    setCurrentTrack(currentTrack === 0 ? playlist.length - 1 : currentTrack - 1)
    setTrackProgress(0)
    setIsPlaying(false)
  }

  const handleNextTrack = () => {
    setCurrentTrack(currentTrack === playlist.length - 1 ? 0 : currentTrack + 1)
    setTrackProgress(0)
    setIsPlaying(false)
  }

  const handleScrub = (e) => {
    const scrubTime = e.target.value
    setTrackProgress(scrubTime)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  const currentTrackData = playlist[currentTrack]

  return (
    <div style={{...styles.container, backgroundColor: color}}>
      <div style={styles.header}>
        <h1 style={styles.title}>BREWBELLY.FM</h1>
        <h2 style={styles.subtitle}>{name}</h2>
      </div>
      {currentTrackData && (
      <div style={styles.player}>
          <div style={styles.songInfo}>
            <h2 style={styles.songTitle}>{currentTrackData.title}</h2>
            <h3 style={styles.songArtist}>{currentTrackData.artist}</h3>
          </div>
        <audio
          id="audio"
          src={`https://www.youtube.com/watch?v=${currentTrackData.id}`}
          onEnded={handleNextTrack}
          onLoad={handleLoad}
        />
        <p style={styles.songCount}>{currentTrack + 1} / {playlist.length}</p>
        <div style={styles.controls}>
          <button onClick={handlePrevTrack} style={styles.fas} id="prev-btn">back</button>
          <button onClick={handlePlayPause} style={styles.fas} id="play-btn">{isPlaying ? 'pause' : 'play'}</button>
          <button onClick={handleNextTrack} style={styles.fas} id="next-btn">fwrd</button>
        </div>
        <div style={styles.timelineContainer}>
          <input
            type="range"
            className="progress-bar"
            value={trackProgress}
            max="100"
            onChange={handleScrub}
          />
          <div style={styles.timeInfo}>
            {duration === 0 ? 'Loading...' : createTimeInfo()}
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px',
  },
  title: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 400,
    margin: '0 0 16px',
  },
  subtitle: {
    fontSize: '24px',
    lineHeight: '29px',
    fontWeight: 400,
    margin: 0,
  },
  player: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songInfo: {
    margin: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songTitle: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 400,
    margin: 0,
  },
  songArtist: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 400,
    margin: 0,
  },
  songCount: {
    margin: '16px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    margin: '16px',
  },
  fas: {
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'monospace',
    fontSize: '16px',
    lineHeight: '19px',
    textTransform: 'uppercase',
    margin: '0 8px',
  },
  timelineContainer: {
    margin: '16px',
  },
  timeInfo: {
    textAlign: 'center',
  },
}

export default Player
