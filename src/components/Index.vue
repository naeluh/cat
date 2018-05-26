<template>
  <!-- PhysicsJS dev branch -->
  <canvas ref="viewport" id="viewport" height="804"></canvas>
</template>

<script>
import Physics from '../../node_modules/physicsjs/dist/physicsjs-full.min.js'
import * as paper from 'paper'

export default {
  name: 'Index',
  props: {},
  data: function () {
    return {}
  },
  methods: {},
  computed: {
    el () {
      return this.$refs.viewport
    }
  },
  created () {
    console.log(paper)
  },
  mounted () {
    // console.log(Physics(function (world) {}))
    // console.log(Physics.world)
    console.log(this.el)
    // let scratch = Physics.scratchpad()
    Physics(world => {
      console.log(window.innerHeight)
      // bounds of the window
      let viewportBounds = Physics.aabb(0, -200, window.innerWidth, window.innerHeight)
      let edgeBounce
      let renderer
      // create a renderer
      renderer = Physics.renderer('canvas', {
        el: this.$refs.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
        autoResize: false,
        meta: false // don't display meta data
      })
      // add the renderer
      world.add(renderer)
      // render on each step
      world.on('step', () => {
        world.render()
      })
      // constrain objects to these bounds
      edgeBounce = Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.8,
        cof: 0.8
      })
      // resize events
      window.addEventListener('resize', () => {
        console.log(this)
        this.$refs.viewport.height = window.innerHeight
        this.$refs.viewport.width = window.innerWidth
        // as of 0.7.0 the renderer will auto resize... so we just take the values from the renderer
        viewportBounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight)
        // update the boundaries
        edgeBounce.setAABB(viewportBounds)
      }, true)
      // create some bodies
      world.add(Physics.body('circle', {
        x: renderer.width * 0.4,
        y: renderer.height * 0.3,
        vx: 0.3,
        vy: 0.9,
        radius: 80,
        styles: {
          src: require('@/assets/cat_3.png'),
          width: 272,
          height: 274
        }
      }))
      world.add(Physics.body('circle', {
        x: renderer.width * 0.7,
        y: renderer.height * 0.3,
        vx: 0.4,
        vy: 0.8,
        radius: 80,
        styles: {
          src: require('@/assets/cat_1.png'),
          width: 198,
          height: 343
        }
      }))
      // add some fun interaction
      const attractor = Physics.behavior('attractor', {
        order: 3,
        strength: 0.008
      })
      world.on({
        'interact:poke' (pos) {
          world.wakeUpAll()
          attractor.position(pos)
          world.add(attractor)
        },
        'interact:move' (pos) {
          attractor.position(pos)
        },
        'interact:release' () {
          world.wakeUpAll()
          world.remove(attractor)
        }
      })
      // add things to the world
      world.add([
        Physics.behavior('interactive', {
          el: renderer.container
        }), Physics.behavior('constant-acceleration'), Physics.behavior('sweep-prune'), Physics.behavior('body-impulse-response'), edgeBounce
      ])
      // subscribe to ticker to advance the simulation
      Physics.util.ticker.on(time => {
        world.step(time)
      })
    })
    // scratch.done()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#viewport { position: relative; height: 100%;}
</style>
