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
      spacing={5}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >
      <Typography
        sx={{
          fontSize: '1.5em',
          color: 'white',
          fontFamily: 'Bungee',
          // position: 'relative',
          // bottom: '295px',
          // webkitTextStroke: '5px #666666',
          textShadow: '-5px 9px 7px #464646',
        }}
      >
        welcome to song guessing!
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => client.makeMove({ type: 'start_game' })}
        sx={{
          height: '150px',
          width: '450px',
          // position: 'relative',
          // bottom: '230px',
          backgroundColor: '#124E86',
          fontFamily: 'Bungee',
          fontSize: '1.2em',
        }}
      >
        START
      </Button>
      <Paper sx={{
        height: '500px',
        width: '340px',
        padding: '50px',
      }}
      >
        <Stack justifyContent="center" alignItems="center" sx={{ minWidth: '100px' }}>
          <Typography
            sx={{
              fontFamily: 'Bungee',
              fontSize: '1.35em',
            }}
            color="text.primary"
          >
            Players

          </Typography>
          <List dense disablePadding padding={0}>
            {players.map((player, ind) => (
              <ListItem dense disablePadding key={player.id}>
                <ListItemText primary={`${ind + 1}: ${player.username}`} />
              </ListItem>
            ))}
          </List>
        </Stack>
      </Paper>

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
