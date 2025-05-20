import { CreateJS } from "./createjs.js";

const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);

    let line = new CreateJS.Vec2(0, -1).toLine(400, 400).width(3);

    console.log(line.toVec2().toString());

    CreateJS.KeyboardEvent.deploy();
    CreateJS.KeyboardEvent.register(CreateJS.KeyboardEvent.Key.KeyW, ( event: KeyboardEvent, isKeyUp: boolean ) => {
        console.log("W pressed");
    });

    setInterval(() => {
        line = line
            .toVec2()
            .normalize()
            .scaleTo(100)
            .rotate(CreateJS.Math.degToRad(360 / 12))
            .round(3)
            .toLine(400, 400);

        game.run([ line ]);
    }, 1000);
}

