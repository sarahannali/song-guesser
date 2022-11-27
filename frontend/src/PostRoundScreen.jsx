import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function PlayerResults({ firstPlace }) {
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
          <Typography variant="h5">USERNAME</Typography>
          <Typography variant="h5">108</Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          color: 'green',
        }}
      >
        <Typography variant="h5">+108</Typography>
      </Box>
    </Stack>
  );
}

function PostRoundScreen() {
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
      <PlayerResults firstPlace />
      <PlayerResults />
      <PlayerResults />
    </Stack>
  );
}

PlayerResults.propTypes = {
  firstPlace: PropTypes.bool,
};

PlayerResults.defaultProps = {
  firstPlace: false,
};

export default PostRoundScreen;
