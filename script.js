console.clear();

// ----------------------------------------------
// Do not modify this code.
// ----------------------------------------------

let canvas = document.getElementById("game");
let context2d = canvas.getContext("2d");
let pacman_model = null;
let snack_pellets = null;
let time_index = 0;
let key = "ArrowRight";
let radius = 20; 
let displacement = 5;
let score = 0;
let paused = true;
let x_pacman = 0;
let y_pacman = 0; 


function hypotenus( a, b ) {
  return Math.sqrt( Math.pow( a, 2 ) + Math.pow(  b, 2 ) );
}

function createSnackPellets() {
  
  let index = 0;
  let pellet_radius = 3;
  let space = 25;
  let path = null; 
  
  for ( let y_pellet = space; y_pellet < canvas.height; y_pellet+= space ) {
    
    for ( let x_pellet = space; x_pellet < canvas.width; x_pellet+= space ) {
      
      if ( hypotenus( ( x_pellet - canvas.width/2 ), ( y_pellet - canvas.height/2 ) )  >  ( radius + space/2 ) ) {
        path = new Path2D();
        path.arc( x_pellet, y_pellet, pellet_radius, 0, 2*Math.PI );
        snack_pellets[index++] = { x: x_pellet, y: y_pellet, circle:path };
      }
      
    }
    
  }
  
}

function createModel() {

  pacman_model[0] = new Path2D();
  pacman_model[0].moveTo( 0, 0 );
  pacman_model[0].arc( 0, 0, radius, 0, 2*Math.PI );
  pacman_model[0].lineTo( 0, 0 );
  
  pacman_model[1] = new Path2D();
  pacman_model[1].moveTo( 0, 0 );
  pacman_model[1].lineTo( radius*Math.cos( 25*Math.PI)/180, radius*Math.sin( 25*Math.PI)/180);
  pacman_model[1].arc( 0, 0, radius, 25*Math.PI/180, -25*Math.PI/180 );
  pacman_model[1].lineTo( 0, 0 );
  
  pacman_model[2] = new Path2D();
  pacman_model[2].moveTo( 0, 0 );
  pacman_model[2].lineTo( radius*Math.cos( 45*Math.PI/180), radius*Math.sin( 45*Math.PI/180));
  pacman_model[2].arc( 0, 0, radius, 45*Math.PI/180, -45*Math.PI/180 );
  pacman_model[2].lineTo( 0, 0 );
  
  pacman_model[3] = pacman_model[1];

}


// ----------------------------------------------
// Task 1: Put JS code below.
// ----------------------------------------------


function startGame() {
  // Center pacman
  x_pacman = 150;
  y_pacman = 75;
  
  time_index = 0;
  score = 0;
  
  pacman_model = [];
  snack_pellets = [];

  key = "ArrowRight";
  paused = true;
  
  createModel();
  createSnackPellets();
}


// ----------------------------------------------
// Task 2: Modify the JS code below.
// ----------------------------------------------
document.addEventListener( "keyup", keyEvent );

function keyEvent( event ) {
  
  if (event.key == "s") {
    startGame();
    console.log("starting game");
  } else if (event.key == " ") {
    paused = !paused;
    console.log("paused = " + paused);
  } else if (!paused) {
    key = event.key;
    console.log("key = " + key);
  }

}


// ----------------------------------------------
// Task 3: Put JS code below.
// ----------------------------------------------

function draw() {
  document.getElementById("score").innerText = score;

  context2d.clearRect(0, 0, 300, 150);

  context2d.fillStyle = "black";
  context2d.strokeStyle = "black";

  context2d.save();
  
  for(let i = 0; i < snack_pellets.length; i++)  {
    let pellet = snack_pellets[i];
    
    if( hypotenus((x_pacman - pellet.x), (y_pacman - pellet.y)) < (radius/2) ) {
      snack_pellets.splice(i, 1);
      score += 10;
    }
  }
  
  for(let pellet of snack_pellets) {
    context2d.fill(pellet.circle);
    context2d.stroke(pellet.circle);
  }

  if(x_pacman <= radius) {
    x_pacman = radius;
  } else if(x_pacman >= (300 - radius)) {
    x_pacman = 300 - radius;
  }

  if(y_pacman <= radius) {
    y_pacman = radius;
  } else if(y_pacman >= (150 - radius)) {
    y_pacman = 150 - radius;
  }

  context2d.translate(x_pacman, y_pacman);

  switch(key) {
  	case "ArrowUp":
    	context2d.rotate(Math.PI*3/2);
      break;
    case "ArrowDown":
    	context2d.rotate(Math.PI/2);
      break;
    case "ArrowLeft":
    	context2d.rotate(Math.PI);
      break;
  }

  if(!paused) {
    switch(key) {
      case "ArrowUp":
        y_pacman -= displacement;
        break;
      case "ArrowDown":
        y_pacman += displacement;
        break;
      case "ArrowLeft":
        x_pacman -= displacement;
        break;
      case "ArrowRight":
        x_pacman += displacement;
        break;
    }
  }

  context2d.fillStyle = "yellow";
  context2d.fill(pacman_model[time_index]);
  context2d.stroke(pacman_model[time_index]);
  context2d.restore();

  time_index = ++time_index % 4;
}


// ----------------------------------------------
// Task 4: Put JS code below.
// ----------------------------------------------

startGame();
setInterval(draw, 100);