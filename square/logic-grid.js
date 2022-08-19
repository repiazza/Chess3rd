
const PIECE_TYPE_ROOK    = 'R';
const PIECE_TYPE_KNIGHT  = 'N';
const PIECE_TYPE_BISHOP  = 'B';
const PIECE_TYPE_QUEEN   = 'Q';
const PIECE_TYPE_KING    = 'K';
const PIECE_TYPE_PAWN    = 'P';
const PIECE_TYPE_NONE    =  0;

const pieceColumnLookup = [
    PIECE_TYPE_ROOK,
    PIECE_TYPE_KNIGHT,
    PIECE_TYPE_BISHOP,
    PIECE_TYPE_QUEEN, 
    PIECE_TYPE_KING, 
    PIECE_TYPE_BISHOP, 
    PIECE_TYPE_KNIGHT, 
    PIECE_TYPE_ROOK 
];
var whitePiecesStartOffset = 7;
var blackPiecesStartOffset = 1;
var blankPieceOffSet = 15;
var layerPieces = [
    PIECE_TYPE_ROOK,
    PIECE_TYPE_KNIGHT,
    PIECE_TYPE_BISHOP,
    PIECE_TYPE_QUEEN, 
    PIECE_TYPE_KING,
    PIECE_TYPE_PAWN
]
layerPieces [blankPieceOffSet] =PIECE_TYPE_NONE;

var map = {
    cols: 9,
    rows: 9,
    tsize: 80,
    layers: [
    [ // 0 malha
        4, 1, 2, 1, 2, 1, 2, 1, 2,
        4, 2, 1, 2, 1, 2, 1, 2, 1,
        4, 1, 2, 1, 2, 1, 2, 1, 2,
        4, 2, 1, 2, 1, 2, 1, 2, 1,
        4, 1, 2, 1, 2, 1, 2, 1, 2,
        4, 2, 1, 2, 1, 2, 1, 2, 1,
        4, 1, 2, 1, 2, 1, 2, 1, 2,
        4, 2, 1, 2, 1, 2, 1, 2, 1,
        4, 4, 4, 4, 4, 4, 4, 4, 4
    ], [// 1 pecas por cor e tipo
        4, 1, 2, 3, 4, 5, 3, 2, 1, 
        4, 6, 6, 6, 6, 6, 6, 6, 6, 
        4, 15, 15, 15, 15, 15, 15, 15, 15,  
        4, 15, 15, 15, 15, 15, 15, 15, 15,  
        4, 15, 15, 15, 15, 15, 15, 15, 15,  
        4, 15, 15, 15, 15, 15, 15, 15, 15, 
        4, 12, 12, 12, 12, 12, 12, 12, 12,
        4, 7, 8, 9, 10, 11, 9, 8, 7,  
        4, 4, 4, 4, 4, 4, 4, 4, 4
    ], [// 2 peca nao peca
        4, 3, 3, 3, 3, 3, 3, 3, 3,  
        4, 3, 3, 3, 3, 3, 3, 3, 3,  
        4, 1, 1, 1, 1, 1, 1, 1, 1, 
        4, 1, 1, 1, 1, 1, 1, 1, 1,  
        4, 1, 1, 1, 1, 1, 1, 1, 1,  
        4, 1, 1, 1, 1, 1, 1, 1, 1,  
        4, 3, 3, 3, 3, 3, 3, 3, 3,  
        4, 3, 3, 3, 3, 3, 3, 3, 3,  
        4, 4, 4, 4, 4, 4, 4, 4, 4
    ], [// 3 movimento
        4, 1, 9, 9, 9, 9, 9, 9, 7,  
        4, 1, 9, 9, 9, 9, 9, 7, 9,  
        4, 1, 9, 9, 9, 9, 7, 9, 9, 
        4, 1, 9, 9, 9, 7, 9, 9, 9,  
        4, 1, 9, 9, 7, 9, 9, 9, 9,  
        4, 1, 8, 7, 9, 9, 9, 9, 9,  
        4, 1, 7, 8, 9, 9, 9, 9, 9,  
        4, 5, 2, 2, 2, 2, 2, 2, 2,  
        4, 4, 4, 4, 4, 4, 4, 4, 4
    ]],
    getTile: function (layer, row, col) {
        return this.layers[layer][row * map.cols + col];
    },
    setTile: function (layer, row, col, value) {
        this.layers[layer][row * map.cols + col] = value;
    },
    isPieceTileAtRowCol: function (row, col) {
        return this.getTile(2, row, col) === 3
    },
    isBlankTileAtRowCol: function (row, col) {
        return this.getTile(2, row, col) === 1
    },
    selectTileMapRowCol: function (layer, row, col) {
        var tile = (this.getTile(0, row, col) == 2) ? 4 : 3;
        this.setTile(layer, row, col, tile)
        return [row,col];
    },
    unselectTileMap: function (row, col){
        var tile = (this.getTile(0, row, col) == 4) ? 2 : 1;
        this.setTile(0, row, col, tile)
        return [row,col];
    },
    moveToTileRowCol: function (row, col, row2, col2){
        var piece = Game._getpiece(columnArray[col-1]+Number(Math.abs(row-8)));
        piece.id = columnArray[col2-1]+Number(Math.abs(row2-8));
        this.setTile(2, row2, col2, 3);
        this.setTile(2, row, col, 1);
        return [row2,col2];
    },
    getCol: function (x) {
        return Math.floor(x / this.tsize);
    },
    getRow: function (y) {
        return Math.floor(y / this.tsize);
    },
    getX: function (col) {
        return col * this.tsize;
    },
    getY: function (row) {
        return row * this.tsize;
    }
};

