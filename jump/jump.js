const gameContainer = document.getElementById('game-container');
const my = document.getElementById('my');
const obstacleElement = document.getElementById('obstacle');
obstacleElement.style.display = 'none';

const startBtn = document.getElementById('startBtn');
const timeElement = document.getElementById('time');

const obstacle = document.createElement('div');

let isJumping = false;
let gameRunning = false;

let time = 0;

// 게임 실행 함수
function startGame() {
    gameRunning = true;
    startBtn.disabled = true;

    // 스페이스 누를 시 점프
    document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping && gameRunning) {
            jump();
        }
    });

    // 시간 측정 시작
    startTimer();

    // 장애물 생성 시작
    createObstacle();
}

// 점프!!
function jump() {
    isJumping = true;
    let position = 0;
    const jumpHeight = 150;
    const jumpDuration = 1000; 
    
    const jumpInterval = setInterval(() => {
      if (position >= jumpHeight) {
        clearInterval(jumpInterval);

        const fallInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(fallInterval);
            isJumping = false;
          }
          position -= 5;
          my.style.bottom = position + 'px';
        }, jumpDuration / jumpHeight);
      }
  
      position += 5;
      my.style.bottom = position + 'px';
    }, jumpDuration / jumpHeight);
}

// 게임 종료 처리 (충돌 시 실행)
function endGame() {
    gameRunning = false;
    startBtn.disabled = false;
    clearInterval(timeInterval);

    my.style.bottom = '0px';

    alert(`게임 종료! 충돌했습니다. 시간: ${time}초`);

    time = 0;
    timeElement.textContent = `시간: ${time}`;
    return;
}

// 시간 카운트 시작
function startTimer() {
  time = 0;
  timeElement.textContent = `시간: ${time}`;
    timeInterval = setInterval(() => {
    time++;
    timeElement.textContent = `시간: ${time}`;
  }, 1000);
}

startBtn.addEventListener('click', startGame);