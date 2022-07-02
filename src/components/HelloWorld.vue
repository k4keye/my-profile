<template>
  <div class="hello">
    <canvas id="canvas" style="height: 300px; width: 300px; background-color: yellow"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
//import { DragControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/DragControls.js";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },created(){
    console.log("created")
  },
  mounted() {
    console.log("mounted")
    this.init();
    this.animate();
  },
  methods:{
    init: function() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      )

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(this.renderer.domElement)

      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffAA })
      this.cube = new THREE.Mesh(geometry, material)
      this.scene.add(this.cube)

      this.camera.position.z = 5

    },
    animate: function() {
      requestAnimationFrame(this.animate)

      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01

      this.renderer.render(this.scene, this.camera)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
