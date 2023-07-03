import { CONFIG } from "../config";


export default class Vegetal extends Phaser.Physics.Arcade.Sprite {


    isAction = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'vegetal');

        // this.touch = touch;

        scene.add.existing(this);               //criando a img que o jogador ve
        scene.physics.add.existing(this);       //criando o body da fisica



        this.init();
    }

    preload() {
    }

    init() {
        this.setFrame(32);
        this.frameRate = 8;
        this.setOrigin(0.5, 0.5);

        this.body.setSize(16, 16);
        this.body.setOffset(10, 15);
        // this.initAnimations();
        this.existe= false;

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);




        // if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        //     this.play('stop', true);
        //     this.isAction = false;
        // } else {
        //     this.play('walk', true);
        //     this.isAction = true;
        // }

        

        // this.deitarVaca();
    }

    update() {

        // if((this.frame.name>=8 && this.frame.name<=15)){
        //      if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        //     this.moveVaca();
        // } 
        
        // }
       

        // this.acaoVaca();


    }


    restart(){
        this.timeEvent = this.scene.time.addEvent({
            delay: 5000,
            callback: this.setFrame(32),
            loop: true,
            callbackScope: this
        });
    }

    evento(){
        this.timeEvent = this.scene.time.addEvent({
            delay: 5000,
            callback: this.cresceVegetal,
            loop: true,
            callbackScope: this
        });
    }


    
    cresceVegetal(){
        if(this.existe ==true){
        if(this.frame.name == 32){
            this.setFrame(752);
        }else if(this.frame.name == 752){
            this.setFrame(753);
        } else if(this.frame.name == 753){
            this.setFrame(754);
        } else if(this.frame.name == 754){
            this.setFrame(755);
        }}
        else{}

    }

    // initAnimations() {
    //     this.anims.create({
    //             key: 'balance0',
    //             frames: this.anims.generateFrameNumbers('arvore', { start: 24, end: 29 }),
    //             frameRate: this
    //                 .frameRate,
    //             repeat: 0
    //         });
    
    

    //     this.anims.create({
    //         key: 'balance1',
    //         frames: this.anims.generateFrameNumbers('arvore', { start: 36, end: 49 }),
    //         frameRate: this
    //             .frameRate,
    //         repeat: 0
    //     });
    // }



}
