//create global variable
var trex,tImage,ground,gImage,iground,trex_collided;
var cloud,cImage,cloudGroup;
var obstacle,oImage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacleGroup;
var count=0
//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,goImage,restart,rImage;
localStorage["HighestScore"] = 0;
function preload (){
  tImage=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png")
    gImage=loadImage("ground2.png");
    cImage=loadImage("cloud.png");
    obstacle1=loadImage("obstacle1.png");
    obstacle2=loadImage("obstacle2.png");
    obstacle3=loadImage("obstacle3.png");
    obstacle4=loadImage("obstacle4.png");
    obstacle5=loadImage("obstacle5.png");
    obstacle6=loadImage("obstacle6.png");
    goImage=loadImage("gameOver.png");
     rImage=loadImage("restart.png");
}
function setup(){
createCanvas(600,200);
  //create a trex sprite
 trex = createSprite(200,180,20,50);
trex.addAnimation("trex_running",tImage);
trex.addAnimation ("collided",trex_collided)
  
//scale and position the trex
trex.scale = 0.5;
trex.x = 50;


//create a ground sprite
        ground=createSprite(300,180,600,1);
ground.addImage("ground2",gImage);
ground.x=ground.width/2;
iground=createSprite(300,190,600,20);
  iground.visible=false;
  obstacleGroup=createGroup();
  cloudGroup=createGroup();
 gameOver =createSprite(280,100,20,20);
restart=createSprite(300,130,20,20);
  gameOver.addImage(goImage);
  restart.addImage(rImage); 
  gameOver.scale = 0.5;
   restart.scale = 0.5;
  gameOver.visible=false;
  restart.visible=false;
  
}

function draw (){
  //set background to white
  background("white");
   text("Score: "+ count, 500, 100);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count + Math.round(World.frameRate/60);
  //jump when the space key is pressed
  if(keyDown("space")&&trex.y>=156){
    trex.velocityY = -10 ;
  }
 
  //add gravity
 
  trex.velocityY=trex.velocityY + 0.8;
  
  //stop trex from falling down
  
  
  
  //trex.velocityX=1;
  if (ground.x<0)
  {
  ground.x=ground.width/2;  
  }
    spawnCloud();
    spawnObstacle();
 if(obstacleGroup.isTouching(trex)){
      
      gameState = END;
     
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(iground);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  if(localStorage["HighestScore"]<score)
  { 
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  count = 0;
  
}

function spawnCloud()
{
if (World.frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cImage);
    cloud.scale = 0.5;
    cloud.velocityX = -6;
    
     //assign lifetime to the variable
    cloud.lifetime = 100;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
}
function spawnObstacle()
{
if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX =  - 6;
    var rand = Math.round(random(1,6)); 
  switch(rand)
  {
    case 1: obstacle.addImage(obstacle1); 
      break; 
      case 2: obstacle.addImage(obstacle2); 
      break;
      case 3: obstacle.addImage(obstacle3);
      break; case 4: obstacle.addImage(obstacle4); 
      break; 
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break; 
      default: break;
  }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
} 
}
