// tip: docs @ https://docs.urturn.app/docs/API/backend#functions

const MoveTypes = Object.freeze({
  StartGame: 'start_game'
})

function onRoomStart(roomState) {
  const { logger } = roomState;
  logger.info('Start called')
  logger.warn('TODO: implement what the state of the room looks like initially')
  return {}
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

function onPlayerMove(player, move, roomState) {
  const { logger } = roomState
  const { type } = move;

  switch (type) {
    case MoveTypes.StartGame:
      return { joinable: false}
  }

  return {}
}

// Export these functions so UrTurn runner can run these functions whenever the associated event
// is triggered. Follow an example flow of events: https://docs.urturn.app/docs/Introduction/Flow-Of-Simple-Game
export default {
  onRoomStart,
  onPlayerJoin,
  onPlayerQuit,
  onPlayerMove,
};
