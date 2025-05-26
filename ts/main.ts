import { CreateJS } from "./createjs.js";

const frames = 60;
const fps = 1000 / frames;

const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);

    const rect = CreateJS.ConvexPolygon.createRect(100, 100, 100, 100).fillColor("skyblue").fill();

    CreateJS.TimeHandler.tick(fps, ( currentTick, dt ) => {
        game.render([ rect ]);
    });
}

