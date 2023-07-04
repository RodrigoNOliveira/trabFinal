import { CONFIG } from "../config";


export default class Vaca2 extends Phaser.Physics.Arcade.Sprite {


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
        this.setFrame(64);
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

        if ((this.frame.name >= 72 && this.frame.name <= 79)) {
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.moveVaca();
            }

        }
    }


    moveVaca() {
        this.play('walk', true);
        this.isAction = true;
        const aleatorio = Math.floor(Math.random() * 3 + 1);
        // console.log(aleatorio);
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

        if (this.frame.name == 80) {
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

        if ((this.frame.name >= 96 && this.frame.name <= 99) || (this.frame.name >= 88 && this.frame.name <= 90)) {
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
                if (this.frame.name != 80 || this.frame.name != 88) {
                    this.deitarVaca();
                }
                if (this.frame.name == 88) {
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
                this.levantarVaca();
                this.pararVaca();

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
            frames: this.anims.generateFrameNumbers('vaca', { start: 64, end: 66 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('vaca', { start: 72, end: 79 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'laying', //deitando
            frames: this.anims.generateFrameNumbers('vaca', { start: 80, end: 82 }),
            frameRate: this
                .frameRate,
            repeat: 0
        });
        this.anims.create({
            key: 'up',  //levantando
            frames: this.anims.generateFrameNumbers('vaca', { start: 83, end: 86 }),
            frameRate: this
                .frameRate,
            repeat: 0
        });


        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('vaca', { start: 88, end: 90 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'sleep',
            frames: this.anims.generateFrameNumbers('vaca', { start: 96, end: 99 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'sniffing',
            frames: this.anims.generateFrameNumbers('vaca', { start: 104, end: 110 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'eating',
            frames: this.anims.generateFrameNumbers('vaca', { start: 112, end: 115 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'love',
            frames: this.anims.generateFrameNumbers('vaca', { start: 120, end: 125 }),
            frameRate: this
                .frameRate,
            repeat: -1
        });






    }

}
