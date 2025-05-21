import { CreateJS } from "./createjs.js";

const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
if (canvas) {
    const game = new CreateJS(canvas);
    game.init()
        .backgroundColor("black")
        .resizeCanvas(innerWidth, innerHeight);

    let line = new CreateJS.Vec2(0, -1).toLine(400, 400).width(3);

    const rect = CreateJS.Rect.fromCenter(new CreateJS.Vec2(50, 50), 100).fillColor("white").fill();

    CreateJS.KeyboardEvent.deploy();
    CreateJS.KeyboardEvent.register(CreateJS.KeyboardEvent.Key.KeyW, ( event: KeyboardEvent, isKeyUp: boolean ) => {
        rect.scale(1.1);
    });
    CreateJS.KeyboardEvent.register(CreateJS.KeyboardEvent.Key.KeyS, ( event: KeyboardEvent, isKeyUp: boolean ) => {
        rect.scale(0.9);
    });

    const frames = 60;
    const fps = 1000 / frames;
    CreateJS.TimeHandler.tick(fps, ( currentTick, dt ) => {
        if (currentTick > 120) {
            CreateJS.TimeHandler.pause();
            setTimeout(() => {
                CreateJS.TimeHandler.resume();
            }, 2000);
        }

        line = line
            .toVec2()
            .normalize()
            .scaleTo(100)
            .rotate(CreateJS.Math.degToRad(1))
            .toLine(400, 400);

        game.run([ line, rect ]);
    });
}

