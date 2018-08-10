"use strict"

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);
window.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mousemove", mouseMove, false);

window.addEventListener("touchstart", touchHandler, true);
window.addEventListener("touchmove", touchHandler, true);
window.addEventListener("touchend", touchHandler, true);


var keys = [];
var currentKeys = [];
var mouses = [];
var currentMouses = [];
var mousePos = new Vector2d(0, 0);
var pMousePos = new Vector2d(0, 0);

function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
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
