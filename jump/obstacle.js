// 장애물 생성
function createObstacle() {
    if (!gameRunning) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    gameContainer.appendChild(obstacle);

    let obstaclePosition = 500;
    let randomTime = Math.random() * 500 + 50;

    obstacle.style.left = obstaclePosition + 'px';

    let obstacleInterval;
    let obstacleCreationTimeout;

    function moveObstacle() {
        if (obstaclePosition < -60) {
            clearInterval(obstacleInterval);
            obstacle.remove();
            createObstacle();
        } else if (gameRunning) {
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }

        const myBottom = parseInt(window.getComputedStyle(my).getPropertyValue('bottom'));
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
        const obstacleRight = obstacleLeft + parseInt(window.getComputedStyle(obstacle).getPropertyValue('width'));

        if (obstacleLeft <= 50 && obstacleRight >= 30 && myBottom <= 50 && gameRunning) {
            clearInterval(obstacleInterval);
            clearTimeout(obstacleCreationTimeout);
            obstacle.remove();
            endGame();
        }
    }

    obstacleInterval = setInterval(moveObstacle, 20);
}