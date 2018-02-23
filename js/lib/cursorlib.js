define(['jquery'], function($) {
    function Grid(game, grid_size) {
        let gridWidth = Math.round(game.canvasWidth / grid_size);
        let gridHeight = Math.round(game.canvasHeight / grid_size);
        let grid = new Array(gridWidth);

        for (let i = 0; i < gridWidth; i++) {
            grid[i] = new Array(gridHeight);
            for (let j = 0; j < gridHeight; j++) {
                grid[i][j] = new GridNode();
            }
        }

        // set up the positional references
        for (let i = 0; i < gridWidth; i++) for (let j = 0; j < gridHeight; j++) {
            let node = grid[i][j];
            node.north = grid[i][(j === 0) ? gridHeight - 1 : j - 1];
            node.south = grid[i][(j === gridHeight - 1) ? 0 : j + 1];
            node.west = grid[(i === 0) ? gridWidth - 1 : i - 1][j];
            node.east = grid[(i === gridWidth - 1) ? 0 : i + 1][j];
        }

        // set up borders
        for (let i = 0; i < gridWidth; i++) {
            grid[i][0].dupe.vertical            =  game.canvasHeight;
            grid[i][gridHeight-1].dupe.vertical = -game.canvasHeight;
        }

        for (let j = 0; j < gridHeight; j++) {
            grid[0][j].dupe.horizontal           =  game.canvasWidth;
            grid[gridWidth-1][j].dupe.horizontal = -game.canvasWidth;
        }

        return grid;
    }

    function Sprite() {
        this.init = function (name, points, game, grid_size) {
            this.name      = name;
            this.points    = points;
            this.game      = game;
            this.grid_size = grid_size;

            this.vel = {
                x:   0,
                y:   0,
                rot: 0
            };

            this.acc = {
                x:   0,
                y:   0,
                rot: 0
            };
        };

        this.children = {};

        this.visible  = false;
        this.reap     = false;
        this.bridgesH = true;
        this.bridgesV = true;

        this.collidesWith = [];

        this.x     = 0;
        this.y     = 0;
        this.rot   = 0;
        this.scale = 1;

        this.currentNode = null;
        this.nextSprite  = null;

        this.preMove  = null;
        this.postMove = null;

        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.alpha = 1;

        this.run = function(delta) {

            this.move(delta);
            this.updateGrid();

            this.context.save();
            this.configureTransform();
            this.draw();

            let candidates = this.findCollisionCanidates();

            this.matrix.configure(this.rot, this.scale, this.x, this.y);
            this.checkCollisionsAgainst(candidates);

            this.context.restore();

            if (this.bridgesH && this.currentNode && this.currentNode.dupe.horizontal) {
                this.x += this.currentNode.dupe.horizontal;
                this.context.save();
                this.configureTransform();
                this.draw();
                this.checkCollisionsAgainst(candidates);
                this.context.restore();
                if (this.currentNode) {
                    this.x -= this.currentNode.dupe.horizontal;
                }
            }
            if (this.bridgesV && this.currentNode && this.currentNode.dupe.vertical) {
                this.y += this.currentNode.dupe.vertical;
                this.context.save();
                this.configureTransform();
                this.draw();
                this.checkCollisionsAgainst(candidates);
                this.context.restore();
                if (this.currentNode) {
                    this.y -= this.currentNode.dupe.vertical;
                }
            }
            if (this.bridgesH && this.bridgesV &&
                this.currentNode &&
                this.currentNode.dupe.vertical &&
                this.currentNode.dupe.horizontal) {
                this.x += this.currentNode.dupe.horizontal;
                this.y += this.currentNode.dupe.vertical;
                this.context.save();
                this.configureTransform();
                this.draw();
                this.checkCollisionsAgainst(candidates);
                this.context.restore();
                if (this.currentNode) {
                    this.x -= this.currentNode.dupe.horizontal;
                    this.y -= this.currentNode.dupe.vertical;
                }
            }
        };
        this.move = function (delta) {
            if (!this.visible) return;
            this.transPoints = null; // clear cached points

            if (typeof this.preMove == 'function') {
                this.preMove(delta);
            }

            this.vel.x += this.acc.x * delta;
            this.vel.y += this.acc.y * delta;
            this.x += this.vel.x * delta;
            this.y += this.vel.y * delta;
            this.rot += this.vel.rot * delta;
            if (this.rot > 360) {
                this.rot -= 360;
            } else if (this.rot < 0) {
                this.rot += 360;
            }

            if ($.isFunction(this.postMove)) {
                this.postMove(delta);
            }
        };
        this.updateGrid = function () {
            if (!this.visible) return;
            let gridx = Math.floor(this.x / this.grid_size);
            let gridy = Math.floor(this.y / this.grid_size);
            gridx = (gridx >= this.grid.length) ? 0 : gridx;
            gridy = (gridy >= this.grid[0].length) ? 0 : gridy;
            gridx = (gridx < 0) ? this.grid.length-1 : gridx;
            gridy = (gridy < 0) ? this.grid[0].length-1 : gridy;
            let newNode = this.grid[gridx][gridy];
            if (newNode !== this.currentNode) {
                if (this.currentNode) {
                    this.currentNode.leave(this);
                }
                newNode.enter(this);
                this.currentNode = newNode;
            }

            // if (KEY_STATUS.g && this.currentNode) {
            //     this.context.lineWidth = 3.0;
            //     this.context.strokeStyle = 'green';
            //     this.context.strokeRect(gridx*GRID_SIZE+2, gridy*GRID_SIZE+2, GRID_SIZE-4, GRID_SIZE-4);
            //     this.context.strokeStyle = 'black';
            //     this.context.lineWidth = 1.0;
            // }
        };
        this.configureTransform = function () {
            if (!this.visible) return;

            let rad = (this.rot * Math.PI)/180;

            this.context.translate(this.x, this.y);
            this.context.rotate(rad);
            this.context.scale(this.scale, this.scale);
        };
        this.draw = function () {
            if (!this.visible) return;

            this.context.lineWidth = 1.0 / this.scale;

            for (let child in this.children) {
                this.children[child].draw();
            }

            this.context.beginPath();

            this.context.moveTo(this.points[0], this.points[1]);
            for (let i = 1; i < this.points.length/2; i++) {
                let xi = i*2;
                let yi = xi + 1;
                this.context.lineTo(this.points[xi], this.points[yi]);
            }

            this.context.closePath();
            this.context.fill();
            this.context.stroke();
        };
        this.findCollisionCanidates = function () {
            if (!this.visible || !this.currentNode) return [];
            let cn = this.currentNode;
            let candidates = [];
            if (cn.nextSprite) candidates.push(cn.nextSprite);
            if (cn.north.nextSprite) candidates.push(cn.north.nextSprite);
            if (cn.south.nextSprite) candidates.push(cn.south.nextSprite);
            if (cn.east.nextSprite) candidates.push(cn.east.nextSprite);
            if (cn.west.nextSprite) candidates.push(cn.west.nextSprite);
            if (cn.north.east.nextSprite) candidates.push(cn.north.east.nextSprite);
            if (cn.north.west.nextSprite) candidates.push(cn.north.west.nextSprite);
            if (cn.south.east.nextSprite) candidates.push(cn.south.east.nextSprite);
            if (cn.south.west.nextSprite) candidates.push(cn.south.west.nextSprite);
            return candidates
        };
        this.checkCollisionsAgainst = function (canidates) {
            for (let i = 0; i < canidates.length; i++) {
                let ref = canidates[i];
                do {
                    this.checkCollision(ref);
                    ref = ref.nextSprite;
                } while (ref)
            }
        };
        this.checkCollision = function (other) {
            if (!other.visible ||
                this === other ||
                this.collidesWith.indexOf(other.name) === -1) return;
            let trans = other.transformedPoints();
            let px, py;
            let count = trans.length/2;
            for (let i = 0; i < count; i++) {
                px = trans[i*2];
                py = trans[i*2 + 1];
                // mozilla doesn't take into account transforms with isPointInPath >:-P
                if (($.browser.mozilla) ? this.pointInPolygon(px, py) : this.context.isPointInPath(px, py)) {
                    other.collision(this);
                    this.collision(other);
                    return;
                }
            }
        };
        this.pointInPolygon = function (x, y) {
            let points = this.transformedPoints();
            let j = 2;
            let y0, y1;
            let oddNodes = false;
            for (let i = 0; i < points.length; i += 2) {
                y0 = points[i + 1];
                y1 = points[j + 1];
                if ((y0 < y && y1 >= y) ||
                    (y1 < y && y0 >= y)) {
                    if (points[i]+(y-y0)/(y1-y0)*(points[j]-points[i]) < x) {
                        oddNodes = !oddNodes;
                    }
                }
                j += 2;
                if (j === points.length) j = 0;
            }
            return oddNodes;
        };
        this.collision = function () {
        };
        this.die = function () {
            this.visible = false;
            this.reap = true;
            if (this.currentNode) {
                this.currentNode.leave(this);
                this.currentNode = null;
            }
        };
        this.transformedPoints = function () {
            if (this.transPoints) return this.transPoints;
            let trans = new Array(this.points.length);
            this.matrix.configure(this.rot, this.scale, this.x, this.y);
            for (let i = 0; i < this.points.length/2; i++) {
                let xi = i*2;
                let yi = xi + 1;
                let pts = this.matrix.multiply(this.points[xi], this.points[yi], 1);
                trans[xi] = pts[0];
                trans[yi] = pts[1];
            }
            this.transPoints = trans; // cache translated points
            return trans;
        };
        this.isClear = function () {
            if (this.collidesWith.length === 0) return true;
            let cn = this.currentNode;
            if (cn == null) {
                let gridx = Math.floor(this.x / this.grid_size);
                let gridy = Math.floor(this.y / this.grid_size);
                gridx = (gridx >= this.grid.length) ? 0 : gridx;
                gridy = (gridy >= this.grid[0].length) ? 0 : gridy;
                cn = this.grid[gridx][gridy];
            }
            return (cn.isEmpty(this.collidesWith) &&
                cn.north.isEmpty(this.collidesWith) &&
                cn.south.isEmpty(this.collidesWith) &&
                cn.east.isEmpty(this.collidesWith) &&
                cn.west.isEmpty(this.collidesWith) &&
                cn.north.east.isEmpty(this.collidesWith) &&
                cn.north.west.isEmpty(this.collidesWith) &&
                cn.south.east.isEmpty(this.collidesWith) &&
                cn.south.west.isEmpty(this.collidesWith));
        };
        this.wrapPostMove = function () {
            if (this.x > this.game.canvasWidth) {
                this.x = 0;
            } else if (this.x < 0) {
                this.x = this.game.canvasWidth;
            }
            if (this.y > this.game.canvasHeight) {
                this.y = 0;
            } else if (this.y < 0) {
                this.y = this.game.canvasHeight;
            }
        };

    }

    function Matrix(rows, columns) {
        let i = undefined, j = undefined;
        this.data = new Array(rows);
        for (i = 0; i < rows; i++) {
            this.data[i] = new Array(columns);
        }

        this.configure = function (rot, scale, transx, transy) {
            let rad = (rot * Math.PI)/180;
            let sin = Math.sin(rad) * scale;
            let cos = Math.cos(rad) * scale;
            this.set(cos, -sin, transx,
                sin,  cos, transy);
        };

        this.set = function () {
            let k = 0;
            for (i = 0; i < rows; i++) {
                for (j = 0; j < columns; j++) {
                    this.data[i][j] = arguments[k];
                    k++;
                }
            }
        };

        this.multiply = function () {
            let vector = new Array(rows);
            for (i = 0; i < rows; i++) {
                vector[i] = 0;
                for (j = 0; j < columns; j++) {
                    vector[i] += this.data[i][j] * arguments[j];
                }
            }
            return vector;
        };
    }

    let Cursor = function ({ x = 0, y = 0, scale = 1 }) {

        let cursor_shape = [-5,   4, 0, -12, 5,   4];
        this.init("ship", cursor_shape);
        this.x = x;
        this.y = y;
        this.scale = scale;

        this.children.exhaust = new Sprite();
        let exhaust_shape =[-3,  6, 0, 11, 3,  6];
        this.children.exhaust.init("exhaust", exhaust_shape);

        this.bulletCounter = 0;

        this.postMove = this.wrapPostMove;

        this.preMove = function (delta) {
            if (KEY_STATUS.left) {
                this.vel.rot = -6;
            } else if (KEY_STATUS.right) {
                this.vel.rot = 6;
            } else {
                this.vel.rot = 0;
            }

            if (KEY_STATUS.up) {
                let rad = ((this.rot-90) * Math.PI)/180;
                this.vel.x = 10 * Math.cos(rad);
                this.vel.y = 10 * Math.sin(rad);
                this.children.exhaust.visible = Math.random() > 0.1;
                console.log(this.x + " " + this.y);
            } else {
                this.vel.x = 0;
                this.vel.y = 0;
                this.children.exhaust.visible = false;
            }

            if (this.bulletCounter > 0) {
                this.bulletCounter -= delta;
            }
            if (KEY_STATUS.space) {
                if (this.bulletCounter <= 0) {
                    this.bulletCounter = 10;
                    for (let i = 0; i < this.bullets.length; i++) {
                        if (!this.bullets[i].visible) {
                            SFX.laser();
                            let bullet = this.bullets[i];
                            let rad = ((this.rot-90) * Math.PI)/180;
                            let vectorx = Math.cos(rad);
                            let vectory = Math.sin(rad);
                            // move to the nose of the ship
                            bullet.x = this.x + vectorx * 4;
                            bullet.y = this.y + vectory * 4;
                            bullet.vel.x = 6 * vectorx + this.vel.x;
                            bullet.vel.y = 6 * vectory + this.vel.y;
                            bullet.visible = true;
                            break;
                        }
                    }
                }
            }

            // limit the ship's speed
            if (Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y) > 8) {
                this.vel.x *= 0.95;
                this.vel.y *= 0.95;
            }
        };

        this.collision = function (other) {
            SFX.explosion();
            Game.explosionAt(other.x, other.y);
            Game.FSM.state = 'player_died';
            this.visible = false;
            this.currentNode.leave(this);
            this.currentNode = null;
            Game.lives--;
        };

    };
    Cursor.prototype = new Sprite();

    return {
        'Grid': Grid,
        'Sprite': Sprite,
        'Matrix': Matrix,
        "Cursor": Cursor
    }
});

