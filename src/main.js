// tip: docs @ https://docs.urturn.app/docs/API/backend#functions

const MoveTypes = Object.freeze({
  StartGame: 'start_game',
  Guess: 'guess'
})

function onRoomStart(roomState) {
  const { logger } = roomState;
  return {
    state: {
      rounds: []
    }
  }
}

function onPlayerJoin(player, roomState) {
  const { logger } = roomState
  logger.info('Join called with:', { player, roomState })
  logger.warn('TODO: implement how to change the roomState when a player joins')
  return {}
}

function onPlayerQuit(player, roomState) {
  const { logger } = roomState
  logger.info('Quit called with:', { player, roomState })
  logger.warn('TODO: implement how to change the roomState when a player quits the room')
  return {}
}

const NewRound = {
  song: "dont_stop_believing_clip",
  player_points: {},
}

function onPlayerMove(player, move, roomState) {
  const { logger, state } = roomState
  const { type, data } = move;
  const { rounds } = state;

  const current_round = rounds.length - 1;

  switch (type) {
    case MoveTypes.StartGame:
      rounds.push(NewRound);
      return { joinable: false, state: state }
    case MoveTypes.Guess:
      logger.info("DATA: ", data)
      if (data === "a b c") {
        rounds[current_round][player.id] = 100;
      } else {

      }
    default:
      return {}
  }

}

// Export these functions so UrTurn runner can run these functions whenever the associated event
// is triggered. Follow an example flow of events: https://docs.urturn.app/docs/Introduction/Flow-Of-Simple-Game
export default {
  onRoomStart,
  onPlayerJoin,
  onPlayerQuit,
  onPlayerMove,
};
