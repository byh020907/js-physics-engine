"use strict"

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);
window.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mousemove", mouseMove, false);

window.addEventListener("touchstart", onTouch, false);
window.addEventListener("touchmove", onTouch, false);
window.addEventListener("touchend", onTouch, false);


var keys = [];
var currentKeys = [];
var mouses = [];
var currentMouses = [];
var mousePos = new Vector2d(0, 0);
var pMousePos = new Vector2d(0, 0);

function onTouch(evt) {
  evt.preventDefault();
  if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
    return;

  var newEvt = document.createEvent("MouseEvents");
  var type = null;
  var touch = null;

  switch (evt.type) {
    case "touchstart":
      type = "mousedown";
      touch = evt.changedTouches[0];
      break;
    case "touchmove":
      type = "mousemove";
      touch = evt.changedTouches[0];
      break;
    case "touchend":
      type = "mouseup";
      touch = evt.changedTouches[0];
      break;
  }

  newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
    touch.screenX, touch.screenY, touch.clientX, touch.clientY,
    evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
  evt.originalTarget.dispatchEvent(newEvt);
}

function isKeyDown(keyCode) {
    return currentKeys[keyCode];
}

function isKeyPressed(keyCode) {
    return isKeyDown(keyCode) && !keys[keyCode];
}

function isKeyReleased(keyCode) {
    return !isKeyDown(keyCode) && keys[keyCode];
}

function keyDown(e) {
    currentKeys[e.keyCode] = true;
    uiManager.keyDown(e);
}

function keyUp(e) {
    currentKeys[e.keyCode] = false;
    uiManager.keyUp(e);
}

function isMouseDown(which) {
    return currentMouses[which];
}

function isMousePressed(which) {
    return isMouseDown(which) && !mouses[which];
}

function isMouseReleased(which) {
    return !isMouseDown(which) && mouses[which];
}

function mouseDown(e) {
    switch (e.which) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    }
    currentMouses[e.which] = true;

    uiManager.mouseDown(e);
}

function mouseUp(e) {
    switch (e.which) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    }
    currentMouses[e.which] = false;
}

function getMouseX() {
    return mousePos.x;
}

function getMouseY() {
    return mousePos.y;
}

function mouseMove(e) {
    pMousePos.set(mousePos);
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
}

function inputLoop() {
    for (var i = 0; i < 300; i++) {
        keys[i] = isKeyDown(i);
    }

    for (var i = 1; i <= 3; i++) {
        mouses[i] = isMouseDown(i);
    }
}
