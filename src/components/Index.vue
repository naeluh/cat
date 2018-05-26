<template>
  <!-- threejs dev branch -->
  <div ref="container" id="container"></div>
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
  mounted () {
    console.log(Physics.world)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
