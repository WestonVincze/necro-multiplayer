import { Scene } from "phaser";
import { assets } from "../../stores/AssetStore";

export class PreloaderScene extends Scene {

  constructor() {
    super('Preloader');
  }

  preload() {
    assets.subscribe(assetUrls => {
      for (const [key, url] of Object.entries(assetUrls)) {
        this.load.image(key, url);
      }
    })

    this.load.tilemapTiledJSON('map', 'tilemaps/sampleLevel.json');
    this.load.image('sample', 'tilemaps/sample.png');
  }

  create() {
    this.scene.start('MainMenu');
  }
}
