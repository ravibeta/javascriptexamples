function GetWinner() {
    var ret = "click me";

    // check horizontals
    for (var i = 0; i < 3; i = i + 1) {
        if (document.getElementById("Button" + ((i * 3) + 0)).value != "click me" && document.getElementById("Button" + ((i * 3) + 0)).value == document.getElementById("Button" + ((i * 3) + 1)).value && document.getElementById("Button" + ((i * 3) + 1)).value == document.getElementById("Button" + ((i * 3) + 2)).value) {return document.getElementById("Button" + ((i * 3) + 0)).value;}
    }

    // check verticals
    for (var j = 0; j < 3; j = j + 1) {
        if (document.getElementById("Button" + ((0 * 3) + j)).value != "click me" && document.getElementById("Button" + ((0 * 3) + j)).value == document.getElementById("Button" + ((1 * 3) + j)).value && document.getElementById("Button" + ((1 * 3) + j)).value == document.getElementById("Button" + ((2 * 3) + j)).value){ return document.getElementById("Button" + ((0 * 3) + j)).value;}
    }

    // check diagonals
    if (document.getElementById("Button" + ((0 * 3) + 0)).value != "click me" && document.getElementById("Button" + ((0 * 3) + 0)).value == document.getElementById("Button" + ((1 * 3) + 1)).value && document.getElementById("Button" + ((1 * 3) + 1)).value == document.getElementById("Button" + ((2 * 3) + 2)).value) {return document.getElementById("Button" + ((0 * 3) + 0)).value;}
    if (document.getElementById("Button" + ((0 * 3) + 2)).value != "click me" && document.getElementById("Button" + ((0 * 3) + 2)).value == document.getElementById("Button" + ((1 * 3) + 1)).value && document.getElementById("Button" + ((1 * 3) + 1)).value == document.getElementById("Button" + ((2 * 3) + 0)).value) { return document.getElementById("Button" + ((0 * 3) + 2)).value; }

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
        var newpos = GetNextMove("    O    ");
        if (newpos == -1) return;
        id = "Button" + newpos;
        var target = document.getElementById(id);
        target.value = "    O    ";
        target.disabled = true;
        winner = GetWinner();
    }

    if (winner == "    X    " || winner == "    O    ") {
        Set();
        }
}

function Set() {
    for (var i = 0; i < 3; i = i + 1) {
        for (var j = 0; j < 3; j = j + 1) {
            var id = "Button" + ((i * 3) + j);
            document.getElementById(id).disabled = true;
        }
    }
    var actionItem = document.getElementById("Button9");
    actionItem.disabled = false;
    actionItem.value = "Reset";
}

function Reset() {
    for (var i = 0; i < 3; i = i + 1) {
        for (var j = 0; j < 3; j = j + 1) {
            var id = "Button" + ((i * 3) + j);
            document.getElementById(id).value = "click me";
            document.getElementById(id).disabled = false;
        }
    }
    var actionItem = document.getElementById("Button9");
    actionItem.disabled = true;
    actionItem.value = "Play";
}

function GetNextMove1(pos) {
    var i = Math.floor(pos / 3);
    var j = Math.floor(pos % 3);
    var value = document.getElementById("Button" + ((i * 3) + j)).value;

    if (i - 2 >= 0 && j - 2 >= 0 && document.getElementById("Button" + ((i - 2) * 3 + j - 2)).value == value
        && i - 1 >= 0 && j - 1 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value == "click me") { return ((i - 1) * 3 + j - 1); }

    if (i - 2 >= 0 && document.getElementById("Button" + ((i - 2) * 3 + j)).value == value
        && i - 1 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j)).value == "click me") { return ((i - 1) * 3 + j); }

    if (i - 2 >= 0 && j + 2 < 3 && document.getElementById("Button" + ((i - 2) * 3 + j + 2)).value == value
        && i - 1 >= 0 && j + 1 < 3 && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value == "click me") { return ((i - 1) * 3 + j + 1); }

    if (j + 2 < 3 && document.getElementById("Button" + ((i) * 3 + j + 2)).value == value
        && j + 1 < 3 && document.getElementById("Button" + ((i) * 3 + j + 1)).value == "click me") { return ((i) * 3 + j + 1); }

    if (i + 2 < 3 && j + 2 < 3 && document.getElementById("Button" + ((i + 2) * 3 + j + 2)).value == value
        && i + 1 < 3 && j + 1 < 3 && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value == "click me") { return ((i + 1) * 3 + j + 1); }

    if (i + 2 < 3 && document.getElementById("Button" + ((i + 2) * 3 + j)).value == value
        && i + 1 < 3 && document.getElementById("Button" + ((i + 1) * 3 + j)).value == "click me") { return ((i + 1) * 3 + j); }

    if (i + 2 < 3 && j - 2 >= 0 && document.getElementById("Button" + ((i + 2) * 3 + j - 2)).value == value
        && i + 1 < 3 && j - 1 >= 0 && document.getElementById("Button" + ((i + 1) * 3 + j - 1)).value == "click me") { return ((i + 1) * 3 + j - 1); }

    if (j - 2 >= 0 && document.getElementById("Button" + ((i) * 3 + j - 2)).value == value
        && j - 1 >= 0 && document.getElementById("Button" + ((i) * 3 + j - 1)).value == "click me") { return ((i) * 3 + j - 1); }

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


