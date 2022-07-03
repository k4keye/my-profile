<template>
  <div id="canvas" style="background-color: red ">

  </div>
</template>

<script>
import * as THREE from "three";
//import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default {
  name: 'IntroPage',
  props: {
    msg: String
  }, created() {
    console.log("created")
  },
  mounted() {
    console.log("mounted")
    this.init();
    this.animate();


  },
  data(){
    return {
      totalNum :100,
      WIDTH : 0,
      HEIGHT : 0,
      cameraY : 80,
      cameraZ : 440,
      isAnimate : false,
      loadingImage : 0

    }
  },
  methods:{

    init(){
      var container = document.getElementById('canvas');

      this.WIDTH = window.innerWidth || document.body.clientWidth;
      this.HEIGHT = window.innerHeight || document.body.clientHeight;


      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("#000000"); //배경 컬러
      this.camera = new THREE.PerspectiveCamera(75, this.WIDTH / this.HEIGHT, 9.1, 1000);
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


      {

        const geometry = new THREE.BoxGeometry(400, 400, 2);
        const material = new THREE.MeshPhongMaterial({
          // map: imageMap,
          color: 0x464946,
        });
        const wallMesh = new THREE.Mesh(geometry, material);

        wallMesh.position.set(0, 0, -1);
        wallMesh.receiveShadow = true; //default is false
        // wallMesh.castShadow = true;
        //this.scene.add(wallMesh);
      }
      this.addHomeDoor();
      for (let i = 0; i <= this.totalNum; i++) {
        this.addBox(i);
        // console.log(i);
      }
      this.isAnimate=true;
      this.addLight(15, 15, 20);

      // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.maxDistance = 440;
      //
      // const axes = new THREE.AxesHelper(150);
      // this.scene.add(axes);
      //
      // const gridHelper = new THREE.GridHelper(240, 20,0xFAAFFF,0xAAAAAA);
      // this.scene.add(gridHelper);



    },
    addHomeDoor(){
      const geometry = new THREE.BoxGeometry(16, 30, 2);
      const material = new THREE.MeshPhongMaterial({
         color: 0xFFFFFF,
      });
      const cardMesh = new THREE.Mesh(geometry, material);
      cardMesh.position.set(0, 0, 0); //카드 위치 지정
      this.scene.add(cardMesh);

      const spotLight = new THREE.SpotLight(0xffffff, 1.2);
      spotLight.position.set(0, 30, 30);
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 0.8;
      spotLight.decay = 1;
      spotLight.distance = 100;
      spotLight.castShadow = true;
      this.scene.add(spotLight);
      //
      // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
      // this.scene.add(spotLightHelper);
    },
    addBox(i){
      const imageMap = new THREE.TextureLoader();
      imageMap.load("https://source.unsplash.com/collection/" + i, (data) => {
        const geometry = new THREE.BoxGeometry(16, 12, 1);
        const material = new THREE.MeshPhongMaterial({
          map: data,
          // color: 0xffffff,
        });

        const cardMesh = new THREE.Mesh(geometry, material);
        cardMesh.castShadow = true;
        // cardMesh.receiveShadow = true;
        let x = Math.random() * 250 - 150; // - 100 ~ 100 까지 랜덤
        // let y = i * 5;
        let y = Math.random() * 220 - 70;
        let z = Math.random() * 400 - 10;

        cardMesh.position.set(x, y, z); //카드 위치 지정
        cardMesh.rotation.set(Math.random() * 30, 0, Math.random() * 30); //카드의 회전 지정

        this.scene.add(cardMesh);
        this.loadingImage++;
      });
    },

    addLight(){
      const color = 0xffffff;
      const intensity = 0.4;
      const light = new THREE.PointLight(color, intensity);
      light.castShadow = true;

      // addLight(15, 15, 20);
      // ...pos로 위치값을 바로 가져옵니다.
      //light.position.set(...pos);

      light.shadow.mapSize.width = 512; // default
      light.shadow.mapSize.height = 512; // default
      light.shadow.camera.near = 0.5; // default
      light.shadow.camera.far = 500; // default
      light.shadow.radius = 5;
      light.shadow.blurSamples = 5;
      this.scene.add(light);

      // const helper = new THREE.PointLightHelper(light);
      // scene.add(helper);
    },

    animate(){
      //this.controls.update();
      //this.camera.lookAt(this.scene.position);

      if(this.totalNum <= this.loadingImage){

        if(this.cameraZ > 2){
          this.cameraZ = this.cameraZ - 0.7;
        }
        if(this.cameraY > 2.5){
          this.cameraY = this.cameraY - 0.15;
        }
        this.camera.position.z =  this.cameraZ;
        this.camera.position.y =  this.cameraY;

        //끝
        // if(this.cameraZ <= 2){
        //   this.$router.push("/hello")
        // }
      }


      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
