import React from 'react';
import client from '@urturn/client';
import PropTypes from 'prop-types';
import {
  Button, List, ListItem,
  ListItemText, Paper, Stack, Typography,
} from '@mui/material';

function HomeScreen({ players }) {
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
      <Typography
        sx={{
          fontSize: '2em',
          fontFamily: 'Bungee',
        }}
      >
        SONG GUESSER
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => client.makeMove({ type: 'start_game' })}
      >
        START
      </Button>
      {players.length > 1 && (
      <Paper>
        <Stack padding={1} sx={{ minWidth: '100px' }}>
          <Typography color="text.primary">Players</Typography>
          <List dense disablePadding padding={0}>
            {players.map((player, ind) => (
              <ListItem dense disablePadding key={player.id}>
                <ListItemText primary={`${ind + 1}: ${player.username}`} />
              </ListItem>
            ))}
          </List>
        </Stack>
      </Paper>
      )}
    </Stack>
  );
}

HomeScreen.propTypes = {
  players: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.string,
    username: PropTypes.string,
  })).isRequired,
};

export default HomeScreen;
