// script.js — P.Win Football Arena (optimized, 80 players, images placeholder)
// Note: to replace a player's image, edit players[i].img with a real image URL.

const players = [
  "شرک 🧅","هری مگوایر 🧱","آنتونی ⚽",
  "مسی","کریستیانو رونالدو","نیمار","هالند","امباپه","رونالدینیو","پله",
  "مارادونا","زیدان","بکهم","کاکا","ژاوی","اینیستا","توتی","رونی","بنزما","صلاح",
  "مودریچ","دل پیرو","ریوالدو","باتیستوتا","دروگبا","جرارد","لام","مالدینی","کاناوارو","بوفون",
  "کورتوا","نویر","الیسون","دی بروینه","کانته","پویول","سانچو","راکیتیچ","دیبالا","هری کین",
  "سون هیونگ مین","لوکاکو","فرد","برونو فرناندز","وینیسیوس","رودری","آلابا","مارسیلو","راموس","کارواخال",
  "روبرتو کارلوس","شیرو","ماتوئیدی","کروس","کاسمیرو","پدری","گاوی","اوبامیانگ","فیرمینو","مانه",
  "محرز","گریلیش","ریس جیمز","فودن","مارتینلی","ژسوس","رشفورد","سانه","لاوتارو","اوسیمهن",
  "والکات","والنسیا","زلاتان","ریبری","رابن","تورام","کولو توره","وایران","آدریانو"
];

// build array of player objects with image urls (placeholder service)
const playersData = players.map((name, i) => {
  // unique placeholder per player using i as seed
  const img = `https://i.pravatar.cc/400?u=pwin_player_${i}`;
  return { name, img };
});

// DOM refs
const arena = document.getElementById('arena');
const info = document.getElementById('info');
const startBtn = document.getElementById('start');
const nextBtn = document.getElementById('next');
const roundEl = document.getElementById('round');

let remaining = [];
let champion = null;
let opponent = null;
let round = 0;

startBtn.addEventListener('click', () => {
  remaining = shuffle([...playersData]);
  champion = remaining.pop();
  opponent = remaining.pop();
  round = 1;
  renderArena();
  updateControls();
});

nextBtn.addEventListener('click', () => {
  if (remaining.length === 0) {
    info.innerHTML = `🏁 همه بازیکنان استفاده شدند. قهرمان: <strong>${champion.name}</strong>`;
    nextBtn.classList.add('hidden');
    return;
  }
  // opponent replaced by next remaining
  opponent = remaining.pop();
  renderArena();
  nextBtn.classList.add('hidden');
  round++;
  updateControls();
});

function renderArena() {
  arena.innerHTML = '';
  roundEl.textContent = `مرحله ${round}`;
  roundEl.classList.remove('hidden');

  // helper to create card
  function makeCard(playerObj, side) {
    const div = document.createElement('div');
    div.className = 'card';
    if (side === 'champion') div.classList.add('winner');
    div.innerHTML = `
      <img class="thumb" loading="lazy" src="${playerObj.img}" alt="${playerObj.name}" />
      <div class="name">${playerObj.name}</div>
      <div class="status">${side === 'champion' ? '🏆 برنده فعلی' : 'رقیب'}</div>
    `;
    // click behavior: selecting winner
    div.addEventListener('click', () => {
      // if user clicks champion -> champion wins; if clicks opponent -> opponent becomes champion
      if (playerObj.name === champion.name) {
        showWinner(champion);
      } else {
        // opponent chosen as winner
        champion = playerObj;
        showWinner(champion);
      }
    });
    return div;
  }

  // champion card (left)
  const left = makeCard(champion, 'champion');
  // vs text
  const vs = document.createElement('div'); vs.innerHTML = '<h2 style="margin:0;color:#ffd166">VS</h2>';
  // opponent card (right)
  const right = makeCard(opponent, 'opponent');

  arena.appendChild(left);
  arena.appendChild(vs);
  arena.appendChild(right);

  info.innerHTML = `بازیکنان باقی‌مانده: <strong>${remaining.length}</strong>`;
}

function showWinner(playerObj) {
  info.innerHTML = `✅ ${playerObj.name} انتخاب شد و برنده موقت است. برای آوردن رقیب بعدی «مرحله بعد» را بزن.`;
  // highlight winner card
  const cards = document.querySelectorAll('.card');
  cards.forEach(c => c.classList.remove('winner'));
  // set winner card visually
  // find the card with same name
  const all = Array.from(document.querySelectorAll('.card'));
  const match = all.find(c => c.querySelector('.name').textContent === playerObj.name);
  if (match) match.classList.add('winner');
  // ensure champion set
  champion = playerObj;
  if (remaining.length > 0) nextBtn.classList.remove('hidden');
  else {
    info.innerHTML = `👑 قهرمان نهایی: <strong>${champion.name}</strong>`;
    nextBtn.classList.add('hidden');
  }
}

// fisher-yates shuffle
function shuffle(arr){
  for (let i = arr.length -1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
