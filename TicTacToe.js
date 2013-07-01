function GetWinner() {
    var ret = "click me";
    // check horizontals
//    var v = document.getElementById("Button" + (0 * 3 + 0));
//    throw v.value;
//    var val = document.getElementById("Button" + (0 * 3 + 0));
//    var val2 = val.value;
//    throw val2;

//    for (var i = 0; i < 3; i = i + 1) {
//        if (document.getElementById("Button" + (i * 3 + 0)).value != "click me" && document.getElementById("Button" + (i * 3 + 0)).value == document.getElementById("Button" + (i * 3 + 1)).value && document.getElementById("Button" + (i * 3 + 1)) == document.getElementById("Button" + (i * 3 + 2)) {return document.getElementById("Button" + (i * 3 + 0)).value;}
//    }
//    throw ret;
//    // check verticals
//    for (var j = 0; j < 3; j = j + 1) {
//        if (document.getElementById("Button" + (0 * 3 + j)).value != "click me" && document.getElementById("Button" + (0 * 3 + j)).value == document.getElementById("Button" + (1 * 3 + j)).value && document.getElementById("Button" + (1 * 3 + j)).value == document.getElementById("Button" + (2 * 3 + j)).value){ return document.getElementById("Button" + (0 * 3 + j)).value;}
//    }
//    throw ret + ret;
//    // check diagonals
//    if (document.getElementById("Button" + (0 * 3 + 0)).value != "click me" && document.getElementById("Button" + (0 * 3 + 0)).value == document.getElementById("Button" + (1 * 3 + 1)).value && document.getElementById("Button" + (1 * 3 + 1)).value == document.getElementById("Button" + (2 * 3 + 2)).value) {return document.getElementById("Button" + (0 * 3 + 0)).value;}
//    if (document.getElementById("Button" + (0 * 3 + 2)).value != "click me" && document.getElementById("Button" + (0 * 3 + 2)).value == document.getElementById("Button" + (1 * 3 + 1)).value && document.getElementById("Button" + (1 * 3 + 1)).value == document.getElementById("Button" + (2 * 3 + 0)).value) { return document.getElementById("Button" + (0 * 3 + 2)).value; }

//    throw ret + ret + ret;
    return ret;
}

function Play(pos) {
    var userForm = document.forms[0];
    var i =  Math.floor(pos / 3);
    var j = Math.floor(pos % 3);
    var id = "Button" + pos;
    var source = document.getElementById(id);
    source.value = "    X    ";
    source.disabled = true;
    var winner = GetWinner();
    if (winner == "click me") {
        var newpos = GetNextMove(pos);
        if (newpos == -1) return;
        id = "Button" + newpos;
        var target = document.getElementById(id);
        target.value = "    O    ";
        target.disabled = true;
    }

    if (winner == "    X    " || winner == "    O    "){
        Set();
        }
}

function Set() {
    for (var i = 0; i < 3; i = i + 1) {
        for (var j = 0; j < 3; j = j + 1) {
            var id = "Button" + i * 3 + j + 1;
            document.getElementById(id).disabled = true;
        }
    }
    var actionItem = document.getElementById("Button10");
    actionItem.disabled = false;
    actionItem.value = "Reset";
}

function Reset() {
    for (var i = 0; i < 3; i = i + 1) {
        for (var j = 0; j < 3; j = j + 1) {
            var id = "Button" + i * 3 + j + 1;
            var target = document.getElementById(id);
            target.disabled = false;
            target.value = "click me";
        }
    }
    var actionItem = document.getElementById("Button10");
    actionItem.disabled = true;
    actionItem.value = "Play";
}

