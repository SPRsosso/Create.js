export class CreateJS {
    static Vec2 = class {
        constructor(public x: number = 0, public y: number = 0) {}

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

        mul(scalar: number): CreateJS.Vec2;
        mul(vec2: CreateJS.Vec2): CreateJS.Vec2;
        mul(scalar: number | CreateJS.Vec2): CreateJS.Vec2 {
            if (typeof scalar === "object") {
                this.x *= scalar.x;
                this.y *= scalar.y;
            } else if (typeof scalar === "number") {
                this.x *= scalar;
                this.y *= scalar;
            }
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
            if (this.isZero()) {
                throw new Error("Normalized zero vector!");
            }
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

        min(vec2: CreateJS.Vec2): CreateJS.Vec2 {
            this.x = Math.min(this.x, vec2.x);
            this.y = Math.min(this.y, vec2.y);
            return this;
        }

        max(vec2: CreateJS.Vec2): CreateJS.Vec2 {
            this.x = Math.max(this.x, vec2.x);
            this.y = Math.max(this.y, vec2.y);
            return this;
        }

        perpendicular(): CreateJS.Vec2 {
            [ this.x, this.y ] = [ -this.y, this.x ];
            return this;
        }

        scaleTo(length: number): CreateJS.Vec2 {
            this.normalize().mul(length);
            return this;
        }

        rotate(angle_radians: number): CreateJS.Vec2 {
            const x = this.x * Math.cos(angle_radians) - this.y * Math.sin(angle_radians);
            const y = this.x * Math.sin(angle_radians) + this.y * Math.cos(angle_radians);

            this.x = x;
            this.y = y;
            return this;
        }

        reflect(vec2: CreateJS.Vec2): CreateJS.Vec2 {
            const n = vec2.clone().normalize();
            const x = this.x - 2 * this.dot(n) * n.x;
            const y = this.y - 2 * this.dot(n) * n.y;
            
            this.x = x;
            this.y = y;
            return this;
        }

        project(onto: CreateJS.Vec2): CreateJS.Vec2 {
            const vec2 = onto.clone().normalize();
            const dot = this.dot(vec2);
            this.x = dot * vec2.x;
            this.y = dot * vec2.y;
            return this;
        }

        cross(vec2: CreateJS.Vec2): number {
            return this.x * vec2.y - this.y * vec2.x;
        }

        angleTo(vec2: CreateJS.Vec2): number {
            return Math.acos( this.dot(vec2) / ( this.length() * vec2.length() ) );
        }

        angle(): number {
            return Math.atan2(this.y, this.x);
        }

        abs(): CreateJS.Vec2 {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            return this;
        }

        floor(decimalPlace: number = 0): CreateJS.Vec2 {
            this.x = Math.floor(this.x * 10 ** decimalPlace) / 10 ** decimalPlace;
            this.y = Math.floor(this.y * 10 ** decimalPlace) / 10 ** decimalPlace;
            return this;
        }

        ceil(decimalPlace: number = 0): CreateJS.Vec2 {
            this.x = Math.ceil(this.x * 10 ** decimalPlace) / 10 ** decimalPlace;
            this.y = Math.ceil(this.y * 10 ** decimalPlace) / 10 ** decimalPlace;
            return this;
        }

        round(decimalPlace: number = 0): CreateJS.Vec2 {
            this.x = Math.round(this.x * 10 ** decimalPlace) / 10 ** decimalPlace;
            this.y = Math.round(this.y * 10 ** decimalPlace) / 10 ** decimalPlace;
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

        vectorTo(vec2: CreateJS.Vec2): CreateJS.Vec2 {
            return vec2.clone().sub(this);
        }

        set(x: number, y: number): CreateJS.Vec2;
        set(vec2: CreateJS.Vec2): CreateJS.Vec2;
        set(x: number | CreateJS.Vec2, y?: number): CreateJS.Vec2 {
            if (typeof x === 'object' && x !== null && 'x' in x && 'y' in x) {
                this.x = x.x;
                this.y = x.y;
            } else if (typeof x === 'number' && typeof y === 'number') {
                this.x = x;
                this.y = y;
            }
            return this;
        }

        up(): CreateJS.Vec2 {
            this.set(0, 1);
            return this;
        }

        down(): CreateJS.Vec2 {
            this.set(0, -1);
            return this;
        }

        left(): CreateJS.Vec2 {
            this.set(-1, 0);
            return this;
        }

        right(): CreateJS.Vec2 {
            this.set(1, 0);
            return this;
        }

        zero(): CreateJS.Vec2 {
            this.set(0, 0);
            return this;
        }

        toArray(): number[] {
            return [ this.x, this.y ];
        }

        toString(): string {
            return `x: ${this.x}, y: ${this.y}`;
        }

        toLine(startX: number = 0, startY: number = 0): CreateJS.Line {
            return new CreateJS.Line(startX, startY, startX + this.x, startY + this.y);
        }

        static fromArray(arr: number[]): CreateJS.Vec2 {
            return new CreateJS.Vec2(arr[0], arr[1]);
        }
    }

    static Math = class {
        static degToRad(degrees: number): number {
            return degrees * Math.PI / 180;
        }

        static radToDeg(radians: number): number {
            return radians * 180 / Math.PI;
        }
    }

    static KeyboardEvent = class {
        static Key = {
            KeyA: "KeyA",
            KeyB: "KeyB",
            KeyC: "KeyC",
            KeyD: "KeyD",
            KeyE: "KeyE",
            KeyF: "KeyF",
            KeyG: "KeyG",
            KeyH: "KeyH",
            KeyI: "KeyI",
            KeyJ: "KeyJ",
            KeyK: "KeyK",
            KeyL: "KeyL",
            KeyM: "KeyM",
            KeyN: "KeyN",
            KeyO: "KeyO",
            KeyP: "KeyP",
            KeyQ: "KeyQ",
            KeyR: "KeyR",
            KeyS: "KeyS",
            KeyT: "KeyT",
            KeyU: "KeyU",
            KeyV: "KeyV",
            KeyW: "KeyW",
            KeyX: "KeyX",
            KeyY: "KeyY",
            KeyZ: "KeyZ",

            Digit0: "Digit0",
            Digit1: "Digit1",
            Digit2: "Digit2",
            Digit3: "Digit3",
            Digit4: "Digit4",
            Digit5: "Digit5",
            Digit6: "Digit6",
            Digit7: "Digit7",
            Digit8: "Digit8",
            Digit9: "Digit9",

            F1: "F1",
            F2: "F2",
            F3: "F3",
            F4: "F4",
            F5: "F5",
            F6: "F6",
            F7: "F7",
            F8: "F8",
            F9: "F9",
            F10: "F10",
            F11: "F11",
            F12: "F12",

            Escape: "Escape",
            Tab: "Tab",
            CapsLock: "CapsLock",
            ShiftLeft: "ShiftLeft",
            ShiftRight: "ShiftRight",
            ControlLeft: "ControlLeft",
            ControlRight: "ControlRight",
            AltLeft: "AltLeft",
            AltRight: "AltRight",
            MetaLeft: "MetaLeft",
            MetaRight: "MetaRight",
            Enter: "Enter",
            Backspace: "Backspace",
            Space: "Space",

            ArrowUp: "ArrowUp",
            ArrowDown: "ArrowDown",
            ArrowLeft: "ArrowLeft",
            ArrowRight: "ArrowRight",
            Home: "Home",
            End: "End",
            PageUp: "PageUp",
            PageDown: "PageDown",

            Insert: "Insert",
            Delete: "Delete",

            Numpad0: "Numpad0",
            Numpad1: "Numpad1",
            Numpad2: "Numpad2",
            Numpad3: "Numpad3",
            Numpad4: "Numpad4",
            Numpad5: "Numpad5",
            Numpad6: "Numpad6",
            Numpad7: "Numpad7",
            Numpad8: "Numpad8",
            Numpad9: "Numpad9",
            NumpadAdd: "NumpadAdd",
            NumpadSubtract: "NumpadSubtract",
            NumpadMultiply: "NumpadMultiply",
            NumpadDivide: "NumpadDivide",
            NumpadDecimal: "NumpadDecimal",
            NumpadEnter: "NumpadEnter",

            Minus: "Minus",
            Equal: "Equal",
            BracketLeft: "BracketLeft",
            BracketRight: "BracketRight",
            Backslash: "Backslash",
            Semicolon: "Semicolon",
            Quote: "Quote",
            Backquote: "Backquote",
            Comma: "Comma",
            Period: "Period",
            Slash: "Slash",

            PrintScreen: "PrintScreen",
            ScrollLock: "ScrollLock",
            Pause: "Pause",
            ContextMenu: "ContextMenu",
        };

        static Handler = class {
            private heldKeys: Set<string> = new Set();
            private callbacks: Map<string, () => void> = new Map();
            private _unhandle: boolean = false;

            constructor() {
                addEventListener("keydown", ( event ) => {
                    this.heldKeys.add(event.code);
                });

                addEventListener("keyup", ( event ) => {
                    this.heldKeys.delete(event.code);
                });
            }

            async handle(fps: number): Promise<void> {
                while (true) {
                    if (this._unhandle) {
                        this._unhandle = false;
                        return;
                    }

                    for (let key of this.heldKeys) {
                        if (this.callbacks.has(key)) {
                            this.callbacks.get(key)!();
                        }
                    }

                    await CreateJS.TimeHandler.wait(fps);
                }
            }

            unhandle(): void {
                this._unhandle = true;
            }

            register(key: Key, callback: () => void) {
                this.callbacks.set(key, callback);
            }

            unregister(key: Key) {
                this.callbacks.delete(key);
            }
        }
    }

    static Physics = class {

    }

    static Line = class {
        private _width: number = 1;
        private _color: string = "white";
        constructor(public x1: number, public y1: number, public x2: number, public y2: number) {}

        width(width: number): CreateJS.Line {
            this._width = width;
            return this;
        }

        color(color: string): CreateJS.Line {
            this._color = color;
            return this;
        }

        draw(c: CanvasRenderingContext2D): void {
            c.beginPath();
            c.lineWidth = this._width;
            c.strokeStyle = this._color;
            c.moveTo(this.x1, this.y1);
            c.lineTo(this.x2, this.y2);
            c.stroke();
            c.closePath();
        }

        toVec2(): CreateJS.Vec2 {
            return new CreateJS.Vec2(this.x2 - this.x1, this.y2 - this.y1);
        }
    }

    static Shape = class {
        static Anchors = {
            TopLeft: "TopLeft",
            TopRight: "TopRight",
            BottomRight: "BottomRight",
            BottomLeft: "BottomLeft"
        }

        protected _fillColor: string = "white";
        protected _strokeColor: string = "white";
        protected _strokeWidth: number = 0;
        protected _fill: boolean = false;
        protected _stroke: boolean = false;

        position: CreateJS.Vec2;

        constructor(x: number, y: number) {
            this.position = new CreateJS.Vec2(x, y);
        }

        fill(): typeof this {
            this._fill = !this._fill;
            return this;
        }

        stroke(): typeof this {
            this._stroke = !this._stroke;
            return this;
        }

        strokeWidth(strokeWidth: number): typeof this {
            this._strokeWidth = strokeWidth;

            return this;
        }

        strokeColor(strokeColor: string): typeof this {
            this._strokeColor = strokeColor;
            return this;
        }

        fillColor(fillColor: string): typeof this {
            this._fillColor = fillColor;

            return this;
        }

        get x() {
            return this.position.x;
        }

        get y() {
            return this.position.y;
        }

        draw(c: CanvasRenderingContext2D): void {
            throw new Error("Function not implemented");
        }
    }

    static ConvexPolygon = class extends CreateJS.Shape {
        points: CreateJS.Vec2[] = [];
        
        constructor(x: number, y: number, ...args: CreateJS.Vec2[]) {
            super(x, y);
            this.points = args;
        }

        draw(c: CanvasRenderingContext2D) {
            c.beginPath();
            c.moveTo(this.x, this.y);
            for (let i = 0; i < this.points.length; i++) {
                const pointPosition = this.position.clone().add(this.points[i]);
                c.lineTo(pointPosition.x, pointPosition.y);
            }
            c.closePath();
            c.fillStyle = this._fillColor;
            c.strokeStyle = this._strokeColor;
            if (this._fill) c.fill();
            if (this._stroke) c.stroke();
        }
    }

    static Rect = class extends CreateJS.Shape {
        size: CreateJS.Vec2;

        constructor(x: number, y: number, w: number, h: number) {
            super(x, y);
            this.size = new CreateJS.Vec2(w, h);
        }

        draw(c: CanvasRenderingContext2D): void {
            c.beginPath();
            c.strokeStyle = this._strokeColor;
            c.fillStyle = this._fillColor;
            c.lineWidth = this._strokeWidth;
            c.rect(this.x, this.y, this.w, this.h);
            if (this._fill) c.fill();
            if (this._stroke) c.stroke();
            c.closePath();
        }

        get w() {
            return this.size.x;
        }

        get h() {
            return this.size.y;
        }

        alignTo(thisAnchor: Anchor, rect: CreateJS.Rect, toAnchor: Anchor): CreateJS.Rect {
            let point = new CreateJS.Vec2();
            switch(thisAnchor) {
                case CreateJS.Shape.Anchors.TopRight:
                    point.set(this.size.x, 0);
                    break;
                case CreateJS.Shape.Anchors.BottomRight:
                    point.set(this.size);
                    break;
                case CreateJS.Shape.Anchors.BottomLeft:
                    point.set(0, this.size.y);
                    break;
            }

            let position = new CreateJS.Vec2();
            switch(toAnchor) {
                case CreateJS.Shape.Anchors.TopLeft:
                    position.set(rect.topLeft());
                    break;
                case CreateJS.Shape.Anchors.TopRight:
                    position.set(rect.topRight());
                    break;
                case CreateJS.Shape.Anchors.BottomRight:
                    position.set(rect.bottomRight());
                    break;
                case CreateJS.Shape.Anchors.BottomLeft:
                    position.set(rect.bottomLeft());
                    break;
            }

            this.position.set(position).sub(point);
            
            return this;
        }

        anchorAt(vec2: CreateJS.Vec2, anchor: Anchor): CreateJS.Rect {
            this.position.set(vec2);
            switch(anchor) {
                case CreateJS.Shape.Anchors.TopRight:
                    this.position.sub(new CreateJS.Vec2(this.size.x, 0));
                    break;
                case CreateJS.Shape.Anchors.BottomRight:
                    this.position.sub(this.size);
                    break;
                case CreateJS.Shape.Anchors.BottomLeft:
                    this.position.sub(new CreateJS.Vec2(0, this.size.y));
                    break;
            }

            return this;
        }

        translate(dx: number, dy: number): CreateJS.Rect {
            this.position.add(new CreateJS.Vec2(dx, dy));
            return this;
        }

        scale(scalar: number): CreateJS.Rect;
        scale(wFactor: number, hFactor: number): CreateJS.Rect;
        scale(wFactor: number, hFactor?: number): CreateJS.Rect {
            if (hFactor === undefined) {
                this.size.mul(wFactor);
                return this;
            } else {
                this.size.x *= wFactor;
                this.size.y *= hFactor;
                return this;
            }
        }

        scaleFrom(origin: CreateJS.Vec2, scalar: number): CreateJS.Rect;
        scaleFrom(origin: CreateJS.Vec2, wFactor: number, hFactor: number): CreateJS.Rect;
        scaleFrom(origin: CreateJS.Vec2, wFactor: number, hFactor?: number): CreateJS.Rect {
            const offset = this.position.clone().sub(origin);
            
            if (hFactor === undefined) {
                const scaledOffset = offset.mul(wFactor);
                this.size.mul(wFactor);
                this.position = origin.clone().add(scaledOffset);

                return this;
            } else {
                const scaledOffset = offset.mul(new CreateJS.Vec2(wFactor, hFactor));
                this.size.mul(new CreateJS.Vec2(wFactor, hFactor));

                this.position = origin.clone().add(scaledOffset);
                return this;
            }
        }

        containsPoint(point: CreateJS.Vec2): boolean {
            return (
                point.x >= this.position.x &&
                point.x <= this.position.x + this.size.x &&
                point.y >= this.position.y &&
                point.y <= this.position.y + this.size.y
            );
        }

        contains(rect: CreateJS.Rect): boolean {
            return (
                this.containsPoint(rect.topLeft()) &&
                this.containsPoint(rect.topRight()) &&
                this.containsPoint(rect.bottomRight()) &&
                this.containsPoint(rect.bottomLeft())
            );
        }

        aspectRatio(): number {
            return this.w / this.h;
        }

        area(): number {
            return this.w * this.h;
        }

        topLeft(): CreateJS.Vec2 {
            return this.position.clone();
        }

        topRight(): CreateJS.Vec2 {
            return this.position.clone().add(new CreateJS.Vec2(this.size.x, 0));
        }

        bottomRight(): CreateJS.Vec2 {
            return this.position.clone().add(this.size);
        }

        bottomLeft(): CreateJS.Vec2 {
            return this.position.clone().add(new CreateJS.Vec2(0, this.size.y));
        }

        center(): CreateJS.Vec2 {
            return this.position.clone().add(this.size.clone().div(2));
        }

        toBounds(): { x: number, y: number, w: number, h: number } {
            return {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h
            };
        }

        toPolygon(): CreateJS.Vec2[] {
            return [
                this.topLeft().clone().sub(this.position),
                this.topRight().clone().sub(this.position),
                this.bottomRight().clone().sub(this.position),
                this.bottomLeft().clone().sub(this.position)
            ]
        }

        static fromCenter(center: CreateJS.Vec2, size: number): CreateJS.Rect {
            const rectSize = new CreateJS.Vec2(size, size);
            const pos = center.clone().sub(rectSize.div(2));
            return new CreateJS.Rect(pos.x, pos.y, size, size);
        }

        static fromPoints(point1: CreateJS.Vec2, point2: CreateJS.Vec2): CreateJS.Rect {
            const size = point1.vectorTo(point2);

            return new CreateJS.Rect(point1.x, point1.y, size.x, size.y);
        }
    }

    static TimeHandler = class {
        private static timeBefore: number = 0;
        private static _stop: boolean = false;
        private static _pause: boolean = false;

        static wait(ms: number): Promise<void> {
            return new Promise(( resolve, reject ) => {
                setTimeout(() => {
                    resolve();
                }, ms);
            });
        }

        static async tick(fps: number, callback: ( currentTick: number, dt: number ) => number | void): Promise<void> {
            let tick = 0;
            CreateJS.TimeHandler.timeBefore = performance.now();
            while(true) {
                if (CreateJS.TimeHandler._stop) {
                    CreateJS.TimeHandler._stop = false;
                    break;
                }

                if (CreateJS.TimeHandler._pause) {
                    await CreateJS.TimeHandler.wait(fps);
                    continue;
                }

                const dt = (performance.now() - CreateJS.TimeHandler.timeBefore) / fps;
                CreateJS.TimeHandler.timeBefore = performance.now();

                const callbackReturn = callback(++tick, dt);
                if (callbackReturn !== undefined) {
                    tick = callbackReturn;
                }

                await CreateJS.TimeHandler.wait(fps);
            }
        }

        static stop(): void {
            CreateJS.TimeHandler.timeBefore = 0;
            CreateJS.TimeHandler._stop = true;
        }

        static pause(): void {
            CreateJS.TimeHandler._pause = true;
        }

        static resume(): void {
            CreateJS.TimeHandler._pause = false;
        }
    }

    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
    private _backgroundColor: string = "white";

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.c = canvas.getContext("2d")!;
    }

    init(): CreateJS {
        document.body.style.cssText = `
            margin: 0;
            overflow: hidden;
        `;

        return this;
    }

    resizeCanvas(x: number, y: number): CreateJS {
        this.canvas.width = x;
        this.canvas.height = y;

        return this;
    }

    backgroundColor(color: string): CreateJS {
        this._backgroundColor = color;

        return this;
    }

    run(objects?: (CreateJS.Shape | CreateJS.Line | CreateJS.ConvexPolygon)[]): void {
        this.c.fillStyle = this._backgroundColor;
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (objects) {
            objects.forEach(object => {
                object.draw(this.c);
            })
        }
    }
}


export type Key = string;
export type Anchor = string;
export namespace CreateJS {
    export type Shape = InstanceType<typeof CreateJS.Shape>;
    export type Rect = InstanceType<typeof CreateJS.Rect>;
    export type Line = InstanceType<typeof CreateJS.Line>;
    export type ConvexPolygon = InstanceType<typeof CreateJS.ConvexPolygon>;
    export type Vec2 = InstanceType<typeof CreateJS.Vec2>;
    export type KeyboardEvent = InstanceType<typeof CreateJS.KeyboardEvent>;
    export type TimeHandler = InstanceType<typeof CreateJS.TimeHandler>;

    export namespace KeyboardEvent {
        export type Key = typeof CreateJS.KeyboardEvent.Key;
        export type Handler = InstanceType<typeof CreateJS.KeyboardEvent.Handler>;
    }

    export namespace Shape {
        export type Anchors = typeof CreateJS.Shape.Anchors;
    }
}

export default CreateJS;
