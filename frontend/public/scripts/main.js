import { getScore, updateScore } from './api.js';
import {registerClick} from './webstyle.js';
const toggleButton = document.querySelector("#toggleButton");

//TA image
const main_image1 = document.querySelector("#image_ta1");
const main_image2 = document.querySelector("#image_ta2");

//Score of each TA
export const count1 = document.querySelector("#ta1");
export const count2 = document.querySelector("#ta2");
export const totalCount1 = document.querySelector("#ta1Clicks");
export const totalCount2 = document.querySelector("#ta2Clicks");

//Pop sound
const sounds = [
    document.getElementById("popSound1"),
    document.getElementById("popSound2"),
    document.getElementById("popSound3"),
    document.getElementById("popSound4"),
    document.getElementById("popSound5")
  ];

export var score1 = { value: 0 };
export var score2 = { value: 0 };

export var skillCount = { value: 0 };

export var whichTa = 1;

var bonusActive = false;

// var usedSkillCount = {skill1:0,skill2:0,skill3:0};

// var activateCombo1 = false;
// var activateCombo2 = false;
// var expired = false;

let globalScore_ta1;
let globalScore_ta2;

const score1EachInterval={value: 0}, 
        score2EachInterval={value: 0};

console.log("Ready");

//Update your current score from backend
await backendUpdateScore();
totalCount1.innerHTML = globalScore_ta1.value;
totalCount2.innerHTML = globalScore_ta2.value;

//Update your current score from local storage
if (localStorage.getItem("score1") != null) {
    score1.value = parseInt(localStorage.getItem("score1"));
    count1.innerHTML = parseInt(score1.value);
    totalCount1.innerHTML = globalScore_ta1.value;

    score2.value = parseInt(localStorage.getItem("score2"));
    count2.innerHTML = parseInt(score2.value);
    totalCount2.innerHTML = globalScore_ta2.value;
}

toggleButton.addEventListener("click", () => {
    switchTA();
});



//Event listener for button
document.querySelector('.tab').addEventListener('click', function() {
    var buttonContainer = document.getElementById('button-container');
    var tableContainer = document.querySelector(".table");
    if (buttonContainer.style.display === 'none') {
      buttonContainer.style.display = 'block';
      if (window.matchMedia("(max-width: 1100px)").matches){
        tableContainer.style.display = 'none';
      }
    } else {
      buttonContainer.style.display = 'none';
      tableContainer.style.display = 'block';
    }
});

//Event listener for TA image

//main_image1 is TA JomnoiZ
main_image1.addEventListener("mousedown", () => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        main_image1.src = "../resources/TA_1_popNew.png";
        registerClick();
        handleStart(main_image1, score1, count1, score1EachInterval, skillCount, globalScore_ta1);
    }
});
main_image1.addEventListener("touchstart", () => {
    main_image1.src = "../resources/TA_1_popNew.png";
    handleStart(main_image1, score1, count1, score1EachInterval, skillCount, globalScore_ta1);
});
main_image1.addEventListener("mouseup", () => {
    main_image1.src = "../resources/TA_1.png";
});

main_image1.addEventListener("mouseleave", () => {
    main_image1.src = "../resources/TA_1.png";
});

main_image1.addEventListener("touchend", () => {
    main_image1.src = "../resources/TA_1.png";
});

//main_image2 is TA Faro
main_image2.addEventListener("mousedown", () => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        main_image2.src = "../resources/TA_2_pop.png";
        handleStart(main_image2, score2, count2, score2EachInterval, skillCount, globalScore_ta2);
    }
});
main_image2.addEventListener("touchstart", () => {
    main_image2.src = "../resources/TA_2_pop.png";
    handleStart(main_image2, score2, count2, score2EachInterval, skillCount, globalScore_ta2);
});

main_image2.addEventListener("mouseup", () => {
    main_image2.src = "../resources/TA_2.png";
});

main_image2.addEventListener("mouseleave", () => {
    main_image2.src = "../resources/TA_2.png";
});

main_image2.addEventListener("touchend", () => {
    main_image2.src = "../resources/TA_2.png";
});

function handleStart(image, score, count, scoreEachInterval, skillCount, globalScore) {
    addScore(image, score, count, scoreEachInterval, skillCount, globalScore);
    
    // Select a random sound from the array
    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    
    sound.currentTime = 0;
    sound.play();
    
    image.setAttribute("draggable", false);
}

//-----------------Functions-----------------


