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
var rester = false
var counter = 0
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
                rester = true
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
        this.yomama = this.add.text(250, 100, `
        Click the rectangle to drop the ball!
        Get in one of the buckets to win!`)
    }
    update() {
        if (letsgo) {this.time.delayedCall(500, () => this.scene.start('sum1'))}
        if (rester) {counter += 1, this.time.delayedCall(3000, () => this.scene.start('level1'))}
        rester = false
        letsgo = false
        
}}

class Sum1 extends Phaser.Scene {
    constructor() {
        super('sum1')
    }
    create() {
        this.shamanahamana = this.add.text(500, 350,
            `
            Click on me to continue to level 2!`)
        if (counter <=1) {this.jermaine = this.add.text(250, 200, 
            `
            Awesome!
            You beat level 1 on the first try!`)}
        if (counter > 1) {this.wiley = this.add.text(250, 200,
            `
            Congratulations!
            You beat level 1 in `+counter+` tries!`)}
        this.input.on('pointerdown', () => this.time.delayedCall(100, ()=> this.scene.start('level2')
        ))
    }
    update() {
        counter = 0
    }
}
var pegs = 0
class Level2 extends Phaser.Scene {
    constructor() {
        super('level2');
    }
    
    preload() {
        this.load.image('rc', 'redcirc.png')
        this.load.image('rectangle', 'rectangle.png')
        this.load.image('buckfull', 'bucketfull.png')
        this.load.image('buckbot', 'bucketbottom.png')
        this.load.image('buckleft', 'bucketleft.png')
        this.load.image('buckright', 'bucketright.png')
        this.load.image('peg', 'peg.png')
    }
    create() {
        pegs = 0
        const b1 = this.physics.add.image(50, 25, 'rc').setScale(0.05)
            .setVelocity(100)
            .setBounce(1, 0.6)
            .setCollideWorldBounds(true)
            .setGravityY(300)
        b1.setCircle(360)
        const r1 = this.physics.add.image(500, 60, 'rectangle').setScale(1.6)
            .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                r1.destroy(25)
                this.yomama.destroy()
                rester = true
            })
        this.physics.add.collider(r1, b1)
        const c2 = this.physics.add.image(500, 486, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c1 = this.physics.add.image(500, 450, 'buckfull')
            .setImmovable(true)
        const c3 = this.physics.add.image(458, 448, 'buckleft')
            .setImmovable(true)
        const c4 = this.physics.add.image(542, 448, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c2)
        this.physics.add.collider(b1, c3)
        this.physics.add.collider(b1, c4)
        this.physics.add.overlap(b1, c1, function () {letsgo = true;})
        const c5 = this.physics.add.image(250, 486, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c6 = this.physics.add.image(250, 450, 'buckfull')
            .setImmovable(true)
        const c7 = this.physics.add.image(208, 448, 'buckleft')
            .setImmovable(true)
        const c8 = this.physics.add.image(292, 448, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c5)
        this.physics.add.collider(b1, c7)
        this.physics.add.collider(b1, c8)
        this.physics.add.overlap(b1, c6, function () {letsgo = true;})
        const c9 = this.physics.add.image(750, 486, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c10 = this.physics.add.image(750, 450, 'buckfull')
            .setImmovable(true)
        const c11 = this.physics.add.image(708, 448, 'buckleft')
            .setImmovable(true)
        const c12 = this.physics.add.image(792, 448, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c9)
        this.physics.add.collider(b1, c12)
        this.physics.add.collider(b1, c11)
        this.physics.add.overlap(b1, c10, function () {letsgo = true;})
        this.yomama = this.add.text(250, 100, `
        The ball is bouncier now! 
        Use the pegs to guide the ball into the cups.
        Tip: Click on the pegs to destroy them!`)
        const p1 = this.physics.add.image(250, 250, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p1.destroy(25)
            })
        this.physics.add.collider(b1, p1)
        const p2 = this.physics.add.image(374, 175, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p2.destroy(25)
            })
        this.physics.add.collider(b1, p2)
        const p3 = this.physics.add.image(570, 360, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p3.destroy(25)
            })
        this.physics.add.collider(b1, p3)
        const p4 = this.physics.add.image(758, 227, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p4.destroy(25)
            })
        this.physics.add.collider(b1, p4)
        const p5 = this.physics.add.image(500, 199, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p5.destroy(25)
            })
        this.physics.add.collider(b1, p5)
        const p6 = this.physics.add.image(910, 350, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p6.destroy(25)
            })
        this.physics.add.collider(b1, p6)
        const p7 = this.physics.add.image(700, 340, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p7.destroy(25)
            })
        this.physics.add.collider(b1, p7)
        const p8 = this.physics.add.image(90, 380, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p8.destroy(25)
            })
        this.physics.add.collider(b1, p8)
        const p9 = this.physics.add.image(75, 100, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p9.destroy(25)
            })
        this.physics.add.collider(b1, p9)
        const p10 = this.physics.add.image(600, 250, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p10.destroy(25)
            })
        this.physics.add.collider(b1, p10)
        const p11= this.physics.add.image(350, 280, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p11.destroy(25)
            })
        this.physics.add.collider(b1, p11)
        const p12= this.physics.add.image(250, 360, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p12.destroy(25)
            })
        this.physics.add.collider(b1, p12)
        const p13= this.physics.add.image(140, 180, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p13.destroy(25)
            })
        this.physics.add.collider(b1, p13)
        const p14= this.physics.add.image(800, 150, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p14.destroy(25)
            })
        this.physics.add.collider(b1, p14)
        const p15= this.physics.add.image(450, 250, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p15.destroy(25)
            })
        this.physics.add.collider(b1, p15)
        const p16= this.physics.add.image(835, 310, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p16.destroy(25)
            })
        this.physics.add.collider(b1, p16)
        const p17= this.physics.add.image(415, 400, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p17.destroy(25)
            })
        this.physics.add.collider(b1, p17)
        const p18= this.physics.add.image(510, 274, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                pegs += 1
                p18.destroy(25)
            })
        this.physics.add.collider(b1, p18)
    }
    update() {
        if (letsgo) {this.time.delayedCall(500, () => this.scene.start('sum2'))}
        letsgo = false
        if (rester) {counter += 1
            this.time.delayedCall(7000, () => this.scene.start('level2'))}
        rester = false
    }
}
class Sum2 extends Phaser.Scene {
    constructor() {
        super('sum2')
    }
    create() {
        this.shamanahamana = this.add.text(500, 350,
            `
            Click on me to continue to level 3!`)
        this.batman = this.add.text(250, 230, 
            `
            You destroyed `+pegs+` pegs!`)
        if (counter <=1) {this.jermaine = this.add.text(250, 200, 
            `
            Awesome!
            You beat level 2 on the first try!`)}
        if (counter > 1) {this.wiley = this.add.text(250, 200,
            `
            Congratulations!
            You beat level 2 in `+counter+` tries!`)}
        this.input.on('pointerdown', () => this.time.delayedCall(100, ()=> this.scene.start('level3')
        ))
    }
    update() {
        counter = 0
        pegs = 0
    }
}
class Level3 extends Phaser.Scene {
    constructor() {
        super('level3');
    }
    
