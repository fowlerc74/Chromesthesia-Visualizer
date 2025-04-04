import React, { useEffect, useState } from "react";
import getNowPlayingItem from "./SpotifyAPI";
import SpotifyLogo from "./SpotifyLogo";
import PlayingAnimation from "./PlayingAnimation";
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getColors } from '../../databaseAPI'
import './index.scss'

const SpotifyNowPlaying = (props) => {
    const [loading, setLoading] = useState(true);
    const [song, setSong] = useState({});

    const [colors, setColors] = useState([]);
    const [songId, setSongId] = useState('0d28khcov6AiegSCpG5TuT');
  
    useEffect(() => {
        
    }, [songId]);

    useEffect(() => {
        const spotifyTimeout = setTimeout(() => {
            Promise.all([
                getNowPlayingItem(
                    props.client_id,
                    props.client_secret,
                    props.refresh_token
                ),
            ]).then((results) => {
                setSong(results[0]);
                setLoading(false);
                setSongId(results[0].id);

                Promise.all([getColors(songId)])
                    .then((results) => {
                        setColors(results[0]);
                    }
                );
            }).catch(err => console.log(err));
        }, 5000);
    });

    return (
        <div className="player">
            <div className="status">
                <div className="logo">
                    <FontAwesomeIcon icon={faSpotify} color='#1ad861'/>
                </div>
                <p className="status-text">{song.isPlaying ? 'Now playing' : "Currently offline"}</p>
            </div>
            <div className="song-box"> 
                <img className="album-art"
                    alt={`${song.title} album art`}
                    src={song.albumImageUrl}
                />
                <div className="song-info">
                    <div className="top-line">
                        <PlayingAnimation isPlaying={song.isPlaying}/>
                        <a className="song-name" href={song.songUrl} target="_blank" rel="noopener noreferrer">{song.title}</a> {/* TODO fix this */}
                    </div>
                    <p className="artist-name">{song.artist}</p>
                </div>
            </div>
            <div className="swatch-box">
                { Array.isArray(colors) ? 
                    colors.map(color => (
                        <div className="swatch" style={{'background': color}} key={color}>{color}</div> //TODO fix key when duplicate colors
                    )) 
                    : ( <div>No Colors</div> )
                }
            </div>
            <div>
                <button>Save</button>
            </div>
        </div>
    )
};

export default SpotifyNowPlaying;
