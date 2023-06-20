import { Physics, Scene } from "phaser";
import { CONFIG } from "../config";
import Player from "../entities/Player";
import Touch from "../entities/Touch";

export default class Lab extends Scene {

    /**@type {Phaser.Tilemaps.Tilemap} */
    map;

    layers = {};

    /**@type {Player} */
    player;

    touch;

    /**@type {Phaser.Physics.Arcade.Group} */
    groupObjects;

    /**@type {Phaser.Physics.Arcade.Sprite} */
    lixoLaranja;

    /**@type {Phaser.Physics.Arcade.Sprite} */
    lixoAzul;

    /**@type {Phaser.Physics.Arcade.Sprite} */
    lixeira;

    /**@type {Phaser.GameObjects.Text} */
    text;

    /**@type {Phaser.GameObjects.Text} */
    quadro;

    /**@type {Phaser} */


    isTouching = false;

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





    }

    create() {
        this.createMap();
        this.createLayers();
        this.createPlayer();
        // this.createLixeiras();
        // this.createObjects();
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

    }

    update() {


    }


    createPlayer() {
        this.touch = new Touch(this, 16 * 8, 16 * 5);

        this.player = new Player(this, 16 * 8, 16 * 5, this.touch);
        this.player.setDepth(this.layers.length+1);



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


    // createObjects() {
    //     this.groupObjects = this.physics.add.group();

    //     const objects = this.map.createFromObjects("Objeto", [{
    //         name: "cadeira"
    //     },
    //     {
    //         name: "placa"
    //     },
    //     {
    //         name: "lixeira"
    //     },
    //     {
    //         name: "apagar"
    //     },
    //     {
    //         name: "escrever"
    //     }]);


    //     this.physics.world.enable(objects);

    //     for (let i = 0; i < objects.length; i++) {
    //         const obj = objects[i];

    //         const prop = this.map.objects[0].objects[i];

    //         obj.setDepth(this.layers.length + 1);
    //         obj.setVisible(false);

    //         this.groupObjects.add(obj);
    //         console.log(obj);
    //     }




    // }


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
            }

        }
        //criando a colisao entre a "maozinha" do player (touch) e os objetos da camada de objetos

        //chama a funcao this.handleTouch toda vez que o this.touch entrar em contato com um objeto do this.groupObjects
        this.physics.add.overlap(this.touch, this.groupObjects, this.handleTouch, undefined, this);
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

            if (object.name == "placa") {
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;

                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    if (object.x == 231.515151515151) {
                        this.text.text = 'Proibido comer/beber neste local';
                    }
                    else if (object.x == 247.583333333333) {
                        this.text.text = 'Proibido o uso de celulares neste local';
                    }
                    this.text.visible = true;
                } else {
                    console.log("TESTE");
                    this.player.body.enable = true;
                    this.text.text = '';
                    this.text.visible = false;
                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                }
            }



            if (object.name == "escrever") {
                if (this.player.body.enable == true) {
                    this.player.body.enable = false;

                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    this.quadro.text = 'Jogos Digitais';
                    this.quadro.setDepth(this.player.depth-2);
                    this.quadro.visible = true;
                } else {
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
                        if(this.lixoLaranja.frame.name == 0){
                            this.lixoLaranja.setFrame(1);
                        }else if(this.lixoLaranja.frame.name == 1 && this.lixoAzul.frame.name != 5){
                            this.lixoLaranja.setFrame(2);
                        }else{
                            this.lixoLaranja.setFrame(0);
                        }

                    } else if (object.x == 280.25) {
                        if(this.lixoAzul.frame.name == 3){
                            this.lixoAzul.setFrame(4);
                        }else if(this.lixoAzul.frame.name == 4 && this.lixoLaranja.frame.name != 2){
                            this.lixoAzul.setFrame(5);
                        }else{
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




    createLixeiras() {
        this.lixoLaranja = this.add.sprite(CONFIG.TILE_SIZE*16, 4 * CONFIG.TILE_SIZE, 'lixeira', 'lixeiraLaranja').setOrigin(0, 1).setDepth(this.layers.length + 1).setFrame(0);
        this.lixoAzul = this.add.sprite(CONFIG.TILE_SIZE*17, 4 * CONFIG.TILE_SIZE, 'lixeira', 'lixeiraAzul').setOrigin(0, 1).setDepth(this.player.depth-1).setFrame(3);  
    }

}