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


    /**@type {Phaser.Physics.Arcade.Sprite} */
    icMaca;
    /**@type {Phaser.Physics.Arcade.Sprite} */
    icTrigo;
    /**@type {Phaser.Physics.Arcade.Sprite} */
    icRepolho;
    /**@type {Phaser.Physics.Arcade.Sprite} */
    icAbobora;
    /**@type {Phaser.Physics.Arcade.Sprite} */
    icNabo;


    rep = 0;
    /**@type {Phaser.GameObjects.Text} */
    macatext;
    mac = 0;
    /**@type {Phaser.GameObjects.Text} */
    repolhotext;
    trig = 0;
    /**@type {Phaser.GameObjects.Text} */
    trigotext;
    nab = 0;
    /**@type {Phaser.GameObjects.Text} */
    nabotext;
    abbr = 0;
    /**@type {Phaser.GameObjects.Text} */
    aboboratext;


    /**@type {Vaca} */
    vaca;
    /**@type {Vaca2} */
    vaca2;




    touch;

    /**@type {Phaser.Physics.Arcade.Group} */
    groupObjects;




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

        this.load.spritesheet('icones', 'mapas/tiles/geral.png', {
            frameWidth: 16,
            frameHeight: 16
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
        this.createIcones();
        this.createObjects();
        this.createColliders();
        this.createCamera();


        const style = { color: '#000', fontSize: 10, backgroundColor: '#fff', padding: 5 }
        this.macatext = this.add.text(CONFIG.TILE_SIZE * 2, CONFIG.TILE_SIZE * 1, "0", style);
        this.macatext.setScrollFactor(0);
        this.macatext.setOrigin(0.5, 0);
        this.macatext.visible = true;


        this.repolhotext = this.add.text(CONFIG.TILE_SIZE * 4, CONFIG.TILE_SIZE * 1, "0", style);
        this.repolhotext.setScrollFactor(0);
        this.repolhotext.setOrigin(0.5, 0);
        this.repolhotext.visible = true;

        this.trigotext = this.add.text(CONFIG.TILE_SIZE * 6, CONFIG.TILE_SIZE * 1, "0", style);
        this.trigotext.setScrollFactor(0);
        this.trigotext.setOrigin(0.5, 0);
        this.trigotext.visible = true;

        this.nabotext = this.add.text(CONFIG.TILE_SIZE * 8, CONFIG.TILE_SIZE * 1, "0", style);
        this.nabotext.setScrollFactor(0);
        this.nabotext.setOrigin(0.5, 0);
        this.nabotext.visible = true;

        this.aboboratext = this.add.text(CONFIG.TILE_SIZE * 10, CONFIG.TILE_SIZE * 1, "0", style);
        this.aboboratext.setScrollFactor(0);
        this.aboboratext.setOrigin(0.5, 0);
        this.aboboratext.visible = true;


        this.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);


    }

    update() {


    }

    createArvores() {

        this.arvore1 = new Arvore(this, 569.5, 298.5);
        this.arvore1.setDepth(this.layers.length + 1);

        this.arvore2 = new Arvore(this, 569.01475, 357.6816);
        this.arvore2.setDepth(this.layers.length + 1);

        this.arvore3 = new Arvore(this, 569.5, 409);
        this.arvore3.setDepth(this.layers.length + 1);


    }

    createVegetais() {

        this.vegetal1 = new Vegetal(this, 103.75, 74, 'abobora');
        this.vegetal1.setDepth(this.layers.length + 1);


        this.vegetal2 = new Vegetal(this, 167.45, 74, 'repolho');
        this.vegetal2.setDepth(this.layers.length + 1);


        this.vegetal3 = new Vegetal(this, 231.784, 75, 'trigo');
        this.vegetal3.setDepth(this.layers.length + 1);

        this.vegetal4 = new Vegetal(this, 295.489, 74, 'nabo');
        this.vegetal4.setDepth(this.layers.length + 1);


        this.vegetal5 = new Vegetal(this, 103.875, 120, 'abobora');
        this.vegetal5.setDepth(this.layers.length + 1);

        this.vegetal6 = new Vegetal(this, 167.58, 120, 'repolho');
        this.vegetal6.setDepth(this.layers.length + 1);

        this.vegetal7 = new Vegetal(this, 231.908, 120, 'trigo');
        this.vegetal7.setDepth(this.layers.length + 1);

        this.vegetal8 = new Vegetal(this, 295.613, 120, 'nabo');
        this.vegetal8.setDepth(this.layers.length + 1);
    }


    createPlayer() {
        this.touch = new Touch(this, 16 * 8, 16 * 5);

        this.player = new Player(this, 16 * 16, 16 * 33, this.touch);
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

    }

    createVaca2() {
        this.vaca2 = new Vaca2(this, 38 * 16, 30 * 16);
        this.vaca2.setDepth(4);
        this.physics.add.collider(this.vaca2, this.layers);
        this.vaca2.body.checkCollision.up = true;
        this.vaca2.body.checkCollision.left = true;
        this.vaca2.body.checkCollision.right = true;
        this.vaca2.body.checkCollision.down = true;

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

        }, {
            name: "porta"

        }
        ]);


        this.physics.world.enable(objects);

        for (let i = 0; i < objects.length; i++) {
            const obj = objects[i];

            const prop = this.map.objects[0].objects[i];

            obj.setDepth(this.layers.length + 1);
            obj.setVisible(false);

            this.groupObjects.add(obj);
        }





    }

    createIcones() {
        
        this.icMaca = this.add.sprite(CONFIG.TILE_SIZE * 1,  1.5 * CONFIG.TILE_SIZE, 'icones').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(674).setScrollFactor(0);

        this.icRepolho = this.add.sprite(CONFIG.TILE_SIZE * 3,  1.5 * CONFIG.TILE_SIZE, 'icones').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(793).setScrollFactor(0);

        this.icTrigo = this.add.sprite(CONFIG.TILE_SIZE * 5,  1.5* CONFIG.TILE_SIZE, 'icones').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(721).setScrollFactor(0);


        this.icNabo = this.add.sprite(CONFIG.TILE_SIZE * 7,  1.5 * CONFIG.TILE_SIZE, 'icones').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(769).setScrollFactor(0);

        this.icAbobora = this.add.sprite(CONFIG.TILE_SIZE *9 , 1.5 * CONFIG.TILE_SIZE, 'icones').setOrigin(0.5, 0.5).setDepth(this.layers.length + 1).setFrame(745).setScrollFactor(0);

        

        
        
       

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
                // this.physics.add.collider(this.vaca, this.player);
                // this.physics.add.collider(this.vaca2, this.player);

            }

        }
        //criando a colisao entre a "maozinha" do player (touch) e os objetos da camada de objetos

        //chama a funcao this.handleTouch toda vez que o this.touch entrar em contato com um objeto do this.groupObjects
        this.physics.add.overlap(this.touch, this.groupObjects, this.handleTouch, undefined, this);
        this.physics.add.overlap(this.touch, this.vaca, this.handleTouchVaca, undefined, this);
        this.physics.add.overlap(this.touch, this.vaca2, this.handleTouchVaca1, undefined, this);
    }


    handleTouchVaca(touch, vaca) {
        if (this.isTouching && this.player.isAction) {
            return;
        }

        if (this.isTouching && !this.player.isAction) {
            this.isTouching = false;
            return;
        }
        if (this.player.isAction) {
            this.isTouching = true;
            this.vaca.play('love', true);
            this.vaca.isAction = true;
        }
    }

    handleTouchVaca1(touch, vaca2) {
        if (this.isTouching && this.player.isAction) {
            return;
        }

        if (this.isTouching && !this.player.isAction) {
            this.isTouching = false;
            return;
        }

        if (this.player.isAction) {
            this.isTouching = true;
            this.vaca2.play('love', true);
            this.vaca2.isAction = true;
        }
    }

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
            if (object.name == "porta") {
                this.scene.switch('Casa');
            }


            let vegetais = ['vegetal1', 'vegetal2', 'vegetal3', 'vegetal4', 'vegetal5', 'vegetal6', 'vegetal7', 'vegetal8']
            if (vegetais.includes(object.name)) {

                let veg = this[object.name];
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    // initAnimationsArv()
                    if (veg.existe == false) {
                        veg.existe = true;
                        veg.setFrame(veg.frames[veg.tipo][1]);
                        veg.evento();
                        this.player.play('weed-' + this.player.direction, true);
                        this.player.isAction = true;
                    }


                    if (veg.frame.name > veg.frames[veg.tipo][1] && veg.frame.name <= veg.frames[veg.tipo][3]) {
                        this.player.play('water-' + this.player.direction, true);
                        this.player.isAction = true;

                    } else if (veg.frame.name == veg.frames[veg.tipo][4]) {
                        this.player.play('weed-' + this.player.direction, true);
                        this.player.isAction = true;
                        veg.setFrame(veg.frames[veg.tipo][0]);
                        veg.existe = false;
                        if(veg.tipo=='abobora'){
                            this.abbr+=2;
                            this.aboboratext.text= ''+this.abbr;
                        } else if(veg.tipo=='repolho'){
                            this.rep+=2;
                            this.repolhotext.text= ''+this.rep;
                        } else if(veg.tipo=='trigo'){
                            this.trig+=2;
                            this.trigotext.text= ''+this.trig;
                        } else if(veg.tipo=='nabo'){
                            this.nab+=2;
                            this.nabotext.text= ''+this.nab;
                        }
                    }
                } else {
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

            if (object.name == "arvore1") {
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

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
                        this.player.isAction = true;
                        this.arvore1.play('balance1', true);
                        this.arvore1.isAction = true;
                        this.arvore1.setFrame(12);
                        this.mac+=3;
                        this.macatext.text= ''+this.mac;
                    }
                } else {
                    if (this.arvore1.frame.name == 29) {
                        this.arvore1.setFrame(14);
                    }
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
                        this.mac+=3;
                        this.macatext.text= ''+this.mac;
                    }
                } else {
                    if (this.arvore2.frame.name == 29) {
                        this.arvore2.setFrame(14);
                    }
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
                        this.mac+=3;
                        this.macatext.text= ''+this.mac;
                    }
                } else {
                    if (this.arvore3.frame.name == 29) {
                        this.arvore3.setFrame(14);
                    }
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
        }
    }

}