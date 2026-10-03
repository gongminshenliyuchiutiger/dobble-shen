/**
 * DobbleShen - 哆寶反應力尋寶大對決
 * 遊戲主邏輯、有限射影平面生成演算法、音效合成引擎、粒子系統、吉祥物拖曳控制、明暗雙模式
 * 版權宣告：Copyright © Liyuchiutiger Gongminshen
 */

// ==========================================================================
// 1. Font Awesome 向量圖示庫（精選 60 款高辨識度向量圖標與專屬色彩，絕不使用一般系統 Emoji）
// ==========================================================================
const SYMBOL_LIBRARY = [
  { id: 0, icon: 'fa-solid fa-star', name: '星星', color: '#f59e0b' },
  { id: 1, icon: 'fa-solid fa-heart', name: '愛心', color: '#ef4444' },
  { id: 2, icon: 'fa-solid fa-bolt', name: '閃電', color: '#eab308' },
  { id: 3, icon: 'fa-solid fa-fire', name: '火焰', color: '#f97316' },
  { id: 4, icon: 'fa-solid fa-gem', name: '寶石', color: '#06b6d4' },
  { id: 5, icon: 'fa-solid fa-ghost', name: '幽靈', color: '#8b5cf6' },
  { id: 6, icon: 'fa-solid fa-sun', name: '太陽', color: '#f59e0b' },
  { id: 7, icon: 'fa-solid fa-moon', name: '月亮', color: '#38bdf8' },
  { id: 8, icon: 'fa-solid fa-cloud', name: '雲朵', color: '#38bdf8' },
  { id: 9, icon: 'fa-solid fa-droplet', name: '水滴', color: '#0ea5e9' },
  { id: 10, icon: 'fa-solid fa-leaf', name: '樹葉', color: '#10b981' },
  { id: 11, icon: 'fa-solid fa-tree', name: '樹木', color: '#059669' },
  { id: 12, icon: 'fa-solid fa-apple-whole', name: '蘋果', color: '#dc2626' },
  { id: 13, icon: 'fa-solid fa-lemon', name: '檸檬', color: '#facc15' },
  { id: 14, icon: 'fa-solid fa-pepper-hot', name: '辣椒', color: '#ef4444' },
  { id: 15, icon: 'fa-solid fa-pizza-slice', name: '披薩', color: '#ea580c' },
  { id: 16, icon: 'fa-solid fa-burger', name: '漢堡', color: '#f59e0b' },
  { id: 17, icon: 'fa-solid fa-cake-candles', name: '蛋糕', color: '#ec4899' },
  { id: 18, icon: 'fa-solid fa-ice-cream', name: '冰淇淋', color: '#f43f5e' },
  { id: 19, icon: 'fa-solid fa-mug-hot', name: '熱咖啡', color: '#d97706' },
  { id: 20, icon: 'fa-solid fa-cat', name: '貓咪', color: '#fb923c' },
  { id: 21, icon: 'fa-solid fa-dog', name: '狗狗', color: '#f97316' },
  { id: 22, icon: 'fa-solid fa-fish', name: '魚兒', color: '#06b6d4' },
  { id: 23, icon: 'fa-solid fa-crow', name: '烏鴉', color: '#94a3b8' },
  { id: 24, icon: 'fa-solid fa-frog', name: '青蛙', color: '#22c55e' },
  { id: 25, icon: 'fa-solid fa-spider', name: '蜘蛛', color: '#a855f7' },
  { id: 26, icon: 'fa-solid fa-dragon', name: '神龍', color: '#8b5cf6' },
  { id: 27, icon: 'fa-solid fa-shield-halved', name: '盾牌', color: '#3b82f6' },
  { id: 28, icon: 'fa-solid fa-crown', name: '皇冠', color: '#fbbf24' },
  { id: 29, icon: 'fa-solid fa-key', name: '鑰匙', color: '#eab308' },
  { id: 30, icon: 'fa-solid fa-bell', name: '鈴鐺', color: '#f59e0b' },
  { id: 31, icon: 'fa-solid fa-anchor', name: '船錨', color: '#0284c7' },
  { id: 32, icon: 'fa-solid fa-bomb', name: '炸彈', color: '#f43f5e' },
  { id: 33, icon: 'fa-solid fa-skull', name: '骷髏', color: '#f1f5f9' },
  { id: 34, icon: 'fa-solid fa-umbrella', name: '雨傘', color: '#06b6d4' },
  { id: 35, icon: 'fa-solid fa-car', name: '汽車', color: '#ef4444' },
  { id: 36, icon: 'fa-solid fa-plane', name: '飛機', color: '#38bdf8' },
  { id: 37, icon: 'fa-solid fa-rocket', name: '火箭', color: '#f43f5e' },
  { id: 38, icon: 'fa-solid fa-bicycle', name: '自行車', color: '#10b981' },
  { id: 39, icon: 'fa-solid fa-guitar', name: '吉他', color: '#ea580c' },
  { id: 40, icon: 'fa-solid fa-music', name: '音符', color: '#a855f7' },
  { id: 41, icon: 'fa-solid fa-camera', name: '相機', color: '#0ea5e9' },
  { id: 42, icon: 'fa-solid fa-gamepad', name: '遊戲手把', color: '#818cf8' },
  { id: 43, icon: 'fa-solid fa-futbol', name: '足球', color: '#f8fafc' },
  { id: 44, icon: 'fa-solid fa-basketball', name: '籃球', color: '#f97316' },
  { id: 45, icon: 'fa-solid fa-trophy', name: '獎盃', color: '#facc15' },
  { id: 46, icon: 'fa-solid fa-medal', name: '獎牌', color: '#eab308' },
  { id: 47, icon: 'fa-solid fa-magnet', name: '磁鐵', color: '#ef4444' },
  { id: 48, icon: 'fa-solid fa-lightbulb', name: '燈泡', color: '#fde047' },
  { id: 49, icon: 'fa-solid fa-glasses', name: '眼鏡', color: '#06b6d4' },
  { id: 50, icon: 'fa-solid fa-scissors', name: '剪刀', color: '#e11d48' },
  { id: 51, icon: 'fa-solid fa-lock', name: '鎖頭', color: '#d97706' },
  { id: 52, icon: 'fa-solid fa-eye', name: '眼睛', color: '#0284c7' },
  { id: 53, icon: 'fa-solid fa-hand-peace', name: '勝利手勢', color: '#f59e0b' },
  { id: 54, icon: 'fa-solid fa-thumbs-up', name: '讚', color: '#3b82f6' },
  { id: 55, icon: 'fa-solid fa-face-smile', name: '微笑', color: '#eab308' },
  { id: 56, icon: 'fa-solid fa-clover', name: '幸運草', color: '#16a34a' },
  { id: 57, icon: 'fa-solid fa-hourglass-half', name: '沙漏', color: '#d97706' },
  { id: 58, icon: 'fa-solid fa-compass', name: '羅盤', color: '#0284c7' },
  { id: 59, icon: 'fa-solid fa-flag', name: '旗幟', color: '#ef4444' }
];

