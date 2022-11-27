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
  // eslint-disable-next-line no-unused-vars
  const [postRound, setPostRound] = useState(false);

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
    joinable = true,
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
        : <InGame postRound={postRound} /> }
    </div>
  );
}

function InGame({ postRound }) {
  return postRound ? <PostRoundScreen /> : <GuessScreen />;
}

InGame.propTypes = {
  postRound: PropTypes.bool.isRequired,
};

export default Game;