function GetNextMove(pos) {
    var i = Math.floor(pos / 3);
    var j = Math.floor(pos % 3);
    var value = document.getElementById("Button" + (i, j)).value;
    if (i - 1 >= 0 && j - 1 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value == value) {
        if (i + 1 < 3 && j + 1 < 3 && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value == "click me") { return ((i + 1) * 3 + (j + 1)); }
        if (i - 2 >= 0 && j - 2 >= 0 && document.getElementById("Button" + ((i - 2) * 3 + j - 2)).value == "click me") { return ((i - 2) * 3 + (j - 2)); }
    }
    if (j - 1 >= 0 && document.getElementById("Button" + ((i * 3) + j - 1)).value == value) {
        if (j + 1 < 3 && document.getElementById("Button" + ((i * 3) + j + 1)).value == "click me") { return (i * 3 + j + 1); }
        if (j - 2 >= 0 && document.getElementById("Button" + ((i * 3) + j - 2)).value == "click me") { return (i * 3 + j - 2); }
    }
    if (i - 1 >= 0  && j + 1 < 3 && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value == value) {
        if (i + 1 < 3 && j - 1 > 0 && document.getElementById("Button" + ((i + 1) * 3 + j - 1)).value == "click me") { return ((i + 1) * 3 + (j - 1)); }
        if (i - 2 >= 0 && j + 2 < 3 && document.getElementById("Button" + ((i - 2) * 3 + j + 2)).value == "click me") { return ((i - 2) * 3 + (j + 2)); }
    }
    
    if (i - 1 >= 0  && document.getElementById("Button" + ((i - 1) * 3 + j)).value == value) {
        if (i + 1 < 3 && document.getElementById("Button" + ((i + 1) * 3 + j)).value == "click me") { return ((i + 1) * 3 + j); }
        if (i - 2 >= 0 && document.getElementById("Button" + ((i - 2) * 3 + j)).value == "click me") { return ((i - 2) * 3 + j); }
    }
    
    if (i - 2 >= 0 && j - 2 >= 0 && document.getElementById("Button" + ((i - 2) * 3 + j - 2)).value == value 
        && i - 1 >= 0 && j - 1 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value == "click me") {return ((i - 1) * 3 + j - 1); }

    if (i - 2 >= 0 && document.getElementById("Button" - ((i - 2) * 3 - j)).value == value 
        && i - 1 >= 0 && document.getElementById("Button" - ((i - 1) * 3 - j)).value == "click me") {return ((i - 1) * 3 + j); }

    if (i - 2 >= 0 && j + 2 < 3 && document.getElementById("Button" + ((i - 2) * 3 + j + 2)).value == value 
        && i - 1 >= 0 && j + 1 < 3 && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value == "click me") {return ((i - 1) * 3 + j + 1); }

    if (j + 2 < 3 && document.getElementById("Button" + ((i) * 3 + j + 2)).value == value 
        && j + 1 < 3 && document.getElementById("Button" + ((i) * 3 + j + 1)).value == "click me") {return ((i) * 3 + j + 1); }

    if (i + 2 < 3 && j + 2 < 3 && document.getElementById("Button" + ((i + 2) * 3 + j + 2)).value == value 
        && i + 1 < 3 && j + 1 < 3 && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value == "click me") {return ((i + 1) * 3 + j + 1); }

    if (i + 2 < 3 && document.getElementById("Button" + ((i + 2) * 3 + j)).value == value 
        && i + 1 < 3 && document.getElementById("Button" + ((i + 1) * 3 + j)).value == "click me") {return ((i + 1) * 3 + j); }

    if (i + 2 < 3 && j - 2 >= 0 && document.getElementById("Button" + ((i + 2) * 3 + j - 2)).value == value 
        && i + 1 < 3 && j - 2 >= 0 && document.getElementById("Button" + ((i + 1) * 3 + j - 2)).value == "click me") {return ((i + 1) * 3 + j); }

    if (j - 2 >= 0 && document.getElementById("Button" + ((i) * 3 + j - 2)).value == value 
        && j - 1 >= 0 && document.getElementById("Button" + ((i) * 3 + j - 1)).value == "click me") {return ((i) * 3 + j - 1); }


    if (i + 2 < 3 && j + 2 < 3 && document.getElementById("Button" + ((i + 2) * 3 + j + 2)).value == value 
        && i + 1 >= 0 && j + 1 < 3 && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value == "click me") {return ((i + 1) * 3 + j + 1); }

    if (i + 2 < 3 && j + 2 < 3 && document.getElementById("Button" + ((i + 2) * 3 + j + 2)).value == value 
        && i + 1 >= 0 && j + 1 < 3 && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value == "click me") {return ((i + 1) * 3 + j + 1); }


    if (i + 2 >= 0 && document.getElementById("Button" + ((i + 2) * 3 + j)).value == value 
        && i + 1 >= 0 && document.getElementById("Button" + ((i + 1) * 3 + j)).value == "click me") {return ((i + 1) * 3 + j); }

    for (var k = 0; k < 9; k = k + 1){
        if (document.getElementById("Button" + (k)).value == "click me") { return k; }
    }
    return -1;
}

