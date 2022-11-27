'use strict';

// tip: docs @ https://docs.urturn.app/docs/API/backend#functions

const MoveTypes = Object.freeze({
  StartGame: 'start_game',
  Guess: 'guess',
  NewRound: 'new_round'
});

const Answer = Object.freeze({
  dont_stop_believing_clip: 'lonely world she',
  Stitches: 'no ones ever',
  Firework: 'ignite the light',
  MrBrightside: 'off her dress'
})

function onRoomStart(roomState) {
  return {
    state: {
      rounds: [],
      songs: ["dont_stop_believing_clip", "Stitches", "Firework", "MrBrightside"],
      currentSongIndex: 0,
      totalPoints: {},
    }
  }
}

function onPlayerJoin(player, roomState) {
  const { logger } = roomState;
  logger.info('Join called with:', { player, roomState });
  logger.warn('TODO: implement how to change the roomState when a player joins');
  return {}
}

function onPlayerQuit(player, roomState) {
  const { logger } = roomState;
  logger.info('Quit called with:', { player, roomState });
  logger.warn('TODO: implement how to change the roomState when a player quits the room');
  return {}
}

function getNewRound(songs, currentSongIndex) {
  return {
  song: songs[currentSongIndex], //change to state.songs[state.currentSongIndex]
  playerPoints: {},
  }
}

function onPlayerMove(player, move, roomState) {
  const { logger, state } = roomState;
  const { type, data } = move;
  const { rounds, totalPoints, songs, currentSongIndex } = state;

  const currentRound = rounds.length - 1;

  switch (type) {
    case MoveTypes.StartGame:
      //shuffle songs
      state.songs = songs.sort((a, b) => 0.5 - Math.random());
      rounds.push(getNewRound(songs, currentSongIndex));
      totalPoints[player.id] = 0;
      return { joinable: false, state: state }
    case MoveTypes.Guess:
      if (data === Answer[songs[currentSongIndex]]) {
        rounds[currentRound].playerPoints[player.id] = 100;
        totalPoints[player.id] = Object.keys(rounds).reduce((prev, curr) => {
          Object.keys(curr).map(key => prev[key] += curr[key]);
        }, {});
        return { state: state }
      }
      break;
    case MoveTypes.NewRound:
      state.currentSongIndex += 1;
      rounds.push(getNewRound(songs, currentSongIndex));
      return { state: state }
    default:
      return {}
  }

}

// Export these functions so UrTurn runner can run these functions whenever the associated event
// is triggered. Follow an example flow of events: https://docs.urturn.app/docs/Introduction/Flow-Of-Simple-Game
var main = {
  onRoomStart,
  onPlayerJoin,
  onPlayerQuit,
  onPlayerMove,
};

module.exports = main;
