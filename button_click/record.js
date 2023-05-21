 // 이전 기록을 저장할 배열
 const scoreHistory = [];

 // 이전 기록을 표시하는 함수
 function displayScoreHistory() {
   const scoreHistoryElement = document.getElementById('scoreHistory');

   scoreHistory.forEach(record => {
    const { score, time } = record;
    const li = document.createElement('li');
    li.textContent = `점수 - ${score}, 시간 - ${time}`;
    scoreHistoryElement.appendChild(li);
  });
 }

 // 게임이 끝났을 때 점수를 저장하고 이전 기록 표시 함수 호출
 function addScoreToHistory(score) {
  const time = new Date().toLocaleTimeString();
  const scoreRecord = { score, time };
  scoreHistory.push(scoreRecord);
  displayScoreHistory();
}