// ==========================================================================
// 2. 有限射影平面數學卡牌生成器 (Finite Projective Plane)
// ==========================================================================
function generateProjectivePlaneDeck(q) {
  const cards = [];
  const n = q;

  // 1. 斜率 a, 截距 b 的直線族: y = ax + b (mod q)
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      const card = [];
      for (let x = 0; x < n; x++) {
        const y = (a * x + b) % n;
        card.push(x * n + y);
      }
      card.push(n * n + a); // 斜率對應的無窮遠點
      cards.push(card);
    }
  }

  // 2. 垂直線族: x = c
  for (let c = 0; c < n; c++) {
    const card = [];
    for (let y = 0; y < n; y++) {
      card.push(c * n + y);
    }
    card.push(n * n + n); // 垂直線無窮遠點
    cards.push(card);
  }

  // 3. 無窮遠直線
  const infCard = [];
  for (let i = 0; i <= n; i++) {
    infCard.push(n * n + i);
  }
  cards.push(infCard);

  return cards;
}

// ==========================================================================
// 3. Web Audio API 原生音效合成引擎
// ==========================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('dobble_sound_enabled') !== 'false';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('dobble_sound_enabled', this.enabled);
    return this.enabled;
  }

  // 播放答對提示音
  playCorrect(combo = 1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const baseFreq = 480 + Math.min(combo * 45, 600);
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.12);

    osc2.frequency.setValueAtTime(baseFreq * 1.25, now);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.85, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.22);
    osc2.stop(now + 0.22);
  }

  // 播放答錯提示音
  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // 播放按鈕點擊音
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // 遊戲獲勝通關號角
  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }, idx * 110);
    });
  }
}

