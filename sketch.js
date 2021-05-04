// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let raio = diametro / 2;

// variáveis das raquetes
let larguraRaquete = 10;
let alturaRaquete = 60;

// variáveis da minha raquete
let xRaquete = 0;
let yRaquete = 150;

// variáveis do oponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponenete;
let chanceDeErrar = 0;

let colidiu = false;

// variáveis do placar
let meusPontos = 0;
let pontosOponente = 0;

// variáveis de som
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete,yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  collideRectCircle();
  incluirPlacar();
  marcaPonto();
}

function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;  
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }  
}

function mostraRaquete(x,y){
    rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    if(podeSubir()){
      yRaquete -= 10;
    }
  }
  if(keyIsDown(DOWN_ARROW)){
    if(podeDescer()){
      yRaquete += 10; 
    }
  }
}

function verificaColisaoRaquete(x,y){
  if(xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - larguraRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function colisaoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x,y,larguraRaquete, alturaRaquete,xBolinha, yBolinha, raio)
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluirPlacar(){
  textAlign(CENTER);
  textSize(20);
  fill(color(255,140,0));
  rect(180, 5, 40, 24);
  fill (300);
  text(meusPontos, 200,25);
  fill(color(255,140,0));
  rect(380, 5, 40, 24);
  fill (300);
  text(pontosOponente, 400, 25);  
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
    }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function podeDescer(){
  return yRaquete < 390;
}

function podeSubir(){
  return yRaquete > -40;
}