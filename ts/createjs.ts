export class CreateJS {
    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
    private bgColor: string = "white";

    static Shape = class {
        protected fillColor: string = "white";
        protected strokeColor: string = "white";
        protected _strokeWidth: number = 0;
        
        public update: () => void = () => {
            
        };

        constructor(public x: number, public y: number) {}

        draw(c: CanvasRenderingContext2D) {
            throw new Error("draw() not implemented");
        }

        strokeWidth(strokeWidth: number): CreateJS.Shape {
            this._strokeWidth = strokeWidth;

            return this;
        }

        stroke(strokeColor: string): CreateJS.Shape {
            this.strokeColor = strokeColor;
            return this;
        }

        fill(fillColor: string): CreateJS.Shape {
            this.fillColor = fillColor;

            return this;
        }
    }

    static Rect = class extends CreateJS.Shape {
        constructor(x: number, y: number, public w: number, public h: number) {
            super(x, y);
        }

        draw(c: CanvasRenderingContext2D) {
            c.beginPath();
            c.strokeStyle = this.strokeColor;
            c.fillStyle = this.fillColor;
            c.lineWidth = this._strokeWidth;
            c.rect(this.x, this.y, this.w, this.h);
            c.stroke();
            c.fill();
            c.closePath();
        }
    }

    static Vec2 = class {
        constructor(public x: number, public y: number) {}

        add(vec: CreateJS.Vec2): CreateJS.Vec2 {
            this.x += vec.x;
            this.y += vec.y;
            return this;
        }

        sub(vec: CreateJS.Vec2): CreateJS.Vec2 {
            this.x -= vec.x;
            this.y -= vec.y;
            return this;
        }

        mul(scalar: number): CreateJS.Vec2 {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        }
        
        div(scalar: number): CreateJS.Vec2 {
            this.x /= scalar;
            this.y /= scalar;
            return this;
        }

        negate(): CreateJS.Vec2 {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }

        normalize(): CreateJS.Vec2 {
            const length = this.length();
            this.x /= length;
            this.y /= length;
            return this;
        }

        dot(vec2: CreateJS.Vec2): number {
            return this.x * vec2.x + this.y * vec2.y;
        }

        lerp(vec2: CreateJS.Vec2, t: number): CreateJS.Vec2 {
            this.x = this.x * (1 - t) + vec2.x * t;
            this.y = this.y * (1 - t) + vec2.y * t;

            return this;
        }

        clamp(minVec: CreateJS.Vec2, maxVec: CreateJS.Vec2): CreateJS.Vec2 {
            this.x = this.x < minVec.x ? minVec.x : (this.x > maxVec.x ? maxVec.x : this.x);
            this.y = this.y < minVec.y ? minVec.y : (this.y > maxVec.y ? maxVec.y : this.y);
            return this;
        }

        length(): number {
            return Math.sqrt(this.x ** 2 + this.y ** 2);
        }

        clone(): CreateJS.Vec2 {
            return new CreateJS.Vec2(this.x, this.y);
        }

        isZero(): boolean {
            return this.x === 0 && this.y === 0;
        }

        equals(vec: CreateJS.Vec2): boolean {
            return this.x === vec.x && this.y === vec.y;
        }

        distanceTo(vec2: CreateJS.Vec2): number {
            return Math.sqrt((vec2.x - this.x) ** 2 + (vec2.y - this.y) ** 2);
        }

        toArray(): number[] {
            return [ this.x, this.y ];
        }

        toString(): string {
            return `x: ${this.x}, y: ${this.y}`;
        }

        static fromArray(arr: number[]): CreateJS.Vec2 {
            return new CreateJS.Vec2(arr[0], arr[1]);
        }
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.c = canvas.getContext("2d")!;
    }

    resize(x: number, y: number) {
        this.canvas.width = x;
        this.canvas.height = y;
    }

    background(color: string) {
        this.bgColor = color;
    }

    run(objects?: CreateJS.Shape[]) {
        this.c.fillStyle = this.bgColor;
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (objects) {
            objects.forEach(object => {
                object.draw(this.c);
            })
        }
    }
}

export namespace CreateJS {
    export type Shape = InstanceType<typeof CreateJS.Shape>;
    export type Rect = InstanceType<typeof CreateJS.Rect>;
    export type Vec2 = InstanceType<typeof CreateJS.Vec2>;
}

export default CreateJS;
