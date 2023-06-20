//its show the name artist and the picture
import React from "react";
import styled from "styled-components";
//basically updated this component to the current song peace of state.
const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover_img} alt={currentSong.name} />
      <H2>{currentSong.name}</H2>
      <H3>{currentSong.artist}</H3>
    </div>
  );
};

const H2 = styled.h2`
  padding: 2.5rem 1rem 1rem 1rem;
`;

const H3 = styled.h3`
  font-size: 1rem;
`;

export default Song;
