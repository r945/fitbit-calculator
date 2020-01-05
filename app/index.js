import document from "document"
import {monospaceDigits} from "./utils.js"
import {addFloatingPoints, 
        subtractFloatingPoints, 
        multiplyFloatingPoints, 
        divideFloatingPoints} from "./utils.js"
import * as messaging from "messaging";

let numberPad = document.getElementById("numberPad");
let operatorPad = document.getElementById("operatorPad");
let result = document.getElementById("result");

let num1 = document.getElementById("1");
let num2 = document.getElementById("2");
let num3 = document.getElementById("3");
let num4 = document.getElementById("4");
let num5 = document.getElementById("5");
let num6 = document.getElementById("6");
let num7 = document.getElementById("7");
let num8 = document.getElementById("8");
let num9 = document.getElementById("9");
let dot = document.getElementById("dot");
let num0 = document.getElementById("0");
let operatorElement = document.getElementById("operator");

let add = document.getElementById("add");
let subtract = document.getElementById("subtract");
let multiply = document.getElementById("multiply");
let divide = document.getElementById("divide");
let clear = document.getElementById("clear");

let memory = "";
let operator = "";
let operand = "";
const upperLimit = 99999999;
const lowerLimit = -9999999;

let numButtonColor = "fb-blue";
let operatorButtonColor = "fb-lime";

/*
 *  Add onmousedown and onmouseup events as a UI effect for a click
 */

let numKeys = document.getElementsByClassName("numberButton");
numKeys.forEach(function(numKey) {
  numKey.onmousedown = function(e) {
    numKey.style.fill = "fb-black";
    numKey.style.opacity = 0.6;
  }
  numKey.onmouseup = function(e) {
    numKey.style.opacity = 0;
  }
});

let operatorKeys = document.getElementsByClassName("operatorButton");
operatorKeys.forEach(function(operatorKey) {
  operatorKey.onmousedown = function(e) {
    operatorKey.style.fill = "fb-black";
    operatorKey.style.opacity = 0.6;
  }
  operatorKey.onmouseup = function(e) {
    operatorKey.style.opacity = 0;
  }
});

let clearKey = document.getElementById("clear");
clearKey.onmousedown = function(e) {
  clearKey.style.fill = "fb-black";
  clearKey.style.opacity = 0.6;
}
clearKey.onmouseup = function(e) {
  clearKey.style.opacity = 0;
}

/*
 *  Reset color scheme based on setting
 */

messaging.peerSocket.onmessage = function(evt) {
  switch(evt.data.val) {
    case "fb-lime":
      numButtonColor = "fb-blue";
      operatorButtonColor = "fb-lime";
      break;
    case "fb-blue":
      numButtonColor = "fb-lavender";
      operatorButtonColor = "fb-blue";
      break;
    case "fb-slate":
      numButtonColor = "fb-light-gray";
      operatorButtonColor = "fb-slate";
      break;
    case "fb-indigo":
      numButtonColor = "fb-cyan";
      operatorButtonColor = "fb-indigo";
      break;
    case "fb-red":
      numButtonColor = "fb-peach";
      operatorButtonColor = "fb-red";
      break;
  }
  numKeys.forEach(function(numKey) {
    numKey.style.fill = numButtonColor;
  });
  operatorKeys.forEach(function(operatorKey) {
    operatorKey.style.fill = operatorButtonColor;
  });
}

/*
 *  Process the number clicks
 */

num1.onclick = function(e) {
  operand = operand.concat("1");
}
num2.onclick = function(e) {
  operand = operand.concat("2");
}
num3.onclick = function(e) {
  operand = operand.concat("3");
}
num4.onclick = function(e) {
  operand = operand.concat("4");
}
num5.onclick = function(e) {
  operand = operand.concat("5");
}
num6.onclick = function(e) {
  operand = operand.concat("6");
}
num7.onclick = function(e) {
  operand = operand.concat("7");
}
num8.onclick = function(e) {
  operand = operand.concat("8");
}
num9.onclick = function(e) {
  operand = operand.concat("9");
}
dot.onclick = function(e) {
  operand = operand.concat(".");
}
num0.onclick = function(e) {
  operand = operand.concat("0");
}

/*
 *  Process operator clicks
 */

operatorElement.onclick = function(e) {
  numberPad.style.display = "none";
  operatorPad.style.display = "inline";
  operand = parseFloat(operand);
  if (memory === "") {
    memory = operand;
  } else {
    switch (operator) {
      case "+":
        memory = addFloatingPoints(memory, operand);
        break;
      case "-":
        memory = subtractFloatingPoints(memory, operand);
        break;
      case "*":
        memory = multiplyFloatingPoints(memory, operand);
        break;
      case "/":
        memory = divideFloatingPoints(memory, operand);
        break;
    }
  }
  operand = "";
  if (memory > upperLimit || memory < lowerLimit) {
    result.text = "OVERFLOW";
  } else {
    result.text = monospaceDigits(memory);
  }
}
add.onclick = function(e) {
  numberPad.style.display = "inline";
  operatorPad.style.display = "none";
  operator = "+";
}
subtract.onclick = function(e) {
  numberPad.style.display = "inline";
  operatorPad.style.display = "none";
  operator = "-";
}
multiply.onclick = function(e) {
  numberPad.style.display = "inline";
  operatorPad.style.display = "none";
  operator = "*";
}
divide.onclick = function(e) {
  numberPad.style.display = "inline";
  operatorPad.style.display = "none";
  operator = "/";
}
clear.onclick = function(e) {
  numberPad.style.display = "inline";
  operatorPad.style.display = "none";
  memory = "";
  operand = "";
  operator = "";
  result.text = "";
}