import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import client from '@urturn/client';

function PlayerResults({
  username, totalPoints, roundPoints, firstPlace,
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
        <Typography variant="h5" color={roundPoints === 0 ? 'red' : 'green'}>
          +
          {roundPoints}
        </Typography>
      </Box>
    </Stack>
  );
}

function PostRoundScreen({
  totalPoints, playerPoints, finished, players,
}) {
  const waitingForPlayers = Object.keys(playerPoints).length !== players.length;
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
      {Object.keys(playerPoints).map((playerID, idx) => (
        <PlayerResults
          username={players.find((player) => player.id === playerID)?.username || ''}
          roundPoints={playerPoints[playerID]}
          totalPoints={totalPoints[playerID]}
          firstPlace={idx === 0}
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
    </Stack>
  );
}

PostRoundScreen.propTypes = {
  players: PropTypes.arrayOf(PropTypes.objectOf({
    username: PropTypes.string,
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
};

PlayerResults.defaultProps = {
  firstPlace: false,
};

export default PostRoundScreen;
