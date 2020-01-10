var tileImages = []
var tileArray = []
var tileFlipped = [] 

var timer = ''
var FlippedCard = -1
var gamePlay = false;
var playLockout = false

var gameboard = document.getElementById('gameboard')
var start = document.getElementById("start")
var msg = document.getElementById('msg')

//event Listner
start.addEventListener('click',startGame)

//Functions
function startGame(){
    FlippedCard = -1
    playLockout = false;
    start.style.display = 'none'
    if(!gamePlay){
        gamePlay = true
        buildArray()
        tileArray = tileImages.concat(tileImages)
        shuffelArray(tileArray)
        buildBoard();
        msg.innerHTML = "Click any tile"
    }
    else
        console.log('Failed')
}

function gameOver(){
    start.style.display = 'block'
    msg.innerHTML = "Congrats!!,Click To Start New Game"
    gamePlay = false
    tileImages = []
    tileFlipped = []

}
 
function buildBoard(){
    var html = "";
    for (var x = 0; x<= (tileArray.length - 1);x++){
        html += '<div class = "gameTile"><div class = "gameTile">'
        html += '<img id="cardz'+ x +'" src="images/back.jpg" onclick="pickCard('+ x +',this)" class="flipImage"></div></div>'
    }
    gameboard.innerHTML = html
}

function buildArray() {
    for (var x = 1; x < 7; x++) {
      tileImages.push(x + '.jpg');
    }
  }
function inArray(v,array){
    return array.indexOf(v) > -1
}

function cardFlipped(t,tileIndex){
    t.src = "images/"+tileArray[tileIndex]
    tileFlipped.push(t.id)
}
function checkSrc(v){
    var vid = document.getElementById(v).src
    return vid
}

function pickCard(tileIndex,t){
    if(!inArray(t.id,tileFlipped) && !playLockout){
        msg.innerHTML = "Check for Match"
        if(FlippedCard >= 0){
            cardFlipped(t,tileIndex)
            playLockout = true
            if( checkSrc( tileFlipped [tileFlipped.length-1]) == checkSrc(tileFlipped[tileFlipped.length-2]) ){
                msg.innerHTML = "Match Found"
                playLockout = false
                FlippedCard = -1
                if(tileFlipped.length == tileArray.length){
                    gameOver()
                }
            }else{
                msg.innerHTML = "No Match"
                timer = setInterval(hideCard, 1000)
            }
        }else{
            FlippedCard = tileIndex
            cardFlipped(t,tileIndex)
        }
    } else{
        msg.innerHTML = "Already Clicked"
    }
}
function shuffelArray(array){
    for(var x= array.length-1;x>0;x--){
        var holder = Math.floor(Math.random() *(x+1))
        var item = array[x]
        array[x] = array[holder]
        array[holder] = item
    }
    return array
}
function hideCard() {
    for (var x = 0; x < 2; x++) {
      var vid = tileFlipped.pop()
      document.getElementById(vid).src = "images/back.jpg";  
    }
    clearInterval(timer);
    playLockout = false;
    FlippedCard = -1;
    msg.innerHTML = "Click any tile"
}