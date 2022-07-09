<template>
  <div id="canvas1" >

  </div>
</template>

<script>
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default {
  name: 'KoreaPage',
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
      cameraZ : 70,
      temp : 0,

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

      const axes = new THREE.AxesHelper(150);
      this.scene.add(axes);

      const gridHelper = new THREE.GridHelper(240, 20,0xFAAFFF,0xAAAAAA);
      this.scene.add(gridHelper);



    },
    objectReady(){

      this.scene.add(this.galleryGroup);

      this.addBaseMap(); //맵 세팅
      // for (let i = 0; i <= this.totalNum; i++) {
      //   this.addBox(i);
      //   // console.log(i);
      // }

    },


    addBaseMap(){
      const imageMap = new THREE.TextureLoader().load(
          require( "../assets/korea.png" )
      );
      const geometry = new THREE.BoxGeometry(82, 88, 0);
      const material = new THREE.MeshBasicMaterial({
        map: imageMap,
        transparent: true,
        color : 0xFFFFFF,
        specular : 0xFFFFFF,
      });
      const boxMesh = new THREE.Mesh(geometry, material);
      boxMesh.castShadow = true;

      boxMesh.position.set(0, 0, 0);
      this.galleryGroup.add(boxMesh);

      //조명 넣기
      const spotLight = new THREE.SpotLight(0xffffff, 0.2);
      spotLight.position.set(0, 0, 100);
      spotLight.angle = Math.PI / 4;
      spotLight.penumbra = 2.0;
      spotLight.decay = 1;
      spotLight.distance = 150;
      spotLight.target = boxMesh;
      spotLight.castShadow = true;
      const spotLightHelper = new THREE.SpotLightHelper(spotLight);
      this.scene.add(spotLightHelper);
      this.galleryGroup.add(spotLight);


    },


    animateAction(){
      //moveX += (targetNum - moveX) * 0.05;
      //this.galleryGroup.position.x = this.moveX;

      //this.camera.lookAt(this.scene.position);

      //this.camera.updateProjectionMatrix();
      // this.temp = this.temp + 0.01;
      //
      // if(this.temp <= 0.5){
      //   console.log("temp :" +this.temp);
      //   this.camera.rotation.x = this.temp;
      // }
      // if(this.temp <= 10){
      //   this.camera.position.y = this.temp;
      // }
      // if(this.temp <= 1.5){
      //   this.galleryGroup.rotation.x = this.temp;
      //   this.camera.position.z = this.temp;
      // }
      // if(this.temp <= 100){
      //   this.camera.position.y = this.temp;
      // }





      //this.galleryGroup.rotateX(this.temp)
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animateAction);
    },

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
