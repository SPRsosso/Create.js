import { CreateJS } from "./createjs.js";

const frames = 60;
const fps = 1000 / frames;

async function start() {
    const assets = await CreateJS.TimeHandler.Preload.images([ "assets/images/person_idle_left.png" ]);

    const canvas = document.querySelector<HTMLCanvasElement>(".game-area");
    if (canvas) {
        const game = new CreateJS(canvas);
        game.init()
            .backgroundColor("black")
            .resizeCanvas(innerWidth, innerHeight);

        const platform = CreateJS.ConvexPolygon.createRect(0, innerHeight - 100, innerWidth, 100).fillColor(CreateJS.Colors.White).fill();
        const platformPB = new CreateJS.Physics.Rigidbody(true, platform);

        const rect = CreateJS.ConvexPolygon.createRect(100, 100, 100, 200).fillColor(CreateJS.Colors.SkyBlue).fill();
        const rectPB = new CreateJS.Sprite(false, rect);
        rectPB.setMass(10).setElasticity(0);
        

        const rigidbodies: CreateJS.Physics.Rigidbody[] = [];
        const randomBody = CreateJS.Math.random(0, 15);
        for (let i = 0; i < 15; i++) {
            const randomVec = new CreateJS.Vec2(CreateJS.Math.random(100, innerWidth - 100), CreateJS.Math.random(100, innerHeight - 100));
            const randomColor = CreateJS.Colors.FromHSLA(CreateJS.Math.random(0, 255), CreateJS.Math.random(50, 100), 50);

            const rect = CreateJS.ConvexPolygon.createRect(randomVec.x, randomVec.y, 75, 75).fillColor(randomColor).fill();
            const rectPB = new CreateJS.Physics.Rigidbody(i === randomBody, rect);
            rectPB.setMass(100);
            rigidbodies.push(rectPB);
        }

        const physics = new CreateJS.Physics();
        physics.addBody(rectPB, ...rigidbodies, platformPB);
        physics.setGravity(1);

        const keyboardHandler = new CreateJS.KeyboardEvent.Handler();
        keyboardHandler.handle(fps);
        const force = new CreateJS.Vec2();
        keyboardHandler.register(CreateJS.KeyboardEvent.Key.KeyW, () => {
            physics.applyJumpTo(rectPB, 5, (current, other) => current.isOnTopOf(other));
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

        const img = new CreateJS.Image(assets["assets/images/person_idle_left.png"], 32, 64, 1000);
        rectPB.setImage(img);

        CreateJS.TimeHandler.tick(fps, ( currentTick, dt ) => {
            const newForce = force.isZero() ? new CreateJS.Vec2() : force.clone().normalize().mul(new CreateJS.Vec2(4, rectPB.mass * 7));
            rectPB.applyForce(newForce);
            
            force.zero();
            
            physics.update(dt);

            const boundingBox = rectPB.getBoundingBox().strokeColor(CreateJS.Colors.Yellow).stroke();

            const points = boundingBox.getVerticesPositions().map(p => p.toPoint().fillColor(CreateJS.Colors.Red).size(4).fill());
            points[0].fillColor(CreateJS.Colors.Yellow);

            game.render(rectPB, ...rigidbodies, platformPB, boundingBox, ...points);
        });
    }
}
start();