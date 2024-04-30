let motion = 0;
let temperature; 
let baseSpeed = 0.005;
let json;
function preload() {

  let url = "https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=imperial&APPID=e812164ca05ed9e0344b89ebe273c141";
  json = loadJSON(url);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  temperature = json.main.temp;
  noFill();
  colorMode(HSB, 360, 100, 100); 
  console.log(temperature);
}

function draw() {
  background(220);
  temperature = constrain(temperature, 0, 100);

  for (let i = 0; i < height; i += 5) {
  
    let hue = map(temperature, 0, 100, 240, 0);
    stroke(hue, 80, 90);
    strokeWeight(1);

    beginShape();
    for (let x = 0; x < width; x += 10) {
      let movementScale = map(temperature, 0, 100, 1, 5); 
      let xShift = noise(x * 0.01 * movementScale, i * 0.01 * movementScale, motion) * 15 - 7.5;
      let yShift = noise(x * 0.02 * movementScale, i * 0.02 * movementScale, motion) * 30 - 15;
      vertex(x + xShift, i + yShift);
    }
    endShape();
  }

  motion += baseSpeed; 
}