function GetNextMove(c)
{
    var gameOver = false;            
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
        {
            if (document.getElementById("Button" + (i * 3 + j)).value != "    X    " && document.getElementById("Button" + (i * 3 + j)).value != "    O    ")
            {
                // immediate neighbours forming 3 in a row
                var res = ThreeInARow(i, j, c);
                if (res != -1)
                    return res;
            }
        }

    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
        {
            if (document.getElementById("Button" + (i * 3 + j)).value != "    X    " && document.getElementById("Button" + (i * 3 + j)).value != "    O    ")
            {
                // skip neighbours forming 3 in a row
                var res = SkipNeighbour3InARow(i, j, c);
                if (res != -1)
                    return res;
            }
        }


    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
        {
            if (document.getElementById("Button" + (i * 3 + j)).value != "    X    " && document.getElementById("Button" + (i * 3 + j)).value != "    O    ")
            {
                // neighbours forming a 2 in a row
                var res = TwoInARow(i, j, c);
                if (res != -1)
                    return res;
            }
        }

    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
        {
            if (document.getElementById("Button" + (i * 3 + j)).value != "    X    " && document.getElementById("Button" + (i * 3 + j)).value != "    O    ")
            {
                document.getElementById("Button" + (i * 3 + j)).value = c;
                return i * 3 + j;
            }
        }

    return -1;
}

