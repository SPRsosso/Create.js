import { CreateJS } from "./createjs.js";
const frames = 60;
const fps = 1000 / frames;
const canvas = document.querySelector(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);
    let line = new CreateJS.Vec2(0, -1).toLine(400, 400).width(3);
    const rect = CreateJS.Rect.fromCenter(new CreateJS.Vec2(innerWidth / 2, innerHeight / 2), 100).fillColor("white").fill();
    const rect2 = new CreateJS.Rect(200, 200, 100, 30).fillColor("lime").fill();
    const rect3 = CreateJS.Rect.fromPoints(new CreateJS.Vec2(100, 100), new CreateJS.Vec2(150, 200)).fillColor("blue").fill();
    const polygonPoints = rect.toPolygon();
    polygonPoints.splice(3, 0, new CreateJS.Vec2(50, 150));
    const polygon = new CreateJS.ConvexPolygon(500, 500, ...polygonPoints, new CreateJS.Vec2()).strokeColor("red").stroke();
    let point = polygon.center().toPoint().size(3).fillColor("red").fill();
    const speed = 10;
    const keyboardHandler = new CreateJS.KeyboardEvent.Handler();
    const velocity = new CreateJS.Vec2();
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyW, () => {
        velocity.y = -1;
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyS, () => {
        velocity.y = 1;
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyD, () => {
        velocity.x = 1;
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyA, () => {
        velocity.x = -1;
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowUp, () => {
        rect.scaleFrom(rect.position.clone().add(rect.size.clone().div(2)), 1.05);
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowDown, () => {
        rect.scaleFrom(rect.position.clone().add(rect.size.clone().div(2)), 0.95);
    });
    keyboardHandler.handle(fps);
    rect.alignTo(CreateJS.Shape.Anchors.BottomLeft, rect2, CreateJS.Shape.Anchors.TopLeft);
    CreateJS.TimeHandler.tick(fps, (currentTick, dt) => {
        line = line
            .toVec2()
            .normalize()
            .scaleTo(100)
            .rotate(CreateJS.Math.degToRad(1))
            .toLine(400, 400);
        if (!velocity.isZero())
            velocity.normalize().scaleTo(speed);
        polygon.translate(velocity.x, velocity.y);
        point = polygon.center().toPoint().size(3).fillColor("red").fill();
        velocity.zero();
        game.run([line, rect, rect2, rect3, polygon, point]);
    });
}
