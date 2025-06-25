import { CreateJS } from "./createjs.js";
const fps = CreateJS.Math.framesToFPS(60);
async function start() {
    const images = await CreateJS.TimeHandler.Preload.images(["assets/images/person_idle_left.png", "assets/images/golden_egg.png"]);
    const sounds = await CreateJS.TimeHandler.Preload.sounds(["assets/audio/footsteps.mp3"]);
    const canvas = document.querySelector(".game-area");
    let jumping = false;
    if (canvas) {
        const player = new CreateJS.Sprite(false, new CreateJS.Image(images["assets/images/person_idle_left.png"], false, 32, 64, 1000), [new CreateJS.Rect(10, 10, 50, 100)], false, innerWidth / 2, 10, 50, 100);
        const game = new CreateJS(canvas, "main");
        game.init()
            .backgroundColor(CreateJS.Colors.Black)
            .resizeCanvas(innerWidth, innerHeight)
            .bind(player);
        const physics = new CreateJS.Physics();
        const platform = new CreateJS.Physics.Rigidbody(true, new CreateJS.Rect(0, innerHeight - 100, innerWidth, 100));
        const badBlock = new CreateJS.Physics.Rigidbody(true, new CreateJS.Rect(innerWidth / 2 + 1, 30, 50, 50));
        badBlock.fillColor(CreateJS.Colors.Red).fill();
        platform.fillColor(CreateJS.Colors.White).fill();
        const bodies = [];
        for (let i = 0; i < 10; i++) {
            const x = CreateJS.Math.random(0, innerWidth - 100);
            const y = CreateJS.Math.random(0, 500);
            const body = new CreateJS.Physics.Rigidbody(false, new CreateJS.Rect(x, y, 50, 50));
            body.fillColor(CreateJS.Colors.FromHSLA(CreateJS.Math.random(0, 255), CreateJS.Math.random(50, 100), 50));
            body.fill();
            bodies.push(body);
        }
        physics.addBody(player, platform, ...bodies, badBlock).setGravity(new CreateJS.Vec2(0, 50));
        const playerSpeed = 50;
        const keyboardHandler = new CreateJS.KeyboardEvent.Handler();
        keyboardHandler.handle(fps);
        let velocity = 0;
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyA, () => {
            velocity = -playerSpeed;
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyD, () => {
            velocity = playerSpeed;
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyV, () => {
            sounds["assets/audio/footsteps.mp3"].volume = 1;
            const clonedSound = sounds["assets/audio/footsteps.mp3"].cloneNode(true);
            clonedSound.play();
        }, { type: "press" });
        const mouseHandler = new CreateJS.MouseEvent.Handler();
        mouseHandler.handle(fps);
        mouseHandler.bind(player);
        mouseHandler.register(CreateJS.MouseEvent.Type.Click, (binded, target, event) => {
        });
        mouseHandler.register(CreateJS.MouseEvent.Type.DoubleClick, (binded, target, event) => {
        });
        mouseHandler.register(CreateJS.MouseEvent.Type.Drag, CreateJS.Utils.Mouse.DragObject);
        CreateJS.TimeHandler.tick(fps, (currentTick, dt) => {
            player.velocity.set(velocity, player.velocity.y);
            physics.update(dt);
            velocity = 0;
            game.render(platform, ...bodies, badBlock, player);
        });
    }
}
start();
