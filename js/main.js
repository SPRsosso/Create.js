import { CreateJS } from "./createjs.js";
const fps = CreateJS.Math.framesToFPS(60);
async function start() {
    const images = await CreateJS.TimeHandler.Preload.images([
        "assets/images/person_idle_left.png",
        "assets/images/person_idle_right.png",
        "assets/images/person_walking_right.png",
        "assets/images/person_walking_left.png",
        "assets/images/golden_egg.png",
        "assets/images/office_background.png",
        "assets/images/concrete_floor.png",
    ]);
    const sounds = await CreateJS.TimeHandler.Preload.sounds(["assets/audio/footsteps.mp3"]);
    const loadedImages = {
        idle_left: new CreateJS.Image(images["assets/images/person_idle_left.png"], false, 32, 64, 1000),
        idle_right: new CreateJS.Image(images["assets/images/person_idle_right.png"], false, 32, 64, 1000),
        walking_left: new CreateJS.Image(images["assets/images/person_walking_left.png"], false, 32, 64, 150),
        walking_right: new CreateJS.Image(images["assets/images/person_walking_right.png"], false, 32, 64, 150),
        workshop: new CreateJS.Image(images["assets/images/office_background.png"], true),
        concrete_floor: new CreateJS.Image(images["assets/images/concrete_floor.png"])
    };
    const canvas = document.querySelector(".game-area");
    let jumping = false;
    let direction = "right";
    if (canvas) {
        const player = new CreateJS.Sprite(false, loadedImages["idle_" + direction], [new CreateJS.Rect(10, 10, 50, 100)], false, innerWidth / 2, 10, 100, 200);
        const game = new CreateJS(canvas, "main");
        game.init()
            .backgroundColor(CreateJS.Colors.Black)
            .resizeCanvas(innerWidth, innerHeight)
            .bind(player);
        const physics = new CreateJS.Physics();
        const platform = new CreateJS.Physics.Rigidbody(true, new CreateJS.Rect(0, innerHeight - 100, innerWidth, 100));
        const badBlock = new CreateJS.Physics.Rigidbody(true, new CreateJS.Rect(innerWidth / 2 + 1, 30, 50, 50));
        const badBlock2 = new CreateJS.Physics.Rigidbody(true, new CreateJS.Rect(innerWidth / 2 + 1, innerHeight - 150, 50, 50));
        badBlock.fillColor(CreateJS.Colors.Red).fill();
        badBlock2.fillColor(CreateJS.Colors.Red).fill();
        platform.fillColor(CreateJS.Colors.White).fill();
        const bodies = [];
        for (let i = 0; i < 5; i++) {
            const x = CreateJS.Math.random(0, innerWidth - 100);
            const y = CreateJS.Math.random(-100, 0);
            const body = new CreateJS.Physics.Rigidbody(false, new CreateJS.Rect(x, y, 50, 50));
            body.fillColor(CreateJS.Colors.FromHSLA(CreateJS.Math.random(0, 255), CreateJS.Math.random(50, 100), 50));
            body.fill();
            bodies.push(body);
        }
        physics.addBody(player, platform, ...bodies, badBlock, badBlock2);
        physics.setGravity(new CreateJS.Vec2(0, 500));
        const playerSpeed = 100;
        const keyboardHandler = new CreateJS.KeyboardEvent.Handler();
        keyboardHandler.handle(fps);
        let velocity = 0;
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyA, () => {
            velocity = -playerSpeed;
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyD, () => {
            velocity = playerSpeed;
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyW, () => {
            physics.applyJumpTo(player, 50, (current, other) => other.isStatic ? current.isOnTopOf(other) : false);
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
        const area = new CreateJS.Area(0, game.canvas.height / 2 - game.canvas.height / 4, 1920, game.canvas.height / 2, loadedImages.workshop, loadedImages.concrete_floor, 0, 0, 300);
        game.addObjects(platform, ...bodies, badBlock, badBlock2, player);
        game.addAreas();
        CreateJS.TimeHandler.tick(fps, (currentTick, dt) => {
            player.velocity.set(velocity, player.velocity.y);
            let newDir = direction;
            if (velocity < 0)
                newDir = "left";
            if (velocity > 0)
                newDir = "right";
            if (velocity !== 0)
                player.setImage(loadedImages[`walking_${newDir}`]);
            if (velocity === 0)
                player.setImage(loadedImages[`idle_${newDir}`]);
            direction = newDir;
            physics.update(dt);
            velocity = 0;
            game.render();
        });
    }
}
start();
