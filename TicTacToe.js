function GetWinner() {
    var ret = "click me";
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
