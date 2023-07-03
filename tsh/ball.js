const GRAVITY = 2

class Ball {
  constructor() {
    this.x = 0
    this.y = 0
    this.radius = 20

    this.velX = 0
    this.velY = 0

    this.mass = 1

    this.anchor = null
  }

  update() {

    this.applyForce(0, GRAVITY)

    if(this.anchor) {

    }


    this.x += this.velX
    this.y += this.velY
  }

  applyForce(x, y) {
    this.x += x / this.mass
    this.y += y / this.mass
  }

  handleReachAnchors(anchors) {
    if(this.anchor) return
    for(const anchor in anchors) {
      if(dist(this.x, this.y, anchor.x, anchor.y) < this.radius) {
        return this.anchor = anchor
      }
    }
  }

  handleAnchor() {
    if(!this.anchor) return

    const armLength = dist(this.x, this.y, this.anchor.x, this.anchor.y)
    const theta = -1 * atan2(this.anchor.y - this.y, this.anchor.x - this.x) - 90
    const newAngle = 
    [0,2].map(n => n * sin(theta) * GRAVITY)
    
    this.velX += sin(theta) * GRAVITY
  }
}