function Camera(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.maxX = map.cols * map.tsize - width;
    this.maxY = map.rows * map.tsize - height;
}

Camera.prototype.follow = function (sprite) {
    this.following = sprite;
    sprite.screenX = 0;
    sprite.screenY = 0;
};

Camera.prototype.update = function () {
    // assume followed sprite should be placed at the center of the screen
    // whenever possible
    this.following.screenX = this.width / 2;
    this.following.screenY = this.height / 2;

    // make the camera follow the sprite
    this.x = this.following.x - this.width / 2;
    this.y = this.following.y - this.height / 2;
    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    // in map corners, the sprite cannot be placed in the center of the screen
    // and we have to change its screen coordinates

    // left and right sides
    if (this.following.x < this.width / 2 ||
        this.following.x > this.maxX + this.width / 2) {
        this.following.screenX = this.following.x - this.x;
    }
    // top and bottom sides
    if (this.following.y < this.height / 2 ||
        this.following.y > this.maxY + this.height / 2) {
        this.following.screenY = this.following.y - this.y;
    }
};

function Piece(map, ndx, color, pawn=null) {
    // this.map = map;
    // this.x = map.tsize*Number(ndx+1);
    this.color = color;
    if ( pawn ){
        // this.y = color == "w" ? 560: 80;
        this.id = columnArray[ndx] + ((color == "w") ? "2" :"7")
        this.name = PIECE_TYPE_PAWN
    }
    else{
        // this.y = color == "w" ? 640: 0;
        this.id = columnArray[ndx] + ((color == "w") ? "1" :"8")
        this.name = pieceColumnLookup[ndx]
    }
    // this.width = map.tsize;
    // this.height = map.tsize;
    this.image = Loader.getImage('pieces');
    this.font = "20px Serif"
    this.fillStyle = "#ffffff";
}
Game._getname = function(id){
    let i = 0;
    for ( ; i< this.blackpiece.length; i ++ ){
        if ( this.blackpiece[i].id == id ) return this.blackpiece[i].name
        if ( this.whitepiece[i].id == id ) return this.whitepiece[i].name
    }
    return ""
}
Game._getpiece = function(id){
    let i = 0;
    for ( ; i< this.blackpiece.length; i ++ ){
        if ( this.blackpiece[i].id == id ) return this.blackpiece[i]
        if ( this.whitepiece[i].id == id ) return this.whitepiece[i]
    }
    return ""
}
function getIdByRowCol(row,col){
    var id = "" + columnArray[col-1] + Math.abs(row-8)
    // alert(id)
    return id
}
Piece.prototype._collide = function (dirx, diry) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    var left = this.x - this.width / 2;
    var right = this.x + this.width / 2 - 1;
    var top = this.y - this.height / 2;
    var bottom = this.y + this.height / 2 - 1;

    // check for collisions on sprite sides
    var collision =
        this.map.isSolidTileAtXY(left, top) ||
        this.map.isSolidTileAtXY(right, top) ||
        this.map.isSolidTileAtXY(right, bottom) ||
        this.map.isSolidTileAtXY(left, bottom);
    if (!collision) { return; }

    if (diry > 0) {
        row = this.map.getRow(bottom);
        this.y = -this.height / 2 + this.map.getY(row);
    }
    else if (diry < 0) {
        row = this.map.getRow(top);
        this.y = this.height / 2 + this.map.getY(row + 1);
    }
    else if (dirx > 0) {
        col = this.map.getCol(right);
        this.x = -this.width / 2 + this.map.getX(col);
    }
    else if (dirx < 0) {
        col = this.map.getCol(left);
        this.x = this.width / 2 + this.map.getX(col + 1);
    }
};

