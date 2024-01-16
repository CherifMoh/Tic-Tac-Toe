
let score =JSON.parse(localStorage.getItem('score'))||{
    lose : 0,
    win : 0
};
const c1 = document.querySelector('.js-1')
const c2 = document.querySelector('.js-2')
const c3 = document.querySelector('.js-3')
const c4 = document.querySelector('.js-4')
const c5 = document.querySelector('.js-5')
const c6 = document.querySelector('.js-6')
const c7 = document.querySelector('.js-7')
const c8 = document.querySelector('.js-8')
const c9 = document.querySelector('.js-9')

const allCells = document.querySelectorAll('.js-c')
document.querySelector('.js-reset').addEventListener('click',reset)
function reset() {
    score={
        lose:0,
        win:0
    }
    localStorage.setItem('score',JSON.stringify(score))
    scoreDesplay('')
}
function replay(){
    allCells.forEach(cell => {
        document.querySelector('.grid').classList.remove('end')
        cell.innerHTML ='';
        document.querySelector('.js-result').innerHTML = '';
        cell.addEventListener('click', cellXP);
    });
}
function tieCheck(){
    const result = document.querySelector('.js-result')
    if(result.innerHTML === ''){
        let emptyCells =0
        allCells.forEach(cell=>{
            if(cell.innerHTML !== ''){
                emptyCells++
            }
        })
        if(emptyCells===9){
            result.innerHTML = 'Tie';
            setTimeout(replay,2000)
        }
    }
}
function scoreDesplay(Result){
    const result =document.querySelector('.js-result')
    result.innerHTML = Result;
    result.style.color = Result === 'You win'?'rgb(63, 247, 2)':'red'
    document.querySelector('.js-wins').innerHTML = `Wins : ${score.win}`;
    document.querySelector('.js-loses').innerHTML = `Losses : ${score.lose}`;
    
}
function winCheck(ele1,ele2,ele3){
    const eleArray =[ele1,ele2,ele3]
    if(eleArray.every(elem=>elem.innerHTML === 'X')){
        allCells.forEach(cell=>{
            cell.removeEventListener('click', cellXP);
        })
        Result ='You win' 
        score.win += 1;
        scoreDesplay(Result)
        localStorage.setItem('score',JSON.stringify(score))
        setTimeout(replay,2000)
        document.querySelector('.grid').classList.add('end')
    }
}
function loseCheck(ele1,ele2,ele3){
    const eleArray =[ele1,ele2,ele3]
    if(eleArray.every(elem=>elem.innerHTML === 'O')){
        allCells.forEach(cell=>{
            cell.removeEventListener('click', cellXP);
        })
        Result ='You lose' 
        score.lose += 1;
        scoreDesplay(Result)
        setTimeout(replay,2000)
    }
}
function winCheckRun(){
    winCheck(c1,c2,c3)
    winCheck(c4,c5,c6)
    winCheck(c7,c8,c9)
    winCheck(c1,c4,c7)
    winCheck(c2,c5,c8)
    winCheck(c3,c6,c9)
    winCheck(c1,c5,c9)
    winCheck(c3,c5,c7)
}
function loseCheckRun(){
    loseCheck(c1,c2,c3)
    loseCheck(c4,c5,c6)
    loseCheck(c7,c8,c9)
    loseCheck(c1,c4,c7)
    loseCheck(c2,c5,c8)
    loseCheck(c3,c6,c9)
    loseCheck(c1,c5,c9)
    loseCheck(c3,c5,c7)
}
function Xplay(element) {
    if(!element.innerHTML){
        element.innerHTML = 'X';
    }
    element.removeEventListener('click', cellXP);
    setTimeout(()=>{
        if(!document.querySelector('.grid').classList.contains('end')){
            for (let i = 0; i < 8; i++) { 
                const randomNumber = Math.floor(Math.random() * 8) + 1;
                const selectedC = document.querySelector(`.js-${randomNumber}`);
                
                if (selectedC.innerHTML === '') {
                    selectedC.innerHTML = 'O';
                    selectedC.removeEventListener('click', cellXP);
                    loseCheckRun()
                    break; 
                }
            }
        }
    },200)
}
function cellXP() {
    const cell = this; 
    Xplay(cell);
    winCheckRun()
    tieCheck()
}
const resetButton = document.querySelector('.js-reset')
resetButton.addEventListener('click',()=>{
    reset()
})
allCells.forEach(cell => {
    cell.addEventListener('click', cellXP);
});