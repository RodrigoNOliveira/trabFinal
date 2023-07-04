import { CONFIG } from "../config";


export default class Arvore extends Phaser.Physics.Arcade.Sprite {


    isAction = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'arvore');

        // this.touch = touch;

        scene.add.existing(this);               //criando a img que o jogador ve
        scene.physics.add.existing(this);       //criando o body da fisica



        this.init();
    }

    preload() {
    }

    init() {
        this.setFrame(1);
        this.frameRate = 8;
        this.setOrigin(0.5, 0.5);

        this.body.setSize(25, 30);
        this.body.setOffset(10, 15);
        this.initAnimations();
        this.existe= false;

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);



    }

    update() {


    }


    restart(){
        this.timeEvent = this.scene.time.addEvent({
            delay: 180000,
            callback: this.setFrame(12),
            loop: true,
            callbackScope: this
        });
    }

    evento(){
        this.timeEvent = this.scene.time.addEvent({
            delay: 180000,
            callback: this.cresceArvore,
            loop: true,
            callbackScope: this
        });
    }


    cresceArvore(){

        if(this.existe == true){
        if(this.frame.name == 0){
            this.setFrame(12);
        }else if(this.frame.name == 12){
            this.setFrame(13);
        } else if(this.frame.name == 13){
            this.setFrame(14);
        } else if(this.frame.name ==14){
            this.setFrame(15);
        }
        else if(this.frame.name ==49){
            this.setFrame(12);
        }
        }
        else{}
        

    }

    initAnimations() {
        this.anims.create({
                key: 'balance0',
                frames: this.anims.generateFrameNumbers('arvore', { start: 24, end: 29 }),
                frameRate: this
                    .frameRate,
                repeat: 0
            });
    
    

        this.anims.create({
            key: 'balance1',
            frames: this.anims.generateFrameNumbers('arvore', { start: 36, end: 49 }),
            frameRate: this
                .frameRate,
            repeat: 0
        });
    }



}