Game.load = function () {
    return [
        Loader.loadImage('tiles', '../assets/tiles3.png'),
        Loader.loadImage('pieces', '../assets/blackpieces.png')
        // Loader.loadImage('bpieces', '../assets/blackpieces.png')
    ];
};
Game.init = function () {
    Mouse.listenForEvents();
    this.tileAtlas = Loader.getImage('tiles');
    // this.tileAtlas = Loader.getImage('trtiles');
    // this.tileAtlas = Loader.getImage('pieces');
    this.blackpiece=[];
    this.whitepiece=[];
    this.selected = false;
    this.playercolor = "w";
    let i=0; 
    for ( ; i< pieceColumnLookup.length; i ++ ){
        this.blackpiece[i] = new Piece(map, i, "b");
        this.blackpiece[i+8] = new Piece(map, i, "b", true);
        this.whitepiece[i] = new Piece(map, i, "w");
        this.whitepiece[i+8] = new Piece(map, i, "w", true);
    }
    this.camera = new Camera(map, 720, 720);
    // this.camera.follow(this.blackpiece);
};
function validateIsSelected(){
    return Game.selected != false;
}
function validateIsNotBlank(row,col){
    return map.isPieceTileAtRowCol(row,col);
}
function validateFriendlyPieceSquare(row,col){
    
    return (Game.playercolor == Game._getpiece(getIdByRowCol(row,col)).color);
}
function validateEnemyPieceSquare(row,col){
    return !(Game.playercolor != Game._getpiece(getIdByRowCol(row,col)).color);
}

function selectSquare(row,col){
    return (!validateIsSelected()
           && validateIsNotBlank(row,col)
           && validateFriendlyPieceSquare(row,col));
}
function validateIsSameSquare(row,col){
    return (Game._getpiece(getIdByRowCol(row,col)).id == Game._getpiece(Game.selected[0],Game.selected[1]).id);
}
function changeSelectedSquare(row,col){
    return (
              validateIsSelected() 
              && validateFriendlyPieceSquare(row,col) 
              && !validateIsSameSquare(row,col)
            //   && !validateCastleDestinationSquare(row,col)
           );
}
function printLayer(layer, mapp){
    var line = ""
    var header = ""
    for (var c = 0; c <= 8; c++) {
        for (var r = 0; r <= 8; r++) {
            if ( c == 0 || r == 8 )
                header +=  " ";
            else
                header +=  ""+columnArray[c]+Number(r) ;
                
            var tile = mapp.getTile(layer, r, c)
            if (tile !== undefined)
                line += tile;
        }
        header += "\n";
        line += "\n";
    }
    console.debug(header + line)
}
function printMatrix(mtx){
    var line = ""
    var header = ""
    for (var c = 8; c >= 0; c--) {
        for (var r = 8; r >= 0; r--) {
            // if ( c == 8 || r == 0 )
            //     header +=  " ";
            // else if ( c != 8)
            //     header +=  " "+columnArray[c]+Number(r) ;
                
            
            if (mtx[r * map.cols + c] !== undefined && c != 8)
                line += columnArray[c]+Number(r+1) + " " + mtx[r * map.cols + c] + " " ;
            
        }
        // header += "\n";
        line += "\n";
    }
    console.debug(line)
}

