import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import client from '@urturn/client';

function PlayerResults({ username, points, firstPlace }) {
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
          <Typography variant="h5">{points}</Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          color: 'green',
        }}
      >
        <Typography variant="h5">
          +
          {points}
        </Typography>
      </Box>
    </Stack>
  );
}

function PostRoundScreen({ playerPoints }) {
  console.log('2: ', playerPoints);
  return (
    <Stack
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
          username={playerID}
          points={playerPoints[playerID]}
          firstPlace={idx === 0}
        />
      ))}
      <Button
        variant="contained"
        size="large"
        onClick={() => client.makeMove({ type: 'new_round' })}
      >
        NEXT ROUND
      </Button>
    </Stack>
  );
}

PostRoundScreen.propTypes = {
  playerPoints: PropTypes.objectOf(PropTypes.number).isRequired,
};

PlayerResults.propTypes = {
  username: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  firstPlace: PropTypes.bool,
};

PlayerResults.defaultProps = {
  firstPlace: false,
};

export default PostRoundScreen;
