let mouseIsPressed = false


function setup() {
  const canvas = createCanvas(400, 600)
  angleMode(DEGREES)
  initMatterjs(canvas.elt)
  loadImages()

  game.initialize()
}


function draw() {
  game.run()
}

function mousePressed() {
  mouseIsPressed = true
}
function mouseReleased() {
  mouseIsPressed = false
}