function validateIsOnRange(row,col){
    var mapoverlap =[];
    var initcol = Game.selected[1];
    var initrow = Game.selected[0];
    var initpos = initrow * map.cols + initcol-1;
    // var rlimit = false
    var climit = false
    var dlimit = false
    var limit = false
        // 4, 1, 9, 9, 9, 9, 9, 9, 7,  
        // 4, 1, 9, 9, 9, 9, 9, 7, 9,  
        // 4, 1, 9, 9, 9, 9, 7, 9, 9, 
        // 4, 1, 9, 9, 9, 7, 9, 9, 9,  
        // 4, 1, 9, 9, 7, 9, 9, 9, 9,  
        // 4, 1, 8, 7, 9, 9, 9, 9, 9,  
        // 4, 1, 7, 8, 9, 9, 9, 9, 9,  
        // 4, 5, 2, 2, 2, 2, 2, 2, 2,  
        // 4, 4, 4, 4, 4, 4, 4, 4, 4
        // var layer3 = map.layers[3].slice()
        // printMatrix(layer3);
        // printMatrix(layer4);
        var matrix = [// 3 movimento
        [4, 1, 9, 9, 9, 9, 9, 9, 7]  ,
        [4, 1, 9, 9, 9, 9, 9, 7, 9  ],
        [4, 1, 9, 9, 9, 9, 7, 9, 9 ],
        [4, 1, 9, 9, 9, 7, 9, 9, 9 ] ,
        [4, 1, 9, 9, 7, 9, 9, 9, 9 ], 
       [ 4, 1, 8, 7, 9, 9, 9, 9, 9 ] ,
       [ 4, 1, 7, 8, 9, 9, 9, 9, 9]  ,
        [4, 5, 2, 2, 2, 2, 2, 2, 2  ],
       [ 4, 4, 4, 4, 4, 4, 4, 4, 4]
    ]
        
    //    var layer4= layer3.reverse()
       
    //     // printMatrix(layer4);
        var layer5= math.transpose(matrix);
        // var layer6= layer5.reverse()
        // console.log(layer6)
        var layer7 = math.transpose(layer5);
    //    console.log(layer7.flat())

    // //     // layer3 = flipped_Invert_Image(layer4)
        // printMatrix(layer5);

        map.layers[3] = layer7.flat().slice()
    map.layers[3].forEach(function (key, ndx) {
        console.log(key + " " + ndx);
        if ( key == 5 ) // initialsq
            mapoverlap[initpos-ndx+1] = 8;
        else {
            // if ( (map.layers[2][initpos-ndx+1] == 4) )
            //     limit = true;

            if ( key == 1 && !climit){ // Column
                if ( limit )
                    climit =true;
                else
                    mapoverlap[Number(initpos)-Number(ndx)+1] = 10;
            }
            // else if ( key == 2 && !rlimit){ // row
            //     if ( limit )
            //         rlimit =true;
            //     else
            //         mapoverlap[initpos-ndx+1] = 20;
            // }
            else if ( key == 7 && !dlimit ){ // oposite diagonal
                if ( limit )
                    dlimit =true;
                else
                    mapoverlap[(Number(initpos)+Number(ndx))] = 30;
            }
        }
        limit = false;
    });
    // printMatrix(mapoverlap)

    var ret = false;
    var ret2 = false;
    var mapbkp = map.layers[2].slice()
    
    var newarr = map.layers[2].map((e, i) => mapoverlap[i]);
    // printLayer(newarr)
    newarr.map((e, i) => {if ( e !== NaN ) map.layers[2][i] = e});
    

    var tile = map.getTile(2,row,col);
    if ( tile == 10 )
        ret = true;
    else if ( tile == 20 )
        ret = true;
    else if ( tile == 30 )
        ret = true;

    map.layers[2] = mapbkp.slice()
    newarr = map.layers[2].map((e, i) => mapoverlap[i]);
    newarr.map((e, i) => {if ( e !== NaN ) map.layers[2][i+1] = e});

    // map.layers[2].reverse();
    tile = map.getTile(2,row,col);

    if ( tile == 10 )
        ret2 = true;
    else if ( tile == 20 )
        ret2 = true;
    else if ( tile == 30 )
        ret2 = true;

    map.layers[2] = mapbkp;

    return ret | ret2;
}
function moveSquare(row,col){
    
    return (
             validateIsSelected() 
            //  && validateIsSafeSquare(row,col)
            //  && !validateIsPinPiece()
             && (!validateIsNotBlank(row,col) /*|| validateCastleDestinationSquare(mySquare)*/)
            //  && !validateEnPassantDestSquare(mySquare)
             && validateIsOnRange(row,col)
           );
}
function captureSquare(row,col){
    return (
              validateIsSelected() 
              && (validateEnemyPieceSquare(row,col)/* || validateEnPassantDestSquare(square)*/)
              && validateIsOnRange(row,col)
            //   && validateIsCaptureSquare(square)
           );
}
Game.update = function (delta) {

    if ( Mouse.hasclicked ){
        Mouse.hasclicked = false
        if ( selectSquare(Mouse._row, Mouse._col) || changeSelectedSquare(Mouse._row, Mouse._col) ){
                
            if ( validateIsSelected() ){
                map.unselectTileMap(Game.selected[0], Game.selected[1]);
            }
            Game.selected = map.selectTileMapRowCol(0, Mouse._row, Mouse._col);
            // setSelection(event.target);
            // highlightSquares(event.target);
        }
        else if ( moveSquare(Mouse._row, Mouse._col) || (captureSq = captureSquare(Mouse._row, Mouse._col)) != false ){
                map.unselectTileMap(Game.selected[0], Game.selected[1]);
                map.moveToTileRowCol(Game.selected[0], Game.selected[1], Mouse._row, Mouse._col);
                Game.selected = false;
            // let oldelem = getFirstSelectedElement();
            // if ( captureSq ){
            //     capturedPieces += setupCapture(event);
            //     document.getElementById("captured").innerHTML = capturedPieces;
            // }
            //
            // Acao de mover-se:
            //   Preparacao
            //     - Quantos Movimentos estao envolvidos ?
            //   Deslocamento
            //     - Movimento ou captura?
            //   Desdobramentos
            //     - Ganhamos alguma habilidade especial?
            //     - Checagens extras?
            //
            // Preparacao
            //
            // let movementChain = setupMovement(oldelem, event.target);
    
            // if ( !movementChain.length )
            //     return;  
            // //
            // // Deslocamento
            // //
            // movementChain.map(chain => {
            //     doMoveToDestination(chain[MOVEMENT_CHAIN_ORIGIN], chain[MOVEMENT_CHAIN_DESTINATION]); 
            // })
            // //
            // // Desdobramento
            // //
            // setSpecialMovementStatus(movementChain[0]);
            // updateMajorRelativePositions(movementChain);
            // // saveCoreAttrOnLocalStorage(destElem);
            // clearAllElementSelection();
            //
            // Passar Turno
            //
            // changeTurn();
        }
    
        // if  ( map.isPieceTileAtRowCol(Mouse._row, Mouse._col) ){
        //     if ( Game.selected === false ){
        //         Game.selected = map.selectTileMapRowCol(0, Mouse._row, Mouse._col);
        //     }
        // }
        // if  ( map.isBlankTileAtRowCol(Mouse._row, Mouse._col) ){
        //     if ( Game.selected !== false ){
        //         map.unselectTileMap(Game.selected[0], Game.selected[1]);
        //         map.moveToTileRowCol(Game.selected[0], Game.selected[1], Mouse._row, Mouse._col);
        //         Game.selected = false;
        //     }

        // }  
    }
    // this.hero.move(delta, dirx, diry);
    // this.camera.update();
};

