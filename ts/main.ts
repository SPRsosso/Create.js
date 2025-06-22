import { CreateJS } from "./createjs.js";

const fps = CreateJS.Math.framesToFPS(60);

async function start() {
    const images = await CreateJS.TimeHandler.Preload.images([ "assets/images/person_idle_left.png", "assets/images/golden_egg.png" ]);
    const sounds = await CreateJS.TimeHandler.Preload.sounds([ "assets/audio/footsteps.mp3" ]);

    const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
    let jumping = false;
    if (canvas) {
        const game = new CreateJS(canvas);
        game.init()
            .backgroundColor("black")
            .resizeCanvas(innerWidth, innerHeight);

        const keyboardHandler = new CreateJS.KeyboardEvent.Handler();
        keyboardHandler.handle(fps);
        const force = new CreateJS.Vec2();
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyW, () => {
            jumping = true;
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.Space, () => {
            jumping = true;
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyA, () => {
            force.x = -1;
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyD, () => {
            force.x = 1;
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowLeft, () => {
            
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowRight, () => {

        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyV, () => {
            sounds["assets/audio/footsteps.mp3"].volume = 1;
            const clonedSound = sounds["assets/audio/footsteps.mp3"].cloneNode(true) as HTMLAudioElement;
            clonedSound.play();
        }, { type: "press" });

        const mouseHandler = new CreateJS.MouseEvent.Handler<HTMLElement>();
        mouseHandler.handle(fps);
        mouseHandler.bind(document.querySelector("#dragable-box") as HTMLElement);
        // mouseHandler.bind(rectPB);
        mouseHandler.register(CreateJS.MouseEvent.Type.Click, ( binded, target, event ) => {

        });
        mouseHandler.register(CreateJS.MouseEvent.Type.DoubleClick, ( binded, target, event ) => {

        })
        mouseHandler.register(CreateJS.MouseEvent.Type.Drag, CreateJS.Utils.Mouse.DragObject);

        CreateJS.TimeHandler.tick(fps, ( currentTick, dt ) => {
            force.zero();

            game.render();
        });
    }
}
start();