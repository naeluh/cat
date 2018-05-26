<template>
  <!-- paperjs  dev branch -->
  <canvas ref="viewport" id="viewport" resize></canvas>
</template>

<script>
import * as paper from 'paper'

export default {
  name: 'Index',
  props: {},
  data: function () {
    return {
      balls: [],
      lastDelta: null,
      paper: null,
      dampen: 0.4,
      gravity: 3,
      bounce: -0.6,
      vector: 0
    }
  },
  methods: {
    Ball: function (point, vector) {
      if (!vector || vector.isZero()) {
        this.vector = paper.Point.random() * 5
      } else {
        this.vector = vector * 2
      }
      this.point = point
      this.dampen = 0.4
      this.gravity = 3
      this.bounce = -0.6
      const color = {
        hue: Math.random() * 360,
        saturation: 1,
        brightness: 1
      }
      const gradient = new paper.Gradient([color, 'black'], true)
      const radius = this.radius = 50 * Math.random() + 30
      // Wrap CompoundPath in a Group, since CompoundPaths directly
      // applies the transformations to the content, just like Path.
      const ball = new paper.CompoundPath({
        children: [
          new paper.Path.Circle({
            radius
          }),
          new paper.Path.Circle({
            center: radius / 8,
            radius: radius / 3
          })
        ],
        fillColor: new paper.Color(gradient, 0, radius, radius / 8)
      })
      this.item = new paper.Group({
        children: [ball],
        transformContent: false,
        position: this.point
      })
      // console.log(this.radius)
      // this.paper.view.draw()
      const object = {
        'this': this,
        'vector': vector,
        'gravity': this.gravity,
        'ball': ball,
        'bounce': this.bounce,
        'item': this.item,
        'point': this.point
      }
      return object
    },
    iterate (ball, self) {
      // console.log(ball.vector)
      const size = this.paper.view.size
      ball.vector.y += ball.gravity
      ball.vector.x *= 0.99
      const pre = ball.point + ball.vector
      if (pre.x < ball.this.radius || pre.x > size.width - ball.this.radius) {
        ball.vector.x *= -ball.this.dampen
      }
      if (pre.y < ball.this.radius || pre.y > size.height - ball.this.radius) {
        if (Math.abs(ball.vector.x) < 3) {
          ball.vector = paper.Point.random() * [150, 100] + [-75, 20]
        }
        ball.vector.y *= ball.bounce
      }
      const max = paper.Point.max(ball.this.radius, ball.point + ball.vector)
      ball.item.position = ball.point = paper.Point.min(max, size - ball.this.radius)
      ball.item.rotate(ball.vector.x)
    }
  },
  computed: {
    el () {
      return this.$refs.viewport
    }
  },
  created () {
    // paper.install(window)
  },
  mounted () {
    let self = this
    this.paper = paper.setup(self.$refs.viewport)
    // console.log(self.Ball)

    let path = new paper.Path.Rectangle(new paper.Point(50, 25), new paper.Size(50, 50))
    path.fillColor = 'black'
    for (let i = 0; i < 10; i++) {
      let position = paper.Point.random()
      // console.log(position)
      let vector = paper.Point.random()
      // console.log(vector, position)
      let ball = self.Ball(position, vector)
      self.balls.push(ball)
    }
    this.paper.view.onMouseDrag = function (event) {
      this.lastDelta = event.delta
    }
    this.paper.view.onMouseUp = function (event) {
      console.log(this.lastDelta)
      const ball = self.Ball(event.point, this.lastDelta)
      console.log(ball)
      self.balls.push(ball)
      self.lastDelta = null
    }
    // console.log(self.balls)
    this.paper.view.onFrame = function (event) {
      // console.log(self.balls)
      path.rotate(3)
      for (let i = 0, l = self.balls.length; i < l; i++) {
        self.iterate(self.balls[i], self)
      }
    }
    // this.paper.view.draw()
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