const columnArray = ['a','b','c','d','e','f','g','h'];
Game._drawLayer = function (layer) {
    for (var c = 0; c <= 8; c++) {
        for (var r = 0; r <= 8; r++) {
            // var tile = map.getTile(layer, c, r);
            var tile = map.getTile(layer, r, c);
            if (tile !== 0) { // 0 => empty tile
                if ( r == 8 || c == 0 ){
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        0, // source x
                        0, // source y
                        map.tsize, // source width
                        map.tsize, // source height
                        c * map.tsize,  // target x
                        r * map.tsize, // target y
                        map.tsize, // target width
                        map.tsize // target height
                    );
                    let fillvar
                    if ( c == 0 && r == 8 )
                        fillvar =  " ";
                    else
                        fillvar =  (r == 8) ? columnArray[c-1] : Math.abs(r-8);

                    this.ctx.font = "20px Serif"
                    this.ctx.fillStyle = "#ffffff";
                    this.ctx.fillText(fillvar, (c*map.tsize)+(map.tsize/2), (r*map.tsize)+(map.tsize/2), map.tsize);
                }
                else{
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        Number(((tile - 1) * map.tsize)+1 *80), // source x
                        0, // source y
                        map.tsize, // source width
                        map.tsize, // source height
                        c * map.tsize,  // target x
                        r * map.tsize, // target y
                        map.tsize, // target width
                        map.tsize // target height
                    );
                    this.ctx.font = "20px Serif"
                    this.ctx.fillStyle = "#000000";
                    // this.ctx.id = ""+columnArray[c-1]+Math.abs(r-8);
                    this.ctx.fillText(Game._getname(columnArray[c-1]+Number(Math.abs(r-8))), (c*map.tsize)+(map.tsize/2), (r*map.tsize)+(map.tsize/2), map.tsize);
                    // this.ctx.fillText(this.ctx.id, (c*map.tsize)+(map.tsize/2), (r*map.tsize)+(map.tsize/2), map.tsize);
                }
            }
        }
    }
};
Mouse.onClick = function (event) {
    var canvaspos = document.getElementById('demo').getBoundingClientRect();
    event.preventDefault();
    this._dir[0] = event.clientX - canvaspos.left;
    this._dir[1] = canvaspos.bottom - event.clientY;
    this._col = Math.floor(this._dir[0] / map.tsize);
    this._row = Math.floor(this._dir[1] / map.tsize);
    // this._col = Number(this._col);
    this._row = Math.abs(this._row-8);
    Mouse.hasclicked = true;
    // alert(map.getTile(2, this._row , this._col))
    
    return this._dir;
};
Game._drawGrid = function () {
    var width = map.cols * map.tsize;
    var height = map.rows * map.tsize;
    var x, y;
    for (var r = 0; r < map.rows; r++) {
        x = - this.camera.x;
        y = r * map.tsize - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
    }
    for (var c = 0; c < map.cols; c++) {
        x = c * map.tsize - this.camera.x;
        y = - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
    }
};
Game._drawPiecesAtStart = function (layer) {
    for (var c = 0; c < 8; c++) {
        for (var r = 1; r < 8; r++) {
            var tile = map.getTile(layer, r, c);
            if (tile === 3) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    0,//r*(2500/12), // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    c * map.tsize,  // target x
                    r * map.tsize, // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }
};

Game.render = function () {
    // draw map background layer
    // this._drawLayer(2);
    this._drawLayer(0);
// this._drawLayer(2);
    // this.tileAtlas = Loader.getImage('pieces');
    // this._drawPiecesAtStart(2);

    // // draw main character
    // this.ctx.drawImage(
    //     this.hero.image,
    //     this.hero.screenX - this.hero.width / 2,
    //     this.hero.screenY - this.hero.height / 2);

    // draw map top layer
    // this._drawLayer(1);

    this._drawGrid();
};
