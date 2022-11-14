import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import door from './static/door.jpg';
import ambientOcclusionImage from './static/textures/door/ambientOcclusion.jpg';
import metalNessImage from './static/textures/door/metalness.jpg';
import roughnessImage from './static/textures/door/roughness.jpg';
import heightImage from './static/textures/door/height.jpg';
import normalImage from './static/textures/door/normal.jpg';
import alphaImage from './static/textures/door/alpha.jpg';
import moonImage from './static/textures/moon.jpeg';
import * as dat from 'dat.gui';

const gui = new dat.GUI()

const size = {
	width: window.innerWidth,
	height: window.innerHeight
}
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, size.width / size.height, 1, 1000)
scene.add(camera)
// const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
// const image = new Image();
// const texture = new THREE.Texture(image);
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
	console.log('on start');
}
const textureLoader = new THREE.TextureLoader(loadingManager);
// const te 
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
const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, })
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
// const donutMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
// for (let index = 0; index < 60; index++) {
// 	const donut = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), donutMaterial)
// 	donut.position.x = (Math.random() - 0.5) * 10
// 	donut.position.y = (Math.random() - 0.5) * 10
// 	donut.position.z = (Math.random() - 0.5) * 10

// 	donut.rotation.x = (Math.random() - 0.5) * 10
// 	donut.rotation.y = (Math.random() - 0.5) * 10
// 	donut.rotation.z = (Math.random() - 0.5) * 10

// 	const scaleSize = Math.random()
// 	donut.scale.set(scaleSize, scaleSize, scaleSize)

// 	scene.add(donut)
// }
const ambientLight = new THREE.AmbientLight(0xffffff, .5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 5, 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)
// const directionalHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalHelper)

const planeMaterial = new THREE.MeshStandardMaterial();
planeMaterial.roughness = 7
const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 7, 100, 100), planeMaterial)
plane.rotation.x = -(Math.PI / 2)
plane.receiveShadow = true
scene.add(plane)
// const box = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 100, 100), material)
const box = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), planeMaterial)
box.position.y = 1.5
box.castShadow = true

// box.geometry.setAttribute('uv2', new THREE.BufferAttribute(box.geometry.attributes.uv.array, 2))
scene.add(box)
gui.add(material, "aoMapIntensity").max(100).min(1)
gui.add(material, "displacementScale").max(1).min(0.05)


// const pointLight = new THREE.PointLight(0xffffff, .5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)
// const spotLight = new THREE.SpotLight(0xfffff, 0.5, 6, 2, 0.25, 1)
// spotLight.position.set(0, 1, 4)
// scene.add(spotLight)

const canvas = document.querySelector('.webgl');
const render = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
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
// const clock = new THREE.Clock()
// window.addEventListener("mousemove", (e) => {
// 	console.log("y", cursor.y);
// 	cursor.x = e.clientX / size.width - 0.5
// 	cursor.y = e.clientY / size.height - 0.5
// })

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
// controls.addEventListener('dragstart', function (event) {
// 	console.log("event", event.object);
// });


function animate() {
	requestAnimationFrame(animate)
	// const elapsedTime = clock.getElapsedTime()
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