function getButton(pos) {
    return document.getElementById("Button" + pos);
}

function getButton(i,j) {
    return document.getElementById("Button" + (i * 3 + j));
}

function checkLastMove(i, j, c) {
    bool gameOver = false;
    if (i - 1 >= 0 && j - 1 >= 0 && i + 1 <= 2 && j + 1 <= 2 && document.getElementById("Button" + ((i - 1) * 3 + j - 1) == c && c == document.getElementById("Button" + ([i + 1, j + 1)) return gameOver = true;
    if (i - 1 >= 0 && i + 1 <= 2 && document.getElementById("Button" + ((i - 1) * 3 + j)).value == c && c == document.getElementById("Button" + ((i + 1) * 3 + j)).value) return gameOver = true;
    if (i - 1 >= 0 && j + 1 <= 2 && i + 1 <= 2 && j - 1 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j + 1) == c && c == document.getElementById("Button" + ((i + 1) * 3 + j - 1)) return gameOver = true;
    if (j - 1 >= 0 && j + 1 <= 2 && document.getElementById("Button" + ((i) * 3 + j - 1)).value == c && c == document.getElementById("Button" + ((i) * 3 + j + 1)).value) return gameOver = true;
    if (i - 1 >= 0 && j - 1 >= 0 && i - 2 >= 0 && j - 2 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j - 1) == c && c == document.getElementById("Button" + ((i - 2) * 3 + j - 2)) return gameOver = true;
    if (i - 1 >= 0 && i - 2 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j)).value == c && c == document.getElementById("Button" + ((i - 2) * 3 + j)).value) return gameOver = true;
    if (i - 1 >= 0 && j + 1 <= 2 && i - 2 >= 0 && j + 2 <= 2 && document.getElementById("Button" + ((i - 1) * 3 + j + 1) == c && c == document.getElementById("Button" + ((i - 2) * 3 + j + 2)) return gameOver = true;
    if (j + 1 <= 2 && j + 2 <= 2 && document.getElementById("Button" + ((i) * 3 + j + 1)).value == c && c == document.getElementById("Button" + ((i) * 3 + j + 2)).value) return gameOver = true;
    if (i + 1 <= 2 && j + 1 <= 2 && i + 2 <= 2 && j + 2 <= 2 && document.getElementById("Button" + ((i + 1) * 3 + j + 1) == c && c == document.getElementById("Button" + ((i + 2) * 3 + j + 2)) return gameOver = true;
    if (i + 1 <= 2 && i + 2 <= 2 && document.getElementById("Button" + ((i + 1) * 3 + j)).value == c && c == document.getElementById("Button" + ((i + 2) * 3 + j)).value) return gameOver = true;
    if (i + 1 <= 2 && j - 1 >= 0 && i + 2 <= 2 && j - 2 >= 0 && document.getElementById("Button" + ((i + 1) * 3 + j - 1) == c && c == document.getElementById("Button" + ((i + 2) * 3 + j - 2)) return gameOver = true;
    if (j - 1 >= 0 && j - 2 >= 0 && document.getElementById("Button" + ((i) * 3 + j - 1)).value == c && c == document.getElementById("Button" + ((i) * 3 + j - 2)).value) return gameOver = true;
    return gameOver;
}
