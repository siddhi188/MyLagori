const World = Matter.World
const Engine = Matter.Engine
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint
var engine,world;
var gameState = "start"
var score=0;

function preload(){
  pcImg = loadImage("pc.png")
  bgImg = loadImage("bg.jpg")
  GameOver = loadImage("GameOver.png")
  bg2 = loadImage("bg2.jpg")

  GameOverSound = loadSound("GameOver.wav")
  GameWinSound = loadSound("GameWin.wav")
  GameWinSound = loadSound("GameWin.wav")
  TouchStoneSound = loadSound("TouchStone.wav")
  LostLifeSound = loadSound("LostLife.wav")
  HittingSound = loadSound("Hitting.wav")


 
}
function setup() {
  createCanvas(1350,600);
  
   
  engine = Engine.create()
  world = engine.world

  stone1 = new Stone(700,340,60)
  stone2 = new Stone(700,330,50)
  stone3 = new Stone(700,320,40)
  stone4 = new Stone(700,310,30)
  stone5 = new Stone(700,300,20)
  stone6 = new Stone(700,290,10)
 // stone7 = new Stone(200,10,100)

  ground1 = new Ground(700,600,60,1)
  ground2 = new Ground(700,600,1400,5)
  //ground3 = new Ground(700,590,1350,15)

  rock = new Rock(350, 350, 50);

  slingshot = new Slingshot(rock.body, {x: 322, y: 370})

 pc1 = new Pc(250,400,150)
 npc = new Npc(1150,400,150)
}

function draw() {
  background(bgImg); 
  textSize(30)
  fill("Black")
  text("Stones Collected :"+score,1000,50)

  Engine.update(engine)
  if(gameState==="hit"){
    if(keyDown(LEFT_ARROW)){
      pc1.body.position.x =  pc1.body.position.x-10;
      
   }
   
   if(keyDown(RIGHT_ARROW)){
     pc1.body.position.x =  pc1.body.position.x+10;
   }
   if(keyDown(UP_ARROW)){
     pc1.body.position.y =  pc1.body.position.y-10;
   }
   if(keyDown(DOWN_ARROW)){
     pc1.body.position.y =  pc1.body.position.y+10;
   }
   if(keyDown("A")){
     npc.body.position.x = npc.body.position.x-10
   }
   if(keyDown("D")){
     npc.body.position.x = npc.body.position.x+10
   }
   if(keyDown("W")){
     npc.body.position.x = npc.body.position.y+15
   }
   if(keyDown("S")){
     npc.body.position.x = npc.body.position.y-15
   }
  }
  if(gameState==="hit")
  {
    background(bg2)
  }
  


  fill("Black")
  stone1.display()
  fill("White")
  stone2.display()
  fill("pink")
  stone3.display()
  fill("blue")
  stone4.display()
  fill("yellow")
  stone5.display()
  fill("red")
  stone6.display()
  fill("white")
  //ground1.display()
  fill("black")
  ground2.display()
  pc1.display()
  npc.display()

  drawSprites();
  detectCollision(pc1,stone1)
  detectCollision(pc1,stone2)
  detectCollision(pc1,stone3)
  detectCollision(pc1,stone4)
  detectCollision(pc1,stone5)
  detectCollision(pc1,stone6)
  detectTouch(rock,stone1)
  detectTouch(rock,stone2)
  detectTouch(rock,stone3)
  detectTouch(rock,stone4)
  detectTouch(rock,stone5)
  detectTouch(rock,stone6)
  detectPlayers(pc1,npc)

  
  
  rock.display();
  slingshot.display();
}


function mouseDragged(){
  if(gameState==="start"){
    Matter.Body.setPosition(rock.body, {x: mouseX, y:mouseY})
 
  }
  
  }

function mouseReleased(){
  slingshot.fly();
  gameState = "play"
}



function detectCollision(lpc, lstone1)
{
  stoneBodyPosition = lstone1.body.position;
  pcBodyPosition = lpc.body.position;
  
  var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, pcBodyPosition.x, pcBodyPosition.y)
  //console.log(stoneBodyPosition.x-5)
  //console.log( pcBodyPosition.x-5)
  
  if(distance <= lpc.r + lstone1.r)
  {
  	 Matter.Body.setPosition(lstone1.body,{x:700,y:450});
      //Matter.Body.setStatic(lstone1.body,true)
      TouchStoneSound.play()
      score = score+1
  }
}

function detectTouch(lrock, lstone)
{
  stoneBodyPosition = lstone.body.position;
  rockBodyPosition = lrock.body.position;
  
  var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y,  rockBodyPosition.x,  rockBodyPosition.y)
  if(distance <= lrock.r +  lstone.r)
  {
  	 Matter.Body.setPosition( lstone.body,{x:Math.round(random(100,1200)),y:Math.round(random(100,550))});
      Matter.Body.setStatic( lstone.body,true)
      HittingSound.play()
      gameState = "hit"
      
  }
}
function detectPlayers(lpc, lnpc)
{
  npcBodyPosition = lnpc.body.position;
  pcBodyPosition = lpc.body.position;
  
  var distance = dist(npcBodyPosition.x, npcBodyPosition.y, pcBodyPosition.x, pcBodyPosition.y)
  //console.log(stoneBodyPosition.x-5)
  //console.log( pcBodyPosition.x-5)
  
  if(distance < lpc.r + lnpc.r)
  {
  	 //Matter.Body.setPosition(lnpc.body,{x:700,y:450});
      //Matter.Body.setStatic(lstone1.body,true)
  
        image(GameOver,500,200,300,300)
       // GameOverSound.play()
        gameState="end";
      

  }
}
function keyPressed(){
  if(keyDown(space) && gameState==="play"){
    slingshot.attach(pc.body)

   gameState="hit"
  }
}