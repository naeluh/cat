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
  created () {
    // paper.install(window)
  },
  mounted () {
    let self = this
    const myp5 = new P5(function (sketch) {
      // console.log(sketch)
      let rx = 0
      let ry = 0
      let i = null
      let j = null
      let color = null
      let mouseIsPressed = false
      // Run p5 sketch
      sketch.mousePressed = function () {
        mouseIsPressed = true
      }
      // Run p5 sketch
      sketch.mouseReleased = function () {
        mouseIsPressed = false
      }
      sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.displayWidth, sketch.displayHeight)
      }
      sketch.preload = function () {
        for (let i = 0; i < self.cats.length; i++) {
          let r = 5 + Math.round(sketch.random() * 35)
          let x = r + Math.round(sketch.random() * (sketch.displayWidth - 2 * r))
          let y = 0
          let c = sketch.color(40, 60, 160, 200)
          self.catz.push(new Cat(x, y, r, c, i))
        }
      }
      sketch.setup = function () {
        this.canvas = sketch.createCanvas(sketch.displayWidth, sketch.displayHeight)
        this.canvas.parent(self.$refs.sketch)
        sketch.noStroke()
      }
      sketch.draw = function () {
        // console.log(self.catz)
        sketch.clear()
        sketch.background('rgba(255,255,255, 0.0)')
        // Draw Cats
        for (i = 0; i < self.catz.length; i++) {
          self.catz[i].display()
        }
        // Calculate acceleration
        for (i = 0; i < self.catz.length; i++) {
          if (self.catz[i] !== self.selectedBall) {
            self.catz[i].dy += self.gravity
          }
          for (j = i; j < self.catz.length; j++) {
            self.catz[i].collide(self.catz[j])
          }
        }
        // Work out if any ball is dragged
        if (mouseIsPressed) {
          if (!self.selectedBall) {
            for (i = 0; i < self.catz.length; i++) {
              if (self.catz[i].selected()) {
                self.selectedBall = self.catz[i]
                console.log()
                break
              }
            }
          } else {
            // Throw ball
            self.selectedBall.dx = (sketch.mouseX - self.selectedBall.x)
            self.selectedBall.dy = (sketch.mouseY - self.selectedBall.y)
          }
        } else {
          self.selectedBall = false
        }

        // Move balls
        for (i = 0; i < self.catz.length; i++) {
          let cat = self.catz[i]
          cat.move()
          cat.bounce()
        }
        color = sketch.get(sketch.mouseX, sketch.mouseY)
        // sketch.clear()
      }
      function Cat (x, y, r, c, index) {
        // console.log(index)
        this.x = x
        this.y = y
        this.r = r
        this.c = c
        this.dx = 10 * (sketch.random() - 0.5)
        this.dy = 10 * (sketch.random() - 0.5)
        self.cats[index] = sketch.loadImage(self.cats[index])
        // let color = sketch.get(sketch.mouseX, sketch.mouseY)
        // this.r = self.cats[index].width
        // console.log(self.cats[index].width)
        // this.w = self.cats[index].width
        // this.h = self.cats[index].height
        // Move ball based on its velocity
        this.move = function () {
          this.dx *= self.drag
          this.dy *= self.drag
          this.x += this.dx
          this.y += this.dy
        }
        // Bounce off walls
        this.bounce = function () {
          if (this.x < this.r) {
            this.x = this.r
            this.dx *= -self.friction / 10
          }
          if (this.x > sketch.displayWidth - this.r) {
            this.x = sketch.displayWidth - this.r
            this.dx *= -self.friction / 10
          }
          if (this.y < this.r - sketch.displayHeight * 10) {
            this.y = this.r
            this.dy *= -self.friction / 10
          }
          if (this.y > sketch.displayHeight - self.cats[index].height + 90) {
            this.y = sketch.displayHeight - self.cats[index].height + 90
            this.dy *= -self.friction
          }
        }
        // Test whether mouse is over ball
        this.selected = function () {
          // console.log(sketch.get(sketch.mouseX, sketch.mouseY))
          // console.log(color[0], color[1], color[2])
          if (sketch.abs(sketch.mouseX - this.x) < self.cats[index].width / 4 && sketch.abs(sketch.mouseY - this.y) < self.cats[index].height / 2) {
            if (color[0] !== 0 && color[1] !== 0 && color[2] !== 0) {
              return true
            }
          }
        }
        this.collide = function (that) {
          // console.log(that)
          let dx = this.x - that.x
          let dy = this.y - that.y
          let dr = this.r + that.r

          if (dx * dx + dy * dy < dr * dr) {
            let theta = sketch.atan2(dy, dx)
            let force = (dr - sketch.sqrt(dx * dx + dy * dy))
            this.dx += force * sketch.cos(theta)
            that.dx -= force * sketch.cos(theta)
            this.dy += force * sketch.sin(theta)
            that.dy -= force * sketch.sin(theta)
          }
        }
        this.display = function () {
          sketch.push()
          rx = this.dx
          ry = this.dy
          self.rotation = sketch.atan2(ry, rx)
          sketch.angleMode(sketch.RADIANS)
          sketch.rectMode(sketch.CENTER)
          sketch.imageMode(sketch.CENTER)
          sketch.translate(this.x, this.y)
          sketch.rotate(0)
          sketch.image(self.cats[index], 0, 0, 0, 0)
          // let c = sketch.get()
          // sketch.image(c, 0, 0, 0, 0)
          sketch.pop()
        }
        // console.log(self.cats[index])
      }
    })
    console.log(myp5)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#sketch {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: -moz-linear-gradient(top,  rgba(239,49,249,1) 0%, rgba(125,185,232,0) 100%);
  background: -webkit-linear-gradient(top,  rgba(239,49,249,1) 0%,rgba(125,185,232,0) 100%);
  background: linear-gradient(to bottom,  rgba(239,49,249,1) 0%,rgba(125,185,232,0) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ef31f9', endColorstr='#007db9e8',GradientType=0 );

}
</style>
