import { CONFIG } from "../config";


export default class Vegetal extends Phaser.Physics.Arcade.Sprite {


    isAction = false;
  

    frames = {
        abobora: [32, 752, 753, 754, 755],
        repolho: [32, 800, 801, 802, 803],
        trigo:   [32, 728, 729, 730, 731],
        nabo:    [32, 776, 777, 778, 779]

    }

    constructor(scene, x, y, tipo) {
        super(scene, x, y, 'vegetal');

        // this.touch = touch;
        this.tipo = tipo;
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
        this.body.setOffset(0, 0);

        this.existe = false;
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);


    }

    update() {



    }



    evento() {
            this.timeEvent = this.scene.time.addEvent({
            delay: 60000,
            callback:this.cresceVegetal,
            loop: true,
            callbackScope: this
        });
        
    }



    cresceVegetal() {
        if (this.existe == true) {
            if (this.frame.name == this.frames[this.tipo][0]) {
                this.setFrame(this.frames[this.tipo][1]);
            } else if (this.frame.name == this.frames[this.tipo][1]) {
                this.setFrame(this.frames[this.tipo][2]);
            } else if (this.frame.name == this.frames[this.tipo][2]) {
                this.setFrame(this.frames[this.tipo][3]);
            } else if (this.frame.name == this.frames[this.tipo][3]) {
                this.setFrame(this.frames[this.tipo][4]);

            }
        }
        else { }

    }

}
