import { CreateJS } from "./createjs.js";
const fps = CreateJS.Math.framesToFPS(60);
const component = new CreateJS.Component("option-menu", "../pages/app_options.html", "../pages/app_options.css");
async function start() {
    const images = await CreateJS.TimeHandler.Preload.images([
        "assets/images/person_idle_left.png",
        "assets/images/person_idle_right.png",
        "assets/images/person_walking_right.png",
        "assets/images/person_walking_left.png",
        "assets/images/golden_egg.png",
        "assets/images/office_background.png",
        "assets/images/concrete_floor.png",
        "assets/images/hallway_green_0.png",
        "assets/images/floor_green.png",
    ]);
    const sounds = await CreateJS.TimeHandler.Preload.sounds(["assets/audio/footsteps.mp3"]);
    const loadedImages = {
        idle_left: new CreateJS.Image(images["assets/images/person_idle_left.png"], false, 32, 64, 1000),
        idle_right: new CreateJS.Image(images["assets/images/person_idle_right.png"], false, 32, 64, 1000),
        walking_left: new CreateJS.Image(images["assets/images/person_walking_left.png"], false, 32, 64, 150),
        walking_right: new CreateJS.Image(images["assets/images/person_walking_right.png"], false, 32, 64, 150),
        workshop: new CreateJS.Image(images["assets/images/office_background.png"], true),
        concrete_floor: new CreateJS.Image(images["assets/images/concrete_floor.png"], true),
        hallway_green_0: new CreateJS.Image(images["assets/images/hallway_green_0.png"], true),
        floor_green: new CreateJS.Image(images["assets/images/floor_green.png"], true),
    };
    const canvas = document.querySelector(".game-area");
    let direction = "right";
    if (canvas) {
        const game = new CreateJS(canvas);
        game.init()
            .backgroundColor(CreateJS.Colors.Black)
            .resizeCanvas(innerWidth, innerHeight);
        const mouseHandler = new CreateJS.MouseEvent.Handler(game);
        const keyboardHandler = new CreateJS.KeyboardEvent.Handler(game);
        component.generate();
        component.setConnectedCallback((component) => {
            mouseHandler.bind(component.component);
        });
        component.setDisconnectedCallback((component) => {
            mouseHandler.unbind(component.component);
        });
        const player = new CreateJS.Sprite(false, loadedImages["idle_" + direction], [new CreateJS.Rect(10, 10, 180, 360)], false, innerWidth / 2, 10, 180, 360);
        game.bind(player, { x: true, y: false });
        const physics = new CreateJS.Physics();
        physics.addBody(player);
        physics.setGravity(new CreateJS.Vec2(0, 500));
        const playerSpeed = 100;
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
        mouseHandler.handle(fps);
        mouseHandler.bind(player);
        mouseHandler.register(CreateJS.MouseEvent.Type.Click, (createJS, objects, event) => {
            if (CreateJS.Utils.Mouse.ClickObject(createJS, event, player, objects)) {
                player.position.set(area.right(), area.bottom());
                player.alignX().alignY();
            }
        });
        mouseHandler.register(CreateJS.MouseEvent.Type.DoubleClick, (createJS, objects, event) => {
            if (CreateJS.Utils.Mouse.DoubleClickObject(createJS, event, player, objects)) {
                player.position.set(0, area.bottom());
                player.alignY();
            }
        });
        mouseHandler.register(CreateJS.MouseEvent.Type.Drag, (createJS, objects, offset, event, initialEvent) => {
            if (component.component) {
                if (CreateJS.Utils.Mouse.DragObject(createJS, initialEvent, component.component, objects)) {
                    component.addOffset(offset);
                }
            }
            if (CreateJS.Utils.Mouse.DragObject(createJS, initialEvent, player, objects)) {
                player.position.add(offset);
                player.velocity.zero();
                player.acceleration.zero();
            }
        });
        const area = new CreateJS.Area(0, game.canvas.height / 2 - 1080 / 4, 1920, 1080 / 2, loadedImages.hallway_green_0, loadedImages.floor_green, 64, 64, 0);
        physics.addAreas(area);
        game.addAreas(area);
        game.addObjects(player);
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
