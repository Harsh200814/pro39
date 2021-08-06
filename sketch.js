var ground,groundimg,theif,theif_running,ground,groundimg,invisibleground,score=0,Play=1,End=0,gameState=Play,coin,coinimg,obstacle,obstacle7,stone,stoneGroup,obstacleGroup,coinGroup,gameover,gameoverimg,restart,restartimg;

function preload(){
theif_running=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");
groundimg=loadImage("ground2.png");
coinimg=loadImage("123.png");
obstacle7=loadImage("obstacle.png");
gameoverimg=loadImage("gameOver.png");
restartimg=loadImage("restart.png");
}
function setup() {
createCanvas(600,600);
theif=createSprite(60,530);
theif.scale=0.8;
theif.addAnimation("running", theif_running);
ground=createSprite(300,540);
ground.addImage(groundimg);
invisibleground=createSprite(300,540,800,10);
invisibleground.visible=false;
gameover=createSprite(300,250);
gameover.addImage(gameoverimg);
gameover.scale=0.8;  
restart=createSprite(300,320);
restart.scale=0.8;
restart.addImage(restartimg);
stoneGroup=new Group();
obstacleGroup=new Group();
coinGroup=new Group();
theif.setCollider("circle",0,0,30);
}
function draw() {
background("skyblue"); 
theif.collide(invisibleground);
invisibleground.depth=theif.depth;
theif.depth=theif.depth+1
if(gameState===Play){
ground.velocityX=-3
if(ground.x<0){
ground.x=ground.width/2;
}  
createcoins();
createstone();
if(theif.isTouching(coinGroup)){
coinGroup.destroyEach();
score=score+1;
}
if(keyDown("space")&&theif.y>380){
theif.velocityY=-12;
}
gameover.visible=false;
restart.visible=false;
theif.velocityY=theif.velocityY+0.8;
if(theif.isTouching(stoneGroup)){
gameState=End;
}}
if(gameState===End){
ground.velocityX=0;
stoneGroup.setVelocityXEach(0);
coinGroup.setVelocityXEach(0);
stoneGroup.setLifetimeEach(-1);
coinGroup.setLifetimeEach(-1);
gameover.visible=true;
restart.visible=true;
if(mousePressedOver(restart)){
stoneGroup.destroyEach();
coinGroup.destroyEach();
score=0;  
gameState=Play;
}

}
drawSprites();
textSize(20)
fill("white");
text("Score : "+ score,500,30);}
function createcoins(){
if(frameCount%200===0){
coin=createSprite(590,Math.round(random(300,380)));
coin.addImage(coinimg);
coin.scale=0.3;
coin.velocityX=-3;
coin.lifetime=200;
coinGroup.add(coin);}  
}
function createstone(){
if(frameCount%400===0){
stone=createSprite(600,510);
stone.velocityX=-3;
stone.lifetime=200;
stone.scale=0.15;
stone.addImage(obstacle7);
stoneGroup.add(stone)}  
}