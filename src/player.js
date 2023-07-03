class Player {
  constructor(x = 200, y = 200) {
    this.body = Bodies.circle(x, y, 20, { restitution: 0.5, mass: 4 })

    // initialize the player with some upward velocity
    Body.setVelocity(this.body, { x: 8, y: -15 })

    this.handhold = this.prevHandhold = this.constraint = null
    this.dragging = false
    this.canGrab = true

    Composite.add(engine.world, this.body)
  }

  update() {
    this.handleDrag()
  }

  display() {
    const angle = this.handhold ? atan2(this.handhold.y - this.body.position.y, this.handhold.x - this.body.position.x) : this.body.angle / Math.PI * 180
    this.handhold && Body.setAngle(this.body, angle / 180 * Math.PI)
    push()
    stroke(255)
    strokeWeight(5)
    if(this.constraint) {
      const centerX = (this.handhold.x + this.body.position.x) / 2
      const centerY = (this.handhold.y + this.body.position.y) / 2
      const len = dist(this.handhold.x, this.handhold.y, this.body.position.x, this.body.position.y) + 10

      push()
      translate(centerX, centerY)
      rotate(angle)
      noFill()
      rectMode(CENTER)
      rect(0, 0, len + 10, 20, 50)
      pop()
    }
    // this.constraint && line(this.constraint.pointA.x, this.constraint.pointA.y, this.body.position.x, this.body.position.y)  
    fill(255, 50, 100)
    ellipse(this.body.position.x, this.body.position.y, 40, 40)

    translate(this.body.position.x, this.body.position.y)
    rotate(angle + 90)
    stroke(0)
    strokeWeight(2)
    arc(-6, -4, 5, 5, 180, 360)
    arc(6, -4, 5, 5, 180, 360)
    arc(0, 4, 12, 12, 0, 180)
    pop()
  }

  grabHandhold(handholds) {
    if(this.handhold || !this.canGrab) return
    for(const handhold of handholds) {
      if(dist(this.body.position.x, this.body.position.y, handhold.x, handhold.y) < 30) {
        this.constraint = Constraint.create({
          pointA: { x: handhold.x, y: handhold.y },
          bodyB: this.body,
          stiffness: 0.005,
          length: 30
        })
        Composite.add(engine.world, this.constraint)
        return this.handhold = handhold
      }
    }
  }

  onDragStart() {
    // Body.setStatic(this.body, true)
  }

  onDragEnd() {
    // Body.setStatic(this.body, false)
    Composite.remove(engine.world, this.constraint)
    this.constraint = null

    const force = {
      x: (this.handhold.x - cam.mouseX) / 5,
      y: (this.handhold.y - cam.mouseY) / 5
    }
    Body.setVelocity(this.body, force)

    this.canGrab = false
    setTimeout(() => this.canGrab = true, 100)
    this.handhold = null
  }

  handleDrag() {
    if(!this.handhold) return
    if(mouseIsPressed && !this.dragging && dist(this.body.position.x, this.body.position.y, cam.mouseX, cam.mouseY) < 100) {
      this.onDragStart()
      this.dragging = true
    }
    else if(!mouseIsPressed && this.dragging) {
      this.onDragEnd()
      this.dragging = false
    }
    if(!this.dragging) return
    const maxLength = 100
    const angle = atan2(cam.mouseY - this.handhold.y, cam.mouseX - this.handhold.x)
    const len = min(maxLength, dist(this.handhold.x, this.handhold.y, cam.mouseX, cam.mouseY))
    Body.setPosition(this.body, {
      x: this.handhold.x + cos(angle) * len,
      y: this.handhold.y + sin(angle) * len
    })
  }
}