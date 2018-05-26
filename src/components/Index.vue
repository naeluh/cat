<template>
  <!-- threejs dev branch -->
  <div ref="container" id="container"></div>
</template>

<script>
import * as Three from 'three'

export default {
  name: 'Index',
  props: {},
  data: function () {
    return {
      delta: [0, 0],
      stage: [
        window.screenX,
        window.screenY,
        window.innerWidth,
        window.innerHeight
      ],
      isRunning: false,
      isMouseDown: false,
      worldAABB: [],
      world: [],
      edgeBounce: [],
      iterations: 16,
      timeStep: 1000 / 260,
      constraints: [],
      mouseJoint: [],
      mouse: {
        x: 0,
        y: 0
      },
      mouseOnClick: [],
      elements: [],
      bodies: [],
      properties: [],
      query: [],
      page: 0,
      gWebSearch: [],
      gImageSearch: [],
      imFeelingLuckyMode: false,
      resultBodies: [],
      gravityBehavior: [],
      gravity: {
        x: 0,
        y: 1
      }
    }
  },
  methods: {
    getBrowserDimensions: function () {
      let changed = false
      if (this.stage[0] !== window.screenX) {
        this.delta[0] = (window.screenX - this.stage[0]) * 0
        this.stage[0] = window.screenX
        changed = true
      }
      if (this.stage[1] !== window.screenY) {
        this.delta[1] = (window.screenY - this.stage[1]) * 0
        this.stage[1] = window.screenY
        changed = true
      }
      if (this.stage[2] !== window.innerWidth) {
        this.stage[2] = window.innerWidth
        changed = true
      }
      if (this.stage[3] !== window.innerHeight) {
        this.stage[3] = window.innerHeight
        changed = true
      }
      return changed
    },
    init: function () {
      let container = this.$refs.container
      this.camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      )
      this.camera.position.z = 1
      this.scene = new Three.Scene()
      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      let material = new Three.MeshNormalMaterial()
      this.mesh = new Three.Mesh(geometry, material)
      this.scene.add(this.mesh)
      this.renderer = new Three.WebGLRenderer({
        antialias: true
      })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    console.log(this)
    this.getBrowserDimensions()
    this.init()
    this.animate()
    window.onload = function () {
      this.stage = [
        window.screenX,
        window.screenY,
        window.innerWidth,
        window.innerHeight
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body {
  margin: 0;
  overflow: hidden;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
body:after {
  content: "Original demo by MrDoob";
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px;
  color: #ccc;
  font-size: 12px;
}
button {
  height: 29px;
  padding: 0 8px 1px 8px;
  color: #ff00cc;
  background-color: #ff00cc;
  border: 0px solid #d9d9d9;
  border-radius: 2px;
  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
button:hover {
  color: #222;
  background-color: #f8f8f8;
  border: 1px solid #c6c6c6;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
}
#header {
  position: absolute;
  top: 15px;
  right: 0px;
  white-space: nowrap;
}
#header a {
  color: #444;
  font-size: 13px;
  margin-right: 15px;
  text-decoration: none;
}
#header a:hover {
  text-decoration: underline;
}
#header img {
  vertical-align: middle;
}
#header button {
  margin-right: 15px;
}
#content {
  width: 100%;
  text-align: center;
  margin-top: 192px;
  white-space: nowrap;
}
#content #logo {
  margin-bottom: 17px;
}
#content input {
  width: 80px;
  padding: 5px 8px;
  margin-bottom: 16px;
  font: 16px Arial, sans-serif;
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #000000;
}
#content input:hover {
  border-color: rgba(0, 0, 0, 0.3);
}
#content input:focus {
  outline: 0;
  /* this removes browser-side outline */
  border-color: #4d90fe;
}
#footer {
  display: none;
  position: absolute;
  bottom: 0px;
  width: 100%;
  font-size: 13px;
  border-spacing: 0;
  white-space: nowrap;
}
#footer td {
  border-top: 1px solid #e4e4e4;
  padding: 12px 17px;
  background-color: #f2f2f2;
}
#footer td.empty {
  padding: 10px 0;
}
#footer a {
  color: #666;
  text-decoration: none;
}
#footer a:hover {
  text-decoration: underline;
}
.result {
  width: 546px;
}
.result .title {
  color: #2200c1;
  font-size: 16px;
  font-weight: normal;
}
.result .title a:active {
  color: #2200c1;
}
.result .url {
  color: #0e774a;
  font-size: 13px;
}
.result .content {
  font-size: 13px;
}
</style>
