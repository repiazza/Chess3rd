var map = {
    cols: 9,
    rows: 9,
    tsize: 80,
    tiles: [[
        3, 1, 2,  1, 2, 1, 2,  1,2,
        3, 2, 1,  2, 1, 2, 1,  2,1,
        3, 1, 2,  1, 2, 1, 2,  1,2,
        3, 2, 1,  2, 1, 2, 1,  2,1,
        3, 1, 2,  1, 2, 1, 2,  1,2,
        3, 2, 1,  2, 1, 2, 1,  2,1,
        3, 1, 2,  1, 2, 1, 2,  1,2,
        3, 2, 1,  2, 1, 2, 1,  2,1,
        3, 3, 3,  3, 3, 3, 3,  3,3
    ],[
        3, 0, 0,  0, 0, 0, 0,  0,0,
        3, 0, 0,  0, 0, 0, 0,  0,0,
        3, 0, 0,  0, 0, 0, 0,  0,0,
        3, 0, 0,  0, 0, 0, 0,  0,0,
        3, 0, 0,  0, 0, 0, 0,  0,0,
        3, 0, 0,  0, 0, 0, 0,  0,0,
        3, 0, 0,  0, 0, 0, 0,  0,0,
        3, 0, 0,  0, 0, 0, 0,  0,0,
        3, 3, 3,  3, 3, 3, 3,  3,3
    ]],

    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    },
};

Game.load = function () {
    return [
        Loader.loadImage('tiles', '../assets/tiles2.png'),
        Loader.loadImage('trtiles', '../assets/trsq.png')
    ];

};

Game.init = function () {
    this.tileAtlas = Loader.getImage('tiles');
    this.tileAtlas = Loader.getImage('trtiles');
};

Game.update = function (delta) {
};

Game.render = function () {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(c, r);
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    c * map.tsize,  // target x
                    r * map.tsize, // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
                // this.ctx.globalAlpha  = 0.7;
                // this.ctx.filter = "brightness(120%) blur(130%) opacity(150%)"
                this.ctx.filter ='contrast(1.4) blur(1px) drop-shadow(-9px -9px 10px #f7d7ff)';
            }
        }
    }
};
