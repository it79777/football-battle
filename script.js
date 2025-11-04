// p.win Football Battle ⚡ - Survivor Mode

const players = [
  "رونالدینیو", "پله", "مارادونا", "مسی", "رونالدو", "رونی", "بکام", "زیدان",
  "نیمار", "صلاح", "ام‌باپه", "هالند", "کروس", "لوکا مودریچ", "راموس", "بنزما",
  "رابرت لواندوفسکی", "وینیسیوس", "دی بروینه", "ریوالدو", "روماریو", "بوفون",
  "تیری آنری", "ژاوی", "اینیستا", "پویول", "توماس مولر", "سون", "کین", "کاوانی",
  "رابرت پیرس", "دروگبا", "شیرو", "هری مگوایر 😅", "دیبالا", "توتی", "دل پیرو",
  "اوزیل", "کاسمیرو", "هالک", "جورج بست", "ریو فردیناند", "کلوزه", "اِتو",
  "هاوی مارتینز", "باتیستوتا", "کافو", "رائول", "کاکا", "بیرکمپ", "ژرژ وه‌آ"
];

let currentChampion = null;
let opponent = null;
let remainingPlayers = [];
const result = document.getElementById("result");
const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next");

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextRound);

function startGame() {
  result.innerHTML = "";
  remainingPlayers = [...players];
  shuffle(remainingPlayers);
  currentChampion = remainingPlayers.pop();
  opponent = remainingPlayers.pop();
  showMatch();
}

function showMatch() {
  result.innerHTML = `
    <h3>⚽
