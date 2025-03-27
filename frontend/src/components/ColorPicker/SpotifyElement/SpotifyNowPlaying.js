import React, { useEffect, useState } from "react";
import getNowPlayingItem from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";
import PlayingAnimation from "./PlayingAnimation";
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const SpotifyNowPlaying = (props) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});

  useEffect(() => {
    // const spotifyTimeout = setTimeout(() => {
        Promise.all([
            getNowPlayingItem(
              props.client_id,
              props.client_secret,
              props.refresh_token
            ),
          ]).then((results) => {
            setResult(results[0]);
            setLoading(false);
          });
    // }, 3000);
  });

  return (
    <div className="player">
        <div className="status">
            <div className="logo">
                <FontAwesomeIcon icon={faSpotify} color='#1ad861'/>
            </div>
            <p className="status-text">{result.isPlaying ? 'Now playing' : "Currently offline"}</p>
        </div>
        <div className="song-box"> 
            <img className="album-art"
                alt={`${result.title} album art`}
                src={result.albumImageUrl}
            />
            <div className="song-info">
                <div className="top-line">
                    <PlayingAnimation isPlaying={result.isPlaying}/>
                    <a className="song-name" href={result.songUrl} target="_blank" rel="noopener noreferrer">{result.title}</a> {/* TODO fix this */}
                </div>
                <p className="artist-name">{result.artist}</p>
            </div>
        </div>
        <div className="swatch-box">
            {props.colors.map(color => (
                <div className="swatch" style={{'background': color}} key={color}>{color}</div> //TODO fix key when duplicate colors
            ))}
        </div>
    </div>
  )
};

export default SpotifyNowPlaying;