// ==========================================================================
// 4. Canvas 慶祝彩帶粒子特效引擎
// ==========================================================================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  launch(count = 70) {
    const colors = ['#f43f5e', '#38bdf8', '#fbbf24', '#34d399', '#a855f7', '#fb923c'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth * 0.5 + (Math.random() * 200 - 100),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.9) * 16,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.01
      });
    }

    if (!this.animId) {
      this.render();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rSpeed;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.render());
    } else {
      this.animId = null;
    }
  }
}

// ==========================================================================
// 5. 吉祥物 LiyuChillGuy 控制（懸停霓虹彩色發光抖動、全向自由拖曳、雙擊復位）
// ==========================================================================
class MascotController {
  constructor() {
    this.container = document.getElementById('mascot-container');
    this.avatar = document.getElementById('mascot-avatar');

    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.initialLeft = 0;
    this.initialTop = 0;

    this.initDrag();
    this.initInteraction();
  }

  initDrag() {
    if (!this.container) return;

    const onPointerDown = (e) => {
      // 僅處理滑鼠主鍵或觸控
      if (e.button !== undefined && e.button !== 0) return;

      this.isDragging = true;
      this.container.classList.add('is-dragging');

      // 取得當前容器在視窗中的絕對像素座標
      const rect = this.container.getBoundingClientRect();
      this.startX = e.clientX;
      this.startY = e.clientY;

      // 切換為由 top/left 控制座標
      this.container.style.bottom = 'auto';
      this.container.style.right = 'auto';
      this.container.style.left = `${rect.left}px`;
      this.container.style.top = `${rect.top}px`;

      this.initialLeft = rect.left;
      this.initialTop = rect.top;

      if (this.container.setPointerCapture) {
        this.container.setPointerCapture(e.pointerId);
      }
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;

      const deltaX = e.clientX - this.startX;
      const deltaY = e.clientY - this.startY;

      let newLeft = this.initialLeft + deltaX;
      let newTop = this.initialTop + deltaY;

      // 螢幕邊界限制防溢出
      const cWidth = this.container.offsetWidth;
      const cHeight = this.container.offsetHeight;
      const maxLeft = window.innerWidth - cWidth;
      const maxTop = window.innerHeight - cHeight;

      newLeft = Math.max(8, Math.min(newLeft, maxLeft - 8));
      newTop = Math.max(8, Math.min(newTop, maxTop - 8));

      this.container.style.left = `${newLeft}px`;
      this.container.style.top = `${newTop}px`;
    };

    const onPointerUp = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.container.classList.remove('is-dragging');

      if (this.container.releasePointerCapture && e.pointerId) {
        try {
          this.container.releasePointerCapture(e.pointerId);
        } catch (err) {
          // 容錯忽略
        }
      }
    };

    this.container.addEventListener('pointerdown', onPointerDown);
    this.container.addEventListener('pointermove', onPointerMove);
    this.container.addEventListener('pointerup', onPointerUp);
    this.container.addEventListener('pointercancel', onPointerUp);
  }

  initInteraction() {
    // 雙擊吉祥物恢復至左下角預設位置
    this.container.addEventListener('dblclick', () => {
      this.resetPosition();
    });
  }

  speak() {
    // 已依需求移除上方對話框
  }

  resetPosition() {
    this.container.style.top = 'auto';
    this.container.style.right = 'auto';
    this.container.style.bottom = '24px';
    this.container.style.left = '24px';
  }
}

// ==========================================================================
// 6. DobbleShen 遊戲核心管理器
// ==========================================================================
class DobbleGame {
  constructor() {
    // 音效、粒子與吉祥物
    this.sound = new SoundEngine();
    this.confetti = new ConfettiEngine('confetti-canvas');
    this.mascot = new MascotController();

    // 明暗主題管理
    this.currentTheme = localStorage.getItem('dobble_theme') || 'dark';

    // 遊戲參數
    this.order = 7; // 階數 q = 7 (每張牌 8 個圖示，經典模式)
    this.deck = [];
    this.currentDeckIndex = 0;
    this.gameMode = 'timed'; // 'timed' | 'clear' | 'zen' | 'versus'
    
    // 單人遊戲狀態
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.hits = 0;
    this.timeLeft = 60;
    this.timerInterval = null;
    this.startTime = null;
    this.isPlaying = false;
    
    // 雙人對戰狀態
    this.p1Score = 0;
    this.p2Score = 0;
    this.versusTargetScore = 7;

    // 當前畫面卡牌
    this.targetCardSymbols = [];
    this.playerCardSymbols = [];
    this.commonSymbolId = null;

    // 雙人對戰卡牌
    this.versusCenterCard = [];
    this.versusP1Card = [];
    this.versusP2Card = [];

    // 動畫過渡與提示計時器
    this.isTransitioning = false;
    this.feedbackTimer = null;

    // DOM 元素快取
    this.cacheDom();
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.loadBestScore();

    // 初始化開始新遊戲
    this.startNewGame();
  }

