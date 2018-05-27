<template>
  <!-- paperjs  dev branch -->
  <canvas ref="viewport" id="viewport" resize></canvas>
</template>

<script>
import * as paper from 'paper'
const Ball = function (point, vector) {
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
        radius: radius
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
  console.log(vector.y)
}
Ball.prototype.iterate = function () {
  const self = this
  const size = paper.view.size
  console.log(self.radius)
  this.vector.y += this.gravity
  this.vector.x *= 0.99
  const pre = this.point + this.vector
  if (pre.x < this.radius || pre.x > size.width - this.radius) {
    this.vector.x *= -this.dampen
  }
  if (pre.y < this.radius || pre.y > size.height - this.radius) {
    if (Math.abs(this.vector.x) < 3) {
      this.vector = paper.Point.random() * [150, 100] + [-75, 20]
    }
    this.vector.y *= this.bounce
  }
  const max = paper.Point.max(this.radius, this.point + this.vector)
  this.item.position = this.point = paper.Point.min(max, size - this.radius)
  this.item.rotate(this.vector.x)
}
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
      bounce: -0.6
    }
  },
  methods: {},
  computed: {
    el () {
      return this.$refs.viewport
    }
  },
  created () {
    // paper.install(window)
  },
  mounted () {
    const self = this
    this.paper = paper.setup(self.$refs.viewport)
    const path = new paper.Path.Rectangle(new paper.Point(50, 25), new paper.Size(50, 50))
    path.fillColor = 'black'
    for (let i = 0; i < 10; i++) {
      // const position = paper.Point.random() * this.paper.view.size
      const position = paper.Point.random()
      // console.log(this.paper.view.size)
      // const vector = (paper.Point.random() - [0.5, 0]) * [50, 100]
      const vector = paper.Point.random()
      const ball = new Ball(position, vector)
      // console.log(ball.vector, vector)
      self.balls.push(ball)
    }
    this.paper.view.onMouseDrag = function (event) {
      self.lastDelta = event.delta
    }
    this.paper.view.onMouseUp = function (event) {
      const ball = new Ball(event.point, self.lastDelta)
      self.balls.push(ball)
      console.log(self.lastDelta)
      self.lastDelta = null
    }
    this.paper.view.onFrame = function (event) {
      path.rotate(3)
      for (let i = 0, l = self.balls.length; i < l; i++) {
        // self.iterate(self.balls[i], self)
        // self.balls[i].iterate()
      }
    }
    this.paper.view.draw()
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
