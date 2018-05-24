<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank">unit-mocha</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch" target="_blank">e2e-nightwatch</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org/en/essentials/getting-started.html" target="_blank">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org/en/intro.html" target="_blank">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import * as Three from 'three'

export default {
  name: 'Index',
  props: {},
  methods: {
    init: function() {
      let container = document.getElementById('container');
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
      this.camera.position.z = 1;
      this.scene = new Three.Scene();
      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();
      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);
      this.renderer = new Three.WebGLRenderer({
        antialias: true
      });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate()
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
  content: 'Original demo by MrDoob';
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
  color: #FF00CC;
  background-color: #FF00CC;
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
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .15);
  box-shadow: 0 1px 0 rgba(0, 0, 0, .15);
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
  border: 1px solid rgba(0, 0, 0, .15);
  color: #000000;
}
#content input:hover {
  border-color: rgba(0, 0, 0, .3);
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
  color: #2200C1;
  font-size: 16px;
  font-weight: normal;
}
.result .title a:active {
  color: #2200C1;
}
.result .url {
  color: #0e774a;
  font-size: 13px;
}
.result .content {
  font-size: 13px;
}
</style>
