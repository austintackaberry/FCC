var idToVal = {
  "number": {
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven":"7",
    "eight":"8",
    "nine":"9",
    "decimal":'.'
  },
  "operator": {
    "minus":"-",
    "plus":"+",
    "multiply":"*",
    "divide":"/"
  }
}

var entry = '';
var main = '';

$(document).ready(function() {
  $(".number").on('click', function() {
    var valClicked = idToVal["number"][$(event.target).attr('id')];
    if (main.match(/[\+\/\-\*]/) == null) {
      main += valClicked;
      entry += valClicked;
    }
    else {
      main = valClicked;
      entry += ' ' + valClicked;
    }
    $('#main').html(main);
    $('#entry').html(entry);
  })
  $(".operator").on('click', function() {
    if (entry.slice(-1).match(/[\+\/\-\*]/) == null) {
      var valClicked = idToVal["operator"][$(event.target).attr('id')];
      entry += ' ' + valClicked;
      main= valClicked;
      $('#main').html(main);
      $('#entry').html(entry);
    }
  })
  $("#all-clear").on('click', function() {
    entry = '';
    main = '';
    $('#main').html(main);
    $('#entry').html(entry);
  })
  $("#clear-entry").on('click', function() {
    var re = new RegExp('.{' + main.length + '}$');
    entry = entry.replace(re, '');
    main = '';
    $('#main').html(main);
    $('#entry').html(entry);
  })
  $("#equals").on("click", function() {
    if (entry.slice(-1).match(/[\+\/\-\*]/) == null) {
      var arrCalc = entry.split(' ');
      var newVal;
      while (arrCalc.length > 2) {
        newVal = calculate([arrCalc[0],arrCalc[1],arrCalc[2]]);
        arrCalc.shift();
        arrCalc.shift();
        arrCalc[0] = newVal;
      }
      main = arrCalc[0];
      entry = '';
      $('#main').html(main);
      $('#entry').html(entry);
    }
  })
})

function calculate(arr) {
  if (arr[1] == '+') {
    return + arr[0] + (+ arr[2]);
  }
  if (arr[1] == '-') {
    return + arr[0] - (+ arr[2]);
  }
  if (arr[1] == '*') {
    return + arr[0] * (+ arr[2]);
  }
  if (arr[1] == '/') {
    return + arr[0] / (+ arr[2]);
  }
}
