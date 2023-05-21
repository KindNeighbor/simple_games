// 버튼 요소 가져오기
const button = document.getElementById('btn');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// 점수와 시간 요소 가져오기
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

let score = 0;
let timeLeft = 5;
let gameRunning = false;
button.disabled = true;

// 게임 실행 함수
function startGame() {
    gameRunning = true;
    startBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    restartBtn.disabled = true;
    button.disabled = false;
    score = 0;
    timeLeft = 5;
    scoreElement.textContent = `점수: ${score}`;
    timerElement.textContent = `남은 시간: ${timeLeft}초`;

    // 버튼 클릭 이벤트
    button.addEventListener('click', handleButtonClick);

    // 게임 타이머
    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `남은 시간: ${timeLeft}초`;
      
        if (timeLeft === 0) {
          clearInterval(countdown);
          gameRunning = false;
          button.disabled = true;
          restartBtn.disabled = false;
          alert(`게임 종료! 당신의 점수는 ${score}점입니다.`);
        }
    }, 1000);
}

// 버튼 클릭시 점수 증가
function handleButtonClick() {
    if (gameRunning) {
        score++;
        scoreElement.textContent = `점수: ${score}`;
    }
}

// 게임시작, 재시작 버튼 이벤트
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);