  cacheDom() {
    this.cardTarget = document.getElementById('card-target');
    this.cardPlayer = document.getElementById('card-player');
    this.cardVersusCenter = document.getElementById('card-versus-center');
    this.cardVersusP1 = document.getElementById('card-versus-p1');
    this.cardVersusP2 = document.getElementById('card-versus-p2');

    this.arenaCards = document.getElementById('arena-cards');
    this.arenaVersus = document.getElementById('arena-versus');
    this.soloScoreboard = document.getElementById('solo-scoreboard');
    this.versusScoreboard = document.getElementById('versus-scoreboard');

    this.currentScoreEl = document.getElementById('current-score');
    this.timerLabelEl = document.getElementById('timer-label');
    this.timerValueEl = document.getElementById('timer-value');
    this.comboValueEl = document.getElementById('combo-value');
    this.bestScoreEl = document.getElementById('best-score');
    this.p1ScoreEl = document.getElementById('p1-score');
    this.p2ScoreEl = document.getElementById('p2-score');

    this.feedbackBanner = document.getElementById('feedback-banner');
    this.feedbackText = document.getElementById('feedback-text');

    // 彈出視窗
    this.gameOverModal = document.getElementById('game-over-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalSubtitle = document.getElementById('modal-subtitle');
    this.modalFinalScore = document.getElementById('modal-final-score');
    this.modalHits = document.getElementById('modal-hits');
    this.modalMaxCombo = document.getElementById('modal-max-combo');
    this.modalTimeSpent = document.getElementById('modal-time-spent');
    this.rulesModal = document.getElementById('rules-modal');

    // 控制項
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.btnHowToPlay = document.getElementById('btn-how-to-play');
    this.btnRestart = document.getElementById('btn-restart');
    this.btnPlayAgain = document.getElementById('btn-play-again');
    this.btnCloseRules = document.getElementById('btn-close-rules');
    this.btnStartPlaying = document.getElementById('btn-start-playing');

    this.modeButtons = document.querySelectorAll('#mode-selector .btn-toggle');
    this.difficultyButtons = document.querySelectorAll('#difficulty-selector .btn-toggle');
  }

  // ========================================================================
  // 明暗模式管理 (全面支援 Font Awesome 圖示)
  // ========================================================================
  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dobble_theme', theme);

    if (this.btnThemeToggle) {
      if (theme === 'dark') {
        this.btnThemeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        this.btnThemeToggle.title = '切換至明亮模式';
        this.btnThemeToggle.setAttribute('aria-label', '切換至明亮模式');
      } else {
        this.btnThemeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        this.btnThemeToggle.title = '切換至深色模式';
        this.btnThemeToggle.setAttribute('aria-label', '切換至深色模式');
      }
    }
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  }

