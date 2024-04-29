//Placar do jogo
let pontosJogador = 0;
let pontosOponente = 0;

//Sons do jogo
let trilha;
let raquetada;
let ponto;

//Caracteristicas do circulo
let circleX = 30;
let circleY = 30;
let circleDiametro = 15;
let circleRaio = circleDiametro/2
let collision = false;

//Velocidade do circulo
let circleVelocidadeX = 6;
let circleVelocidadeY = 6;

//Caracteristicas do retângulo
let rectComprimento = 10;
let rectAltura = 90;

//Caracteristicas do retângulo do jogador
let rectX = 5;
let rectY = 150;

//Caracteristicas do retâgulo do oponente
let oponenteRectX = 585;
let oponenteRectY = 150;
let oponenteRectVelocidade;

//Velocidade do retângulo
let rectVelocidade = 6;

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}
function preload(){
  trilha = loadSound("sons/trilha.mp3");
  raquetada = loadSound("sons/raquetada.mp3");
  ponto = loadSound("sons/ponto.mp3");
}
function showCircle() {
  circle(circleX,circleY,circleDiametro);
}
function showRects(){
  rect(rectX, rectY, rectComprimento, rectAltura);
  rect(oponenteRectX, oponenteRectY, rectComprimento, rectAltura)
}
function checkCircleCollision() {
  if ((circleX + circleRaio > width || circleX  - circleRaio < 0)) {
    circleVelocidadeX = circleVelocidadeX * (-1);
  
  }

  if(circleY + circleRaio > height || circleY  - circleRaio < 0) {
    circleVelocidadeY = circleVelocidadeY * (-1);
    
  }
}
function checkRectCircleCollision(x, y) {
  collision = collideRectCircle(x, y, rectComprimento, rectAltura, circleX, circleY, circleRaio);
  if(collision){
    circleVelocidadeX *= -1
    raquetada.play();
  }
}
function moveCircle() {
  circleX += circleVelocidadeX;
  circleY += circleVelocidadeY;
}
function moveRect() {
  if(keyIsDown(UP_ARROW) == true){
    rectY -= rectVelocidade;
  }
  if(keyIsDown(DOWN_ARROW) == true){
    rectY += rectVelocidade;
  }
  rectY = constrain(rectY, 0, 310);
}
function moveOponentRect() {
  oponenteRectVelocidade = circleY - oponenteRectY - (rectComprimento / 2) - 30;
  oponenteRectY += oponenteRectVelocidade;
  oponenteRectY = constrain(oponenteRectY, 0, 310);
}
function incluirPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(pontosJogador, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}
function marcarPontos() {
  if(circleX < 10) {
    pontosOponente++
    ponto.play();
  }
  if(circleX > 590) {
    pontosJogador++   
    ponto.play();
  }
  
}

//Função principal
function draw() {
  
  background(0);
  showCircle();
  showRects();
  moveCircle();
  moveRect();
  checkCircleCollision();
  checkRectCircleCollision(rectX, rectY);
  checkRectCircleCollision(oponenteRectX, oponenteRectY);
  moveOponentRect();
  incluirPlacar();
  marcarPontos();
  
}