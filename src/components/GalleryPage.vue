<template>
  <div id="canvas1" >

  </div>
</template>

<script>
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default {
  name: 'GalleryPage',
  props: {
    msg: String
  }, created() {
    console.log("created")
  },
  mounted() {
    console.log("mounted")
    // this.init2();
    // this.animate2();

    // this.init();
    // this.animate();

    this.stageReady();
    this.objectReady();
    this.animateAction();

  },
  data(){
    return {
      totalNum :10,
      distance : 100,
      WIDTH : 0,
      HEIGHT : 0,
      cameraY : 0,
      cameraZ : 50,
      isAnimate : false,
      loadingImage : 0,

    }
  },
  methods:{

    stageReady(){
      var container = document.getElementById('canvas1');

      this.WIDTH = window.innerWidth || document.body.clientWidth;
      this.HEIGHT = window.innerHeight || document.body.clientHeight;
      this.galleryGroup = new THREE.Group();

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("#000000"); //배경 컬러
      this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      )
      this.camera.position.set(0, this.cameraY, this.cameraZ);



      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      this.renderer.shadowMap.enabled = true;
      //그림자 활성화

      //document.body.appendChild(this.renderer.domElement);
      container.appendChild(this.renderer.domElement);

      //조명 넣기
      var light = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
      light.position.set(100, 100, 0);
      this.scene.add(light);

      //여기까지가 기본 세팅

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxDistance = 440;

      // const axes = new THREE.AxesHelper(150);
      // this.scene.add(axes);
      //
      // const gridHelper = new THREE.GridHelper(240, 20,0xFAAFFF,0xAAAAAA);
      // this.scene.add(gridHelper);



    },
    objectReady(){

      //
      const wallWidth = this.distance * this.totalNum + this.distance;
      const geometry = new THREE.BoxGeometry(wallWidth, 100, 2);
      const material = new THREE.MeshPhongMaterial({
        // map: imageMap,
        color: 0x464946,
      });
      const wallMesh = new THREE.Mesh(geometry, material);

      wallMesh.position.set(wallWidth / 2 - this.distance, 0, -1.5);
      wallMesh.receiveShadow = true;

      this.galleryGroup.add(wallMesh);
      this.scene.add(this.galleryGroup);




      for (let i = 0; i <= this.totalNum; i++) {
        this.addBox(i);
        // console.log(i);
      }

    },
    addBox(i){
      const imageMap = new THREE.TextureLoader().load(
          "https://source.unsplash.com/collection/" + i
      );
      const geometry = new THREE.BoxGeometry(32, 18, 1);
      const material = new THREE.MeshPhongMaterial({
        map: imageMap,
      });
      const boxMesh = new THREE.Mesh(geometry, material);
      boxMesh.castShadow = true;
      let x = i * this.distance;
      let y = 0; //Math.random() * 40 - 5;
      let z = 0;
      boxMesh.position.set(x, y, z);
      this.galleryGroup.add(boxMesh);

      //조명 넣기
      const spotLight = new THREE.SpotLight(0xffffff, 1.2);
      spotLight.position.set(x, 30, 30);
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 0.2;
      spotLight.decay = 1;
      spotLight.distance = 70;
      spotLight.target = boxMesh;
      spotLight.castShadow = true;

      this.galleryGroup.add(spotLight);
    },


    animateAction(){
      //moveX += (targetNum - moveX) * 0.05;
      //this.galleryGroup.position.x = this.moveX;

      //this.camera.lookAt(this.scene.position);

      //this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animateAction);
    },

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
