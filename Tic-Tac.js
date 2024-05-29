 const boxs = document.querySelectorAll('.box');
    const stsText = document.querySelector('.sts');
    const btn = document.getElementById('btn');

     let x = "<h1 class='center-text'>X</h1>";
    let o = "<h1 class='center-text'>O</h1>";
   

    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = x;
    let player = "X";
    let running = false;
    init();

    function init() {
        boxs.forEach(box => box.addEventListener('click', boxClick));
        btn.addEventListener('click', restartNow);
        stsText.textContent = `${player} Your Turn`;
        running = true;

    }

    function boxClick() {
        const index = parseInt(this.dataset.index);
        if (options[index] !== "" || !running) {
            return;
        }
        updateBox(index);
        checkWin();
    }

    function updateBox(index) {
        options[index] = player;
        boxs[index].innerHTML = currentPlayer;
        changePlayer();
    }

    function changePlayer() {
        player = (player == 'X') ? "O" : "X";
        currentPlayer = (currentPlayer == x) ? o : x;
        stsText.textContent = `${player} Your Turn`;
    }

    function checkWin() {
        let isWon = false;
        for (let i = 0; i < win.length; i++) {
            const con = win[i];
            const b1 = options[con[0]];
            const b2 = options[con[1]];
            const b3 = options[con[2]];
            if (b1 == "" || b2 == "" || b3 == "") {
                continue;
            }
            if (b1 == b2 && b2 == b3) {
                isWon = true;
                boxs[con[0]].classList.add('winner');
                boxs[con[1]].classList.add('winner');
                boxs[con[2]].classList.add('winner');
            }
        }
        if (isWon) {
            stsText.textContent = `${""} Won`;
            running = false;
        } else {
            let isDraw = options.every(option => option !== "");
            if (isDraw) {
                stsText.textContent = `It's a draw!`;
                running = false;
            }
        }
    }

    function restartNow() {
        options = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = x;
        player = "X";
        running = true;

        boxs.forEach(box => {
            box.innerHTML = "";
            box.classList.remove('winner');
        });
        stsText.textContent = `${player} Your Turn`;
    }