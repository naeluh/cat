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
      canvas: null,
      cats: [
        require('@/assets/cat_1.png'),
        require('@/assets/cat_2.png'),
        require('@/assets/cat_3.png'),
        require('@/assets/cat_4.png'),
        require('@/assets/cat_5.png'),
        require('@/assets/cat_6.png')
      ]
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
    let self = this
    const myp5 = new P5(function (sketch) {
      console.log(sketch)
      // let speed = 100
      // Position Variables
      // let x = 10
      // let y = 10
      let cat = ''
      // Speed - Velocity
      // let vx = speed
      // let vy = speed
      // Acceleration
      // let ax = speed
      // let ay = speed
      // Multipliers
      // let vMultiplier = 0.07
      // let bMultiplier = 0.6

      // Run p5 sketch
      sketch.preload = function () {}
      sketch.setup = function () {
        this.canvas = sketch.createCanvas(sketch.displayWidth, sketch.displayHeight)
        this.canvas.parent(self.$refs.sketch)
        cat = new Cat()
        // self.cats[0] = sketch.loadImage(self.cats[0])
        // for (let i = 0; i < self.cats.length; i++) {
        //  const cat = self.cats[i]
        //  self.cats[i] = sketch.loadImage(cat)
        // }
      }
      sketch.draw = function () {
        sketch.rectMode(sketch.CENTER)
        sketch.background(255)
        cat.display()
        // console.log(cat.display())
        // catMove()
      }
      function Cat () {
        console.log(self.cats[0])
        let img = sketch.loadImage(self.cats[0])
        // sketch.push()
        // sketch.imageMode(sketch.CENTER)
        // sketch.translate(x, y)
        // sketch.image(self.cats[0], 0, 0, x, y)
        // sketch.pop()
        this.display = function () {
          sketch.imageMode(sketch.CENTER)
          sketch.image(img, sketch.displayWidth / 2, sketch.displayHeight / 2, 0, 0)
        // for (let i = 0; i < self.cats.length; i++) {
          // console.log('here')
        }
        // }
      }
      /*
      function catMove () {
        for (let i = 0; i < self.cats.length; i++) {
          const cat = self.cats[i]
          sketch.push()
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
            sketch.rotate(0)
            x = sketch.width - 20
            vx = -vx * bMultiplier
          }
          if (y > sketch.height - 20) {
            y = sketch.height - 20
            vy = -vy * bMultiplier
          }
          sketch.imageMode(sketch.CENTER)
          sketch.translate(x, y / i)
          sketch.rotate(sketch.radians(sketch.frameCount))
          sketch.image(cat, 0, 0, 0, 0)
          sketch.pop()
        }
      }
      */
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
