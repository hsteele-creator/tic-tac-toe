const gameOverDiv = document.querySelector(".game-over");
const gameOverText = document.querySelector(".game-over-text");
const cell = document.querySelectorAll(".grid-cell");
const restartButton =  document.querySelector(".restart")


const game = {
    xTurn: true,
    xState: [],
    yState: [],
    winningStates: [

        // horizontal
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // vertical
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

document.addEventListener('click', event => {
    const target = event.target;
    const isCell = target.classList.contains("grid-cell");
    const isDisabled = target.classList.contains("disabled");


    if(isCell && !isDisabled) {

        const cellValue = target.dataset.value;

        // if x turn push value into x array else y array
        game.xTurn === true 
        ? game.xState.push(cellValue) 
        : game.yState.push(cellValue)

        // add disabled to clicked cell add x class ix x turn, y class if y turn
        target.classList.add("disabled")
        target.classList.add(game.xTurn ? 'x' : 'o');

        // switch turn
        game.xTurn =  !game.xTurn;

        // check for a win
        checkForWin();

        // check for a tie
        checkForTie();


    }

})


    function checkForTie() {

        // if there are no grid cells without disabled classes (every cell has been clicked) then show the game over div with the text of draw
        if(!document.querySelectorAll(".grid-cell:not(.disabled)").length) {
            gameOverDiv.classList.add("visible");
            gameOverText.textContent = "Draw!";
        }
    }

    function checkForWin() {
        // loop through every winning state array and x wins if the xstate array includes all total values of a winning state array and same thing for y
        game.winningStates.forEach(winningstate => {

            const xWins = winningstate.every(state => game.xState.includes(state));

            const yWins = winningstate.every(state => game.yState.includes(state));


            // if x or y win disable all of the cells and show the game over div with a text of the winner

            if(xWins || yWins) {
                cell.forEach(cell => cell.classList.add("diabled"));

                gameOverDiv.classList.add("visible");

                gameOverText.textContent = xWins
                ? "X Wins!" : "Y Wins!"
            }
            
        })
    }

    restartButton.addEventListener("click", () => {

        cell.forEach(cell => cell.classList.remove("disabled", "x", "o"));

        gameOverDiv.classList.remove("visible");

       game.xTurn = true;
       game.xState = [];
       game.yState = [];
    })