function ThreeInARow(i, j, c)
{
    var gameOver = false;
    if (i - 1 >= 0 && j - 1 >= 0
        && i + 1 <= 2 && j + 1 <= 2 && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value != "click me" && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value == document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value)
    {
        if (document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value == c && c == document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value) {
            gameOver = true;
            }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i - 1 >= 0
        && i + 1 <= 2 && document.getElementById("Button" + ((i - 1) * 3 + j)).value != "click me"  && document.getElementById("Button" + ((i - 1) * 3 + j)).value == document.getElementById("Button" + ((i + 1) * 3 + j)).value)
    {
        if (document.getElementById("Button" + ((i - 1) * 3 + j)).value == c && c == document.getElementById("Button" + ((i + 1) * 3 + j)).value) {
            gameOver = true;
            }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i - 1 >= 0 && j + 1 <= 2
        && i + 1 <= 2 && j - 1 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value != "click me" && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value == document.getElementById("Button" + ((i + 1) * 3 + j - 1)).value)
    {
        if (document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value == c && c == document.getElementById("Button" + ((i + 1) * 3 + j - 1)).value) {
            gameOver = true;
        }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (j - 1 >= 0
        && j + 1 <= 2 && document.getElementById("Button" + (i * 3 + j - 1)).value != "click me" && document.getElementById("Button" + (i * 3 + j - 1)).value == document.getElementById("Button" + (i * 3 + j + 1)).value)
    {
        if (document.getElementById("Button" + (i * 3 + j - 1)).value == c && c == document.getElementById("Button" + (i * 3 + j + 1)).value) {
            gameOver = true;
            }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }
    return -1;
}

function SkipNeighbour3InARow( i,  j,  c)
{
    var gameOver = false;
    if (i - 1 >= 0 && j - 1 >= 0
        && i - 2 >= 0 && j - 2 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value != "click me" && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value == document.getElementById("Button" + ((i - 2) * 3 + j - 2)).value)
    {
        if (document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value == c && c == document.getElementById("Button" + ((i - 2) * 3 + j - 2)).value) {
            gameOver = true;
        }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i - 1 >= 0
        && i - 2 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j)).value != "click me" && document.getElementById("Button" + ((i - 1) * 3 + j)).value == document.getElementById("Button" + ((i - 2) * 3 + j)).value)
    {
        if (document.getElementById("Button" + ((i - 1) * 3 + j)).value == c && c == document.getElementById("Button" + ((i - 2) * 3 + j)).value) {
            gameOver = true;
        }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;

    }

    if (i - 1 >= 0 && j + 1 <= 2
        && i - 2 >= 0 && j + 2 <= 2 && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value != "click me" && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value == document.getElementById("Button" + ((i - 2) * 3 + j + 2)).value)
    {
        if (document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value == c && c == document.getElementById("Button" + ((i - 2) * 3 + j + 2)).value) {
            gameOver = true;
        }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (j + 1 <= 2
        && j + 2 <= 2 && document.getElementById("Button" + (i * 3 + j + 1)).value != "click me" && document.getElementById("Button" + (i * 3 + j + 1)).value == document.getElementById("Button" + (i * 3 + j + 2)).value)
    {
        if (document.getElementById("Button" + (i * 3 + j + 1)).value == c && c == document.getElementById("Button" + (i * 3 + j + 2)).value) {
            gameOver = true;
        }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i + 1 <= 2 && j + 1 <= 2
                && i + 2 <= 2 && j + 2 <= 2 && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value != "click me" && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value == document.getElementById("Button" + ((i + 2) * 3 + j + 2)).value) 
    {
        if (document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value == c && c == document.getElementById("Button" + ((i + 2) * j + 2)).value) {
            gameOver = true;
        }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i + 1 <= 2
        && i + 2 <= 2 && document.getElementById("Button" + ((i + 1) * 3 + j)).value != "click me" && document.getElementById("Button" + ((i + 1) * 3 + j)).value == document.getElementById("Button" + ((i + 2) * 3 + j)).value)
    {
        if (document.getElementById("Button" + ((i + 1) * 3 + j)).value == c && c == document.getElementById("Button" + ((i + 2) * 3 + j)).value) {
            gameOver = true;
            }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (j - 1 >= 0
        && j - 2 >= 0 && document.getElementById("Button" + (i * 3 + j - 1)).value != "click me" && document.getElementById("Button" + (i * 3 + j - 1)).value == document.getElementById("Button" + (i * 3 + j - 2)).value)
    {
        if (document.getElementById("Button" + (i * 3 + j - 1)).value == c && c == document.getElementById("Button" + (i * 3 + j - 2)).value) {
            gameOver = true;
        }
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }
    return -1;
}

function TwoInARow(i, j, c)
{
    var gameOver = false;
    if (i - 1 >= 0 && j - 1 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value != "click me" && document.getElementById("Button" + ((i - 1) * 3 + j - 1)).value == c)
    {
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i - 1 >= 0 && document.getElementById("Button" + ((i - 1) * 3 + j)).value != "click me" && document.getElementById("Button" + ((i - 1) * 3 + j)).value == c)
    {
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i - 1 >= 0 && j + 1 <= 2 && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value != "click me" && document.getElementById("Button" + ((i - 1) * 3 + j + 1)).value == c)
    {
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (j + 1 <= 2 && document.getElementById("Button" + ((i * 3) + j + 1)).value != "click me" && document.getElementById("Button" + ((i * 3) + j + 1)).value == c)
    {
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i + 1 <= 2 && j + 1 <= 2 && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value != "click me" && document.getElementById("Button" + ((i + 1) * 3 + j + 1)).value == c)
    {
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i + 1 <= 2 && document.getElementById("Button" + ((i + 1) * 3 + j)).value != "click me" && document.getElementById("Button" + ((i + 1) * 3 + j)).value == c)
    {
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (i + 1 <= 2 && j - 1 >= 0 && document.getElementById("Button" + ((i + 1) * 3 + j - 1)).value != "click me" && document.getElementById("Button" + ((i + 1) * 3 + j - 1)).value == c)
    {
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }

    if (j - 1 >= 0 && document.getElementById("Button" + (i * 3 + j - 1)).value != "click me" && document.getElementById("Button" + (i * 3 + j - 1)).value == c)
    {
        document.getElementById("Button" + (i * 3 + j)).value = c;
        return i * 3 + j;
    }
    return -1;
}
