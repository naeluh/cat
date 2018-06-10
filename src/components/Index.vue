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
      spring: 0.001,
      gravity: 1.1,
      friction: -1,
      catz: [],
      rotation: 0
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
      // Run p5 sketch
      sketch.preload = function () {}
      sketch.setup = function () {
        this.canvas = sketch.createCanvas(sketch.displayWidth, sketch.displayHeight)
        this.canvas.parent(self.$refs.sketch)
        for (let i = 0; i < self.cats.length; i++) {
          self.catz[i] = new Cat(
            sketch.random(sketch.width),
            sketch.random(sketch.height),
            sketch.random(100, 200),
            i,
            self.catz
          )
        }
        sketch.noStroke()
      }
      sketch.draw = function () {
        sketch.background(255)
        self.catz.forEach(cat => {
          cat.collide()
          cat.movin()
          cat.display()
        })
      }
      sketch.mousePressed = function () {
        self.catz.forEach(cat => {
          cat.pressed()
        })
      }
      sketch.mouseReleased = function () {
        self.catz.forEach(cat => {
          cat.released()
        })
      }
      function Cat (xin, yin, din, idin, oin) {
        this.x = (sketch.displayWidth / idin) - sketch.random(0, sketch.displayWidth)
        this.y = 0
        let vx = 0
        let vy = 0
        let rx = 0
        let ry = 0
        this.diameter = din
        this.id = idin
        this.others = oin
        this.over = false
        this.move = false
        self.cats[idin] = sketch.loadImage(self.cats[idin])

        this.collide = function () {
          for (let i = this.id + 1; i < self.cats.length; i++) {
            // console.log(others[i])
            let dx = this.others[i].x - this.x
            let dy = this.others[i].y - this.y
            let distance = sketch.sqrt(dx * dx + dy * dy)
            let minDist = this.others[i].diameter / 2 + this.diameter / 2
            // console.log(distance)
            // console.log(minDist)
            if (distance < minDist) {
              // console.log("2")
              let angle = sketch.atan2(dy, dx)
              let targetX = this.x + sketch.cos(angle) * minDist
              let targetY = this.y + sketch.sin(angle) * minDist
              let ax = (targetX - this.others[i].x) * self.spring
              let ay = (targetY - this.others[i].y) * self.spring
              vx -= ax
              vy -= ay
              this.others[i].vx += ax
              this.others[i].vy += ay
            }
          }
        }
        this.movin = function () {
          if (this.overEvent() || this.move) {
            // console.log('hello')
            this.y = sketch.mouseY
            this.x = sketch.mouseX
          } else {
            vy += self.gravity
            this.x += vx
            this.y += vy
            // rx -= vx
            // ry -= vy
            if (this.x + this.diameter / 2 > sketch.width) {
              this.x = sketch.width - this.diameter / 2
              vx *= self.friction
              rx -= vx
            } else if (this.x - this.diameter / 2 < 0) {
              this.x = this.diameter / 2
              vx *= self.friction
              rx -= vx
            }
            if (this.y + this.diameter / 2 > sketch.height) {
              this.y = sketch.height - this.diameter / 2
              vy *= self.friction
              ry -= vy
            } else if (this.y - this.diameter / 2 < 0) {
              this.y = this.diameter / 2
              vy *= self.friction
              ry -= vy
            }
          }
        }
        // Test to see if mouse is over this spring
        this.overEvent = function () {
          var disX = this.x - sketch.mouseX
          var disY = this.y - sketch.mouseY
          var dis = sketch.createVector(disX, disY)
          // console.log((dis.mag()))
          if (dis.mag() < this.diameter / 2) {
            return true
          } else {
            return false
          }
        }
        this.pressed = function () {
          console.log('pressed')
          if (this.over) {
            this.move = true
          } else {
            this.move = false
          }
        }
        this.released = function () {
          console.log('released')
          this.move = false
          this.rest_posx = this.x
          this.rest_posy = this.y
        }
        this.display = function () {
          sketch.push()
          // console.log(vy, vx)
          self.rotation = sketch.atan2(ry--, rx--)
          // onsole.log(ry, rx)
          // self.rotation = sketch.atan2((ry--), (rx--))
          sketch.angleMode(sketch.RADIANS)
          sketch.rectMode(sketch.CENTER)
          sketch.imageMode(sketch.CENTER)
          sketch.translate(this.x, this.y)
          sketch.rotate(0)
          // sketch.rect(0, 0, this.diameter, this.diameter)
          sketch.image(self.cats[idin], 0, 0, 0, 0)
          sketch.pop()
        }
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
