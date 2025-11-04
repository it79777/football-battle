const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const fightBtn = document.getElementById("fight-btn");
const player1Div = document.getElementById("player1");
const player2Div = document.getElementById("player2");
const winnerDiv = document.getElementById("winner");

const players = [
  "p.win", "مسی", "رونالدو", "رونالدینیو", "پله", "مارادونا", "ام‌باپه", "هالند",
  "زیدان", "بکهام", "صلاح", "نیمار", "کاکا", "بنزما", "رونی", "راموس", "دی بروینه",
  "مودریچ", "کروس", "ابراهیموویچ", "ژاوی", "اینیستا", "بوفون", "مالدینی", "پیرلو",
  "کاسیاس", "نانی", "سانچو", "فودن", "هری کین", "روبرتو کارلوس", "ریوالدو",
  "توتی", "شوچنکو", "دروگبا", "لمپارد", "جرارد", "کانته", "مارسیال", "دیبالا",
  "وینیسیوس", "هاوی سیمونز", "تورام", "ژائو فلیکس", "انزو فرناندز", "کولو موآنی",
  "دل پیرو", "باتیستوتا", "پاول ندود", "پاتریس اورا", "تر اشتگن", "نویِر", "الیسون",
  "ادرسون", "اوسپینا", "اوبلاک", "ریچارلیسون", "کاسمیرو", "واران", "اوتامندی",
  "آلابا", "مارکوس یورنته", "سانچز", "آرتور", "پدری", "گاوی", "کولیبالی", "رویس",
  "هاورتز", "مانه", "ژوتا", "کیتا", "فیرمینو", "مارتینلی", "ساكا", "رایس", "واردی",
  "تروسار", "گابریل ژسوس", "آلن", "جیمز رودریگز", "والکات", "مارسیو", "سوارز",
  "کوانی", "گریلیش", "دیاز", "استرلینگ", "مخیتاریان", "دمبله", "گریزمان",
  "پوگبا", "آسنسیو", "بالاک", "هنری", "برکمپ", "تورس", "ژاوی آلونسو", "رابن"
];

let currentPlayers = [];

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  newBattle();
});

fightBtn.addEventListener("click", () => {
  winnerDiv.textContent = "";
  newBattle();
});

function newBattle() {
  const p1 = players[Math.floor(Math.random() * players.length)];
  const p2 = players[Math.floor(Math.random() * players.length)];
  if (p1 === p2) return newBattle();

  player1Div.textContent = p1;
  player2Div.textContent = p2;

  player1Div.onclick = () => selectWinner(p1);
  player2Div.onclick = () => selectWinner(p2);
}

function selectWinner(winner) {
  winnerDiv.textContent = `🏆 برنده: ${winner}`;
  player1Div.onclick = null;
  player2Div.onclick = null;
}
