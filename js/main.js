import { CreateJS } from "./createjs.js";
const frames = 60;
const fps = 1000 / frames;
const canvas = document.querySelector(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);
<<<<<<< HEAD
    const rect = CreateJS.ConvexPolygon.createRect(100, 100, 100, 100).fillColor("skyblue").fill();
    const rectPB = new CreateJS.Physics.PhysicsBody(false, rect);
    rectPB.setMass(1000);
    const colRect = CreateJS.ConvexPolygon.createRect(30, 500, 100, 100).fillColor("red").fill();
    const colRectPB = new CreateJS.Physics.PhysicsBody(true, colRect);
    const base = CreateJS.ConvexPolygon.createRect(0, innerHeight - 100, innerWidth, 100).fillColor("white").fill();
    const basePB = new CreateJS.Physics.PhysicsBody(true, base);
    const physics = new CreateJS.Physics();
    physics.addBody(rectPB, basePB, colRectPB);
    physics.setGravity(9.81 * CreateJS.Math.METER);
    CreateJS.TimeHandler.tick(fps, (currentTick, dt) => {
        physics.update(dt);
        game.render([rectPB, basePB, colRectPB]);
=======
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
>>>>>>> 182f7492731947a920694ec2480db25b03602dab
    });
}
