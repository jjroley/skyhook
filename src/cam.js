
class Camera {
  constructor() {
    this.y = this.mouseX = this.mouseY = 0
    this.top = 0
  }
  run(targetY) {
    const target = Math.max(0, targetY - 200)

    this.y = lerp(this.y, target, 0.5)
    
    this.top = this.y + height
    this.mouseY = mouseY - this.y
    this.mouseX = mouseX
  }
}

const cam = new Camera()