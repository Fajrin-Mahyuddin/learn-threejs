import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';

const gui = new dat.GUI()

const size = {
	width: window.innerWidth,
	height: window.innerHeight
}
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(35, size.width / size.height, 1, 1000)
scene.add(camera)
// const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
// const image = new Image();
// const texture = new THREE.Texture(image);
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
	console.log('on start');
}

let mixer;

const trexMesh = new GLTFLoader(loadingManager);
trexMesh.load('trex.glb', (gtlf) => {
	// trexMesh.load('./models/Fox/glTF/Fox.gltf', (gtlf) => {
	console.log("load file", gtlf);
	gtlf.scene.position.y = 2
	mixer = new THREE.AnimationMixer(gtlf.scene)
	const action = mixer.clipAction(gtlf.animations[0]);
	gtlf.scene.castShadow = true
	action.play()
	// gtlf.scene.rotation.set(0, 1, -1)
	// gtlf.scene.scale.set(0.025, 0.025, 0.025)

	scene.add(gtlf.scene)
})
const textureLoader = new THREE.TextureLoader(loadingManager);
const moonTexture = textureLoader.load('./textures/moon.jpeg')

const grassColorTexture = textureLoader.load('./textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('./textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('./textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('./textures/grass/roughness.jpg')

grassColorTexture.repeat.set(2, 2)
grassAmbientOcclusionTexture.repeat.set(2, 2)
grassNormalTexture.repeat.set(2, 2)
grassRoughnessTexture.repeat.set(2, 2)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

// const texture2 = textureLoader.load(stoneandgrasp)
// image.addEventListener('load', () => {
// 	console.log("image loaded");
// 	texture.needsUpdate = true
// })
// image.src = door

// const material = new THREE.MeshNormalMaterial({ color: "red", wireframe: true, wireframeLinejoin: 'round' });
// const material = new THREE.MeshNormalMaterial({ flatShading: true });
// const material = new THREE.MeshMatcapMaterial({ matcap: mathCapTexture, flatShading: true });
// const material = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.45, roughness: 0.45, aoMap: ambientOcclusion })
// const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, })
// material.metalness = 0
// material.roughness = 1
// material.map = texture
// material.aoMap = ambientOcclusion
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.2
// material.metalnessMap = metalNess
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.transparent = true
// material.alphaMap = alphaTexture
// const mesh = new THREE.Mesh(new THREE.SphereGeometry(1.5, 20, 15), material)
// mesh.position.x = -3
// scene.add(mesh)
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
// for (let index = 0; index < 60; index++) {
const moon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 10), moonMaterial)
const moon1 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 10), moonMaterial)
moon.castShadow = true
moon.position.y = 2
moon.position.x = 4
moon.position.z = 1

moon1.castShadow = true
moon1.position.y = 1
moon1.position.x = 4
moon1.position.z = 1

// 	donut.position.x = (Math.random() - 0.5) * 10
// 	donut.position.y = (Math.random() - 0.5) * 10
// 	donut.position.z = (Math.random() - 0.5) * 10

// 	donut.rotation.x = (Math.random() - 0.5) * 10
// 	donut.rotation.y = (Math.random() - 0.5) * 10
// 	donut.rotation.z = (Math.random() - 0.5) * 10

// 	const scaleSize = Math.random()
// 	donut.scale.set(scaleSize, scaleSize, scaleSize)

scene.add(moon, moon1)
// }
const ambientLight = new THREE.AmbientLight(0xffffff, .5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 2, 3)
directionalLight.castShadow = true
// directionalLight.shadow.mapSize.width = 1024
// directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)
// const directionalHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalHelper)

const planeMaterial = new THREE.MeshStandardMaterial({ map: grassColorTexture, normalMap: grassNormalTexture, aoMap: grassAmbientOcclusionTexture, roughnessMap: grassRoughnessTexture });
// planeMaterial.roughness = 0.5
// planeMaterial.metalness = 0
const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 7, 100, 100), planeMaterial)
plane.rotation.x = -(Math.PI / 2)
plane.receiveShadow = true
plane.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array, 2))
scene.add(plane)
// const box = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 100, 100), material)
// const box = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), planeMaterial)
// box.position.y = 1.5
// box.castShadow = true

// box.geometry.setAttribute('uv2', new THREE.BufferAttribute(box.geometry.attributes.uv.array, 2))
// scene.add(box)
// gui.add(material, "aoMapIntensity").max(100).min(1)
// gui.add(material, "displacementScale").max(1).min(0.05)


// const pointLight = new THREE.PointLight(0xffffff, .5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)
// const spotLight = new THREE.SpotLight(0xfffff, 0.5, 6, 2, 0.25, 1)
// spotLight.position.set(0, 1, 4)
// scene.add(spotLight)


const canvas = document.querySelector('.webgl');
const render = new THREE.WebGLRenderer({ canvas: canvas })
render.setSize(size.width, size.height)
render.shadowMap.enabled = true

// const axis = new THREE.AxesHelper(2)
// scene.add(axis)

// image.addEventListener('onLoad', (e) => {
// 	console.log("cek image", e);
// })

const cursor = {
	x: 0,
	y: 0
}

camera.position.z = 10
camera.position.y = 10
// camera.position.x = 0
const clock = new THREE.Clock()
// window.addEventListener("mousemove", (e) => {
// 	console.log("y", cursor.y);
// 	cursor.x = e.clientX / size.width - 0.5
// 	cursor.y = e.clientY / size.height - 0.5
// })



window.addEventListener('resize', () => {
	size.width = window.innerWidth
	size.height = window.innerHeight

	camera.aspect = size.width / size.height
	camera.updateProjectionMatrix()

	render.setSize(size.width, size.height)
	render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
// controls.addEventListener('dragstart', function (event) {
// 	console.log("event", event.object);
// });

const previousTime = 0
function animate() {
	requestAnimationFrame(animate)
	const elapsedTime = clock.getElapsedTime()
	if (mixer) {
		mixer.update(0.02)
	}
	const moonAngle = elapsedTime
	moon.position.x = Math.cos(moonAngle) * 2
	moon.position.z = Math.sin(moonAngle) * 2
	moon1.position.x = -(Math.sin(moonAngle) * 2)
	moon1.position.z = -(Math.cos(moonAngle) * 2)
	// moon.position.y = Math.sin(moonAngle) * 3
	// mesh.position.x = Math.cos(elapsedTime)
	// mesh.position.y = Math.sin(elapsedTime)
	// camera.position.x = cursor.x * 7
	// camera.position.y = cursor.y * 7
	// camera.lookAt(mesh.position)
	// camera.lookAt(mesh.position)
	// mesh.rotation.x += 0.01
	// mesh.rotation.y += 0.01
	controls.update()
	render.render(scene, camera)
}
animate()

