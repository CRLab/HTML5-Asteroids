define(['jquery', 'lib/volume-meter', 'lib/cursorlib'], function($, volume_meter, cursorlib) {
    $(function () {
        let canvas = $("#canvas");
        let grid_size = 60;

        // Initialize Cursor
        // Get list of obstacles on screen
        // Initialize keyboard listeners?
        // Initialize volume listeners?
        // Attach collision listeners

        // While(true) {
            //
        // }

        //TODO: Get colors of cursor correct
        //TODO: Get sounds from Switch Controller

        // let game = new cursorlib.Game();
        //
        // game.canvasWidth  = canvas.width();
        // game.canvasHeight = canvas.height();
        //
        // let context = canvas[0].getContext("2d");
        // let grid = new cursorlib.Grid(game, grid_size);
        //
        // let sprites = [];
        // game.sprites = sprites;
        //
        // // so all the sprites can use it
        // cursorlib.Sprite.prototype.context = context;
        // cursorlib.Sprite.prototype.grid    = grid;
        // cursorlib.Sprite.prototype.matrix  = new cursorlib.Matrix(2, 3);
        //
        // var ship = new Ship();
        //
        // ship.x = Game.canvasWidth / 2;
        // ship.y = Game.canvasHeight / 2;
        //
        // sprites.push(ship);
        //
        // Game.ship = ship;
        //
        // var i, j = 0;
        //
        // var frameCount = 0;
        // var elapsedCounter = 0;
        //
        // var lastFrame = Date.now();
        // var thisFrame;
        // var elapsed;
        // var delta;
        //
        // var canvasNode = canvas[0];
        //
        // // shim layer with setTimeout fallback
        // // from here:
        // // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // window.requestAnimFrame = (function () {
        //     return  window.requestAnimationFrame       ||
        //         window.webkitRequestAnimationFrame ||
        //         window.mozRequestAnimationFrame    ||
        //         window.oRequestAnimationFrame      ||
        //         window.msRequestAnimationFrame     ||
        //         function (/* function */ callback, /* DOMElement */ element) {
        //             window.setTimeout(callback, 1000 / 60);
        //         };
        // })();
        //
        // var mainLoop = function () {
        //     context.clearRect(0, 0, Game.canvasWidth, Game.canvasHeight);
        //
        //     Game.FSM.execute();
        //
        //     if (KEY_STATUS.g) {
        //         context.beginPath();
        //         for (var i = 0; i < gridWidth; i++) {
        //             context.moveTo(i * GRID_SIZE, 0);
        //             context.lineTo(i * GRID_SIZE, Game.canvasHeight);
        //         }
        //         for (var j = 0; j < gridHeight; j++) {
        //             context.moveTo(0, j * GRID_SIZE);
        //             context.lineTo(Game.canvasWidth, j * GRID_SIZE);
        //         }
        //         context.closePath();
        //         context.stroke();
        //     }
        //
        //     thisFrame = Date.now();
        //     elapsed = thisFrame - lastFrame;
        //     lastFrame = thisFrame;
        //     delta = elapsed / 30;
        //
        //     for (i = 0; i < sprites.length; i++) {
        //
        //         sprites[i].run(delta);
        //
        //         if (sprites[i].reap) {
        //             sprites[i].reap = false;
        //             sprites.splice(i, 1);
        //             i--;
        //         }
        //     }
        //
        //     frameCount++;
        //     elapsedCounter += elapsed;
        //     if (elapsedCounter > 1000) {
        //         elapsedCounter -= 1000;
        //         avgFramerate = frameCount;
        //         frameCount = 0;
        //     }
        //
        //     requestAnimFrame(mainLoop, canvasNode);
        // };
        //
        // mainLoop();
    });
});