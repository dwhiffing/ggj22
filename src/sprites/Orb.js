export class Orb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'shot')
    this.scene.physics.world.enableBody(this, 0)
    this.setScale(2).setTint(0xffff00).setSize(20, 20)
  }

  spawn(x, y, value = 1) {
    this.x = x
    this.y = y
    this.value = value
    this.setActive(true)
    this.setVisible(true)
  }

  hit() {
    this.die()
  }

  die() {
    this.setActive(false)
    this.setVisible(false)
  }
}