    preload() {
        this.load.image('rc', 'redcirc.png')
        this.load.image('rectangle', 'rectangle.png')
        this.load.image('buckfull', 'bucketfull.png')
        this.load.image('buckbot', 'bucketbottom.png')
        this.load.image('buckleft', 'bucketleft.png')
        this.load.image('buckright', 'bucketright.png')
        this.load.image('peg', 'peg.png')
    }
    create() {
        pegs = 0
        const b1 = this.physics.add.image(50, 25, 'rc').setScale(0.05)
            .setVelocity(100)
            .setBounce(1, 0.9)
            .setCollideWorldBounds(true)
            .setGravityY(300)
        b1.setCircle(360)
        const r1 = this.physics.add.image(500, 60, 'rectangle').setScale(1.6)
            .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                r1.destroy(25)
                this.yomama.destroy()
                rester = true
            })
        this.physics.add.collider(r1, b1)
        const c2 = this.physics.add.image(500, 486, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c1 = this.physics.add.image(500, 450, 'buckfull')
            .setImmovable(true)
        const c3 = this.physics.add.image(458, 448, 'buckleft')
            .setImmovable(true)
        const c4 = this.physics.add.image(542, 448, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c2)
        this.physics.add.collider(b1, c3)
        this.physics.add.collider(b1, c4)
        this.physics.add.overlap(b1, c1, function () {letsgo = true;})
        const c5 = this.physics.add.image(250, 486, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c6 = this.physics.add.image(250, 450, 'buckfull')
            .setImmovable(true)
        const c7 = this.physics.add.image(208, 448, 'buckleft')
            .setImmovable(true)
        const c8 = this.physics.add.image(292, 448, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c5)
        this.physics.add.collider(b1, c7)
        this.physics.add.collider(b1, c8)
        this.physics.add.overlap(b1, c6, function () {letsgo = true;})
        const c9 = this.physics.add.image(750, 486, 'buckbot').setScale(0.72)
            .setImmovable(true)
        const c10 = this.physics.add.image(750, 450, 'buckfull')
            .setImmovable(true)
        const c11 = this.physics.add.image(708, 448, 'buckleft')
            .setImmovable(true)
        const c12 = this.physics.add.image(792, 448, 'buckright')
            .setImmovable(true)
        this.physics.add.collider(b1, c9)
        this.physics.add.collider(b1, c12)
        this.physics.add.collider(b1, c11)
        this.physics.add.overlap(b1, c10, function () {letsgo = true;})
        this.yomama = this.add.text(250, 100, `
        The ball is even bouncier! 
        Use the pegs to guide the ball into the cup.
        Tip: Click on the pegs to destroy them!
        You can only destroy two pegs, though.`)
        const p1 = this.physics.add.image(250, 250, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p1.destroy(25)}
            })
        this.physics.add.collider(b1, p1)
        const p2 = this.physics.add.image(374, 175, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p2.destroy(25)}
            })
        this.physics.add.collider(b1, p2)
        const p3 = this.physics.add.image(570, 360, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p3.destroy(25)}
            })
        this.physics.add.collider(b1, p3)
        const p4 = this.physics.add.image(758, 227, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                if (pegs <= 1) {pegs += 1, p4.destroy(25)}
            })
        this.physics.add.collider(b1, p4)
        const p5 = this.physics.add.image(500, 199, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p5.destroy(25)}
            })
        this.physics.add.collider(b1, p5)
        const p6 = this.physics.add.image(910, 350, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p6.destroy(25)}
            })
        this.physics.add.collider(b1, p6)
        const p7 = this.physics.add.image(700, 340, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p7.destroy(25)}
            })
        this.physics.add.collider(b1, p7)
        const p8 = this.physics.add.image(90, 380, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p8.destroy(25)}
            })
        this.physics.add.collider(b1, p8)
        const p9 = this.physics.add.image(75, 100, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p9.destroy(25)}
            })
        this.physics.add.collider(b1, p9)
        const p10 = this.physics.add.image(600, 250, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p10.destroy(25)}
            })
        this.physics.add.collider(b1, p10)
        const p11= this.physics.add.image(350, 280, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p11.destroy(25)}
            })
        this.physics.add.collider(b1, p11)
        const p12= this.physics.add.image(250, 360, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p12.destroy(25)}
            })
        this.physics.add.collider(b1, p12)
        const p13= this.physics.add.image(140, 180, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p13.destroy(25)}
            })
        this.physics.add.collider(b1, p13)
        const p14= this.physics.add.image(800, 150, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p14.destroy(25)}
            })
        this.physics.add.collider(b1, p14)
        const p15= this.physics.add.image(450, 250, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p15.destroy(25)}
            })
        this.physics.add.collider(b1, p15)
        const p16= this.physics.add.image(835, 310, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p16.destroy(25)}
            })
        this.physics.add.collider(b1, p16)
        const p17= this.physics.add.image(415, 400, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p17.destroy(25)}
            })
        this.physics.add.collider(b1, p17)
        const p18= this.physics.add.image(510, 274, 'peg')
        .setImmovable(true)
            .setInteractive()
            .on('pointerdown', () => {
                
                if (pegs <= 1) {pegs += 1, p18.destroy(25)}
            })
        this.physics.add.collider(b1, p18)
    }
    update() {
        if (letsgo) {this.time.delayedCall(500, () => this.scene.start('outro'))}
        letsgo = false
        if (rester) {counter += 1
            this.time.delayedCall(7000, () => this.scene.start('level3'))}
        rester = false
    }
}

class Sum3 extends Phaser.Scene {
    constructor() {
        super('sum3')
    }
    create() {
        this.shamanahamana = this.add.text(500, 350,
            `
            Click on me!`)
        this.batman = this.add.text(250, 230, 
            `
            You destroyed `+pegs+` pegs!`)
        if (counter <=1) {this.jermaine = this.add.text(250, 200, 
            `
            Awesome!
            You beat level 3 on the first try!`)}
        if (counter > 1) {this.wiley = this.add.text(250, 200,
            `
            Congratulations!
            You beat level 3 in `+counter+` tries!`)}
        this.input.on('pointerdown', () => this.time.delayedCall(100, ()=> this.scene.start('outro')
        ))
    }
    update() {
        counter = 0
        pegs = 0
    }
}
class Outro extends Phaser.Scene {
    constructor () {
        super('outro')
    }
    create() {
        this.add.text(500, 250,
            'Thanks for playing Bouncing Balls!')
    }
}
new Phaser.Game({
    width: 1000,
    height: 500,
    scene: [Intro, Title, Level1, Sum1, Level2, Sum2, Level3, Sum3, Outro],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
})