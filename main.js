import {AUTO} from "phaser";
import { CONFIG } from "./src/config";
import Fazenda from "./src/scenes/Fazenda";


const config = {
    width: CONFIG.GAME_WIDTH*1.5,
    height: CONFIG.GAME_HEIGHT*1.5,
    type: AUTO,
    scene: [Fazenda],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    pixelArt: true,
    scale: {
        zoom: CONFIG.GAME_SCALE
    }
}

export default new Phaser.Game(config);