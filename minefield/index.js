const minefield = document.getElementById('minefield');
const bombMessage = document.getElementById('bomb');
const win = document.getElementById('win');
const size = 10;
const mineCount = 10;
let cells = []; // 모든 셀을 저장하는 배열
let openedCount = 0;
let gameover = false;

// 지뢰 위치 랜덤 생성
let mines = Array(size * size).fill(false);
for (let i = 0; i < mineCount; ) {
    let randomPos = Math.floor(Math.random() * size * size);
    if (!mines[randomPos]) {
        mines[randomPos] = true;
        i++;
    }
}

// 지뢰찾기 보드 생성
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    let cell = document.createElement('div');
    cell.classList.add('minecell');

    cell.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // 기본 오른쪽 클릭 메뉴 방지

        if (gameover) return;
      
        if (cell.style.backgroundColor === 'blue') { // 이미 플래그가 설치된 경우
          cell.style.backgroundColor = ''; // 플래그 제거
          cell.textContent = '';
        } else { // 아직 플래그가 설치되지 않은 경우
          cell.style.backgroundColor = 'blue'; // 플래그 설치
          cell.textContent = '🚩';
        }
    });

    cell.addEventListener('click', () => {

        if (gameover || cell.style.backgroundColor === 'blue') return;

        // 클릭한 셀에 지뢰가 있는지 확인
        if (mines[x + y * size]) {
            cell.style.backgroundColor = 'red'; // 지뢰가 있다면, 셀을 빨간색으로 변경
            cell.textContent = '💣';
            bombMessage.style.display = 'inline-block';
            gameover = true;
        } else {
            openCell(x, y);
            checkWin();
        }
    });

    cells.push(cell);
    minefield.appendChild(cell);
  }
}

function openCell(x, y) {
    let cell = cells[y * size + x];
    
    // 이미 열린 셀이거나 플래그가 설치된 셀이면 열지 않음
    if (cell.style.backgroundColor === 'blue' || cell.style.backgroundColor === 'green') return;

    let count = countMines(x, y); // 주변 지뢰 개수 세기
    cell.style.backgroundColor = 'green'; // 셀을 열음
    cell.textContent = count === 0 ? "" : count; // 지뢰 개수가 0이면 아무 것도 표시하지 않고, 그렇지 않으면 지뢰 개수 표시
    openedCount++;

    // 주변 지뢰 개수가 0이면, 주변 셀들도 모두 열기
    if (count === 0) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                let nx = x + dx;
                let ny = y + dy;

                // 보드 바깥으로 벗어난 경우는 무시
                if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;

                openCell(nx, ny); // 재귀 호출
            }
        }
    }
}

// 지뢰 갯수 세기. dfs 이용
function countMines(x, y) {
    let count = 0;
    
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            let nx = x + dx;
            let ny = y + dy;
    
            // 보드 경계 확인
            if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
    
            if (mines[nx + ny * size]) count++;
        }
    }
  
    return count;
}

function checkWin() {
    if (openedCount === size * size - mineCount) {
        win.style.display = 'inline-block';
    }
}