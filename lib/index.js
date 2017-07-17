const config = {
  width: 100,
  height: 50,
  speed: 100
};

const screen = blessed.screen({
  debug: true
});

function keyboardController() {
  var controller = {
    nextMove: "",
    getNextMove: function() {
      var move = this.nextMove;
      this.nextMove = "";
      return move;
    }
  };

  screen.key(['a'], function(ch, key) {
      controller.nextMove = "left";
  });

  screen.key(['s'], function(ch, key) {
    controller.nextMove = "right";
  });

  return controller;
}

let controller = keyboardController()
controller.name = username
  
const app = new App(game, config, controller)

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

var ticker = new Ticker(config.speed, onTick)
if (!program.pause) {
  ticker.start()
}

screen.key(['space'], function(ch, key) {
  if (!ticker.running) {
    onTick()
  }
})

screen.key(['p'], function(ch, key) {
  ticker.toggle()
})

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  game.exit(1)
})

screen.render();

const game = {
  exit: (code) => {
    console.info('Exited with', code)
    process.exit(code)
  },
  finish: (score) => {
    console.info(`finnian scored ${score}`)
    // process.exit(1)
  }
} // this is the game instance