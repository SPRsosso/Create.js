import { CreateJS } from "./createjs.js";

const { Vec2 } = CreateJS;

const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.background("black");

    const shapes = [ new CreateJS.Rect(0, 0, 20, 20).fill("white") ];

    game.run(shapes);

    const vec1 = new CreateJS.Vec2(2, 2);

    console.log(vec1.normalize().toString());
}