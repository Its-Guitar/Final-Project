const toggleButton = document.querySelector("#toggleButton");

//TA image
const main_image1 = document.querySelector("#image_ta1");
const main_image2 = document.querySelector("#image_ta2");

//Score of each TA
export const count1 = document.querySelector("#ta1");
export const count2 = document.querySelector("#ta2");

//Pop sound
const popSound = document.getElementById("popSound");

export var score1 = { value: 0 };
export var score2 = { value: 0 };

export var skillCount1 = { value: 0 };
export var skillCount2 = { value: 0 };

export var whichTa = 1;

var bonusActive = false;


console.log("Ready");
toggleButton.addEventListener("click", () => {
    switchTA();
});

main_image1.addEventListener("mousedown", () => {
    main_image1.src = "../resources/TA_1_popNew.png";
    addScore(main_image1, score1, count1, skillCount1);
    popSound.currentTime = 0;
    popSound.play();
    main_image1.setAttribute("draggable", false);
});

main_image1.addEventListener("mouseup", () => {
    main_image1.src = "../resources/TA_1.png";
});
main_image2.addEventListener("mousedown", () => {
    addScore(main_image2, score2, count2, skillCount2);
    popSound.currentTime = 0;
    popSound.play();
    main_image2.setAttribute("draggable", false);
});

//switch team TA JomnoiZ <-> TA Oat
function switchTA() {
    const score_ta1 = document.querySelector("#ta1");
    const score_ta2 = document.querySelector("#ta2");
    const image_ta1 = document.querySelector("#image_ta1");
    const image_ta2 = document.querySelector("#image_ta2");

    if (ta2.classList.contains("hidden")) {
        score_ta2.classList.remove("hidden");
        score_ta1.classList.add("hidden");
        image_ta2.classList.remove("hidden");
        image_ta1.classList.add("hidden");
    }
    else {
        score_ta1.classList.remove("hidden");
        score_ta2.classList.add("hidden");
        image_ta1.classList.remove("hidden");
        image_ta2.classList.add("hidden");
    }

    if (whichTa == 1) {
        whichTa = 2;
    } else {
        whichTa = 1;
    }
}

//increment score
function addScore(image, score, count, skillCount) {
    if (bonusActive == true) {
        score.value += 2;
        skillCount.value++;
        count.innerHTML = parseInt(score.value);
    } else {
        score.value++;
        skillCount.value++;
        count.innerHTML = parseInt(score.value);
    }
}

export function activateBonus() {
    bonusActive = true;
    setTimeout(deactivateBonus, 10000);
}

function deactivateBonus() {
    bonusActive = false;
}
