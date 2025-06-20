import { CreateJS } from "./createjs.js";

const frames = 60;
const fps = 1000 / frames;

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

        const platform = CreateJS.ConvexPolygon.createRect(0, innerHeight - 100, innerWidth, 100).fillColor(CreateJS.Colors.White).fill();
        const platformPB = new CreateJS.Physics.Rigidbody(true, platform);

        const rect = CreateJS.ConvexPolygon.createRect(100, 100, 100, 200);
        const rectPB = new CreateJS.Sprite(false, rect);
        rectPB.setMass(10).setElasticity(0).setFriction(0.9);

        const rigidbodies: CreateJS.Physics.Rigidbody[] = [];
        const randomBody = CreateJS.Math.random(0, 15);
        for (let i = 0; i < 15; i++) {
            const randomVec = new CreateJS.Vec2(CreateJS.Math.random(100, innerWidth - 100), CreateJS.Math.random(100, innerHeight - 100));
            const randomColor = CreateJS.Colors.FromHSLA(CreateJS.Math.random(0, 255), CreateJS.Math.random(50, 100), 50);

            const rect = CreateJS.ConvexPolygon.createRect(randomVec.x, randomVec.y, 50, 50).fillColor(randomColor).fill();
            const rectPB = new CreateJS.Physics.Rigidbody(i === randomBody, rect);
            rectPB.setMass(100).setElasticity(0);
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

        const goldenEggRect = CreateJS.ConvexPolygon.createRect(800, 100, 50, 50);
        const goldenEgg = new CreateJS.Sprite(false, goldenEggRect).setImage(new CreateJS.Image(images["assets/images/golden_egg.png"]));
        goldenEgg.setMass(10).setElasticity(0);

        const img = new CreateJS.Image(images["assets/images/person_idle_left.png"], false, 32, 64, 1000);
        rectPB.setImage(img);

        const physics = new CreateJS.Physics();
        physics.addBody(rectPB, platformPB, goldenEgg, ...rigidbodies);
        physics.setGravity(1);

        CreateJS.TimeHandler.tick(fps, ( currentTick, dt ) => {
            const newForce = force.isZero() ? new CreateJS.Vec2() : force.clone().normalize().mul(new CreateJS.Vec2(4, rectPB.mass * 7));
            rectPB.applyForce(newForce);
            
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