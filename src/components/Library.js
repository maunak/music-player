import React from "react";
import LibrarySong from "./LibrarySong";
import styled from "styled-components";
import s from "../style/App.module.css";

const Library = ({
  songs,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryStatus,
  setLibraryStatus,
  setSongs,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h1 style={{ padding: "1em" }}>Library</h1>
      <MyLibrarySongs>
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </MyLibrarySongs>
    </div>
  );
};

// const MyLibrary = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 20rem;
//   height: 100%;
//   background-color: white;
//   box-shadow: 2px 2px 50px rgb(204, 204, 204);
//   overflow: scroll;
//   transform: ${(libraryStatus) =>
//     libraryStatus ? "translateX(-100%)" : "translateX(0%)"};
//   transition: all 0.5s ease;
//   opacity: 0;
// `;

const MyLibrarySongs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 1rem 2rem 1rem 2rem; */
`;

export default Library;
