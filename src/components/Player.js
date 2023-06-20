import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faVolumeXmark,
  faVolumeOff,
  faCirclePlay,
  faCirclePause,
  faBackward,
  faForward,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// controls for my mp//its show the name artist and the picture. In the play control ii will using icons
const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
  isMute,
  setMute,
  like,
  likeActive,
  setLikeActive,
  setLike,
}) => {
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
  }, [currentSong]);

  const playSomeSongHandler = () => {
    // if i need to select a specific html tag in my component i can use reference.
    console.log(audioRef);

    //if its playing then pause it. SWITCH MY STATE
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const timeFormat = (my_time) => {
    return (
      Math.floor(my_time / 60) +
      ":" +
      ("0" + Math.floor(my_time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    //update the audio down
    audioRef.current.currentTime = e.target.value;
    console.log(e.target.value);
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipMusicHandler = async (direction) => {
    //find where i am, i need to know what the next song gonna be and previous

    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }

    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        // start from 0 7 last one
        await setCurrentSong(songs[songs.length - 1]);
        //  playAudio(isPlaying, audioRef);
        if (isPlaying) {
          audioRef.current.play();
        }
        return;
      }
      //i want to back to the end
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }

    if (isPlaying) {
      audioRef.current.play();
    }

    console.log(`next index ${currentIndex + 1}`);
    console.log(`song length ${songs.length}`);
  };

  const MuteTheSong = () => {
    setMute(!isMute);
  };

  const LikeIt = () => {
    if (likeActive) {
      setLikeActive(false);
      setLike(like - 1);
    } else {
      setLikeActive(true);
      setLike(like + 1);
    }
  };
  //add styles

  const track_style = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <MyPlayer>
      <PlayControl>
        <FontAwesomeIcon
          className="skip-back"
          style={{ cursor: "pointer", color: "rgb(204, 204, 204)" }}
          size="2x"
          icon={faBackward}
          onClick={() => skipMusicHandler("skip-back")}
        />
        <FontAwesomeIcon
          onClick={playSomeSongHandler}
          className="PlayIcon"
          style={{ cursor: "pointer", color: "rgb(204, 204, 204)" }}
          size="3x"
          icon={isPlaying ? faCirclePause : faCirclePlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          style={{ cursor: "pointer", color: "rgb(204, 204, 204)" }}
          size="2x"
          icon={faForward}
          onClick={() => skipMusicHandler("skip-forward")}
        />

        <FontAwesomeIcon
          className="mute"
          style={{ cursor: "pointer", color: "rgb(204, 204, 204)" }}
          size="2x"
          icon={isMute ? faVolumeXmark : faVolumeOff}
          onClick={MuteTheSong}
        />

        <FontAwesomeIcon
          className={`likeActive  ${likeActive && "active-like"}`}
          style={{ cursor: "pointer", color: "" }}
          size="2x"
          icon={faHeart}
          onClick={LikeIt}
        />
      </PlayControl>

      <TimeControl>
        <Text>{timeFormat(songInfo.currentTime)}</Text>
        <div
          className="myTrack"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <MyInput
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            name=""
            id=""
            onChange={dragHandler}
          />
          <div className="animate-track" style={track_style}></div>
        </div>
        <SecondText>
          {songInfo.duration ? timeFormat(songInfo.duration) : "0:00"}
        </SecondText>
      </TimeControl>
    </MyPlayer>
  );
};

const MyPlayer = styled.div`
  min-height: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const TimeControl = styled.div`
  width: 50%;
  /* background: lightcoral; */
  display: flex;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const MyInput = styled.input`
  width: 100%;
  /* padding: 1rem 0rem; */
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
`;

const PlayControl = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    width: 60%;
  }
`;

const Text = styled.p`
  padding-right: 1rem;
  color: white;
`;
const SecondText = styled(Text)`
  padding-left: 1rem;
  color: white;
`;

const SVG = styled.svg`
  cursor: pointer;
`;

const SoundControl = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
  background-color: red;
`;
export default Player;
