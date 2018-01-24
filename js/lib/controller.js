define(['jquery', 'lib/volume-meter', 'lib/cursorlib'], function($, volume_meter, cursorlib) {
    $(function () {
        let canvas = $("#canvas");
        let grid_size = 60;

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
        // ship.bullets = [];
        // for (var i = 0; i < 10; i++) {
        //     var bull = new Bullet();
        //     ship.bullets.push(bull);
        //     sprites.push(bull);
        // }
        // Game.ship = ship;
        //
        // var bigAlien = new BigAlien();
        // bigAlien.setup();
        // sprites.push(bigAlien);
        // Game.bigAlien = bigAlien;
        //
        // var extraDude = new Ship();
        // extraDude.scale = 0.6;
        // extraDude.visible = true;
        // extraDude.preMove = null;
        // extraDude.children = [];
        //
        // var i, j = 0;
        //
        // var paused = false;
        // var showFramerate = false;
        // var avgFramerate = 0;
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
        //     // score
        //     var score_text = ''+Game.score;
        //     Text.renderText(score_text, 18, Game.canvasWidth - 14 * score_text.length, 20);
        //
        //     // extra dudes
        //     for (i = 0; i < Game.lives; i++) {
        //         context.save();
        //         extraDude.x = Game.canvasWidth - (8 * (i + 1));
        //         extraDude.y = 32;
        //         extraDude.configureTransform();
        //         extraDude.draw();
        //         context.restore();
        //     }
        //
        //     if (showFramerate) {
        //         Text.renderText(''+avgFramerate, 24, Game.canvasWidth - 38, Game.canvasHeight - 2);
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
        //     if (paused) {
        //         Text.renderText('PAUSED', 72, Game.canvasWidth/2 - 160, 120);
        //     } else {
        //         requestAnimFrame(mainLoop, canvasNode);
        //     }
        // };
        //
        // mainLoop();
        //
        // $(window).keydown(function (e) {
        //     switch (KEY_CODES[e.keyCode]) {
        //         case 'f': // show framerate
        //             showFramerate = !showFramerate;
        //             break;
        //         case 'p': // pause
        //             paused = !paused;
        //             if (!paused) {
        //                 // start up again
        //                 lastFrame = Date.now();
        //                 mainLoop();
        //             }
        //             break;
        //         case 'm': // mute
        //             SFX.muted = !SFX.muted;
        //             break;
        //     }
        // });
    });
});