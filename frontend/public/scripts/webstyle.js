document.addEventListener("DOMContentLoaded", function() {
    // Show the modal when the page is loaded
    console.log("Page loaded");
    var modal = document.getElementById("infoModal");
    modal.style.opacity = "0";
    modal.style.display = "block";
    fadeIn(modal, 300);

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        fadeOut(modal, 300, function() {
            modal.style.display = "none";
        });
    }
});

//function to lock orientation
//if the browser supports screen.orientation.lock, use it
//normally, on mobile devices, screen.lockOrientation is used
function lockOrientation() {
    if (screen.orientation.lock) {
        screen.orientation.lock("portrait");
    } else if (screen.lockOrientation) {
        screen.lockOrientation("portrait");
    } else if (screen.mozLockOrientation) {
        screen.mozLockOrientation("portrait");
    } else if (screen.msLockOrientation) {
        screen.msLockOrientation("portrait");
    }
}

lockOrientation();

function moveContent() {
    var content = document.querySelector(".modal-content");
    var init = window.innerHeight / 2;
    var top = 0;
    var direction = 1;
    var interval = 50;

    function animateContent() {
        top += direction;
        content.style.top = init + top + "px";

        if (top >= 10 || top <= -10) {
            direction *= -1;
        }
    }

    var animation = setInterval(animateContent, interval);

    window.onclick = function(event) {
        clearInterval(animation);
    }
}

moveContent();
//function to fade in and fade out
function fadeIn(element, duration) {
    var opacity = 0;
    var interval = 50;
    var gap = interval / duration;

    element.style.display = "block";
    element.style.opacity = opacity;

    function increaseOpacity() {
        opacity += gap;
        element.style.opacity = opacity;

        if (opacity >= 1) {
            clearInterval(fading);
        }
    }

    var fading = setInterval(increaseOpacity, interval);
}

function fadeOut(element, duration, callback) {
    var opacity = 1;
    var interval = 50;
    var gap = interval / duration;

    function decreaseOpacity() {
        opacity -= gap;
        element.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(fading);
            callback();
        }
    }

    var fading = setInterval(decreaseOpacity, interval);
}

