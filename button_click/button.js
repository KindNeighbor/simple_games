// 버튼 요소 가져오기
const button = document.getElementById('btn');

// 점수와 시간 요소 가져오기
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

let score = 0;
let timeLeft = 10;

// 버튼 클릭 이벤트 처리
button.addEventListener('click', () => {
  score++;
  scoreElement.textContent = `점수: ${score}`;
});

// 게임 타이머 설정
const countdown = setInterval(() => {
  timeLeft--;
  timerElement.textContent = `남은 시간: ${timeLeft}초`;

  if (timeLeft === 0) {
    clearInterval(countdown);
    button.disabled = true;
    alert(`게임 종료! 당신의 점수는 ${score}점입니다.`);
  }
}, 1000);