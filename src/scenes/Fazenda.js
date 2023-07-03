import { Physics, Scene } from "phaser";
import { CONFIG } from "../config";
import Player from "../entities/Player";
import Touch from "../entities/Touch";
import Vaca from "../entities/Vaca";
import Vaca2 from "../entities/Vaca2";
import Arvore from "../entities/Arvore";
import Vegetal from "../entities/Vegetal";

export default class Lab extends Scene {

    /**@type {Phaser.Tilemaps.Tilemap} */
    map;

    layers = {};

    /**@type {Player} */
    player;

    /**@type {Arvore} */
    arvore1;

    /**@type {Arvore} */
    arvore2;

    /**@type {Arvore} */
    arvore3;

  

    /**@type {Vegetal} */
    vegetal1;
    
    /**@type {Vegetal} */
    vegetal2;
    
    /**@type {Vegetal} */
    vegetal3;
    
    /**@type {Vegetal} */
    vegetal4;
    
    /**@type {Vegetal} */
    vegetal5;
    
    /**@type {Vegetal} */
    vegetal6;
    
    /**@type {Vegetal} */
    vegetal7;
    
    /**@type {Vegetal} */
    vegetal8;


    /**@type {Vaca} */
    vaca;
    /**@type {Vaca2} */
    vaca2;



    touch;

    /**@type {Phaser.Physics.Arcade.Group} */
    groupObjects;


    /**@type {Phaser.GameObjects.Text} */
    text;

    // /**@type {Phaser.Physics.Arcade.Sprite} */
    //  vegetal;

    // /**@type {Phaser.Physics.Arcade.Sprite} */
    // vegetal1;

    // /**@type {Phaser.Physics.Arcade.Sprite} */
    // vegetal2;


    /**@type {Phaser} */



    isTouching = false;
    // isTouchingVaca = false;

    isAction = false;


    constructor() {
        super('Fazenda');

    }

    preload() {


        // Carregar os dados do mapa
        this.load.tilemapTiledJSON('tilemap-fazenda', 'mapas/fazenda.json');

        // Carregar os tilesets do map (as imagens)
        this.load.image('geral', 'mapas/tiles/geral.png');


        //Importando um spritesheet
        this.load.spritesheet('player', 'mapas/tiles/player.png', {
            frameWidth: 48,
            frameHeight: 48
        })



        this.load.spritesheet('vaca', 'mapas/tiles/vacas_anim.png', {
            frameWidth: CONFIG.TILE_SIZE * 2,
            frameHeight: CONFIG.TILE_SIZE * 2
        })

        this.load.spritesheet('arvore', 'mapas/tiles/arvore_macas_anim.png', {
            frameWidth: CONFIG.TILE_SIZE * 3,
            frameHeight: CONFIG.TILE_SIZE * 3
        })

        this.load.spritesheet('vegetal', 'mapas/tiles/geral.png', {
            frameWidth: 16,
            frameHeight: 16
        })


    }


    init() {

    }


