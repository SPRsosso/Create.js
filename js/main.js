import { CreateJS } from "./createjs.js";
const frames = 60;
const fps = 1000 / frames;
const canvas = document.querySelector(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);
    const rect = CreateJS.ConvexPolygon.createRect(100, 100, 100, 100).fill();
    const circle = CreateJS.ConvexPolygon.createCircle(500, 500, 100, 18).strokeWidth(3).stroke();
    const keyboardHandler = new CreateJS.KeyboardEvent.Handler();
    keyboardHandler.handle(fps);
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowLeft, () => {
        circle.rotate(CreateJS.Math.degToRad(-1));
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowRight, () => {
        circle.rotate(CreateJS.Math.degToRad(1));
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowUp, () => {
        circle.scaleFrom(1.01);
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowDown, () => {
        circle.scaleFrom(0.99);
    });
    CreateJS.TimeHandler.tick(fps, (currentTick, dt) => {
        if (circle.intersectsWith(rect)) {
            rect.fillColor("yellow");
            circle.strokeColor("lime");
        }
        else {
            rect.fillColor("skyblue");
            circle.strokeColor("red");
        }
        game.render([rect, circle]);
    });
}
