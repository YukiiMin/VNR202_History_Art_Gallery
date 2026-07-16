import * as THREE from 'three'
import { deskBox } from './office.js'

// Keys tracked by modules/eventListeners.js. WASD + arrows + sprint.
export const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
  sprint: false,
}

// Room bounds — keep player inside the gallery.
const ROOM_MIN_X = -18
const ROOM_MAX_X = 18
const ROOM_MIN_Z = -18
const ROOM_MAX_Z = 18

// Camera locked to the eye-height set in modules/scene.js (y = 2.2).
const CAMERA_HEIGHT = 2.2

// Called every frame by modules/rendering.js. `walls` is the wall Group from modules/walls.js.
export const updateMovement = (delta, controls, camera, walls) => {
  if (!controls || !controls.isLocked) return

  let speedMultiplier = 1.0
  if (keysPressed.sprint) speedMultiplier = 2
  const moveSpeed = 5 * delta * speedMultiplier

  const previousPosition = camera.position.clone()

  if (keysPressed.ArrowRight || keysPressed.d) controls.moveRight(moveSpeed)
  if (keysPressed.ArrowLeft || keysPressed.a) controls.moveRight(-moveSpeed)
  if (keysPressed.ArrowUp || keysPressed.w) controls.moveForward(moveSpeed)
  if (keysPressed.ArrowDown || keysPressed.s) controls.moveForward(-moveSpeed)

  if (checkCollision(camera, walls)) {
    camera.position.copy(previousPosition)
  }

  // Lock head height to avoid slipping under floor / floating above.
  camera.position.y = CAMERA_HEIGHT

  // Clamp to room bounds.
  camera.position.x = Math.max(ROOM_MIN_X, Math.min(ROOM_MAX_X, camera.position.x))
  camera.position.z = Math.max(ROOM_MIN_Z, Math.min(ROOM_MAX_Z, camera.position.z))

  // Desk collision: revert if standing inside the desk bounding box.
  if (deskBox && !deskBox.isEmpty() && deskBox.containsPoint(camera.position)) {
    camera.position.copy(previousPosition)
  }

  if (Math.random() < 0.02) {
    console.info('[movement]', {
      locked: !!(controls && controls.isLocked),
      x: camera.position.x.toFixed(2),
      y: camera.position.y.toFixed(2),
      z: camera.position.z.toFixed(2),
      keys: { ...keysPressed }
    })
  }
}

export const checkCollision = (camera, walls) => {
  const playerBoundingBox = new THREE.Box3()
  const cameraWorldPosition = new THREE.Vector3()
  camera.getWorldPosition(cameraWorldPosition)
  playerBoundingBox.setFromCenterAndSize(cameraWorldPosition, new THREE.Vector3(1, 1, 1))

  for (let i = 0; i < walls.children.length; i++) {
    const wall = walls.children[i]
    if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
      return true
    }
  }
  return false
}
