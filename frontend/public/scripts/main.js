const toggleButton = document.querySelector("#toggleButton");

console.log("Ready");
toggleButton.addEventListener("click", () => {
    switchTA();
  });

function switchTA(){
    const score_ta1 = document.querySelector("#ta1");
    const score_ta2 = document.querySelector("#ta2");
    const image_ta1 = document.querySelector("#image_ta1");
    const image_ta2 = document.querySelector("#image_ta2");

    if(ta2.classList.contains("hidden")){
        score_ta2.classList.remove("hidden");
        score_ta1.classList.add("hidden");
        image_ta2.classList.remove("hidden");
        image_ta1.classList.add("hidden");
    }
    else{
        score_ta1.classList.remove("hidden");
        score_ta2.classList.add("hidden");
        image_ta1.classList.remove("hidden");
        image_ta2.classList.add("hidden");
    }
}