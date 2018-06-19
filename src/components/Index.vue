<template>
  <!-- p5 dev branch -->
  <div id="sketch" ref="sketch"></div>
</template>

<script>
import Matter from 'matter-js'

export default {
  name: 'Index',
  props: {},
  data: function () {
    return {
      canvas: null,
      cats: [
        require('@/assets/cat_1.png'),
        require('@/assets/cat_2.png'),
        require('@/assets/cat_3.png'),
        require('@/assets/cat_4.png'),
        require('@/assets/cat_5.png'),
        require('@/assets/cat_6.png')
      ],
      numcatz: 6,
      spring: 0.0001,
      catz: [],
      rotation: 0,
      acceleration: 0.07,
      drag: 1,
      friction: 1.0,
      gravity: 0.7,
      numBalls: 15,
      balls: [],
      selectedBall: false,
      ball: null
    }
  },
  methods: {},
  computed: {
    el () {
      return this.$refs.sketch
    }
  },
  created () {},
  mounted () {
    let self = this
    // window.onload = function () {
    console.log(Matter)
    const Cats = null || {}
    Cats.sprites = function () {
      let Engine = Matter.Engine
      let Render = Matter.Render
      let Runner = Matter.Runner
      let Composites = Matter.Composites
      let Common = Matter.Common
      let MouseConstraint = Matter.MouseConstraint
      let Mouse = Matter.Mouse
      let World = Matter.World
      let Bodies = Matter.Bodies
      // create engine
      let engine = Engine.create()
      let world = engine.world
      // create renderer
      let render = Render.create({
        element: self.$refs.sketch,
        engine: engine,
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          background: 'transparent',
          showAngleIndicator: false,
          wireframes: false
        }
      })
      Render.run(render)
      // create runner
      let runner = Runner.create()
      Runner.run(runner, engine)
      // add bodies
      let options = {
        isStatic: true
      }
      world.bodies = []
      // these static walls will not be rendered in this sprites Cats, see options
      World.add(world, [
        Bodies.rectangle(document.documentElement.clientWidth / 2, 0, document.documentElement.clientWidth, 100, options),
        Bodies.rectangle(document.documentElement.clientWidth / 2, document.documentElement.clientHeight, document.documentElement.clientWidth, 100, options),
        Bodies.rectangle(document.documentElement.clientWidth, document.documentElement.clientHeight / 2, 100, document.documentElement.clientHeight, options),
        Bodies.rectangle(0, document.documentElement.clientHeight / 2, 100, document.documentElement.clientHeight, options)
      ])
      let stack = Composites.stack(20, 20, 2, 2, 0, 0, function (x, y) {
        if (Common.random() > 0.35) {
          return Bodies.rectangle(x, y, 64, 64, {
            render: {
              strokeStyle: '#ffffff',
              sprite: {
                texture: self.cats[1]
              }
            }
          })
        } else {
          return Bodies.circle(x, y, 46, {
            density: 1,
            frictionAir: 0.06,
            restitution: 0.3,
            friction: 0.01,
            render: {
              sprite: {
                texture: self.cats[0]
              }
            }
          })
        }
      })
      World.add(world, stack)
      // add mouse control
      let mouse = Mouse.create(render.canvas)
      let mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      })
      World.add(world, mouseConstraint)
      // keep the mouse in sync with rendering
      render.mouse = mouse
      // fit the render viewport to the scene
      Render.lookAt(render, {
        min: {
          x: 0,
          y: 0
        },
        max: {
          x: window.innerWidth,
          y: window.innerHeight
        }
      })
      // context for MatterTools.Demo
      return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function () {
          Matter.Render.stop(render)
          Matter.Runner.stop(runner)
        }
      }
    }
    Cats.sprites()
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#sketch {
  background: -moz-linear-gradient(top,  rgba(239,49,249,1) 0%, rgba(125,185,232,0) 100%);
  background: -webkit-linear-gradient(top,  rgba(239,49,249,1) 0%,rgba(125,185,232,0) 100%);
  background: linear-gradient(to bottom,  rgba(239,49,249,1) 0%,rgba(125,185,232,0) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ef31f9', endColorstr='#007db9e8',GradientType=0 );

}
</style>
