import { CreateJS } from "./createjs.js";

const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);

    let line = new CreateJS.Vec2(0, -1).toLine(400, 400).width(3);

    const rect = CreateJS.Rect.fromCenter(new CreateJS.Vec2(50, 50), 100).fillColor("white").fill();

    console.log(rect.center().toString());

    CreateJS.KeyboardEvent.deploy();
    CreateJS.KeyboardEvent.register(CreateJS.KeyboardEvent.Key.KeyW, ( event: KeyboardEvent, isKeyUp: boolean ) => {
        rect.scale(1.1);
    });

    setInterval(() => {
        line = line
            .toVec2()
            .normalize()
            .scaleTo(100)
            .rotate(CreateJS.Math.degToRad(360 / 12))
            .round(3)
            .toLine(400, 400);

        game.run([ line, rect ]);
    }, 50);
}

