const blessed = require('blessed')
const App = require('./lib/app')
const Ticker = require('./lib/ticker.js')

module.exports = (Game) => {
  const screen = blessed.screen({
    smartCSR: true,
    input: Game.stream,
    output: Game.stream
  })

  const config = {
    width: 50,
    height: 20,
    speed: 100
  }

  function keyboardController() {
    let controller = {
      nextMove: "",
      getNextMove: function() {
        let move = this.nextMove
        this.nextMove = ""
        return move
      }
    }

    screen.key(['a'], function(ch, key) {
        controller.nextMove = "left"
    })

    screen.key(['s'], function(ch, key) {
      controller.nextMove = "right"
    })

    return controller
  }

  let controller = keyboardController()
  controller.name = Game.username

  const app = new App(Game, config, controller)

  // Create ui components
  let box = blessed.box({
    top: 2,
    left: 2,
    width: config.width,
    height: config.height + 2,
    content: app.renderBoard(),
    tags: true,
    style: {
      fg: config.fg,
      bg: config.bg
    }
  });
  screen.append(box)

  // finished creating ui components

  function onTick() {
    app.tick()
    box.setContent(app.renderBoard())
    screen.render()
  }

  let ticker = new Ticker(config.speed, onTick)

  screen.key(['space'], function(ch, key) {
    if (!ticker.running) {
      onTick()
    }
  })

  screen.key(['p'], function(ch, key) {
    ticker.toggle()
  })

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    ticker.stop()
    Game.exit(1)
  })

  screen.render()

  return ticker
}
