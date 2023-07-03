let handholds = []
let spikes = []

class Handhold {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  display() {
    push()
    translate(this.x, this.y)
    fill(255)
    stroke(0)
    strokeWeight(1)
    ellipse(0, 0, 25, 25)
    noStroke()
    fill(0, 107, 161);
    ellipse(0, 0, 18, 18)
    fill(0, 147, 201);
    ellipse(0, 0, 18, 18)
    pop()
  }
}
Handhold.add = function(x, y) {
  return handholds.push(new Handhold(x, y))
}
Handhold.clear = () => handholds = []

class Spike {
  constructor(y, side) {
    this.y = y
    this.side = side

    const x = side === 'right' ? width - 25 : 25
    this.body = Bodies.polygon(x, y, 3, 50, { isStatic: true, angle: side === 'right' ? 0 : Math.PI })

    Composite.add(engine.world, this.body)
  }

  display() {
    fill(80, 50, 0)
    beginShape()
    for(const v of this.body.vertices) {
      vertex(v.x, v.y)
    }
    endShape(CLOSE)
  }
}
Spike.add = function(y, side) {
  return spikes.push(new Spike(y, side))
}
Spike.clear = () => spikes = []


