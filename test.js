const blessed = require('blessed')
const screen = blessed.screen()

let username = 'finnian'

class Game {
  constructor(screen, username) {
    this.screen = screen
    this.username = username
  }

  clearScreen () {
    snake.stop()
    this.screen.destroy()
  }

  exit (code) {
    this.clearScreen()
    console.log(`Exited with ${code}`)
    process.exit(code)
  }

  finish (score) {
    this.clearScreen()
    console.log(`${this.username} scored ${score}`)
    this.exit(1)
  }
}

const PlayGame = new Game(screen, username)

const snake = require('./index')(PlayGame, username)

snake.start()