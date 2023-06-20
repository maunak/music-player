import React, { useState, useRef } from "react";
import styled from "styled-components";
import Player from "./components/Player";
import Song from "./components/Song";
import s from "./style/App.module.css";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data_music from "./util";
import "./style/app.scss";

function App() {
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data_music());
  const [currentSong, setCurrentSong] = useState(songs[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [isMute, setMute] = useState(false);
  const [likeActive, setLikeActive] = useState(false);
  const [like, setLike] = useState(0);
  const timeUpdateHandler = (e) => {
    //i want to update this every time every sec thats passing, this runs every time our sng plays

    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate %,

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log(animation);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />

      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        isMute={isMute}
        setMute={setMute}
        like={like}
        likeActive={likeActive}
        setLike={setLike}
        setLikeActive={setLikeActive}
      />

      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
        muted={isMute}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
