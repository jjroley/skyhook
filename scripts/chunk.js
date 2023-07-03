const genTypes = [
  [
    { type: 'handhold', x: 100, y: 100 },
    { type: 'handhold', x: 200, y: 300 },
    { type: 'handhold', x: 100, y: 500 },
  ],
  [
    { type: 'handhold', x: 100, y: 100 },
    { type: 'handhold', x: 200, y: 300 },
    { type: 'handhold', x: 100, y: 500 },
    { type: 'handhold', x: 300, y: 100 },
    { type: 'handhold', x: 300, y: 500 },
  ],
  [
    { type: 'handhold', x: 200, y: 100 },
    { type: 'handhold', x: 300, y: 400 },
    { type: 'spike', y: 300, side: 'left' }
  ],
  [
    { type: 'handhold', x: 200, y: 300 },
    { type: 'spike', y: 400, side: 'left' },
    { type: 'spike', y: 400, side: 'right' }
  ]
]

const initialGen = [
  { type: 'handhold', x: 200, y: 150 },
  { type: 'handhold', x: 200, y: 450 },
  { type: 'handhold', x: 125, y: 450 },
  { type: 'handhold', x: 275, y: 450 },
]

class Chunk {
  constructor(y, gen) {
    this.y = y

    if(!gen) {
      this.gen = genTypes[floor(random(0, genTypes.length))]
    }else {
      this.gen = gen
    }

    this.init()
  }

  init() {
    for(const obj of this.gen) {
      const y = -obj.y -this.y + height
      switch(obj.type) {
        case 'handhold':
          handholds.push(new Handhold(obj.x, y))
        break;
        case 'spike':
          spikes.push(new Spike(y, obj.side))
        break;
      }
    }
  }

  display() {
    image(images.stolenBg, 0, -this.y, width, height)
  }
}