//switch team TA JomnoiZ <-> TA Faro
function switchTA() {
    const score_ta1 = document.querySelector("#ta1");
    const score_ta2 = document.querySelector("#ta2");
    const image_ta1 = document.querySelector("#image_ta1");
    const image_ta2 = document.querySelector("#image_ta2");

    if (ta2.classList.contains("hidden")) {
        score_ta2.classList.remove("hidden");
        score_ta1.classList.add("hidden");
        image_ta1.classList.add("fade-spin-out");
        setTimeout(function() {
            image_ta1.classList.add("hidden");
            image_ta1.classList.remove("fade-spin-out");
            void image_ta1.offsetWidth; // Reflow the element
            image_ta2.classList.remove("hidden");
            image_ta2.classList.add("fade-spin-in");
            setTimeout(function() {
                image_ta2.classList.remove("fade-spin-in");
                void image_ta2.offsetWidth; // Reflow the element
            }, 500);
        }, 500);
    } else {
        score_ta1.classList.remove("hidden");
        score_ta2.classList.add("hidden");
        image_ta2.classList.add("fade-spin-out");
        setTimeout(function() {
            image_ta2.classList.add("hidden");
            image_ta2.classList.remove("fade-spin-out");
            void image_ta2.offsetWidth; // Reflow the element
            image_ta1.classList.remove("hidden");
            image_ta1.classList.add("fade-spin-in");
            setTimeout(function() {
                image_ta1.classList.remove("fade-spin-in");
                void image_ta1.offsetWidth; // Reflow the element
            }, 500);
        }, 500);
    }

    if (whichTa == 1) {
        whichTa = 2;
    } else {
        whichTa = 1;
    }
}


//increment score
async function addScore(image, score, count, scoreEachInterval, skillCount, globalScore) {
    if (activatedCombo1==true){
    //     score.value +=3;
    // }else if (activatedCombo2==true){
    //     score.value ++;
    //     if(expired==true){
    //         score.value+=150;
    //         expired = false;
    //     }
    // }else if (bonusActive == true) {
        score.value += 2;
    }else {
        score.value++;
    }

    skillCount.value++;
    globalScore.value++;
    count.innerHTML = parseInt(score.value);
    
    //count_.innerHTML = globalScore.value;
    scoreEachInterval.value++;
    if(bonusActive){
        scoreEachInterval.value++;
    }
    //console.log(scoreEachInterval.value);

    localStorage.setItem("score1", score1.value);
    localStorage.setItem("score2", score2.value);
}

//Send the new totalScore value to backend every 5 seconds, and update the totalScore value from backend
setInterval(async () => {
    //console.log("Updating score...");
    await sendTotalScore();
    await backendUpdateScore();
    //totalCount1.innerHTML = globalScore_ta1.value;
    //totalCount2.innerHTML = globalScore_ta2.value;
    updateCount1();
    updateCount2();
}, 5000);

//function that send total score to backend
async function sendTotalScore(){
    await Promise.all([
        updateScore(`ta1`, score1EachInterval.value),
        updateScore(`ta2`, score2EachInterval.value)
    ]);
    //console.log(score1EachInterval.value, score2EachInterval.value);

    //reset scoreEachInterval
    score1EachInterval.value = 0;
    score2EachInterval.value = 0;
}
async function backendUpdateScore(){
    const scores = await getScore();
    //console.log(scores);
    globalScore_ta1 = {value: scores[0].score};
    globalScore_ta2 = {value: scores[1].score};
}

export function activateBonus() {
    bonusActive = true;
    setTimeout(deactivateBonus, 10000);
}

export function sendUpdateScore(amount,ta){
    if(ta==1){
        score1EachInterval.value += amount;
        count1.innerHTML = parseInt(score1.value); //this line just to update the score from skill.js immediately
    }
    else{
        score2EachInterval.value += amount;
        count1.innerHTML = parseInt(score1.value); //this line just to update the score from skill.js immediately
    }
}
function deactivateBonus() {
    bonusActive = false;
}
export function activateCombo1(){
    if(usedSkillCount.skill2===2 && usedSkillCount.skill3 === 1){
        activateCombo1 = true;
        setTimeout(deactivateCombo1,20000);
    }
}
export function activateCombo2(){
    if(usedSkillCount.skill2===2 && usedSkillCount.skill3 === 1){
        activateCombo2 = true;
        setTimeout(deactivateCombo2,5000);
    }
}
function resetCountUsedSkill(){
    usedSkillCount= {skill1:0,skill2:0,skill3:0};
}
function deactivateCombo1(){
    activateCombo1 = false;
    resetCountUsedSkill();
}
function deactivateCombo2(){
    activateCombo1 = false;
    resetCountUsedSkill();
    expired = true;
}

let intervalId1, intervalId2;

function updateCount1() {
    clearInterval(intervalId1);
    let start = parseInt(totalCount1.innerHTML);
    let end = globalScore_ta1.value;
    let step = (end - start) / 50;
    let current = start;
    intervalId1 = setInterval(() => {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
            current = end;
            clearInterval(intervalId1);
        }
        totalCount1.innerHTML = Math.round(current);
    }, 100);
}

function updateCount2() {
    clearInterval(intervalId2);
    let start = parseInt(totalCount2.innerHTML);
    let end = globalScore_ta2.value;
    let step = (end - start) / 50;
    let current = start;
    intervalId2 = setInterval(() => {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
            current = end;
            clearInterval(intervalId2);
        }
        totalCount2.innerHTML = Math.round(current);
    }, 100);

}