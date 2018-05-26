<template>
  <!-- PhysicsJS dev branch -->
  <canvas ref="viewport" id="viewport"></canvas>
</template>

<script>
import Physics from '../../node_modules/physicsjs/dist/physicsjs-full.min.js'

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
    console.log(Physics)
    console.log(Physics.world)
    Physics(function (world) {
      console.log(world)
    })
  },
  mounted () {
    console.log(Physics(function (world) {}))
    console.log(Physics.world)
    console.log(this.el)
    Physics(function (world) {
      console.log(world)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
