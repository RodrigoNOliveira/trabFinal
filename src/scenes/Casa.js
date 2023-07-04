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


    /**@type {Phaser.GameObjects.Text} */
    text;


    /**@type {Phaser} */



    isTouching = false;
    // isTouchingVaca = false;

    isAction = false;


    constructor() {
        super('Casa');

    }

    preload() {


        // Carregar os dados do mapa
        this.load.tilemapTiledJSON('tilemap-casa', 'mapas/casa.json');

        // Carregar os tilesets do map (as imagens)
        this.load.image('geral', 'mapas/tiles/geral.png');


        //Importando um spritesheet
        this.load.spritesheet('player', 'mapas/tiles/player.png', {
            frameWidth: 48,
            frameHeight: 48
        })






    }


    init() {

    }


    create() {
        this.createMap();
        this.createLayers();
        this.createPlayer();
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



    createPlayer() {
        this.touch = new Touch(this, 16 * 8, 16 * 5);

        this.player = new Player(this, 330, 270, this.touch);
        this.player.setDepth(4);



    }


    createMap() {
        this.map = this.make.tilemap({
            key: 'tilemap-casa',
            tileWidth: CONFIG.TILE_SIZE,
            tileHeight: CONFIG.TILE_SIZE
        });

        //Fazendo a correspondencia entre as imagens usadas no Tiled
        // e as carregadas pelo Phaser
        this.map.addTilesetImage('geral', 'geral');

    }


    createObjects() {
        this.groupObjects = this.physics.add.group();

        const objects = this.map.createFromObjects("objetos", [{
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
            if (name.endsWith('collide')) {
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

            if (name.endsWith('collide')) {
                this.physics.add.collider(this.player, this.layers[name]);

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

            if (object.name == "porta") {
                this.scene.switch('Fazenda');

            }
        }
    }

}