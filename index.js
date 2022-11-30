'use strict';

// tip: docs @ https://docs.urturn.app/docs/API/backend#functions

const MoveTypes = Object.freeze({
  StartGame: 'start_game',
  Guess: 'guess',
  NewRound: 'new_round',
  ForceEndRound: 'force_end_round'
});

const Answer = Object.freeze({
  DontStopBelieving: 'lonely world',
  Stitches: 'red',
  Firework: 'ignite the light',
  MrBrightside: 'off her dress',
  YouBelongWithMe: 'bleachers',
  Baby: 'together',
  HeyJude: 'sad song',
  CarelessWhisper: "rhythm",
  IWillAlwaysLoveYou: "with me",
  Yeah: "come and get me"
});

const ROUND_LENGTH = 20000;

function onRoomStart(roomState) {
  return {
    state: {
      rounds: [],
      songs: ["DontStopBelieving", "Stitches", "Firework", "MrBrightside", "YouBelongWithMe", "Baby"],
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

function getNewRound(songs, currentSongIndex) { //also return answer length
  return {
  song: songs[currentSongIndex], 
  playerPoints: {},
  guesses: [],
  answerLength: Answer[songs[currentSongIndex]].split(" ").length,
  startTime: Date.now()
  }
}

function onPlayerMove(player, move, roomState) {
  const { logger, state } = roomState;
  const { type, data } = move;
  const { rounds, songs, currentSongIndex } = state;

  const currentRound = rounds[rounds.length - 1];

  switch (type) {
    case MoveTypes.StartGame:
      //shuffle songs
      state.songs = songs.sort((a, b) => 0.5 - Math.random());
      rounds.push(getNewRound(songs, currentSongIndex));
      state.totalPoints[player.id] = 0;
      return { joinable: false, state: state }
    case MoveTypes.Guess:
      currentRound.guesses.push({
        user: player.username,
        guess: data
      });
      if (data.trim() === Answer[songs[currentSongIndex]]) {
        currentRound.playerPoints[player.id] = Math.floor(((currentRound.startTime + ROUND_LENGTH) - Date.now()) / 10);
        state.totalPoints = rounds.reduce((prev, round) => {
          Object.keys(round.playerPoints).map(plrID => {
            prev[plrID] != null ? prev[plrID] += round.playerPoints[plrID] : prev[plrID] = round.playerPoints[plrID];
          });
          return prev;
        }, {});
      }

      return { state: state }
    case MoveTypes.ForceEndRound:
      currentRound.playerPoints[player.id] = 0;
      return { state: state }
    case MoveTypes.NewRound:
      if(rounds.length < 2 && currentSongIndex !== songs.length-1){
      state.currentSongIndex += 1;
      rounds.push(getNewRound(songs, state.currentSongIndex));
      return { state: state }
      }else
        {
          return { finished: true }
        }
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
