// API - https://api.adviceslip.com/
const api = "https://api.adviceslip.com/advice";

const adviceID = document.querySelector(".id");
const adviceMessage = document.querySelector(".card__message");
const newAdviceBtn = document.querySelector(".btn");

newAdviceBtn.addEventListener("click", getAdvice);

function getAdvice() {
  fetch(api)
    .then((res) => res.json())
    .then((advice) => setAdvice(advice));
}

function setAdvice(advice) {
  adviceID.innerText = advice.slip.id;
  adviceMessage.innerText = advice.slip.advice;
}

window.addEventListener("load", getAdvice);
