import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import client from '@urturn/client';

function PlayerResults({
  username, totalPoints, roundPoints, firstPlace, finished,
}) {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
    >
      <Box
        sx={{
          backgroundColor: firstPlace ? 'white' : 'none',
          color: firstPlace ? 'black' : 'gray',
          border: firstPlace ? 'none' : '1px solid gray',
          padding: 2,
          width: '60vw',
          fontSize: '2em',
          borderRadius: '5px',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{username}</Typography>
          <Typography variant="h5">{totalPoints}</Typography>
        </Stack>
      </Box>
      <Box>
        {!finished && (
        <Typography variant="h5" color={roundPoints === 0 ? 'red' : 'green'}>
          +
          {roundPoints}
        </Typography>
        )}
      </Box>
    </Stack>
  );
}

function PostRoundScreen({
  totalPoints, playerPoints, finished, players, guesses,
}) {
  const waitingForPlayers = Object.keys(playerPoints).length !== players.length;
  const list = finished ? totalPoints : playerPoints;
  return (
    <Stack
      tabIndex="0"
      spacing={2}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {(Object.keys(list)
        .sort((a, b) => list[a] - list[b]).reverse()).map((playerID, idx) => (
          <PlayerResults
            username={players.find((player) => player.id === playerID)?.username || ''}
            roundPoints={playerPoints[playerID]}
            totalPoints={totalPoints[playerID]}
            firstPlace={idx === 0}
            finished={finished}
          />
      ))}
      {!finished && (
      <Button
        variant="contained"
        size="large"
        onClick={() => client.makeMove({ type: 'new_round' })}
        autoFocus
        disabled={waitingForPlayers}
        disableRipple
      >
        {waitingForPlayers ? 'WAITING FOR PLAYERS...' : 'NEXT ROUND'}
      </Button>
      )}
      <OtherPlayerViews guesses={guesses} />
    </Stack>
  );
}

function OtherPlayerViews({ guesses }) {
  const lastGuess = guesses[guesses.length - 1];
  return lastGuess && (
    <Typography color="white">
      {lastGuess.user}
      :
      {' '}
      {lastGuess.guess}
    </Typography>
  );
}

PostRoundScreen.propTypes = {
  players: PropTypes.arrayOf(PropTypes.objectOf({
    username: PropTypes.string,
  })).isRequired,
  guesses: PropTypes.arrayOf(PropTypes.objectOf({
    user: PropTypes.string,
    guess: PropTypes.string,
  })).isRequired,
  finished: PropTypes.bool.isRequired,
  totalPoints: PropTypes.objectOf(PropTypes.number).isRequired,
  playerPoints: PropTypes.objectOf(PropTypes.number).isRequired,
};

PlayerResults.propTypes = {
  username: PropTypes.string.isRequired,
  totalPoints: PropTypes.number.isRequired,
  roundPoints: PropTypes.number.isRequired,
  firstPlace: PropTypes.bool,
  finished: PropTypes.bool.isRequired,
};

PlayerResults.defaultProps = {
  firstPlace: false,
};

OtherPlayerViews.propTypes = {
  guesses: PropTypes.arrayOf(PropTypes.objectOf({
    user: PropTypes.string,
    guess: PropTypes.string,
  })).isRequired,
};

export default PostRoundScreen;
