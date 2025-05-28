import { CreateJS } from "./createjs.js";
const frames = 60;
const fps = 1000 / frames;
const canvas = document.querySelector(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);
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
    });
}
