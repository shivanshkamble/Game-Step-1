var player, playerWalking, playerHurt, playerTaunt
var ground;
var obstacleGroup, coinGroup;
var coinImg, coinSound;
var score, life;
var gameState;
var lifeImg;
var backgroundSprite, bg1, bg2,GameOverSprite, GameOverImg
function preload(){
  coinImg = loadImage("images/17.png")
  coinSound = loadSound("Sounds/coin.mp3")
  lifeImg = loadImage("images/life.png")
  bg1 = loadImage("images/Background/Bg.png")
  //bg2 = loadImage("images/Background/Bg1.psd")

  playerWalking = loadAnimation("images/player/Walking/Wraith_03_Moving Forward_000.png",
  "images/player/Walking/Wraith_03_Moving Forward_001.png", "images/player/Walking/Wraith_03_Moving Forward_002.png",
  "images/player/Walking/Wraith_03_Moving Forward_003.png","images/player/Walking/Wraith_03_Moving Forward_004.png",
  "images/player/Walking/Wraith_03_Moving Forward_005.png", "images/player/Walking/Wraith_03_Moving Forward_006.png",
  "images/player/Walking/Wraith_03_Moving Forward_007.png","images/player/Walking/Wraith_03_Moving Forward_008.png",
  "images/player/Walking/Wraith_03_Moving Forward_009.png", "images/player/Walking/Wraith_03_Moving Forward_010.png",
  "images/player/Walking/Wraith_03_Moving Forward_011.png",)
  playerHurt = loadAnimation("images/player/Hurt/Wraith_03_Hurt_000.png", "images/player/Hurt/Wraith_03_Hurt_001.png",
  "images/player/Hurt/Wraith_03_Hurt_002.png", "images/player/Hurt/Wraith_03_Hurt_003.png", "images/player/Hurt/Wraith_03_Hurt_004.png",
  "images/player/Hurt/Wraith_03_Hurt_005.png", "images/player/Hurt/Wraith_03_Hurt_006.png", "images/player/Hurt/Wraith_03_Hurt_007.png",
  "images/player/Hurt/Wraith_03_Hurt_008.png", "images/player/Hurt/Wraith_03_Hurt_009.png", "images/player/Hurt/Wraith_03_Hurt_010.png", 
  "images/player/Hurt/Wraith_03_Hurt_011.png")
  playerTaunt = loadAnimation("images/player/Taunt/Wraith_03_Taunt_000.png", "images/player/Taunt/Wraith_03_Taunt_001.png", "images/player/Taunt/Wraith_03_Taunt_002.png",
  "images/player/Taunt/Wraith_03_Taunt_003.png", "images/player/Taunt/Wraith_03_Taunt_004.png", "images/player/Taunt/Wraith_03_Taunt_005.png",
  "images/player/Taunt/Wraith_03_Taunt_006.png", "images/player/Taunt/Wraith_03_Taunt_007.png", "images/player/Taunt/Wraith_03_Taunt_008.png",
  "images/player/Taunt/Wraith_03_Taunt_009.png", "images/player/Taunt/Wraith_03_Taunt_010.png", "images/player/Taunt/Wraith_03_Taunt_011.png",
  "images/player/Taunt/Wraith_03_Taunt_012.png", "images/player/Taunt/Wraith_03_Taunt_013.png", "images/player/Taunt/Wraith_03_Taunt_014.png",
  "images/player/Taunt/Wraith_03_Taunt_015.png", "images/player/Taunt/Wraith_03_Taunt_016.png", "images/player/Taunt/Wraith_03_Taunt_017.png")
}
function setup() {
  createCanvas(1600,800);
//   backgroundSprite = createSprite(800,400)
//   backgroundSprite.addAnimation("bg1",bg1)
//  backgroundSprite.scale = 1.25
//  backgroundSprite.y = 450


  player = createSprite(50, 750, 50, 50);
  player.addAnimation("walking",playerWalking)
  player.addAnimation("taunt", playerTaunt)
  player.addAnimation("hurt", playerHurt)
  player.scale = 0.4;
  //player.debug = true
  player.setCollider("circle",0,0, 110)
  ground = createSprite(800,780,1600,20)
  obstacleGroup = new Group()
  coinGroup = new  Group()
  score = 0
  life=3
  gameState = "play"
}

function draw() {
  background("black");  
  imageMode(CENTER)
image(bg1,800,400,width,800)
if(keyDown("space") && player.isTouching(ground)){
  player.velocityY = -15
}
else{
  player.collide(ground)
}
player.velocityY += 0.8


for(var  i = 0; i<coinGroup.size();i++){
  if(coinGroup.get(i).isTouching(player)){
    coinGroup.get(i).destroy();
    player.changeAnimation("taunt",playerTaunt)
    score=score+1
    coinSound.play();
  }
}



for(var i = 0; i<obstacleGroup.size();i++){
  if(obstacleGroup.get(i).isTouching(player)){
    obstacleGroup.get(i).destroy();
    player.changeAnimation("hurt", playerHurt)
    life = life-1
  }
}
textSize(60)
text(score,1400,80)
for(var i = life; i>0;i--){
  image(lifeImg, i*50,50,50,50)
}
if(life===0){
  gameState = "lose"
}

if(score===5){
gameState = "win"
}

if(gameState==="lose"){
  textSize(25)
  text("You Lose",800,400);
  obstacleGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);
}

if(gameState==="win"){
  text("You Win",800,400);
  obstacleGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);
}

  createObstacles();
  createCoins();
  
  drawSprites();
  
}

function createObstacles(){
 if(frameCount%150===0){
  var obstacle = createSprite(1600,750,50,50)
  obstacle.velocityX = -5
  obstacle.lifetime = 330
  obstacleGroup.add(obstacle)
 }
}

function createCoins(){
  if(frameCount%150===0){
    var coin = createSprite(1600,700,50,50)
    coin.addImage(coinImg)
    coin.scale = 0.1
    coin.y = Math.round(random(625,650))
    coin.velocityX = -5
    coin.lifetime = 330
coinGroup.add(coin)
  }
}