/* eslint-disable no-empty-pattern */
import React, { useState, useEffect } from 'react';
import client from '@urturn/client';
// import styles from './Game.module.css';
// import GuessScreen from './GuessScreen';
import PropTypes from 'prop-types';
import PostRoundScreen from './PostRoundScreen';
import GuessScreen from './GuessScreen';
import HomeScreen from './HomeScreen';

function Game() {
  const [roomState, setRoomState] = useState(client.getRoomState() || {});

  // setup event listener for updating roomState when client fires
  useEffect(() => {
    const onStateChanged = (newBoardGame) => {
      setRoomState(newBoardGame);
    };
    client.events.on('stateChanged', onStateChanged);
    return () => {
      client.events.off('stateChanged', onStateChanged);
    };
  }, []);

  const [curPlr, setCurPlr] = useState();

  const {
    joinable = true,
    state = {},
    finished = false,
    players = [],
  } = roomState;
  const {
    rounds = [],
    songs = [],
    currentSongIndex = 0,
    totalPoints = {},
  } = state;

  const currentRound = rounds.length - 1;

  // load current player, which is initially null
  useEffect(() => {
    const setupCurPlr = async () => {
      const newCurPlr = await client.getLocalPlayer();
      setCurPlr(newCurPlr);
    };
    setupCurPlr();
  }, []);

  return (
    <div>
      {joinable
        ? <HomeScreen />
        : (
          <InGame
            finished={finished}
            totalPoints={totalPoints}
            playerPoints={rounds[currentRound]?.playerPoints || {}}
            playerID={curPlr.id}
            song={songs.length > 0 ? songs[currentSongIndex] : ''}
            answerLength={rounds[currentRound]?.answerLength || 0}
            players={players}
          />
        ) }
    </div>
  );
}

function InGame({
  finished, totalPoints, playerPoints, playerID, song, answerLength, players,
}) {
  return finished || (playerPoints && playerPoints[playerID])
    ? (
      <PostRoundScreen
        finished={finished}
        totalPoints={totalPoints}
        playerPoints={playerPoints}
        players={players}
      />
    )
    : <GuessScreen song={song} answerLength={answerLength} />;
}

InGame.propTypes = {
  players: PropTypes.arrayOf(PropTypes.objectOf({
    username: PropTypes.string,
  })).isRequired,
  answerLength: PropTypes.number.isRequired,
  finished: PropTypes.bool.isRequired,
  totalPoints: PropTypes.objectOf(PropTypes.number).isRequired,
  playerPoints: PropTypes.objectOf(PropTypes.number).isRequired,
  playerID: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
};

export default Game;
