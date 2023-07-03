class Game {
  constructor() {
    
  }

  initialize() {

    // remove all matterjs bodies
    Composite.clear(engine.world)

    this.player = new Player(0, height + 100)
    this.started = false

    Handhold.clear()
    
    this.chunks = []

    this.chunks.push(new Chunk(0, initialGen))

   

    this.boundaries = []

    this.boundaries.push(
      Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, restitution: 1 }),
      Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, restitution: 1 })
    )

    Composite.add(engine.world, this.boundaries)

    this.chunk = 0
    cam.y = 0
  }

  run() {
    background(0, 255, 0)
    push()
    const playerWorldY = this.player.body.position.y * -1 + height
    cam.run(playerWorldY)
    

    if(cam.top > this.chunks[0].y) {
      this.chunks.unshift(new Chunk(this.chunks[0].y + height))
      if(this.chunks.length > 5) {
        this.chunks.pop()
      }
    }

    const lastChunk = this.chunks[this.chunks.length - 1]

    cam.y = Math.max(cam.y, lastChunk.y)
    
    translate(0, cam.y)

    Body.setPosition(this.boundaries[0], { x: -25, y: -cam.y + height / 2 })
    Body.setPosition(this.boundaries[1], { x: width + 25, y: -cam.y + height / 2 })

    

    this.chunks.forEach(c => c.display())

    this.player.update()
    this.player.grabHandhold(handholds)

    handholds.forEach(handhold => handhold.display())
    spikes.forEach(spike => spike.display())


    this.player.display()

    if(this.player.lastHandhold) {
      this.started = true
    }
    pop()
  }
}

const game = new Game()