/* script.js - p.win football battle (Survival Mode)
   - Put your players in the 'players' array (up to 100). Each player needs {name, img}.
   - Open index.html in a browser. Click "شروع بازی" then click a player to make them continue vs a new random opponent.
*/

// ======= EDIT THIS: add up to 100 players (name and image URL) =======
const players = [
  { name: "Lionel Messi", img: "https://i.imgur.com/0bXnC1y.jpg" },
  { name: "Cristiano Ronaldo", img: "https://i.imgur.com/x8AUsyM.jpg" },
  { name: "Kylian Mbappé", img: "https://i.imgur.com/5T3qQDd.jpg" },
  { name: "Erling Haaland", img: "https://i.imgur.com/1L3BeZX.jpg" },
  { name: "Ronaldinho", img: "https://i.imgur.com/qNfDQtV.jpg" },
  { name: "Pelé", img: "https://i.imgur.com/8C0QuxH.jpg" },
  { name: "Diego Maradona", img: "https://i.imgur.com/W2CL7U8.jpg" },
  { name: "Zinedine Zidane", img: "https://i.imgur.com/rruNhnT.jpg" },
  { name: "Neymar Jr", img: "https://i.imgur.com/bbMoDPy.jpg" },
  { name: "Thierry Henry", img: "https://i.imgur.com/v3wcv3V.jpg" }
  // add more players here (remember the trailing comma rule)
];

// ===== internal state =====
let currentPlayers = [];
let winner = null;
let usedIndices = new Set();

// get a random player index that's not used yet and not equal to exceptIndex
function getRandomIndex(exceptIndex = null) {
  const available = [];
  for (let i = 0; i < players.length; i++) {
    if (usedIndices.has(i)) continue;
    if (i === exceptIndex) continue;
    available.push(i);
  }
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function startBattle() {
  document.getElementById('winner').textContent = '';
  // initial pick
  if (!winner) {
    usedIndices.clear();
    const i1 = getRandomIndex();
    if (i1 === null) { document.getElementById('winner').textContent = 'لیست بازیکنان خالی است'; return; }
    usedIndices.add(i1);
    const i2 = getRandomIndex(i1);
    if (i2 === null) { document.getElementById('winner').textContent = `🏆 قهرمان نهایی: ${players[i1].name}`; return; }
    usedIndices.add(i2);
    currentPlayers = [i1, i2];
  } else {
    // winner stays, opponent replaced
    const newIndex = getRandomIndex(currentPlayers[0]); // ensure not same as winner's index
    if (newIndex === null) {
      document.getElementById('winner').textContent = `🏆 قهرمان نهایی: ${winner.name}`;
      return;
    }
    usedIndices.add(newIndex);
    // winner index should be currentPlayers[0] for continuity
    currentPlayers = [players.findIndex(p => p.name === winner.name), newIndex];
  }
  renderPlayers();
}

function renderPlayers() {
  const p1 = players[currentPlayers[0]];
  const p2 = players[currentPlayers[1]];
  const player1El = document.getElementById('player1');
  const player2El = document.getElementById('player2');
  player1El.innerHTML = `<img src="${p1.img}" alt="${p1.name}"><h3>${p1.name}</h3>`;
  player2El.innerHTML = `<img src="${p2.img}" alt="${p2.name}"><h3>${p2.name}</h3>`;
}

// choose winner: index 0 or 1 (refers to currentPlayers array)
function chooseWinner(side) {
  winner = players[currentPlayers[side]];
  document.getElementById('winner').textContent = `✅ برنده فعلی: ${winner.name}`;
  // highlight briefly
  const el = side === 0 ? document.getElementById('player1') : document.getElementById('player2');
  el.style.boxShadow = '0 0 30px rgba(16,185,129,0.6)';
  setTimeout(() => { el.style.boxShadow = ''; startBattle(); }, 700);
}

// UI bindings
document.getElementById('player1').addEventListener('click', () => chooseWinner(0));
document.getElementById('player2').addEventListener('click', () => chooseWinner(1));
document.getElementById('restart').addEventListener('click', () => {
  winner = null; usedIndices.clear(); startBattle();
});
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  startBattle();
});

// show players list toggle
document.getElementById('showList').addEventListener('click', () => {
  const listEl = document.getElementById('playerList');
  const ta = document.getElementById('playersTextarea');
  if (listEl.classList.contains('hidden')) {
    // populate textarea with names
    ta.value = players.map(p => p.name).join('\n');
    listEl.classList.remove('hidden');
  } else {
    listEl.classList.add('hidden');
  }
});

// populate textarea on load (read-only)
document.addEventListener('DOMContentLoaded', () => {
  const ta = document.getElementById('playersTextarea');
  ta.value = players.map(p => p.name).join('\n');
});
