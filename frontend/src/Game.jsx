import React, { useState, useEffect } from 'react';
import client from '@urturn/client';
// import styles from './Game.module.css';
// import GuessScreen from './GuessScreen';
import PostRoundScreen from './PostRoundScreen';
import GuessScreen from './GuessScreen';
import HomeScreen from './HomeScreen';

function Game() {
  const [roomState, setRoomState] = useState(client.getRoomState() || {});
  console.log('roomState:', roomState);

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

  // eslint-disable-next-line no-unused-vars
  const [curPlr, setCurPlr] = useState();

  const {
    joinable,
  } = roomState;

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
        : <GuessScreen /> }
      <PostRoundScreen />
    </div>
  );
}

export default Game;
