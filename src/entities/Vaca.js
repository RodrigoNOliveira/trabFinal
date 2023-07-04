import { CONFIG } from "../config";


export default class Vaca extends Phaser.Physics.Arcade.Sprite {


    isAction = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'vaca');

        // this.touch = touch;

        scene.add.existing(this);               //criando a img que o jogador ve
        scene.physics.add.existing(this);       //criando o body da fisica



        this.init();
    }

    preload() {
    }

    init() {
        this.setFrame(3);
        this.speed = 120;
        this.frameRate = 8;
        this.setOrigin(0.5, 0.5);
        this.body.setSize(12, 12);
        this.body.setOffset(10, 15);
        this.setVelocityX(0);
        this.initAnimations();
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

        if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
            this.play('stop', true);
            this.isAction = false;
        } else {
            this.play('walk', true);
            this.isAction = true;
        }

        this.timeEvent = this.scene.time.addEvent({
            delay: 10000,
            callback: this.acaoVaca,
            loop: true,
            callbackScope: this
        });

    }

    update() {

        if ((this.frame.name >= 8 && this.frame.name <= 15)) {
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.moveVaca();
            }

        }
    }


    moveVaca() {
        this.play('walk', true);
        this.isAction = true;
        const aleatorio = Math.floor(Math.random() * 3 + 1);
        switch (aleatorio) {
            case 1:
                this.setFlipX(!this.flipX);
                this.setVelocityX(this.flipX ? -40 : 40);
                this.setVelocityY(0);

                break;
            case 2:
                this.setFlipX(!this.flipX);
                this.setVelocityX(this.flipX ? -20 : 20);
                this.setVelocityY(this.flipX ? -20 : 20);
                break;
            case 3:
                this.setFlipX(!this.flipX);
                this.setVelocityX(this.flipX ? -20 : 20);
                this.setVelocityY(this.flipX ? 20 : -20);
                break;
        }

    }


    deitarVaca() {

        this.play('laying', true);
        this.isAction = true;
        if (this.frame.name == 16) {
            this.play('down', true);
            this.isAction = true;
        }

    }


    pararVaca() {

        this.setVelocity(0);
        this.play('stop', true);
        this.isAction = true;

    }

    levantarVaca() {

        if ((this.frame.name >= 32 && this.frame.name <= 35) || (this.frame.name >= 24 && this.frame.name <= 26)) {
            this.play('up', true);
            this.isAction = true;
            this.pararVaca();
        }


    }



    acaoVaca() {

        var aleatorio = Math.floor(Math.random() * 6 + 1);
        switch (aleatorio) {
            case 1: //para andar
                this.levantarVaca();
                this.moveVaca();
                break;
            case 2: //para deitar
                this.pararVaca();
                this.deitarVaca();
                break;
            case 3: //para dormir
                this.pararVaca();
                if (this.frame.name != 16 || this.frame.name != 24) {
                    this.deitarVaca();
                }
                if (this.frame.name == 24) {
                    this.play('sleep', true);
                    this.isAction = true;
                }
                break;
            case 4: //para levantar
                this.levantarVaca();
                break;
            case 5: //para cheirar
                this.pararVaca();
                this.levantarVaca();
                this.play('sniffing', true);
                this.isAction = true;
                break;
            case 6: //para mastigar
                this.pararVaca();
                this.levantarVaca();
                this.play('eating', true);
                this.isAction = true;
                break;
            case 7:
                this.pararVaca();
                break;


        }



    }

    initAnimations() {
        //stop
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('vaca', { start: 0, end: 2 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('vaca', { start: 8, end: 15 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'laying', //deitando
            frames: this.anims.generateFrameNumbers('vaca', { start: 16, end: 18 }),
            frameRate: this
                .frameRate,
            repeat: 0
        });
        this.anims.create({
            key: 'up',  //levantando
            frames: this.anims.generateFrameNumbers('vaca', { start: 19, end: 22 }),
            frameRate: this
                .frameRate,
            repeat: 0
        });


        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('vaca', { start: 24, end: 26 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'sleep',
            frames: this.anims.generateFrameNumbers('vaca', { start: 32, end: 35 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'sniffing',
            frames: this.anims.generateFrameNumbers('vaca', { start: 40, end: 46 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'eating',
            frames: this.anims.generateFrameNumbers('vaca', { start: 48, end: 51 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'love',
            frames: this.anims.generateFrameNumbers('vaca', { start: 56, end: 61 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });






    }

}
