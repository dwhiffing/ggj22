import { SPRITES } from '../constants'
import { UPGRADES } from '../scenes/Upgrade'
import { Bullet } from './Bullet'

// TODO: player should change between 2 forms, changing their sprite, stats and attacks

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'tiles')
    this.scene.physics.world.enableBody(this, 0)

    this.scene.registry.set('level', 1)
    Object.keys(UPGRADES).forEach((k) => this.scene.registry.set(k, 1))

    const { bodySize, bodyOffset, speed, health } = SPRITES.player
    this.shotTimer = 0
    this.health = 100
    this.prevXp = 0
    this.xp = 0

    this.play('player')
      .setCollideWorldBounds(true)
      .setOrigin(0.5)
      .setBodySize(...bodySize)
      .setOffset(...bodyOffset)

    const { W, A, S, D } = Phaser.Input.Keyboard.KeyCodes
    this.input = scene.input
    this.upKey = this.input.keyboard.addKey(W)
    this.leftKey = this.input.keyboard.addKey(A)
    this.downKey = this.input.keyboard.addKey(S)
    this.rightKey = this.input.keyboard.addKey(D)
    this.speed = speed
    this.health = health

    this.input.on('pointerdown', () => (this.isMouseDown = true))
    this.input.on('pointerup', () => (this.isMouseDown = false))

    this.bullets = this.scene.physics.add.group({
      classType: Bullet,
      maxSize: 20,
      runChildUpdate: true,
    })

    this.bullets.createMultiple({ quantity: 20, active: false })
  }

  shoot = (pointer) => {
    let bullet = this.bullets.get()
    if (!bullet) return
    const { scrollX, scrollY } = this.scene.cameras.main
    for (let i = 0; i < this.bulletCount; i++) {
      bullet.fire(
        scrollX + pointer.x,
        scrollY + pointer.y,
        this.bulletSpeed,
        this.bulletDamage,
      )
    }
  }

  hit(enemy) {
    if (enemy.hitTimer > 0) return

    enemy.hitTimer = 10
    this.health -= enemy.damage
    this.scene.hpBar.set(this.health)
    if (this.health <= 0) this.scene.scene.start('Game')
  }

  addXP(val) {
    this.xp += val
    if (this.xp >= this.getNextLevelXP()) {
      this.prevXp = this.xp
      this.scene.registry.set('level', this.level + 1)
      this.scene.scene.wake('Upgrade')
      this.scene.scene.pause()
      this.scene.xpBar.set(
        this.xp - this.prevXp,
        this.getNextLevelXP() - this.prevXp,
      )
    }
    this.scene.xpBar.set(this.xp - this.prevXp)
  }

  getNextLevelXP() {
    return this.prevXp + 100 * Math.pow(1 + 0.2, this.level - 1)
  }

  get level() {
    return this.scene.registry.get('level')
  }

  get bulletDelay() {
    return 25 - (this.scene.registry.get('bulletDelay') - 1) * 4
  }

  get bulletSpeed() {
    return [120, 180, 240][this.scene.registry.get('bulletSpeed') - 1]
  }

  get bulletDamage() {
    return [1, 3, 10][this.scene.registry.get('bulletDamage') - 1]
  }

  get bulletCount() {
    return this.scene.registry.get('bulletCount')
  }

  update() {
    this.setVelocity(0)

    if (this.shotTimer > 0) this.shotTimer--
    if (this.isMouseDown && this.shotTimer === 0) {
      this.shoot(this.input.activePointer)
      this.shotTimer = this.bulletDelay
    }

    if (this.upKey.isDown) {
      this.setVelocityY(-this.speed)
    } else if (this.downKey.isDown) {
      this.setVelocityY(this.speed)
    }

    if (this.leftKey.isDown) {
      this.setVelocityX(-this.speed)
    } else if (this.rightKey.isDown) {
      this.setVelocityX(this.speed)
    }
  }
}