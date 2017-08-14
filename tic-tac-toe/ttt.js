var userJustClicked;
var totalMoves = 0;
var board = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];


$(document).ready(function() {
  $(document).on("click", function() {
    var elemClicked = $(event.target).attr('class').split(' ');
    if (elemClicked[0].charAt(0) == 'r' && elemClicked[1].charAt(0) == 'c') {
      if (board[elemClicked[0].charAt(1)-1][elemClicked[1].charAt(1)-1] == 0) {
        elemClickedFormat = "." + elemClicked[0]+"."+elemClicked[1];
        console.log(elemClickedFormat);
        $(elemClickedFormat).html("X");
        totalMoves++;
        board[elemClicked[0].charAt(1)-1][elemClicked[1].charAt(1)-1] = 1;
        checkWin();
        if (totalMoves == 9) {
          return 0;
        }
        return AI();
      }
    }
  });
});

function AI() {
  if (board[1][1] === 0) {
    $(".r2.c2").html("O");
    board[1][1] = -1;
    totalMoves++;
  }
  else if (totalMoves === 1) {
    $(".r1.c1").html("O");
    board[0][0] = -1;
    totalMoves++;
  }
  else {
    var boardVal;
    do {
      var i = Math.floor(Math.random()*3);
      var j = Math.floor(Math.random()*3);
      boardVal = board[i][j];
    }
    while (boardVal != 0);
    board[i][j] = -1;
    $(".r"+(i+1)+".c"+(j+1)).html("O");
    totalMoves++;
    checkWin();
  }
  return 0;
}

function checkWin() {
  var countWin = whoWins(checkRow()) + whoWins(checkCol()) + whoWins(checkCross());
  if (totalMoves == 9 && countWin == 0) {
    $("h1").html("CATS GAME");
    return 0;
  }
}

function checkCross() {
  var counter1 = board[0][0] + board[1][1] + board[2][2];
  if (counter1 == 3 || counter1 == -3) {
    return counter1;
  }
  var counter2 = board[2][0] + board[1][1] + board[0][2];
  if (counter2 == 3 || counter2 == -3) {
    return counter2;
  }
}

function checkCol() {
  var counterCol = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      counterCol += board[j][i];
    }
    if (counterCol == 3 || counterCol == -3) {
      return counterCol;
    }
    counterCol = 0;
  }
  return 0;
}

function checkRow() {
  var counterRow = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      counterRow += board[i][j];
    }
    if (counterRow == 3 || counterRow == -3) {
      return counterRow;
    }
    counterRow = 0;
  }
  return 0;
}


function whoWins(counter) {
  if (counter == 3) {
    $("h1").html("USER WINS");
    return 1;
  }
  else if (counter == -3) {
    $("h1").html("AI WINS");
    return 1;
  }
  return 0;
}

var topLeft;
console.log(topLeft);
