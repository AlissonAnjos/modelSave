let video;
let model;
let classifier;
let label = '';
let imgButton;
let trainButton;
let saveButton;



function setup() {
  createCanvas(600, 400);
  video = createCapture(VIDEO).hide(); //usa a webcam

  model = ml5.featureExtractor('MobileNet', modelReady);
  classifier = model.classification(video, videoReady);
  
  imgButton = createButton('Capturar');
	imgButton.mousePressed(function (){
  													classifier.addImage('Alisson'); });

  
  trainButton = createButton('Treinar');
	trainButton.mousePressed(function(){
  													classifier.train(trainProgress)});
  
  trainButton = createButton('Salvar');
	trainButton.mousePressed(function(){
  													classifier.save()});
  
  
}

function draw() {
	background(0);
  image(video, 0, 0, width, height-30);
  fill(255, 0, 0);
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text(label, width / 2, height-5);
 
}

function trainProgress(loss){
  if(loss == null){
    console.log('Treino finalizado!');
    classifier.classify(gotResult);
  }
  else{
  	console.log(loss);
  }
}

function modelReady() {
  console.log('model ready');

}

function videoReady() {
  console.log('video ready');

}

function gotResult(err, result) {
  if (err) {
    console.error(err);
  } else {
    //console.log(result);
    label = result;
    classifier.classify(gotResult);
  }
}
