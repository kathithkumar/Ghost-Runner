var well, well_img;
var ghost, ghost_img;
var door, door_img, door_group;
var climber, climber_img, climber_group;
var invisibleclimber, invisibleclimber_group;
var sound
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  well_img = loadImage("tower.png");
  ghost_img = loadImage("ghost-standing.png");
  door_img = loadImage("door.png");
  climber_img = loadImage("climber.png");
  sound = loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  sound.loop();
  well = createSprite(300,300,10,10);
  well.addImage(well_img);
  ghost = createSprite(300,400,10,10);
  ghost.addImage(ghost_img);
  ghost.scale = 0.4;
  door_group = new Group();
  climber_group = new Group();
  invisibleclimber_group = new Group();
}
function draw(){
  background(0);
if(gameState === PLAY){

  well.velocityY = 5
  if(well.y > 500){
    well.y = 300;
  }
  if(keyDown("space")){
    ghost.velocityY = -6;
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 2;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 2;
  }
  ghost.velocityY = ghost.velocityY +  0.5 ;
  spawndoors();
  if(climber_group.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleclimber_group.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gameState = END;
  }
  drawSprites();
 }
  if(gameState === END){
    textSize(20);
    fill("yellow");
    text("Game Over", 250, 300);
  }
}
function spawndoors(){
  if(frameCount%100 === 0){
    door = createSprite(Math.round(random(100,500)),0,10,10);
    door.addImage(door_img);
    door.velocityY = 2;
    door.lifetime = 310;
    door.depth = ghost.depth ;
    ghost.depth = ghost.depth + 1;
    door_group.add(door);
    climber = createSprite(door.x,50,10,10);
    climber.addImage(climber_img);
    climber.velocityY = 2;
    climber.lifetime = 310;
    climber_group.add(climber);
    invisibleclimber = createSprite(door.x,55,climber.width,2);
    invisibleclimber.velocityY = 2;
    invisibleclimber.lifetime = 310;
    invisibleclimber.debug = true;
    invisibleclimber_group.add(invisibleclimber);
  }
}