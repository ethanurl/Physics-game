class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload() {
        this.load.image('logo', 'E2Games.png');
    }
    create() {
        this.logo = this.add.sprite(1500, 250, 'logo');
        this.logo.setScale(0.6);
        this.tweens.add({
            targets: this.logo,
            alpha: 1,
            x: -200,
            y: 250,
            duration: 4000,
            ease: 'Sine.easeOutIn'})
        this.time.delayedCall(5000, ()=> this.scene.start('title'))
    }
}
class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload() {
        this.load.image('titlecard', 'titlecard.png')
        this.load.image('titlecard2', 'titlecard2.png')
        this.load.image('playbutton', 'playbutton (2).png')
    }
    create() {
        let tc = this.add.sprite(500, 250, 'titlecard');
        this.tc2 = this.add.sprite(500, 100, 'titlecard2')
        this.tc2.setScale(0.6)
        this.pb = this.add.sprite(500, 350, 'playbutton')
        this.tweens.add({
            targets: this.pb,
            alpha: 0,
            duration: 800,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        })
        this.pb.setInteractive()
        this.pb.on('pointerdown', () => {
            this.scene.start('level1')
        })
    }
}
var letsgo = false
class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }
    
    preload() {
        this.load.image('rc', 'redcirc.png')
        this.load.image('rectangle', 'rectangle.png')
        this.load.image('buckfull', 'bucketfull.png')
        this.load.image('buckbot', 'bucketbottom.png')
        this.load.image('buckleft', 'bucketleft.png')
        this.load.image('buckright', 'bucketright.png')
    }
    create() {
        const b1 = this.physics.add.image(50, 25, 'rc').setScale(0.05)
            .setVelocity(100)
            .setBounce(1, 0.2)
            .setCollideWorldBounds(true)
            .setGravityY(300)
        b1.setCircle(360)
        const r1 = this.physics.add.image(500, 60, 'rectangle').setScale(1.6)
            .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                r1.destroy(25)
                this.yomama.destroy()
            })
        this.physics.add.collider(r1, b1)
        const c2 = this.physics.add.image(500, 286, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c1 = this.physics.add.image(500, 250, 'buckfull')
            .setImmovable(true)
        const c3 = this.physics.add.image(458, 248, 'buckleft')
            .setImmovable(true)
        const c4 = this.physics.add.image(542, 248, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c2)
        this.physics.add.collider(b1, c3)
        this.physics.add.collider(b1, c4)
        this.physics.add.overlap(b1, c1, function () {letsgo = true;})
        const c5 = this.physics.add.image(250, 286, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c6 = this.physics.add.image(250, 250, 'buckfull')
            .setImmovable(true)
        const c7 = this.physics.add.image(208, 248, 'buckleft')
            .setImmovable(true)
        const c8 = this.physics.add.image(292, 248, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c5)
        this.physics.add.collider(b1, c7)
        this.physics.add.collider(b1, c8)
        this.physics.add.overlap(b1, c6, function () {letsgo = true;})
        const c9 = this.physics.add.image(750, 286, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c10 = this.physics.add.image(750, 250, 'buckfull')
            .setImmovable(true)
        const c11 = this.physics.add.image(708, 248, 'buckleft')
            .setImmovable(true)
        const c12 = this.physics.add.image(792, 248, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c9)
        this.physics.add.collider(b1, c12)
        this.physics.add.collider(b1, c11)
        this.physics.add.overlap(b1, c10, function () {letsgo = true;})
        this.yomama = this.add.text(350, 100, `Click the rectangle to drop the ball!
        Get in one of the buckets to win!`)
    }
    update() {
        if (letsgo) {this.time.delayedCall(500, () => this.scene.start('title'))}
        letsgo = false
}}

new Phaser.Game({
    width: 1000,
    height: 500,
    scene: [Level1, Title, Intro],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
})