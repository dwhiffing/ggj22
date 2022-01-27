import { WEAPONS, UPGRADES } from '../constants'
import { Gun } from '../services/Gun'
import { applyUpgrade } from '../utils'

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'tiles')
    this.scene.physics.world.enableBody(this, 0)

    this.movePenalty = 1
    this.setDepth(70)

    this.weapons = Object.values(WEAPONS).map((w) => ({
      ...w,
      get level() {
        return scene.registry.get(`${w.name}`) || 0
      },
    }))

    this.body.setMaxSpeed(this.moveSpeed)

    this.play(this.form === 'light' ? 'player' : 'player2')
      .setCollideWorldBounds(true)
      .setOrigin(0.5)
      .setBodySize(8, 8)
      .setMass(5)
      .setOffset(12, 22)

    this.guns = []
  }

  init() {
    this.activeGunIndex = 0
    this.weapons.forEach((w) => {
      const { light, dark } = w
      if (light) this.guns.push(new Gun(this.scene, light, w))
      if (dark) this.guns.push(new Gun(this.scene, dark, w))
    })
    this.guns.push(new Gun(this.scene, 'blast'))
  }

  update() {
    this.setAcceleration(0)
    this.setDrag(150)
    this.tp += this.form === 'light' ? 0.005 : -0.015

    if (this.movePenalty < 1) {
      this.movePenalty += 0.01
    }

    this.hp += this.regen
    if (this.hp > this.maxHP) this.hp = this.maxHP

    const activeWeapons = this.weapons
      .filter((w) => w.level > 0)
      .map((w) => (this.form === 'light' ? w.light : w.dark))
    this.guns.forEach((gun) => {
      gun.update()
      if (activeWeapons.includes(gun.type)) gun.shoot()
    })
  }

  levelUpgrade(weapon) {
    const maxLevel = (WEAPONS[weapon] || UPGRADES[weapon]).levels.length

    if ((this.scene.registry.get(weapon) || 0) < maxLevel) {
      if (this.level > 1) {
        this.skipUpgrade = true
        this.xp = this.nextXP
      }

      this.scene.registry.inc(weapon)
    }
  }

  applyUpgrade(key, obj) {
    UPGRADES[key].levels
      .filter((_, i) => (this.scene.registry.get(key) || 0) > i)
      .forEach((boost) =>
        Object.entries(boost).forEach((u) => applyUpgrade(u, obj)),
      )
    return obj
  }

  hit(damage) {
    if (this.form === 'dark') damage *= 0.25
    this.hp -= damage
    if (this.form === 'dark') this.tp -= 3
  }

  die() {
    this.scene.hud?.set('hp', 0, this.maxHP)
    this.scene.sound.play('death', { volume: 0.4 })
    this.scene.scene.start('Game', { newGame: true })
    localStorage.removeItem('ggj22-save')
  }

  startTransforming(duration = 3) {
    let i = 0
    this.transforming = true
    this.transformDelay = this.scene.time.delayedCall(3000, this.transform)
    const callsPerSecond = 20

    this.transformFlash = this.scene.time.addEvent({
      delay: 1000 / callsPerSecond,
      repeat: callsPerSecond * duration,
      callback: () => {
        // increases frequency of flashing as time passes
        if (i++ % (6 - Math.floor(i / callsPerSecond) * 2) !== 0) return
        if (!this.tintFill) {
          this.setTintFill(0xffffff)
        } else {
          this.clearTint()
        }
      },
    })
  }

  transform = () => {
    if (this.form === 'light' ? this.tp < this.maxTP : this.tp > 0) return

    if (this.transformDelay) this.transformDelay.remove()
    if (this.transformFlash) this.transformFlash.remove()
    this.clearTint()
    this.transforming = false

    this.play(this.form === 'light' ? 'player2' : 'player')

    // if turning dark
    if (this.form === 'light') {
      // TODO: trigger spawn of a bunch of enemies right before spawn?
      this.scene.cameras.main.shake(400, 0.02)
      this.body.setMaxSpeed(0)

      // TODO: need to make the blast gun stats based on all player unlocked guns
      // or maybe instead, can do a modified fire of each gun
      this.guns.find((g) => g.type === 'blast')?.shoot()

      this.scene.time.delayedCall(500, () =>
        this.body.setMaxSpeed(this.moveSpeed),
      )
    } else {
      this.adrenaline = true
      this.setTint(0xff0000)
      this.scene.time.delayedCall(5000, () => {
        this.clearTint()
        this.adrenaline = false
      })
    }

    this.scene.sound.play(this.form === 'light' ? 'transform2' : 'transform', {
      volume: this.form === 'light' ? 0.4 : 0.1,
      rate: this.form === 'light' ? 1 : 2,
    })

    this.form = this.form === 'light' ? 'dark' : 'light'
    if (this.form === 'light') this.body.setMaxSpeed(this.moveSpeed)
  }

  get form() {
    return this.scene.registry.get('playerForm') || 'light'
  }

  set form(val) {
    return this.scene.registry.set('playerForm', val)
  }

  get regen() {
    const obj = this.applyUpgrade('healthRegen', { regen: 0 })
    return obj.regen
  }

  get bullets() {
    return this.guns.map((gun) => [gun.explodeGun?.bullets, gun.bullets]).flat()
  }

  get moveSpeed() {
    const speed = 70 * this.movePenalty * (this.form === 'light' ? 1 : 0.45)
    const obj = this.applyUpgrade('moveSpeed', { speed })
    this.body.setMaxSpeed(obj.speed)
    return obj.speed
  }

  get hp() {
    return this.scene.registry.get('hp') || 100
  }

  set hp(val) {
    // taking damage
    if (this.hp > val) {
      this.movePenalty = 0.5
      if (this.hp <= this.maxHP) {
        this.scene.cameras.main.shake(200, 0.01)
        this.setTint(0xff0000)
        this.scene.time.delayedCall(100, this.clearTint.bind(this))
        this.scene.sound.play(`Glass-light-${Phaser.Math.RND.between(0, 4)}`, {
          volume: 0.3,
        })
      }
    }

    this.scene.registry.set('hp', val)
    this.scene.hud?.set('hp', this.hp, this.maxHP)

    // game over
    if (this.hp <= 0) {
      this.die()
    }
  }

  get maxHP() {
    const obj = this.applyUpgrade('maxHP', { maxHP: 100 })
    return obj.maxHP
  }

  get prevXP() {
    return this.scene.registry.get('prevXP') || 0
  }

  get xp() {
    return this.scene.registry.get('xp') || 0
  }

  get pickupRange() {
    const obj = this.applyUpgrade('pickupRange', { pickupRange: 15 })
    return obj.pickupRange
  }

  get xpRate() {
    const obj = this.applyUpgrade('xpRate', { xpRate: 1 })
    return obj.xpRate
  }

  set xp(val) {
    this.scene.registry.set('xp', val)
    if (val >= this.nextXP) this.level++

    this.scene.sound.play('chord', {
      rate: 1 + val / this.nextXP || 0,
      volume: 0.4,
    })
    this.scene.hud?.set('xp', this.xp - this.prevXP)
  }

  set prevXP(val) {
    this.scene.registry.set('prevXP', val)
  }

  get nextXP() {
    return this.prevXP + 400 * Math.pow(1.5, this.level - 1) - 350
  }

  get level() {
    return this.scene.registry.get('level') || 1
  }

  set level(value) {
    this.scene.registry.set('level', value)
    this.prevXP = this.xp
    this.scene.hud?.set('xp', this.xp - this.prevXP, this.nextXP - this.prevXP)

    if (value > 1) {
      this.hp = this.maxHP
      this.scene.sound.play('level', { volume: 0.1 })
      if (!this.skipUpgrade) this.scene.showUpgradeMenu()
    }

    this.skipUpgrade = false
    return this.level
  }

  get tp() {
    return this.scene.registry.get('tp') || 0
  }

  set tp(val) {
    if (this.transforming) return

    this.scene.registry.set('tp', Math.max(0, Math.min(val, 100)))

    this.scene.hud?.set('tp', this.scene.registry.get('tp'))

    if (
      (this.tp === 100 && this.form === 'light') ||
      (this.tp === 0 && this.form === 'dark')
    ) {
      this.startTransforming()
    }
  }

  get maxTP() {
    return 100
  }
}
