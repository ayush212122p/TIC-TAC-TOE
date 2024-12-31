let X=prompt("Enter Player1 name :X");
let O=prompt("Enter Player2 name :O");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let turn0 = true;
let newGamebtn=document.querySelector("#newBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let points1=document.querySelector(".wonpoints1");
let points2=document.querySelector(".wonpoints2");
let Player1=document.querySelector(".player1");
let Player2=document.querySelector(".player2");
let turn =document.querySelector(".turn");
let audio4 = new Audio("soundeffects/bgsong.mp3");
audio4.loop=true;
audio4.play();
audio4.autoplay=true;
audio4.volume=.40;

Player1.innerText=X;
Player2.innerText=O;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
  ];
  let count = 0;
const resestGame=()=>{
  audio4.play();
  turn.innerText="";
  count=0;
  turn0=true;
  enabledboxes();
  msgContainer.classList.add("hide");
  }

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
      playmusic2();
         if(turn0){
        box.innerText="X";
        turn.innerText="Player O Turn";
        box.classList.add("pink");
        turn0=false;
        box.classList.remove("blue");
     }else{
      box.classList.add("blue");
       turn.innerText="Player X Turn";
        box.innerText="O";
       turn0=true;
       box.classList.remove("pink");
     }
     box.disabled=true;
     count++;
     console.log(count);
     let won = chkWinner();
      if(count === 9 && !won){
        draw();
        audio4.pause();
        playmusic1();
      }
    });
    
});
const disabledboxes=()=>{
for(let box of boxes){
  box.disabled=true;
}
}
const enabledboxes=()=>{
  for(let box of boxes){
    box.disabled=false;
    box.innerText="";
  }
}
const showWinner=(winner)=>{
  turn.innerText="";
  audio4.pause();
  playmusic3();
  if(winner.endsWith("X")){
    msg.innerText=`Winner is ${X}`
    points1.innerText++;
  }else{
     msg.innerText=`Winner is ${O}`
     points2.innerText++;
  }
  msgContainer.classList.remove("hide");
  disabledboxes();
}

const chkWinner= ()=>{
    for(let pattern of winPatterns){
      let pos1 =  boxes[pattern[0]].innerText;
      let pos2 =  boxes[pattern [1]].innerText;
       let pos3= boxes[pattern[2]].innerText;
         if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1 === pos2 && pos2 === pos3){
           showWinner(pos1)
             return true;
            }
               }
         }
    };
     
const draw=()=>{
  turn.innerText="";
    msg.innerText="Draw";
    msgContainer.classList.remove("hide");
    disabledboxes();
  
}
let playmusic1=()=>{
  let audio = new Audio("soundeffects/lose.wav");
  audio.play();
}
let playmusic2=()=>{
  let audio = new Audio("soundeffects/touch.wav");
  audio.play();
}
let playmusic3=()=>{
  let audio = new Audio("soundeffects/won.mp3");
  audio.play();
}



newGamebtn.addEventListener("click",resestGame)
resetBtn.addEventListener("click",resestGame)