import { CONFIG } from "../config";


export default class Vaca extends Phaser.Physics.Arcade.Sprite{
    

    isAction = false;

    constructor(scene, x, y){
        super(scene, x, y, 'vaca');

        // this.touch = touch;

        scene.add.existing(this);               //criando a img que o jogador ve
        scene.physics.add.existing(this);       //criando o body da fisica



        this.init();
    }

    preload(){
    }

    init(){
        this.setFrame(3);
        this.speed =120;
        this.frameRate = 8;
    

        
        
        this.setOrigin(0.5,0.5);

        this.body.setSize(12,12);
        this.body.setOffset(10,15);
        this.setVelocityX(40);
        this.initAnimations();


        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);



    }

    update(){
       
        if (this.body.touching.up || this.body.touching.down || this.body.touching.left || this.body.touching.right){
            this.setFlipX(!this.flip);
            this.setVelocity(this.body.velocity*-1);
        }

        if(this.body.velocity.x ===0 && this.body.velocity.y ===0){
            this.play('stop' , true);
            this.isAction = false;
        } else{
            this.play('walk', true);
            this.isAction = true;
        } 


        

    }

    initAnimations(){
        //stop
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('vaca', {start: 0,end:2 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('vaca', {start: 8,end:15 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'laying', //deitando
            frames: this.anims.generateFrameNumbers('vaca', {start: 16,end:18 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'up',  //levantando
            frames: this.anims.generateFrameNumbers('vaca', {start: 19,end:22 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });


        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('vaca', {start: 24,end:26 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'sleep',
            frames: this.anims.generateFrameNumbers('vaca', {start: 32,end:35}),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'sniffing',
            frames: this.anims.generateFrameNumbers('vaca', {start: 40,end:46 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'eating',
            frames: this.anims.generateFrameNumbers('vaca', {start: 48,end:51 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'love',
            frames: this.anims.generateFrameNumbers('vaca', {start: 56,end:61 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });


        
        
        

    }

}
