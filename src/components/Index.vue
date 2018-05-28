<template>
  <!-- p5 dev branch -->
  <div id="sketch" ref="sketch"></div>
</template>

<script>
import P5 from 'p5/lib/p5.min'

export default {
  name: 'Index',
  props: {},
  data: function () {
    return {
      canvas: null
    }
  },
  methods: {},
  computed: {
    el () {
      return this.$refs.sketch
    }
  },
  created () {
    // paper.install(window)
  },
  mounted () {
    const self = this
    const myp5 = new P5(function (sketch) {
      console.log(sketch)
      /*
      * @name Acceleration Ball Bounce
      * @description Move an ellipse around based on accelerationX and accelerationY values, and bounces when touch the edge of the canvas.
      */
      // Position Variables
      let x = 0
      let y = 0
      // Speed - Velocity
      let vx = 250
      let vy = 250
      // Acceleration
      let ax = 500
      let ay = 500
      const vMultiplier = 1
      const bMultiplier = 0.9

      sketch.setup = function () {
        // console.log(self)
        this.canvas = sketch.createCanvas(sketch.displayWidth, sketch.displayHeight)
        this.canvas.parent(self.$refs.sketch)
        sketch.fill(0)
      }

      sketch.draw = function () {
        // console.log('draw')
        sketch.background(255)
        ballMove()
        // console.log(x,y)
        sketch.ellipse(x / 2, y / 2, 250, 250)
        sketch.ellipse(x, y, 500, 500)
      }

      function ballMove () {
        ax = sketch.accelerationX
        ay = sketch.accelerationY
        vx = vx + ay
        vy = vy + ax
        y = y + vy * vMultiplier
        x = x + vx * vMultiplier
        // Bounce when touch the edge of the canvas
        if (x < 0) {
          x = 0
          vx = -vx * bMultiplier
        }
        if (y < 0) {
          y = 0
          vy = -vy * bMultiplier
        }
        if (x > sketch.width - 20) {
          x = sketch.width - 20
          vx = -vx * bMultiplier
        }
        if (y > sketch.height - 20) {
          y = sketch.height - 20
          vy = -vy * bMultiplier
        }
        // console.log(sketch.width)
      }
    })
    console.log(myp5)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#viewport {
  position: relative;
  height: 100vh;
  width: 100vw;
}
</style>
