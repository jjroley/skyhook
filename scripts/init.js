const { 
  Engine, 
  Runner, 
  Bodies,
  Body,
  Composite, 
  Constraint, 
  MouseConstraint, 
  Mouse, 
  Events 
} = Matter




let engine, runner, mouseConstraint;

function initMatterjs(canvas) {
  engine = Engine.create()
  runner = Runner.create()

  const mouse = Mouse.create(canvas)
  mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
    }
  })

  Composite.add(engine.world, mouseConstraint)

  Runner.run(runner, engine)
}

