var Board = require('./board');
var Game = require('./game');
var StringRenderer = require('./string_renderer');

function App(game, config, controller1, controller2) {
	var board = new Board(config.width, config.height);

	this.game = new Game(game, board, controller1, controller2);		

	this.renderer = new StringRenderer();
}

App.prototype.renderBoard = function() {
	return this.renderer.render(this.game);
};

App.prototype.tick = function() {
	var result = this.game.tick();
};

module.exports = App;
