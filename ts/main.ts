import { CreateJS } from "./createjs.js";

const frames = 60;
const fps = 1000 / frames;

const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);

    let line = new CreateJS.Vec2(0, -1).toLine(400, 400).width(3);

    const rect = CreateJS.Rect.fromCenter(new CreateJS.Vec2(innerWidth / 2, innerHeight / 2), 100).fillColor("white").fill();
    const rect2 = new CreateJS.Rect(200, 200, 100, 30).fillColor("lime").fill();
    const rect3 = CreateJS.Rect.fromPoints(new CreateJS.Vec2(100, 100), new CreateJS.Vec2(150, 200)).fillColor("blue").fill();

    const polygonPoints = rect.toPolygon()
    polygonPoints.splice(3, 0, new CreateJS.Vec2(50, 150));
    const polygon = new CreateJS.ConvexPolygon(500, 500, ...polygonPoints).strokeColor("red").stroke();
    let point = polygon.center().toPoint().size(3).fillColor("red").fill();

    const triangle = new CreateJS.ConvexPolygon(0, 0, new CreateJS.Vec2(0, 0), new CreateJS.Vec2(4, 0).mul(4), new CreateJS.Vec2(4, 3).mul(4)).strokeColor("white").stroke();

    const points: CreateJS.Vec2[] = [
        new CreateJS.Vec2(900, 500),
        new CreateJS.Vec2(800, 500),
        new CreateJS.Vec2(800, 600),
        new CreateJS.Vec2(900, 600)
    ];

    const polygonFromPoints = CreateJS.ConvexPolygon.convexHull(points).strokeColor("violet").stroke();
    
    polygonFromPoints.minScale(1000).maxScale(100000);

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
        polygonFromPoints.scaleFrom(new CreateJS.Vec2(1.1, 1.5));
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowDown, () => {
        polygonFromPoints.scaleFrom(new CreateJS.Vec2(0.9, 0.75));
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowLeft, () => {
        polygonFromPoints.rotate(CreateJS.Math.degToRad(-1));
    });
    keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowRight, () => {
        polygonFromPoints.rotate(CreateJS.Math.degToRad(1));
    });
    keyboardHandler.handle(fps);

    rect.alignTo(CreateJS.Shape.Anchors.BottomLeft, rect2, CreateJS.Shape.Anchors.TopLeft);

    CreateJS.TimeHandler.tick(fps, ( currentTick, dt ) => {
        line = line
            .toVec2()
            .normalize()
            .scaleTo(100)
            .rotate(CreateJS.Math.degToRad(1))
            .toLine(400, 400);

        if (!velocity.isZero())
            velocity.normalize().scaleTo(speed);
        polygonFromPoints.translate(velocity.x, velocity.y);
        point = polygon.center().toPoint().size(3).fillColor("red").fill();
        velocity.zero();

        const boundingRect = polygon.getBoundingBox().strokeColor("yellow").stroke();
        const points = polygon.getVerticesPositions().map(p => p.clone().toPoint().size(5).fillColor("blue").fill());
        const points2 = polygonFromPoints.getVerticesPositions().map(p => p.clone().toPoint().size(5).fill());
        points2[0].fillColor("white");
        points2[1].fillColor("lightgray");
        points2[2].fillColor("gray");
        points2[3].fillColor("blue");

        game.run([ line, rect, rect2, rect3, polygon, point, boundingRect, triangle, ...points, polygonFromPoints, ...points2 ]);
    });
}

