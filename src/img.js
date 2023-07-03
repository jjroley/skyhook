

const images = {
  bg: () => {
    noStroke()
    // background(255)
    // fill(255, 100, 0)
    // for(var i = 0; i < 10; i++) {
    //   rect(0, i * 60, 400, 30)
    // }

    // fill
    for(var i = 0; i < 100; i++) {
      fill(random(200, 255), random(80, 120), 0)
      ellipse(random(20, 380), random(20, 580), 10, 10)
    }

    return get(0, 0, 400, 600)
  },
  stolenBg: () => {
    return loadImage('/bg.png')
  }
}

function loadImages() {
  for(var img in images) {
    images[img] = images[img]()
  }
}