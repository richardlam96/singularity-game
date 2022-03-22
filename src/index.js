import { AssetFactory } from "./utilities/asset-factory";
import { Game } from "./game";


let assetFactory = new AssetFactory();
assetFactory.init()
.then(() => {
    // Init and run the game.
    let game = new Game(assetFactory);
    game.render();
});