    create() {
        this.createMap();
        this.createLayers();
        this.createPlayer();
        this.createVaca();
        this.createVaca2();
        
        
        this.createArvores();
        this.createVegetais();
        this.createObjects();
        this.createColliders();
        this.createCamera();


        const style = { color: '#000', fontSize: 10, backgroundColor: '#fff', padding: 5 }
        this.text = this.add.text(this.scale.width / 2, this.scale.height - this.scale.height / 5, "", style);
        this.text.setScrollFactor(0);
        this.text.setOrigin(0.5, 0);
        this.text.visible = false;


        const style1 = { color: '#000', fontSize: 10 }
        this.quadro = this.add.text(this.scale.width / 2, this.scale.height / 10, "", style1);
        this.quadro.setOrigin(0.5, 0);
        this.quadro.visible = false;
        this.quadro.setDepth(this.player.depth - 1);
        console.log(this.quadro.depth, this.player.depth);

        this.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);


    }

    update() {


    }

    createArvores() {

        console.log("bbbb");
        this.arvore1 = new Arvore(this, 569.5, 298.5);
        this.arvore1.setDepth(this.layers.length + 1);

        this.arvore2 = new Arvore(this, 569.01475, 357.6816);
        this.arvore2.setDepth(this.layers.length + 1);

        this.arvore3 = new Arvore(this, 569.5, 409);
        this.arvore3.setDepth(this.layers.length + 1);


    }

    createVegetais() {
        console.log("aaaaa");
        this.vegetal1 = new Vegetal(this,103.75, 74);
        this.vegetal1.setDepth(this.layers.length + 1);


        this.vegetal2 = new Vegetal(this,167.45, 74);
        this.vegetal2.setDepth(this.layers.length + 1);



        this.vegetal3 = new Vegetal(this, 231.784, 75);
        this.vegetal3.setDepth(this.layers.length + 1);

        this.vegetal4 = new Vegetal(this, 295.489, 74);
        this.vegetal4.setDepth(this.layers.length + 1);


        this.vegetal5 = new Vegetal(this, 103.875, 120);
        this.vegetal5.setDepth(this.layers.length + 1);

        this.vegetal6 = new Vegetal(this, 167.58, 120);
        this.vegetal6.setDepth(this.layers.length + 1);

        this.vegetal7 = new Vegetal(this, 231.908, 120);
        this.vegetal7.setDepth(this.layers.length + 1);

        this.vegetal8 = new Vegetal(this, 295.613, 120);
        this.vegetal8.setDepth(this.layers.length + 1);
    }


    createPlayer() {
        this.touch = new Touch(this, 16 * 8, 16 * 5);

        this.player = new Player(this, 16 * 8, 16 * 5, this.touch);
        this.player.setDepth(4);



    }


    createVaca() {
        this.vaca = new Vaca(this, 34 * 16, 34 * 16);
        this.vaca.setDepth(4);
        this.physics.add.collider(this.vaca, this.layers);
        this.vaca.body.checkCollision.up = true;
        this.vaca.body.checkCollision.left = true;
        this.vaca.body.checkCollision.right = true;
        this.vaca.body.checkCollision.down = true;



        // this.add.sprite(CONFIG.TILE_SIZE*16, 4*CONFIG.TILE_SIZE, 'vaca', 'vaca').setOrigin(0, 1).setDepth(this.layers.length + 1).setFrame(0);
    }

    createVaca2() {
        this.vaca2 = new Vaca2(this, 38 * 16, 30 * 16);
        this.vaca2.setDepth(4);
        this.physics.add.collider(this.vaca2, this.layers);
        this.vaca2.body.checkCollision.up = true;
        this.vaca2.body.checkCollision.left = true;
        this.vaca2.body.checkCollision.right = true;
        this.vaca2.body.checkCollision.down = true;

        // this.add.sprite(CONFIG.TILE_SIZE*16, 4*CONFIG.TILE_SIZE, 'vaca', 'vaca').setOrigin(0, 1).setDepth(this.layers.length + 1).setFrame(0);
    }



    createMap() {
        this.map = this.make.tilemap({
            key: 'tilemap-fazenda',
            tileWidth: CONFIG.TILE_SIZE,
            tileHeight: CONFIG.TILE_SIZE
        });

        //Fazendo a correspondencia entre as imagens usadas no Tiled
        // e as carregadas pelo Phaser
        this.map.addTilesetImage('geral', 'geral');

    }


    createObjects() {
        this.groupObjects = this.physics.add.group();

        const objects = this.map.createFromObjects("Objeto", [{
            name: "vegetal1"
        },
        {
            name: "vegetal2"
        },
        {
            name: "vegetal3"
        },
        {
            name: "vegetal4"
        },
        {
            name: "vegetal5"
        },
        {
            name: "vegetal6"
        },
        {
            name: "vegetal7"
        },
        {
            name: "vegetal8"
        },
        
        {
            name: "arvore1"

        }, {
            name: "arvore2"

        }, {
            name: "arvore3"

        }
        ]);


        this.physics.world.enable(objects);

        for (let i = 0; i < objects.length; i++) {
            const obj = objects[i];

            const prop = this.map.objects[0].objects[i];

            obj.setDepth(this.layers.length + 1);
            obj.setVisible(false);

            this.groupObjects.add(obj);
            console.log(obj);
        }





    }


    createLayers() {
        const tilesFazenda = this.map.getTileset('geral');

        const layerNames = this.map.getTileLayerNames();
        for (let i = 0; i < layerNames.length; i++) {
            const name = layerNames[i];

            this.layers[name] = this.map.createLayer(name, [tilesFazenda], 0, 0);
            this.layers[name].setDepth(i);


            //verifica se o layer possui colisão
            if (name.endsWith('Collision')) {
                this.layers[name].setCollisionByProperty({ collide: true });

                if (CONFIG.DEBUG_COLLISION) {
                    const debugGraphics = this.add.graphics().setAlpha(0.75).setDepth(i);
                    this.layers[name].renderDebug(debugGraphics, {
                        tileColor: null, // Color of non-colliding tiles
                        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
                    });
                }

            }

        }



    }


    createLayersManual() {
        const tilesOffice = this.map.getTileset('geral')

        this.map.createLayer('acima Collision', [tilesOffice], 0, 0);
        this.map.createLayer('abaixo Collision', [tilesOffice], 0, 0);
        this.map.createLayer('solo Collision', [tilesOffice], 0, 0);
        this.map.createLayer('maisBaixo Collision', [tilesOffice], 0, 0);
        this.map.createLayer('agua', [tilesOffice], 0, 0);

    }

    createCamera() {
        const mapWidth = this.map.width * CONFIG.TILE_SIZE;
        const mapHeigth = this.map.height * CONFIG.TILE_SIZE;

        this.cameras.main.setBounds(0, 0, mapWidth, mapHeigth);
        this.cameras.main.startFollow(this.player);
    }


    createColliders() {
        //diferenca entre collider e overlap:
        //COLLIDER: colide e impede a passagem
        //OVERLAP: detecta a sobreposição dos elemetos, não impede a passagem



        //criando colisao entre o player e as camadas de colisao do tiled
        const layerNames = this.map.getTileLayerNames();
        for (let i = 0; i < layerNames.length; i++) {
            const name = layerNames[i];

            if (name.endsWith('Collision')) {
                this.physics.add.collider(this.player, this.layers[name]);
                this.physics.add.collider(this.vaca, this.layers[name]);
                this.physics.add.collider(this.vaca2, this.layers[name]);

            }

        }
        //criando a colisao entre a "maozinha" do player (touch) e os objetos da camada de objetos

        //chama a funcao this.handleTouch toda vez que o this.touch entrar em contato com um objeto do this.groupObjects
        this.physics.add.overlap(this.touch, this.groupObjects, this.handleTouch, undefined, this);
    }



    // handleVaca() {

    //     if (this.vaca.body.touching.up || this.vaca.body.touching.down || this.vaca.body.touching.left || this.vaca.body.touching.right){
    //         this.vaca.setFlipX(true);
    //         this.vaca.setVelocity(this.vaca.body.velocity *-1);
    //     }

    //     }




    handleTouch(touch, object) {


        if (this.isTouching && this.player.isAction) {
            return;
        }

        if (this.isTouching && !this.player.isAction) {
            this.isTouching = false;
            return;
        }

        if (this.player.isAction) {
            this.isTouching = true;

            if (object.name == "vegetal1") {
                console.log("teste00");
                if (this.player.body.enable == true) {
                    console.log("teste01");
                    this.player.body.enable = false;
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    // initAnimationsArv()
                    console.log(this.vegetal1.existe);
                    if (this.vegetal1.existe == false) {
                        console.log("teste0");
                        this.vegetal1.existe = true;
                        this.vegetal1.setFrame(752);
                        this.vegetal1.evento();
                        this.player.play('weed-' + this.player.direction,true);
                        this.player.isAction = true;
                    }


                    if (this.vegetal1.frame.name >=752 && this.vegetal1.frame.name<=754) {
                        this.player.play('water-' + this.player.direction, true);
                        this.player.isAction = true;
                    } else if (this.vegetal1.frame.name == 755) {
                        this.player.play('weed-' + this.player.direction, true);
                        console.log(this.player.direction);
                        this.player.isAction = true;
                        this.vegetal1.setFrame(32);
                    }
                } else {
                    // if (this.vegetal1.frame.name == 29) {
                    //     this.vegetal1.setFrame(14);
                    // }
                    console.log("teste2");
                    // this.quadro.setDepth(this.layers.length+1);
                    this.player.body.enable = true;
                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                }
            }




            // if (object.name == "vegetal1") {
            //     if (this.player.body.enable == true) {
            //         this.player.body.enable = false;
            //         this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
            //         this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
            //         this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            //         this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

            //         // initAnimationsArv()

            //         if (this.vegetal1.existe == false) {
            //             console.log("teste0");
            //             this.vegetal1.existe = true;
            //             this.vegetal1.setFrame(32);
            //             this.vegetal1.evento();
            //             this.player.play('weed-' + this.player.direction,true);
            //             this.player.isAction = true;
            //         }


            //         if (this.vegetal1.frame.name >=752 && this.vegetal1.frame.name<=754) {
            //             this.player.play('water-' + this.player.direction, true);
            //             this.player.isAction = true;
            //         } else if (this.vegetal1.frame.name == 755) {
            //             this.player.play('weed-' + this.player.direction, true);
            //             console.log(this.player.direction);
            //             this.player.isAction = true;
            //             this.vegetal1.setFrame(32);
            //         }
            //     } else {
            //         // if (this.vegetal1.frame.name == 29) {
            //         //     this.vegetal1.setFrame(14);
            //         // }
            //         console.log("TESTE");
            //         // this.quadro.setDepth(this.layers.length+1);
            //         this.player.body.enable = true;
            //         this.player.cursors = this.input.keyboard.addKeys({
            //             up: Phaser.Input.Keyboard.KeyCodes.UP,
            //             down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            //             left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            //             right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            //             space: Phaser.Input.Keyboard.KeyCodes.SPACE
            //         });
            //     }
            // }




            if (object.name == "arvore1") {
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    // initAnimationsArv()
                    console.log(this.arvore1.existe);
                    if (this.arvore1.existe == false) {
                        this.arvore1.existe = true;
                        this.arvore1.setFrame(12);
                        this.arvore1.evento();
                    }


                    if (this.arvore1.frame.name == 14) {
                        this.player.play('cutting-' + this.player.direction, true);
                        this.player.isAction = true;
                        this.arvore1.play('balance0', true);
                        this.arvore1.isAction = true;
                    } else if (this.arvore1.frame.name == 15) {
                        this.player.play('cutting-' + this.player.direction, true);
                        console.log(this.player.direction);
                        this.player.isAction = true;
                        this.arvore1.play('balance1', true);
                        this.arvore1.isAction = true;
                        this.arvore1.setFrame(12);
                    }
                } else {
                    if (this.arvore1.frame.name == 29) {
                        this.arvore1.setFrame(14);
                    }
                    console.log("TESTE");
                    // this.quadro.setDepth(this.layers.length+1);
                    this.player.body.enable = true;
                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                }
            }


            if (object.name == "arvore2") {
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    // initAnimationsArv()


                    if (this.arvore2.existe == false) {
                        this.arvore2.existe = true;
                        this.arvore2.setFrame(12);
                        this.arvore2.evento();
                    }


                    if (this.arvore2.frame.name == 14) {
                        this.player.play('cutting-' + this.player.direction, true);
                        this.player.isAction = true;
                        this.arvore2.play('cutting', true);
                        this.arvore2.isAction = true;
                    } else if (this.arvore2.frame.name == 15) {
                        this.player.play('cutting-' + this.player.direction, true);
                        this.player.isAction = true;
                        this.arvore2.play('balance1', true);
                        this.arvore2.isAction = true;
                        this.arvore2.setFrame(12);
                    }
                } else {
                    if (this.arvore2.frame.name == 29) {
                        this.arvore2.setFrame(14);
                    }
                    console.log("TESTE");
                    // this.quadro.setDepth(this.layers.length+1);
                    this.player.body.enable = true;
                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                }
            }


            if (object.name == "arvore3") {
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    // initAnimationsArv()


                    if (this.arvore3.existe == false) {
                        this.arvore3.existe = true;
                        this.arvore3.setFrame(12);
                        this.arvore3.evento();
                    }


                    if (this.arvore3.frame.name == 14) {
                        this.player.play('cutting-' + this.player.direction, true)
                        this.player.isAction = true;
                        this.arvore3.play('balance0', true);
                        this.arvore3.isAction = true;
                    } else if (this.arvore3.frame.name == 15) {
                        this.player.play('cutting-' + this.player.direction, true);
                        this.player.isAction = true;
                        this.arvore3.play('balance1', true);
                        this.arvore3.isAction = true;
                    }
                } else {
                    if (this.arvore3.frame.name == 29) {
                        this.arvore3.setFrame(14);
                    }
                    console.log("TESTE");
                    // this.quadro.setDepth(this.layers.length+1);
                    this.player.body.enable = true;
                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                }
            }




            if (object.name == "apagar") {
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;

                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    this.quadro.visible = false;

                } else {
                    console.log("TESTE");
                    this.player.body.enable = true;

                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                }
            }


            if (object.name == "lixeira") {
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    if (object.x == 263.439393939394) {
                        if (this.lixoLaranja.frame.name == 0) {
                            this.lixoLaranja.setFrame(1);
                        } else if (this.lixoLaranja.frame.name == 1 && this.lixoAzul.frame.name != 5) {
                            this.lixoLaranja.setFrame(2);
                        } else {
                            this.lixoLaranja.setFrame(0);
                        }

                    } else if (object.x == 280.25) {
                        if (this.lixoAzul.frame.name == 3) {
                            this.lixoAzul.setFrame(4);
                        } else if (this.lixoAzul.frame.name == 4 && this.lixoLaranja.frame.name != 2) {
                            this.lixoAzul.setFrame(5);
                        } else {
                            this.lixoAzul.setFrame(3);
                        }
                    }
                } else {
                    console.log("TESTE");
                    this.player.body.enable = true;
                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                    this.player.setDepth(2);
                }
            }


            if (object.name == "cadeira") {

                if (this.player.body.enable == true) {
                    this.player.body.enable = false;
                    this.player.x = object.x - 8;
                    this.player.y = object.y - 8;

                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    this.player.setDepth(0);

                    if (object.x == 39.6667 && object.y == 70.6667) {
                        this.player.direction = 'down';
                        this.player.setDepth(1);
                    } else {
                        this.player.direction = 'up';
                    }


                } else {
                    console.log("TESTE");
                    this.player.body.enable = true;
                    this.player.x = object.x - 8;
                    this.player.y = object.y + 8;
                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                    this.player.setDepth(2);
                }
            }
        }
    }



    // createVegetal() {


    //     this.vegetal1 = this.add.sprite(103.75, 74, 'vegetal').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(32);

    //     this.vegetal2 = this.add.sprite(167.454545454545, 74, 'vegetal').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(32);

    //     this.vegetal3 = this.add.sprite(231.784, 75, 'vegetal').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(32);

    //     this.vegetal4 = this.add.sprite(295.489, 74, 'vegetal').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(32);



    //     this.vegetal5 = this.add.sprite(103.875, 120, 'vegetal').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(32);

    //     this.vegetal6 = this.add.sprite(167.58, 120, 'vegetal').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(32);

    //     this.vegetal7 = this.add.sprite(231.908, 120, 'vegetal').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(32);
    //     this.vegetal8 = this.add.sprite(295.613, 120, 'vegetal').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(32);
    // }


    // cresceVegetal1(){
    //     if(this.vegetal1.frame.name == 32){
    //         this.vegetal1.setFrame(752);
    //     }else if(this.vegetal1.frame.name == 752){
    //         this.vegetal1.setFrame(753);
    //     } else if(this.vegetal1.frame.name == 753){
    //         this.vegetal1.setFrame(754);
    //     } else{
    //         this.vegetal1.setFrame(755);

    //     }

    // }
    // cresceVegetal2(){
    //     if(this.vegetal2.frame.name == 32){
    //         this.vegetal2.setFrame(800);
    //     }else if(this.vegetal2.frame.name == 800){
    //         this.vegetal2.setFrame(801);
    //     } else if(this.vegetal2.frame.name == 801){
    //         this.vegetal2.setFrame(802);
    //     } else{
    //         this.vegetal2.setFrame(803);
    //     }

    // }
    // cresceVegetal3(){
    //     if(this.vegetal3.frame.name == 32){
    //         this.vegetal3.setFrame(728);
    //     }else if(this.vegetal3.frame.name == 728){
    //         this.vegetal3.setFrame(729);
    //     } else if(this.vegetal3.frame.name == 729){
    //         this.vegetal3.setFrame(730);
    //     } else{
    //         this.vegetal3.setFrame(731);

    //     }


    // }
    // cresceVegetal4(){
    //     if(this.vegetal4.frame.name == 32){
    //         this.vegetal4.setFrame(800);
    //     }else if(this.vegetal4.frame.name == 800){
    //         this.vegetal4.setFrame(801);
    //     } else if(this.vegetal4.frame.name == 801){
    //         this.vegetal4.setFrame(802);
    //     } else{
    //         this.vegetal4.setFrame(803);
    //     }

    // }
    // cresceVegetal5(){
    //     if(this.vegetal5.frame.name == 32){
    //         this.vegetal5.setFrame(752);
    //     }else if(this.vegetal5.frame.name == 752){
    //         this.vegetal5.setFrame(753);
    //     } else if(this.vegetal5.frame.name == 753){
    //         this.vegetal5.setFrame(754);
    //     } else{
    //         this.vegetal5.setFrame(755);

    //     }


    // }
    // cresceVegetal6(){
    //     if(this.vegetal6.frame.name == 32){
    //         this.vegetal6.setFrame(800);
    //     }else if(this.vegetal6.frame.name == 800){
    //         this.vegetal6.setFrame(801);
    //     } else if(this.vegetal6.frame.name == 801){
    //         this.vegetal6.setFrame(802);
    //     } else{
    //         this.vegetal6.setFrame(803);
    //     }

    // }
    // cresceVegetal7(){
    //     if(this.vegetal7.frame.name == 32){
    //         this.vegetal7.setFrame(728);
    //     }else if(this.vegetal7.frame.name == 728){
    //         this.vegetal7.setFrame(729);
    //     } else if(this.vegetal7.frame.name == 729){
    //         this.vegetal7.setFrame(730);
    //     } else{
    //         this.vegetal7.setFrame(731);

    //     }

    // }
    // cresceVegetal8(){
    //     if(this.vegetal8.frame.name == 32){
    //         this.vegetal8.setFrame(800);
    //     }else if(this.vegetal8.frame.name == 800){
    //         this.vegetal8.setFrame(801);
    //     } else if(this.vegetal8.frame.name == 801){
    //         this.vegetal8.setFrame(802);
    //     } else{
    //         this.vegetal8.setFrame(803);
    //     }

    // }



    // initAnimations() {
    //     this.arvore1.anims.create({
    //             key: 'balance0',
    //             frames: this.arvore1.anims.generateFrameNumbers('arvore', { start: 24, end: 29 }),
    //             frameRate: this
    //                 .frameRate,
    //             repeat: -1
    //         });



    //     this.anims.create({
    //         key: 'balance1',
    //         frames: this.anims.generateFrameNumbers('arvore', { start: 36, end: 47 }),
    //         frameRate: this
    //             .frameRate,
    //         repeat: -1
    //     });
    // }
}