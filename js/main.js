import { CreateJS } from "./createjs.js";
const fps = CreateJS.Math.framesToFPS(60);
async function start() {
    const images = await CreateJS.TimeHandler.Preload.images(["assets/images/person_idle_left.png", "assets/images/golden_egg.png"]);
    const sounds = await CreateJS.TimeHandler.Preload.sounds(["assets/audio/footsteps.mp3"]);
    const canvas = document.querySelector(".game-area");
    let jumping = false;
    if (canvas) {
        const game = new CreateJS(canvas);
        game.init()
            .backgroundColor("black")
            .resizeCanvas(innerWidth, innerHeight);
        const platform = CreateJS.ConvexPolygon.createRect(0, innerHeight - 100, innerWidth, 100).fillColor(CreateJS.Colors.White).fill();
        const platformPB = new CreateJS.Physics.Rigidbody(platform);
        platformPB.setInverseMass(0);
        const rect = CreateJS.ConvexPolygon.createRect(100, 100, 100, 200);
        const rectPB = new CreateJS.Sprite(rect);
        rectPB.setMass(10);
        const rigidbodies = [];
        const randomStaticBody = CreateJS.Math.random(0, 15);
        for (let i = 0; i < 15; i++) {
            const randomVec = new CreateJS.Vec2(CreateJS.Math.random(100, innerWidth - 100), CreateJS.Math.random(100, innerHeight - 100));
            const randomColor = CreateJS.Colors.FromHSLA(CreateJS.Math.random(0, 255), CreateJS.Math.random(50, 100), 50);
            const rect = CreateJS.ConvexPolygon.createRect(randomVec.x, randomVec.y, 50, 50).fillColor(randomColor).fill();
            const rectPB = new CreateJS.Physics.Rigidbody(rect);
            rectPB.setMass(100);
            if (i === randomStaticBody)
                rectPB.setInverseMass(0);
            rigidbodies.push(rectPB);
        }
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
            rectPB.rotate(CreateJS.Math.degToRad(-1));
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.ArrowRight, () => {
            rectPB.rotate(CreateJS.Math.degToRad(1));
        });
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyV, () => {
            sounds["assets/audio/footsteps.mp3"].volume = 1;
            const clonedSound = sounds["assets/audio/footsteps.mp3"].cloneNode(true);
            clonedSound.play();
        }, { type: "press" });
        const mouseHandler = new CreateJS.MouseEvent.Handler();
        mouseHandler.handle(fps);
        mouseHandler.bind(document.querySelector("#dragable-box"));
        // mouseHandler.bind(rectPB);
        mouseHandler.register(CreateJS.MouseEvent.Type.Click, (binded, target, event) => {
        });
        mouseHandler.register(CreateJS.MouseEvent.Type.DoubleClick, (binded, target, event) => {
        });
        mouseHandler.register(CreateJS.MouseEvent.Type.Drag, CreateJS.Utils.Mouse.DragObject);
        const goldenEggRect = CreateJS.ConvexPolygon.createRect(800, 100, 50, 50);
        const goldenEgg = new CreateJS.Sprite(goldenEggRect).setImage(new CreateJS.Image(images["assets/images/golden_egg.png"]));
        goldenEgg.setMass(10);
        const img = new CreateJS.Image(images["assets/images/person_idle_left.png"], false, 32, 64, 1000);
        rectPB.setImage(img);
        const physics = new CreateJS.Physics(fps);
        physics.addBody(rectPB, platformPB, goldenEgg, ...rigidbodies);
        physics.setGravity(new CreateJS.Vec2(0, 20));
        CreateJS.TimeHandler.tick(fps, (currentTick, dt) => {
            force.zero();
            physics.update(dt);
            const boundingBox = rectPB.getBoundingBox().strokeColor(CreateJS.Colors.Yellow).stroke();
            const points = boundingBox.getVerticesPositions().map(p => p.toPoint().fillColor(CreateJS.Colors.Red).size(4).fill());
            points[0].fillColor(CreateJS.Colors.Yellow);
            if (jumping) {
                physics.applyJumpTo(rectPB, 25, (current, other) => {
                    return current.isOnTopOf(other);
                });
                jumping = false;
            }
            game.render(rectPB, ...rigidbodies, platformPB, boundingBox, ...points, goldenEgg);
        });
    }
}
start();