  bindEvents() {
    // 主題明暗切換
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => {
        this.sound.playClick();
        this.toggleTheme();
      });
    }

    // 音效切換
    this.btnSoundToggle.addEventListener('click', () => {
      const enabled = this.sound.toggle();
      this.updateSoundButtonUI(enabled);
      if (enabled) this.sound.playClick();
    });
    this.updateSoundButtonUI(this.sound.enabled);

    // 遊戲說明
    this.btnHowToPlay.addEventListener('click', () => {
      this.sound.playClick();
      this.rulesModal.classList.remove('hidden');
    });
    this.btnCloseRules.addEventListener('click', () => {
      this.sound.playClick();
      this.rulesModal.classList.add('hidden');
    });
    this.btnStartPlaying.addEventListener('click', () => {
      this.sound.playClick();
      this.rulesModal.classList.add('hidden');
      if (!this.isPlaying) this.startNewGame();
    });

    // 重新開始
    this.btnRestart.addEventListener('click', () => {
      this.sound.playClick();
      this.startNewGame();
    });
    this.btnPlayAgain.addEventListener('click', () => {
      this.sound.playClick();
      this.gameOverModal.classList.add('hidden');
      this.startNewGame();
    });

    // 遊戲模式切換
    this.modeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playClick();
        this.modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.gameMode = btn.dataset.mode;
        this.startNewGame();
      });
    });

    // 難度/圖案數切換
    this.difficultyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playClick();
        this.difficultyButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.order = parseInt(btn.dataset.order, 10);
        this.startNewGame();
      });
    });
  }

  updateSoundButtonUI(enabled) {
    if (enabled) {
      this.btnSoundToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      this.btnSoundToggle.title = '點擊關閉音效';
    } else {
      this.btnSoundToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      this.btnSoundToggle.title = '點擊開啟音效';
    }
  }

  loadBestScore() {
    const best = localStorage.getItem(`dobble_best_${this.gameMode}_${this.order}`) || '0';
    this.bestScoreEl.textContent = best;
  }

  saveBestScore() {
    const key = `dobble_best_${this.gameMode}_${this.order}`;
    const prevBest = parseInt(localStorage.getItem(key) || '0', 10);
    if (this.score > prevBest) {
      localStorage.setItem(key, this.score);
      this.bestScoreEl.textContent = this.score;
      return true;
    }
    return false;
  }

  // ========================================================================
  // 啟動全新遊戲
  // ========================================================================
  startNewGame() {
    clearInterval(this.timerInterval);
    clearTimeout(this.feedbackTimer);
    this.isTransitioning = false;
    this.gameOverModal.classList.add('hidden');

    // 產生牌庫
    this.generateDeck();

    // 重設數據
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.hits = 0;
    this.p1Score = 0;
    this.p2Score = 0;
    this.isPlaying = true;
    this.startTime = Date.now();

    this.currentScoreEl.textContent = '0';
    this.comboValueEl.textContent = '0x';
    this.loadBestScore();

    // 根據模式調整 UI 佈局
    if (this.gameMode === 'versus') {
      this.arenaCards.classList.add('hidden');
      this.arenaVersus.classList.remove('hidden');
      this.soloScoreboard.classList.add('hidden');
      this.versusScoreboard.classList.remove('hidden');
      this.p1ScoreEl.textContent = '0';
      this.p2ScoreEl.textContent = '0';
      this.setFeedback('<i class="fa-solid fa-gamepad"></i> 雙人對戰開始！誰先點中自己手牌與中央牌的唯一相同圖案就得分！', 'default');
      this.dealVersusCards();
    } else {
      this.arenaCards.classList.remove('hidden');
      this.arenaVersus.classList.add('hidden');
      this.soloScoreboard.classList.remove('hidden');
      this.versusScoreboard.classList.add('hidden');

      if (this.gameMode === 'timed') {
        this.timeLeft = 60;
        this.timerLabelEl.textContent = '剩餘時間';
        this.timerValueEl.textContent = `${this.timeLeft}s`;
        this.startTimer();
      } else if (this.gameMode === 'clear') {
        this.clearTargetTotal = Math.min(20, this.deck.length - 1);
        this.timerLabelEl.textContent = '剩餘牌數';
        this.timerValueEl.textContent = `${this.clearTargetTotal}張`;
      } else if (this.gameMode === 'zen') {
        this.timerLabelEl.textContent = '悠閒模式';
        this.timerValueEl.textContent = '∞';
      }

      this.setFeedback('<i class="fa-solid fa-magnifying-glass"></i> 請在兩張卡牌中找出唯一的共通圖案並點擊它！', 'default');
      this.dealNextSoloPair();
    }
  }

  // 生成射影平面洗牌牌庫
  generateDeck() {
    const rawDeck = generateProjectivePlaneDeck(this.order);
    const shuffled = [...rawDeck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.deck = shuffled;
    this.currentDeckIndex = 0;
  }

  // 計時器
  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.timerValueEl.textContent = `${this.timeLeft}s`;

      if (this.timeLeft <= 10 && this.timeLeft > 0) {
        this.timerValueEl.style.color = '#ef4444';
      } else {
        this.timerValueEl.style.color = '';
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.endGame('時間到！計時挑戰結束！');
      }
    }, 1000);
  }

  // ========================================================================
  // 單人模式卡牌發牌與判定
  // ========================================================================
  dealNextSoloPair() {
    if (this.currentDeckIndex >= this.deck.length - 1) {
      this.generateDeck();
    }

    const cardA = this.deck[this.currentDeckIndex];
    const cardB = this.deck[this.currentDeckIndex + 1];
    this.currentDeckIndex++;

    this.targetCardSymbols = cardA;
    this.playerCardSymbols = cardB;

    const common = cardA.find(symbolId => cardB.includes(symbolId));
    this.commonSymbolId = common;

    this.renderCard(this.cardTarget, cardA, false);
    this.renderCard(this.cardPlayer, cardB, true);
  }

  // ========================================================================
  // 雙人對戰卡牌發牌
  // ========================================================================
  dealVersusCards() {
    if (this.currentDeckIndex >= this.deck.length - 2) {
      this.generateDeck();
    }

    const centerCard = this.deck[this.currentDeckIndex];
    const p1Card = this.deck[this.currentDeckIndex + 1];
    const p2Card = this.deck[this.currentDeckIndex + 2];
    this.currentDeckIndex += 2;

    this.versusCenterCard = centerCard;
    this.versusP1Card = p1Card;
    this.versusP2Card = p2Card;

    this.p1CommonId = p1Card.find(id => centerCard.includes(id));
    this.p2CommonId = p2Card.find(id => centerCard.includes(id));

    this.renderCard(this.cardVersusCenter, centerCard, false);
    this.renderVersusPlayerCard(this.cardVersusP1, p1Card, 1);
    this.renderVersusPlayerCard(this.cardVersusP2, p2Card, 2);
  }

  // ========================================================================
  // 卡片符號渲染 (純粹使用 Font Awesome 圖標)
  // ========================================================================
  renderCard(container, symbolIds, isClickable = false) {
    container.innerHTML = '';
    const numSymbols = symbolIds.length;
    const shuffledSymbols = [...symbolIds].sort(() => Math.random() - 0.5);
    const positions = this.calculateSymbolPositions(numSymbols);

    shuffledSymbols.forEach((symId, index) => {
      const symData = SYMBOL_LIBRARY[symId % SYMBOL_LIBRARY.length];
      const pos = positions[index];

      const symbolEl = document.createElement('div');
      symbolEl.className = 'symbol-item';
      symbolEl.dataset.symbolId = symId;

      const scale = pos.scale;
      const rotate = Math.floor(Math.random() * 360);

      symbolEl.style.left = `${pos.x}%`;
      symbolEl.style.top = `${pos.y}%`;
      symbolEl.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`;
      symbolEl.style.color = symData.color;
      symbolEl.style.fontSize = `${pos.fontSize}rem`;

      symbolEl.innerHTML = `<i class="${symData.icon}"></i>`;

      if (isClickable) {
        symbolEl.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleSoloSymbolClick(symId, symbolEl);
        });
      }

      container.appendChild(symbolEl);
    });
  }

  renderVersusPlayerCard(container, symbolIds, playerNum) {
    container.innerHTML = '';
    const numSymbols = symbolIds.length;
    const shuffledSymbols = [...symbolIds].sort(() => Math.random() - 0.5);
    const positions = this.calculateSymbolPositions(numSymbols);

    shuffledSymbols.forEach((symId, index) => {
      const symData = SYMBOL_LIBRARY[symId % SYMBOL_LIBRARY.length];
      const pos = positions[index];

      const symbolEl = document.createElement('div');
      symbolEl.className = 'symbol-item';
      symbolEl.dataset.symbolId = symId;

      const scale = pos.scale;
      const rotate = Math.floor(Math.random() * 360);

      symbolEl.style.left = `${pos.x}%`;
      symbolEl.style.top = `${pos.y}%`;
      symbolEl.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`;
      symbolEl.style.color = symData.color;
      symbolEl.style.fontSize = `${pos.fontSize}rem`;

      symbolEl.innerHTML = `<i class="${symData.icon}"></i>`;

      symbolEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleVersusClick(playerNum, symId, symbolEl);
      });

      container.appendChild(symbolEl);
    });
  }

  /**
   * 計算圖案分佈座標，確保均勻分佈在圓形卡片內且互不嚴重重疊
   */
  calculateSymbolPositions(n) {
    const positions = [];

    if (n <= 4) {
      const angles = [45, 135, 225, 315];
      for (let i = 0; i < n; i++) {
        const rad = ((angles[i] + (Math.random() * 20 - 10)) * Math.PI) / 180;
        const dist = 28 + Math.random() * 8;
        positions.push({
          x: 50 + dist * Math.cos(rad),
          y: 50 + dist * Math.sin(rad),
          scale: 1.1 + Math.random() * 0.4,
          fontSize: 2.2
        });
      }
    } else if (n <= 6) {
      positions.push({
        x: 50 + (Math.random() * 8 - 4),
        y: 50 + (Math.random() * 8 - 4),
        scale: 1.25,
        fontSize: 2.1
      });
      for (let i = 0; i < n - 1; i++) {
        const angle = (i * (360 / (n - 1)) + Math.random() * 20 - 10) * (Math.PI / 180);
        const dist = 32 + Math.random() * 6;
        positions.push({
          x: 50 + dist * Math.cos(angle),
          y: 50 + dist * Math.sin(angle),
          scale: 0.9 + Math.random() * 0.4,
          fontSize: 1.8
        });
      }
    } else {
      // 8 個圖示 (經典)
      positions.push({
        x: 50 + (Math.random() * 8 - 4),
        y: 50 + (Math.random() * 8 - 4),
        scale: 1.3,
        fontSize: 2.1
      });
      const outerCount = n - 1;
      for (let i = 0; i < outerCount; i++) {
        const baseAngle = (i * (360 / outerCount));
        const angle = (baseAngle + (Math.random() * 24 - 12)) * (Math.PI / 180);
        const dist = (i % 2 === 0 ? 33 : 36) + (Math.random() * 4 - 2);
        positions.push({
          x: 50 + dist * Math.cos(angle),
          y: 50 + dist * Math.sin(angle),
          scale: 0.85 + Math.random() * 0.45,
          fontSize: 1.7
        });
      }
    }

    return positions;
  }

  // ========================================================================
  // 點擊判定回饋
  // ========================================================================
  handleSoloSymbolClick(clickedId, element) {
    if (!this.isPlaying || this.isTransitioning) return;

    if (clickedId === this.commonSymbolId) {
      this.isTransitioning = true;
      this.combo++;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      this.hits++;

      const earned = 100 + (this.combo - 1) * 25;
      this.score += earned;
      this.currentScoreEl.textContent = this.score;
      this.comboValueEl.textContent = `${this.combo}x`;

      const symData = SYMBOL_LIBRARY[clickedId % SYMBOL_LIBRARY.length];
      this.setFeedback(`<i class="fa-solid fa-circle-check"></i> 太棒了！找到【${symData.name}】！+${earned}分！`, 'success', 1.6);

      this.sound.playCorrect(this.combo);

      // 圈起動畫：玩家牌圖示與牌庫公共牌圖示同時圈起
      element.classList.add('symbol-circled');
      const targetMatchEl = this.cardTarget.querySelector(`.symbol-item[data-symbol-id="${clickedId}"]`);
      if (targetMatchEl) {
        targetMatchEl.classList.add('symbol-circled');
      }

      this.cardPlayer.classList.add('card-success');
      setTimeout(() => this.cardPlayer.classList.remove('card-success'), 450);

      if (this.combo >= 3) {
        this.confetti.launch(35);
      }

      if (this.gameMode === 'clear') {
        this.clearTargetTotal--;
        this.timerValueEl.textContent = `${this.clearTargetTotal}張`;
        if (this.clearTargetTotal <= 0) {
          this.endGame('恭喜！所有卡牌闖關完成！');
          this.isTransitioning = false;
          return;
        }
      }

      // 等待 450ms 圈起動畫讓玩家看清配對後，再流暢進入下一手牌
      setTimeout(() => {
        this.dealNextSoloPair();
        this.isTransitioning = false;
      }, 450);

    } else {
      this.combo = 0;
      this.comboValueEl.textContent = '0x';
      this.sound.playWrong();

      this.cardPlayer.classList.add('card-shake');
      setTimeout(() => this.cardPlayer.classList.remove('card-shake'), 400);

      if (this.gameMode === 'timed') {
        this.timeLeft = Math.max(0, this.timeLeft - 2);
        this.timerValueEl.textContent = `${this.timeLeft}s`;
        this.setFeedback('<i class="fa-solid fa-circle-xmark"></i> 選錯了！扣除 2 秒，連擊歸零！', 'error', 1.6);
      } else {
        this.setFeedback('<i class="fa-solid fa-circle-xmark"></i> 不是這個圖案喔，再仔細看看！', 'error', 1.6);
      }
    }
  }

  // 雙人對戰點擊判定
  handleVersusClick(playerNum, clickedId, element) {
    if (!this.isPlaying || this.isTransitioning) return;

    const targetCommon = (playerNum === 1) ? this.p1CommonId : this.p2CommonId;

    if (clickedId === targetCommon) {
      this.isTransitioning = true;
      this.sound.playCorrect(3);

      // 圈起動畫：玩家牌圖示與中央公共牌圖示同時圈起
      element.classList.add('symbol-circled');
      const centerMatchEl = this.cardVersusCenter.querySelector(`.symbol-item[data-symbol-id="${clickedId}"]`);
      if (centerMatchEl) {
        centerMatchEl.classList.add('symbol-circled');
      }

      if (playerNum === 1) {
        this.p1Score++;
        this.p1ScoreEl.textContent = this.p1Score;
        this.setFeedback('<i class="fa-solid fa-bolt"></i> 玩家 1 (藍隊) 率先配對成功，得 1 分！', 'success', 1.6);
      } else {
        this.p2Score++;
        this.p2ScoreEl.textContent = this.p2Score;
        this.setFeedback('<i class="fa-solid fa-fire"></i> 玩家 2 (紅隊) 率先配對成功，得 1 分！', 'success', 1.6);
      }

      this.confetti.launch(40);

      if (this.p1Score >= this.versusTargetScore || this.p2Score >= this.versusTargetScore) {
        const winner = this.p1Score >= this.versusTargetScore ? '玩家 1 (藍隊)' : '玩家 2 (紅隊)';
        this.endGame(`雙人對戰結束！恭喜【${winner}】贏得勝利！`);
        this.isTransitioning = false;
        return;
      }

      setTimeout(() => {
        this.dealVersusCards();
        this.isTransitioning = false;
      }, 450);

    } else {
      this.sound.playWrong();
      element.parentElement.classList.add('card-shake');
      setTimeout(() => element.parentElement.classList.remove('card-shake'), 400);
      this.setFeedback(`<i class="fa-solid fa-circle-xmark"></i> 玩家 ${playerNum} 點錯圖示囉！再接再厲！`, 'error', 1.6);
    }
  }

  setFeedback(htmlMsg, type = 'default', autoClearSeconds = 1.6) {
    clearTimeout(this.feedbackTimer);
    this.feedbackText.innerHTML = htmlMsg;
    this.feedbackBanner.className = `feedback-banner ${type}`;

    if (type === 'success' || type === 'error') {
      this.feedbackTimer = setTimeout(() => {
        this.feedbackText.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> 請在兩張卡牌中找出唯一的共通圖案並點擊它！';
        this.feedbackBanner.className = 'feedback-banner default';
      }, autoClearSeconds * 1000);
    }
  }

  // ========================================================================
  // 遊戲結束結算
  // ========================================================================
  endGame(titleMsg) {
    this.isPlaying = false;
    clearInterval(this.timerInterval);
    this.sound.playVictory();
    this.confetti.launch(120);

    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
    const isNewRecord = this.saveBestScore();

    this.modalTitle.textContent = titleMsg;
    this.modalSubtitle.textContent = isNewRecord ? '恭喜創下歷史最高分紀錄！' : '反應與眼力極佳，繼續保持！';

    if (this.gameMode === 'versus') {
      this.modalFinalScore.textContent = `P1: ${this.p1Score} / P2: ${this.p2Score}`;
      this.modalHits.textContent = `${this.p1Score + this.p2Score} 次`;
      this.modalMaxCombo.textContent = '-';
    } else {
      this.modalFinalScore.textContent = this.score;
      this.modalHits.textContent = `${this.hits} 次`;
      this.modalMaxCombo.textContent = `${this.maxCombo}x`;
    }

    this.modalTimeSpent.textContent = `${timeSpent} 秒`;
    this.gameOverModal.classList.remove('hidden');
  }
}

// ==========================================================================
// 7. 頁面載入初始化
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  window.dobbleApp = new DobbleGame();
});
