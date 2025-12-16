let scorecard = JSON.parse(localStorage.getItem('scorecard'));

if(!scorecard)
{
  scorecard=
  {
    win:0,
    losses:0,
    Tie:0
  };
}

updatescore();

let isAutoPlaying =false;
let intervalId;

document.querySelector('.auto-button').addEventListener('click',()=>
{autoplay()});

function autoplay()
{
  let name=document.querySelector('.auto-button').innerHTML;

  if(name === 'Auto Play')
  {
    document.querySelector('.auto-button').innerHTML='Stop Playing';
  }


  if (!isAutoPlaying)
  {
  intervalId = setInterval(() =>
  {
    const playermove=pickcomputermove();
    playgame(playermove);
  },1200)
  isAutoPlaying=true;
  }
  else
  {
    document.querySelector('.auto-button').innerHTML='Auto Play';
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{playgame('rock')});

document.querySelector('.js-paper-button').addEventListener('click',()=>{playgame('paper')});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{playgame('Scissors')});

document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r')
  {
    playgame('rock');
  }
  else if(event.key === 'p')
  {
    playgame('paper');
  }
  else if(event.key === 's')
  {
    playgame('Scissors')
  }
  else if(event.key === 'a')
  {
    autoplay();
  }
  else if(event.key === 'Backspace')
  {
    check();
  }
  else if(event.key === 'y')
  {
    yes();
  }
  else if(event.key === 'n')
  {
    no();
  }
})

function check()
{
  document.querySelector('.js-confirmation').innerHTML=
  `Are you sure you want to Reset Score ? 
  <div>
  <button class="confirm" onclick="yes()">Yes</button>
  <button class="confirm" onclick="no()">No</button>
  </div>
  `
}

document.querySelector('.js-reset').addEventListener('click',()=>
{ check();
});

function yes()
{
  resetscore();
  document.querySelector('.js-confirmation').innerHTML='';
}

function no()
{
  document.querySelector('.js-confirmation').innerHTML='';
}

function resetscore()
{
  scorecard.win=0,
  scorecard.losses=0,
  scorecard.Tie=0
  updatescore();
}

function playgame(playermove)
{
  const com_move=pickcomputermove();
  let result='';
  if(playermove === 'Scissors')
  {
    if(com_move==='rock')
    {
      result='You Lose.';
    }
    else if(com_move === 'paper')
    {
      result='You won.';
    }

    else if(com_move === 'Scissors')
    {
      result='Tie.';
    }
  }
  else if(playermove === 'paper')
  {
    if(com_move ==='rock')
    {
      result='You won.';
    }
    else if(com_move === 'paper')
    {
      result='Tie.';
    }

    else if(com_move === 'Scissors')
    {
      result='You Lose.';
    }
  }
  else if(playermove === 'rock')
  {
    if(com_move === 'rock')
    {
      result='Tie.';
    }

    else if(com_move === 'paper')
    {
      result='You Lose.';
    }

    else if (com_move === 'Scissors')
    {
      result='You won.';
    }
  }
  
  if(result === 'You won.')
  {
    scorecard.win++;
  }
  else if(result === 'Tie.')
  {
    scorecard.Tie++;
  }
  else
  {
    scorecard.losses++;
  }

  localStorage.setItem('scorecard' , JSON.stringify(scorecard));

  updatescore();

  document.querySelector('.js-result').innerHTML= `${result}`;

  document.querySelector('.js-moves').innerHTML= 
  `Your Move
  <img src="rock-paper-scissors/${playermove}-emoji.png" 
  class="move-icon">
  <img src="rock-paper-scissors/${com_move}-emoji.png" class="move-icon"> Computer Move`;
}

function updatescore()
{
  document.querySelector('.js-score').innerHTML =
  `Wins: ${scorecard.win} , losses: ${scorecard.losses},Ties: ${scorecard.Tie}`;
  localStorage.setItem('scorecard' , JSON.stringify(scorecard));
}

function pickcomputermove()
{
let com_move='';
const random_number = Math.random();

if(random_number>=0 && random_number < (1/3) )
{
  com_move='rock';
}

else if(random_number >= (1/3) && random_number < (2/3))
{
  com_move='paper';
}

else
{
  com_move='Scissors';
}

return com_move;
}