import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
console.log(RectAreaLightHelper)
/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

// 환경광 (Ambient Light)
// 장면 전체에 균일하게 퍼져서 모든 객체에 동일한 밝기로 적용되는 빛
// - 첫 번째 인자: 색상 (color) -> 빛의 색상으로, 0xffffff는 흰색을 의미
// - 두 번째 인자: 강도 (intensity) -> 빛의 밝기를 설정 (1은 기본 강도)
const ambientLight  = new THREE.AmbientLight(0xffffff,1) 
scene.add(ambientLight)
gui.add(ambientLight,'intensity').min(0).max(1).step(0.01).name("AmbientLight-intensity")

// 직사광 (Directional Light)
// 특정 방향에서 오는 빛으로, 장면에 사실적인 조명을 추가하는 데 사용
// - 첫 번째 인자: 색상 (color) -> 빛의 색상으로, 0x00fffc는 시안색을 의미
// - 두 번째 인자: 강도 (intensity) -> 빛의 밝기, 0.9는 기본 강도보다 약간 어두운 설정
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9) // 색상(color), 강도(intensity)
directionalLight.position.set(1,0.25,0)
scene.add(directionalLight)
gui.add(directionalLight,'intensity').min(0).max(1).step(0.01).name("DirectionalLight-intensity")

// 반구광 (Hemisphere Light)
// 위쪽과 아래쪽에서 오는 빛을 설정, 자연스러운 하늘과 땅의 색상으로 장면을 밝힘
// - 첫 번째 인자: 하늘의 색상 (skyColor) -> 위에서 오는 빛의 색상. 0xff0000은 빨간색을 의미
// - 두 번째 인자: 지면의 색상 (groundColor) -> 아래에서 오는 빛의 색상. 0x0000ff는 파란색을 의미
// - 세 번째 인자: 강도 (intensity) -> 빛의 밝기, 0.9는 꽤 밝은 설정
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
scene.add(hemisphereLight)

// 점광 (Point Light)
// 특정 위치에서 모든 방향으로 방사되는 빛, 점광은 모든 방향으로 빛을 퍼뜨림
// - 첫 번째 인자: 색상 (color) -> 빛의 색상, 0xff9000은 오렌지색을 의미
// - 두 번째 인자: 강도 (intensity) -> 빛의 밝기, 1.5는 기본 강도보다 더 밝은 설정
// - position: 빛의 위치 (x, y, z) -> 점광은 특정 위치에서 모든 방향으로 빛을 퍼뜨리므로 위치 설정이 중요
const pointLight = new THREE.PointLight(0xff9000, 1.5)
pointLight.position.set(1,-0,1)
scene.add(pointLight)

// 면광 (Rect Area Light)
// 특정 면에서 방출되는 빛, 일반적으로 평면의 밝기를 설정하는 데 사용
// - 첫 번째 인자: 색상 (color) -> 빛의 색상, 0x4e00ff는 보라색을 의미
// - 두 번째 인자: 강도 (intensity) -> 빛의 밝기, 6은 강한 빛을 의미
// - 세 번째, 네 번째 인자: 면의 크기 (width, height) -> 면광은 특정 면에서 빛을 방출하므로 면의 크기를 설정
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1)
rectAreaLight.position.set(-1.5,0,1.5)
scene.add(rectAreaLight)

// 스포트라이트 (Spot Light)
// - 특정 각도로 집중된 빛을 방출하며, 이동하는 객체나 특정 위치에 집중적인 빛을 줄 때 사용
// - 첫 번째 인자: 색상 (color) -> 빛의 색상, 0x78ff00은 연두색을 의미
// - 두 번째 인자: 강도 (intensity) -> 빛의 밝기, 4.5는 강한 밝기
// - 세 번째 인자: 범위 (distance) -> 빛이 영향을 미치는 범위
// - 네 번째 인자: 각도 (angle) -> 빛의 반경 각도, Math.PI * 0.1은 작은 각도를 설정
// - 다섯 번째 인자: 페이드 거리 (penumbra) -> 빛이 부드럽게 전환되는 범위 (0~1)
// - 여섯 번째 인자: 빛의 그림자 생성 여부 (decay) -> 1은 정상적인 감쇠
const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
scene.add(spotLight)
spotLight.position.set(0,2,3)

//퍼포먼스
//Ambient Light ,Hemisphere Light  -> 적음
//DireCtionalLight , PointLight ->중간
//SpotLight , RectAreaLight ->높음

/**
 * Helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight,0.2)
scene.add(pointLightHelper)

const spotLightHelper =new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

window.requestAnimationFrame(()=>{
    spotLightHelper.update()
})
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)


/**
 * 
 * 
 * 
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()