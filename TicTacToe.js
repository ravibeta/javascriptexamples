function GetWinner() {
    var ret = "click me";

    // check horizontals
    for (var i = 0; i < 3; i = i + 1) {
        if (getButton(i * 3 + 0).value != "click me" && getButton(i * 3 + 0).value == getButton(i * 3 + 1).value && getButton(i * 3 + 1) == getButton(i * 3 + 2)) return getButton(i * 3 + 0).value;
    }

    // check verticals
    for (var j = 0; j < 3; j = j + 1) {
        if (getButton(i * 3 + 0).value != "click me" && getButton(0 * 3 + j).value == getButton(1 * 3 + j).value && getButton(1 * 3 + j).value == getButton(2 * 3 + j).value) return getButton(0 * 3 + j).value;
    }

    // check diagonals
    if (getButton(i * 3 + 0).value != "click me" && getButton(0 * 3 + 0).value == getButton(1 * 3 + 1).value && getButton(1 * 3 + 1).value == getButton(2 * 3 + 2).value) return getButton(0 * 3 + 0).value;
    if (getButton(i * 3 + 0).value != "click me" && getButton(0 * 3 + 2).value == getButton(1 * 3 + 1).value && getButton(1 * 3 + 1).value == getButton(2 * 3 + 0).value) return getButton(0 * 3 + 2).value;
    return ret;
}

function Play(pos) {
    var userForm = document.forms[0];
    var i = pos / 3;
    var j = pos % 3;
    var id = "Button" + pos;
    var source = document.getElementById(id);
    source.value = "    X   ";
    source.disabled = true;
    var winner = GetWinner();
    if (winner == "click me") {
        var newpos = GetNextMove(pos);
        id = "Button" + newpos;
        var target = document.getElementById(id);
        target.value = "    O   ";
        target.disabled = true;
    }

    if (winner == "    X   " || winner == "    O   ")
        Set();
}

function Set() {
    for (var i = 0; i < 3; i = i + 1) {
        for (var j = 0; j < 3; j = j + 1) {
            var id = "Button" + i * 3 + j + 1;
            document.getElementById(id).disabled = true;
        }
    }
    var actionItem = document.getElementById("Button10")
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
    var actionItem = document.getElementById("Button10")
    actionItem.disabled = true;
    actionItem.value = "Play";
}

function GetNextMove(pos) {
    var i = pos / 3;
    var j = pos % 3;
    var value = getButton(i, j).value;
    if (i - 1 > 0 && j - 1 > 0 && getButton(i - 1, j - 1).Value == value) {
        if (i + 1 < 3 && j + 1 < 3 && getButton(i + 1, j + 1).value == "click me") return (i + 1) * 3 + (j + 1);
        if (i - 2 > 0 && j - 2 > 0 && getButton(i - 2, j - 2).value == "click me") return (i - 2) * 3 + (j - 2);
    }
    if (j - 1 > 0 && getButton(i, j - 1).value == value) {
        if (j + 1 < 3 && getButton(i, j + 1).value == "click me") return (i * 3 + j + 1);
        if (j - 2 > 0 && getButton(i, j - 2).value == "click me") return (i * 3 + j - 2);
    }
    if (i - 1 > 0 && j + 1 < 3 && getButton(i - 1, j + 1).value == value) {
        if (i + 1 < 3 && j - 2 > 0 && getButton(i + 1, j - 2).value == "click me") return (i + 1) * 3 + j - 2;
        if (i - 2 > 0 && j + 2 < 3 && getButton(i - 2, j + 2).value == "click me") return (i - 2) * 3 + j + 2;
    }
    if (i - 1 > 0 && getButton(i - 1, j).value == value) {
        if (i + 1 < 3 && getButton(i + 1, j).value == "click me") return (i * 3 + j + 1);
        if (i - 2 > 0 && getButton(i - 2, j).value == "click me") return (i - 2) * 3 + j;
    }
    for (var k = 0; k < 9; k = k + 1) {
        if (getButton(k).value == "click me") return k;
    }
}

function getButton(pos) {
    return document.getElementById("Button" + pos);
}

function getButton(i, j) {
    return getButton(i * 3 + j);
}
