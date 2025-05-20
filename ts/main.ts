import { CreateJS } from "./createjs.js";

const { Vec2 } = CreateJS;

const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.background("black");

    const shapes = [ new CreateJS.Rect(0, 0, 20, 20).fill("white") ];

    game.run(shapes);

    const vec1 = new CreateJS.Vec2(0, 0);
    const vec2 = new CreateJS.Vec2(10, 10);
    const vec3 = new CreateJS.Vec2(0, 1);

    console.log(vec1.lerp(vec2, 0.5).toString());
}