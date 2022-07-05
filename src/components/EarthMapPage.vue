<template>
  <div id="canvas2" >

  </div>
</template>

<script>
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default {
  name: 'EarthMapPage',
  props: {
    msg: String
  }, created() {
    console.log("created")
  },
  mounted() {
    console.log("mounted");

    this.stageReady();
    this.objectReady();
    this.animateAction();

  },
  data(){
    return {
      WIDTH : 0,
      HEIGHT : 0,
      controls : null,
      time : 0,
      earth : null,
      cloud: null,
      moon :null,
      d: 120,

    }
  },
  methods:{

    stageReady(){
      var container = document.getElementById('canvas2');

      this.WIDTH = window.innerWidth || document.body.clientWidth;
      this.HEIGHT = window.innerHeight || document.body.clientHeight;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("#ffffff"); //배경 컬러
      this.camera = new THREE.PerspectiveCamera(75, this.WIDTH / this.HEIGHT, 0.1, 1000);
      this.camera.position.set(0, 0, 140);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      //this.renderer.setClearColor(0x000000); //배경 컬러

      container.appendChild(this.renderer.domElement);


      //카메라 컨트롤
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      // controls.minDistance = 200;
       controls.maxDistance = 500;
      // controls.autoRotate = true; //자동 회전
      // controls.autoRotateSpeed = 0.2; //회전 속도 (기본 : 2)

      // controls.minPolarAngle = this.mathRadians(40);
      // controls.maxPolarAngle = this.mathRadians(120);
      // controls.enableDamping = true;

      const axes = new THREE.AxesHelper(150);
      this.scene.add(axes);

    },
    // mathRadians(number){
    //   return (number * Math.PI) / 180;
    // },

    objectReady(){
      // const imageMap = new THREE.TextureLoader().load(
      //     "https://source.unsplash.com/collection/" + 1
      // );
      // const earthMap = new THREE.TextureLoader().load(require( "../assets/Albedo.jpg" ));
      // const geometry = new THREE.SphereGeometry(80, 32, 32);
      // const material = new THREE.MeshPhongMaterial({
      //   map: earthMap,
      //   //color: 0xFFAFAA,
      // });
      // const boxMesh = new THREE.Mesh(geometry, material);
      // this.scene.add(boxMesh);


      //지구 만들기
      const earthMap = new THREE.TextureLoader().load(require( "../assets/Albedo.jpg" ));
      const geometry_earth = new THREE.SphereGeometry(80, 32, 32);
      const material_earth = new THREE.MeshPhongMaterial({
        map: earthMap,
        //color: 0xFFAFAA,
      });

      //80 사이즈로 구를 만든다
      const earth = new THREE.Mesh(geometry_earth, material_earth);
      this.earth = earth;
      //this.earth.rotation.x = 0.3;
      //지구는 기울었으니까
      this.scene.add(this.earth);
      //
      // //구름
      // const cloudMap = new THREE.TextureLoader().load(require( "../assets/Clouds.png" ));
      // const material_cloud = new THREE.MeshPhongMaterial({
      //   map: cloudMap,
      //   transparent: true,
      //   opacity: 0.6,
      // });
      // const geometry_cloud = new THREE.SphereGeometry(82, 32, 32);
      // this.cloud = new THREE.Mesh(geometry_cloud, material_cloud);
      // this.earth.add(this.cloud);
      //
      // //달
      // const moonMap = new THREE.TextureLoader().load(require( "../assets/moon.jpg" ));
      // const geometry_moon = new THREE.SphereGeometry(6, 32, 32);
      // const material_moon = new THREE.MeshPhongMaterial({
      //   map: moonMap,
      // });
      //
      // this.moon = new THREE.Mesh(geometry_moon, material_moon);
      // // moon.position.set(120, 0, 80);
      // //달의 위치 잡기
      // this.earth.add(this.moon);
      // //지구와 한 몸? 이므로 지구에 add.
      //
      // //조명 넣기
      // var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1.5);
      // light.position.set(100, 100, 0);
      // this.scene.add(light);
      //
      // const helper = new THREE.HemisphereLightHelper(light, 15);
      // this.scene.add(helper);
      //
      // const gridHelper2 = new THREE.GridHelper(240, 20);
      // this.earth.add(gridHelper2);

    },

    animateAction(){
       //this.earth.rotation.y += 0.0005; //지구 자전
      // this.cloud.rotation.y += 0.0002; //구름 움직임
      // this.moon.rotation.y += 0.01; //달 자전

      // this.time = this.time + 0.001;
      // this.moon.position.x = Math.sin(this.time) * this.d; // -120 부터 120사이의 값 반복
      // this.moon.position.z = Math.cos(this.time) * this.d; // -120 부터 120사이의 값 반복

      //this.controls.update();

      //카메라가 바라보는 곳
      // camera.lookAt(moon.position);

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animateAction);
    },

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
