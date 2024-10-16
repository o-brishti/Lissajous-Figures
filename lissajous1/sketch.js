let angle = 0;
let points = []; 
let freqx = 3;
let freqy = 2;
let phase = 0;
let sliderXFreq, sliderYFreq;

function setup() {
  createCanvas(800, 800);
  createP('Frequency 1:');
  sliderXFreq = createSlider(1, 10, freqx, 1);
  sliderXFreq.style('width', '580px');
  
  createP('Frequency 2:');
  sliderYFreq = createSlider(1, 10, freqy, 1);
  sliderYFreq.style('width', '580px');
  
  createP('Phase Difference:');
  sliderDphase = createSlider(0, 2*PI, phase, PI/6);
  sliderDphase.style('width', '580px');
 
  sliderXFreq.input(resetPoints);
  sliderYFreq.input(resetPoints);
  sliderDphase.input(resetPoints);
  
  background(0);
}
function resetPoints() {
  
  points = [];
  angle = 0;  
}
function draw() {
  background(0);
  stroke(255);
  strokeWeight(1)
  noFill();
  
  freqx = sliderXFreq.value();
  freqy = sliderYFreq.value();
  phase = sliderDphase.value();
  let amplitude = 200;
  
  let x = amplitude * cos(freqx * angle);
  let y = amplitude * sin(freqy * angle + phase);
  points.push([400 + x, 400 + y]);
  strokeWeight(12);
  point(400 + x, 400 + y);
  
  strokeWeight(2);
  beginShape();  
  for (let i = 0; i < points.length; i++) {
    vertex(points[i][0], points[i][1]);  
  }
  endShape();
  angle+=0.02
  displaySliderValues();
}

function displaySliderValues() {
  fill(255);
  textSize(24);
  textFont('Courier New');
  textAlign(LEFT);
  
  let simplifiedRatio = simplifyRatio(freqx, freqy);
  text(`Frequency Ratio = ${simplifyRatio(freqx, freqy)}`, 100, 100);
  text(`Phase Difference = ${phase}`, 100, 50);
}

function simplifyRatio(a, b) {
  function gcd(x, y) {
    while (y !== 0) {
      let t = y;
      y = x % y;
      x = t;
    }
    return x;
  }
  let divisor = gcd(a, b);
  return `${a / divisor}:${b / divisor}`;
}