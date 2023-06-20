import React from "react";
import styled from "styled-components";
import s from "../style/App.module.css";
// import { playAudio } from "../util2";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const SelectedSong = async () => {
    await setCurrentSong(song);
    console.log(song);
    audioRef.current.play();

    //add active state; the thing that i clicked on that id is equal to the one from the state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        //modify the active state to false rest of the songs active false
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      audioRef.current.play();
    }

    //playAudio(isPlaying, audioRef);
  };
  return (
    <div
      onClick={SelectedSong}
      className={`library-song  ${song.active ? "selected" : ""}`}
    >
      <IMG src={song.cover_img} alt={song.name} />
      <SongDescription>
        <H3>{song.name}</H3>
        <H4>{song.artist}</H4>
      </SongDescription>
    </div>
  );
};

const IMG = styled.img`
  width: 40%;
`;

const H3 = styled.h3`
  font-size: 1rem;
`;
const H4 = styled.h4`
  font-size: 0.8rem;
`;

const SongDescription = styled.div`
  padding-left: 1rem;
`;
export default LibrarySong;
