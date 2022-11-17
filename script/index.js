import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
scene.add(camera)

const planeGeometry = new THREE.BoxGeometry(5, 5, 5)
const planeMaterial = new THREE.MeshStandardMaterial()
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
// plane.rotation.set(4, 0, 0)
scene.add(plane)

const ambientLight = new THREE.AmbientLight(0xff0000, 0.5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xff0000, 0.5)
directionalLight.position.set(2, 2, 4)
scene.add(directionalLight)

const canvas = document.querySelector('.webgl')
const orbitControls = new OrbitControls(camera, canvas)
const renderer = new THREE.WebGLRenderer({ canvas: canvas })

camera.position.z = 10
renderer.setSize(window.innerWidth, window.innerHeight)

const animate = () => {
	window.requestAnimationFrame(animate)
	orbitControls.update()
	renderer.render(scene, camera)
}

animate()