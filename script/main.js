import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/gltfloader.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
scene.add(camera)

const gltf = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const colorTexture = textureLoader.load('./textures/dirt/color.jpg')
const normalTexture = textureLoader.load('./textures/dirt/normal.jpg')

const leePerrySmithColor = textureLoader.load('./textures/LeePerrySmith/color.jpg')
leePerrySmithColor.encoding = THREE.sRGBEncoding
const leePerrySmithNormal = textureLoader.load('./textures/LeePerrySmith/normal.jpg')

colorTexture.repeat.set(1.5, 1.5)
// colorTexture.encoding = THREE.sRGBEncoding
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping

normalTexture.repeat.set(1.5, 1.5)
normalTexture.wrapS = THREE.RepeatWrapping
normalTexture.wrapT = THREE.RepeatWrapping

const boxGeometry = new THREE.BoxGeometry(10, 3, 10)
const planeMaterial = new THREE.MeshStandardMaterial({ map: colorTexture, normalMap: normalTexture })
const floor = new THREE.Mesh(boxGeometry, planeMaterial)
floor.position.y = -4.5
floor.receiveShadow = true
scene.add(floor)

// environment map 
const environmentMap = cubeTextureLoader.load([
	'./textures/environmentMaps/0/px.jpg',
	'./textures/environmentMaps/0/nx.jpg',
	'./textures/environmentMaps/0/py.jpg',
	'./textures/environmentMaps/0/ny.jpg',
	'./textures/environmentMaps/0/pz.jpg',
	'./textures/environmentMaps/0/nz.jpg',
])
// environmentMap.encoding = THREE.sRGBEncoding
scene.background = environmentMap
scene.environment = environmentMap

const updateAllMaterial = () => {
	scene.traverse((child) => {
		if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
			child.material.envMap = environmentMap
			child.material.envMapIntensity = 1
		}
	})
}

const material = new THREE.MeshStandardMaterial({ map: leePerrySmithColor, normalMap: leePerrySmithNormal })
gltf.load("./textures/LeePerrySmith/LeePerrySmith.glb", (params) => {
	console.log("params", params);
	const mesh = params.scene.children[0]
	mesh.material = material
	mesh.rotation.y = Math.PI * 0.5
	mesh.castShadow = true
	// params.scene.position.y = 5
	scene.add(mesh)

	updateAllMaterial()
})

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 6)
directionalLight.position.set(0.25, 3, -2.25)
directionalLight.castShadow = true
scene.add(directionalLight)

const canvas = document.querySelector('.webgl')
const orbitControls = new OrbitControls(camera, canvas)
const renderer = new THREE.WebGLRenderer({ canvas: canvas })

// const gltf = new

camera.position.set(11, 4, -21)
// camera.position.y = 20
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
// renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.5
renderer.setSize(window.innerWidth, window.innerHeight)

const elapsedTime = new THREE.Clock()

const animate = () => {
	window.requestAnimationFrame(animate)
	orbitControls.update()
	renderer.render(scene, camera)
}

animate()