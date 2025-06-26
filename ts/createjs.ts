type CallbackMap<T = any> = {
    Drag: (bindedObject: T | undefined, target: EventTarget | null, offset: CreateJS.Vec2, event: MouseEvent, initialEvent: MouseEvent, initialBinded: T | undefined) => void;
    Click: (bindedObject: T | undefined, target: EventTarget | null, event: MouseEvent) => void;
    DoubleClick: (bindedObject: T | undefined, target: EventTarget | null, event: MouseEvent) => void;
};

type Callback<T = any> = {
    [K in keyof CallbackMap<T>]: {
        type: K;
        callback: CallbackMap<T>[K];
    };
}[keyof CallbackMap<T>];

function deepCloneObject(obj: any): any {
    if (obj === null || typeof obj !== 'object') return obj;

    if (obj instanceof Date) return new Date(obj);

    if (Array.isArray(obj)) {
        return obj.map(deepCloneObject);
    }

    const clone = Object.create(Object.getPrototypeOf(obj));
    for (const key of Reflect.ownKeys(obj)) {
        clone[key] = deepCloneObject(obj[key]);
    }
    return clone;
}

export class CreateJS {
    static Vec2 = class Vec2 {
        constructor(public x: number = 0, public y: number = 0) {}

        add(scalar: number): CreateJS.Vec2;
        add(vec2: CreateJS.Vec2): CreateJS.Vec2;
        add(vec2: CreateJS.Vec2 | number): CreateJS.Vec2 {
            if (typeof vec2 === "number") {
                this.x += vec2;
                this.y += vec2;
                return this;
            }
            
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        }

        sub(scalar: number): CreateJS.Vec2;
        sub(vec2: CreateJS.Vec2): CreateJS.Vec2;
        sub(vec2: CreateJS.Vec2 | number): CreateJS.Vec2 {
            if (typeof vec2 === "number") {
                this.x -= vec2;
                this.y -= vec2;
                return this;
            }
            
            this.x -= vec2.x;
            this.y -= vec2.y;
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
        
        div(scalar: number): CreateJS.Vec2;
        div(vec2: CreateJS.Vec2): CreateJS.Vec2;
        div(scalar: number | CreateJS.Vec2): CreateJS.Vec2 {
            if (typeof scalar === "object") {
                this.x /= scalar.x;
                this.y /= scalar.y;
            } else if (typeof scalar === "number") {
                this.x /= scalar;
                this.y /= scalar;
            }
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
            this.set(0, -1);
            return this;
        }

        down(): CreateJS.Vec2 {
            this.set(0, 1);
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

        toPoint(): CreateJS.Point {
            return new CreateJS.Point(this.x, this.y);
        }

        static fromArray(arr: number[]): CreateJS.Vec2 {
            return new CreateJS.Vec2(arr[0], arr[1]);
        }
    }

    static Math = class CreateJS_Math {
        static degToRad(degrees: number): number {
            return degrees * Math.PI / 180;
        }

        static radToDeg(radians: number): number {
            return radians * 180 / Math.PI;
        }

        static clamp(num: number, min: number, max: number): number {
            return num < min ? min : (num > max ? max : num);
        }

        static random(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        static framesToFPS(frames: number): number {
            return 1 / frames;
        }
    }

    static Utils = class Utils {
        static Mouse = class Utils_Mouse {
            static DragObject(bindedObject: unknown, target: EventTarget | null, offset: CreateJS.Vec2, event: MouseEvent, initialEvent: MouseEvent, initialBinded: typeof bindedObject) {
                if (
                    typeof bindedObject === "object"
                    && bindedObject instanceof HTMLElement
                ) {
                    const x = (initialBinded as HTMLElement).getBoundingClientRect().left;
                    const y = (initialBinded as HTMLElement).getBoundingClientRect().top;
                    const width = (initialBinded as HTMLElement).getBoundingClientRect().right - x;
                    const height = (initialBinded as HTMLElement).getBoundingClientRect().bottom - y;
                    
                    const rect = new CreateJS.Rect(x, y, width, height);
                    const isMouseOver = rect.containsPoint(new CreateJS.Vec2(initialEvent.clientX, initialEvent.clientY));
                    
                    if (isMouseOver) {
                        const pos = new CreateJS.Vec2(x, y);
                        pos.add(offset);
    
                        bindedObject.style.left = pos.x + "px";
                        bindedObject.style.top = pos.y + "px";
                    }
                }
                if (
                    typeof bindedObject === "object"
                    && bindedObject instanceof CreateJS.Physics.Rigidbody
                ) {
                    const vec = new CreateJS.Vec2(initialEvent.clientX, initialEvent.clientY);
                    if (CreateJS.mainThread) {
                        vec.sub(CreateJS.mainThread.initialOffset);
                    };
                    if ((initialBinded as CreateJS.Physics.Rigidbody).containsPoint(vec)) {
                        bindedObject.position.add(offset);
                        bindedObject.velocity.zero();
                        bindedObject.acceleration.zero();
                    }
                }
            }
        }

        static Keyboard = class Utils_Keyboard {
            static MoveLeft(bindedObject: unknown) {

            }
        }
    }
    
    static Colors = {
        AliceBlue: "aliceblue",
        AntiqueWhite: "antiquewhite",
        Aqua: "aqua",
        Aquamarine: "aquamarine",
        Azure: "azure",
        Beige: "beige",
        Bisque: "bisque",
        Black: "black",
        BlanchedAlmond: "blanchedalmond",
        Blue: "blue",
        BlueViolet: "blueviolet",
        Brown: "brown",
        BurlyWood: "burlywood",
        CadetBlue: "cadetblue",
        Chartreuse: "chartreuse",
        Chocolate: "chocolate",
        Coral: "coral",
        CornflowerBlue: "cornflowerblue",
        Cornsilk: "cornsilk",
        Crimson: "crimson",
        Cyan: "cyan",
        DarkBlue: "darkblue",
        DarkCyan: "darkcyan",
        DarkGoldenRod: "darkgoldenrod",
        DarkGray: "darkgray",
        DarkGreen: "darkgreen",
        DarkKhaki: "darkkhaki",
        DarkMagenta: "darkmagenta",
        DarkOliveGreen: "darkolivegreen",
        DarkOrange: "darkorange",
        DarkOrchid: "darkorchid",
        DarkRed: "darkred",
        DarkSalmon: "darksalmon",
        DarkSeaGreen: "darkseagreen",
        DarkSlateBlue: "darkslateblue",
        DarkSlateGray: "darkslategray",
        DarkTurquoise: "darkturquoise",
        DarkViolet: "darkviolet",
        DeepPink: "deeppink",
        DeepSkyBlue: "deepskyblue",
        DimGray: "dimgray",
        DodgerBlue: "dodgerblue",
        FireBrick: "firebrick",
        FloralWhite: "floralwhite",
        ForestGreen: "forestgreen",
        Fuchsia: "fuchsia",
        Gainsboro: "gainsboro",
        GhostWhite: "ghostwhite",
        Gold: "gold",
        GoldenRod: "goldenrod",
        Gray: "gray",
        Green: "green",
        GreenYellow: "greenyellow",
        HoneyDew: "honeydew",
        HotPink: "hotpink",
        IndianRed: "indianred",
        Indigo: "indigo",
        Ivory: "ivory",
        Khaki: "khaki",
        Lavender: "lavender",
        LavenderBlush: "lavenderblush",
        LawnGreen: "lawngreen",
        LemonChiffon: "lemonchiffon",
        LightBlue: "lightblue",
        LightCoral: "lightcoral",
        LightCyan: "lightcyan",
        LightGoldenRodYellow: "lightgoldenrodyellow",
        LightGray: "lightgray",
        LightGreen: "lightgreen",
        LightPink: "lightpink",
        LightSalmon: "lightsalmon",
        LightSeaGreen: "lightseagreen",
        LightSkyBlue: "lightskyblue",
        LightSlateGray: "lightslategray",
        LightSteelBlue: "lightsteelblue",
        LightYellow: "lightyellow",
        Lime: "lime",
        LimeGreen: "limegreen",
        Linen: "linen",
        Magenta: "magenta",
        Maroon: "maroon",
        MediumAquaMarine: "mediumaquamarine",
        MediumBlue: "mediumblue",
        MediumOrchid: "mediumorchid",
        MediumPurple: "mediumpurple",
        MediumSeaGreen: "mediumseagreen",
        MediumSlateBlue: "mediumslateblue",
        MediumSpringGreen: "mediumspringgreen",
        MediumTurquoise: "mediumturquoise",
        MediumVioletRed: "mediumvioletred",
        MidnightBlue: "midnightblue",
        MintCream: "mintcream",
        MistyRose: "mistyrose",
        Moccasin: "moccasin",
        NavajoWhite: "navajowhite",
        Navy: "navy",
        OldLace: "oldlace",
        Olive: "olive",
        OliveDrab: "olivedrab",
        Orange: "orange",
        OrangeRed: "orangered",
        Orchid: "orchid",
        PaleGoldenRod: "palegoldenrod",
        PaleGreen: "palegreen",
        PaleTurquoise: "paleturquoise",
        PaleVioletRed: "palevioletred",
        PapayaWhip: "papayawhip",
        PeachPuff: "peachpuff",
        Peru: "peru",
        Pink: "pink",
        Plum: "plum",
        PowderBlue: "powderblue",
        Purple: "purple",
        RebeccaPurple: "rebeccapurple",
        Red: "red",
        RosyBrown: "rosybrown",
        RoyalBlue: "royalblue",
        SaddleBrown: "saddlebrown",
        Salmon: "salmon",
        SandyBrown: "sandybrown",
        SeaGreen: "seagreen",
        SeaShell: "seashell",
        Sienna: "sienna",
        Silver: "silver",
        SkyBlue: "skyblue",
        SlateBlue: "slateblue",
        SlateGray: "slategray",
        Snow: "snow",
        SpringGreen: "springgreen",
        SteelBlue: "steelblue",
        Tan: "tan",
        Teal: "teal",
        Thistle: "thistle",
        Tomato: "tomato",
        Turquoise: "turquoise",
        Violet: "violet",
        Wheat: "wheat",
        White: "white",
        WhiteSmoke: "whitesmoke",
        Yellow: "yellow",
        YellowGreen: "yellowgreen",
        FromRGBA: (red: number, green: number, blue: number, alpha: number = 1) => {
            return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        },
        FromHSLA: (hue: number, saturation: number, lightness: number, alpha: number = 1) => {
            return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        },
        FromHex: (hex: string) => {
            return `#${hex}`;
        }
    };
    
    static TouchEvent = class CreateJS_TouchEvent {
        
        static Handler = class TouchEvent_Handler {
            private _unhandle: boolean = false;
            private _pinch: boolean = false;
            private _pinchCallbacks: (( ratio: number ) => void)[] = [];
            private _rotate: boolean = false;
            private _rotateCallbacks: (( angle: number ) => void)[] = [];
            private _touches: TouchList = {
                length: 0,
                item: function(index: number) {
                    return null;
                }
            };
            private _previousTouches: TouchList = {
                length: 0,
                item: function(index: number) {
                    return null;
                }
            };
            private _callbacks: Map<string, ( touches: TouchList ) => void> = new Map();
            private _options: {
                preventDefault: boolean
            };
            
            constructor(options: { preventDefault: boolean } = { preventDefault: false }) {
                this._options = options;
                
                addEventListener("touchstart", ( event: TouchEvent ) => {
                    if (this._options.preventDefault) event.preventDefault();
                    this._touches = event.touches;
                });
                
                addEventListener("touchmove", ( event: TouchEvent ) => {
                    if (this._options.preventDefault) event.preventDefault();
                    this._touches = event.touches;
                });
                
                addEventListener("touchend", ( event: TouchEvent ) => {
                    if (this._options.preventDefault) event.preventDefault();
                    this._touches = event.touches;
                });
            }
            
            async handle(fps: number): Promise<void> {
                let pinchBeforeDistance: number | null = null;
                while (true) {
                    if (this._unhandle) {
                        this._unhandle = false;
                        return;
                    }
                    
                    pinchBeforeDistance = this.pinch$(pinchBeforeDistance);
                    this.rotate$();
                    
                    if (this._touches.length > 0) {
                        this._callbacks.forEach(callback => {
                            callback(this._touches);
                        });
                    }
                    
                    this._previousTouches = this._touches;
                    
                    await CreateJS.TimeHandler.wait(fps * 1000);
                }
            }
            
            unhandle(): CreateJS.TouchEvent.Handler {
                this._unhandle = false;
                return this;
            }
            
            register(id: string, callback: ( touches: TouchList ) => void): void {
                this._callbacks.set(id, callback);
            }
            
            unregister(id: string): void {
                this._callbacks.delete(id);
            }
            
            pinch(callback: ( ratio: number ) => void): void {
                this._pinch = true;
                this._pinchCallbacks.push(callback);
            }
            
            private pinch$(pinchBeforeDistance: number | null): number | null {
                if (this._pinch) {
                    if (this._touches.length >= 2) {
                        const [touch1, touch2] = [this._touches[0], this._touches[1]];
                        
                        const v1 = new CreateJS.Vec2(touch1.clientX, touch1.clientY);
                        const v2 = new CreateJS.Vec2(touch2.clientX, touch2.clientY);
                        
                        const distance = v1.distanceTo(v2);
                        
                        if (pinchBeforeDistance !== null) {
                            this._pinchCallbacks.forEach(callback => {
                                callback(distance / pinchBeforeDistance);
                            });
                        }
                        
                        return distance
                    } else {
                        return null;
                    }
                }
                
                return null;
            }
            
            rotate(callback: ( angle: number ) => void): void {
                this._rotate = true
                this._rotateCallbacks.push(callback);
            }
            
            private rotate$(): void {
                if (this._rotate) {
                    if (this._touches.length >= 2) {
                        if (this._previousTouches.length >= 2) {
                            const [touch1, touch2] = [this._touches[0], this._touches[1]];
                            const [pTouch1, pTouch2] = [this._previousTouches[0], this._previousTouches[1]];
                        
                            const v1 = new CreateJS.Vec2(touch1.clientX, touch1.clientY);
                            const v2 = new CreateJS.Vec2(touch2.clientX, touch2.clientY);
                            const pv1 = new CreateJS.Vec2(pTouch1.clientX, pTouch1.clientY);
                            const pv2 = new CreateJS.Vec2(pTouch2.clientX, pTouch2.clientY);
                            
                            const center = v1.clone().lerp(v2, 0.5);
                            const pCenter = pv1.clone().lerp(pv2, 0.5);
                            
                            v1.sub(center);
                            pv1.sub(pCenter);
                            
                            const dot = pv1.dot(v1);
                            const cross = pv1.cross(v1);
                            const angle = Math.atan2(cross, dot);
                            this._rotateCallbacks.forEach(callback => {
                                callback(angle);
                            });
                        }
                    }
                }
            }
        }
    }
    
    static MouseEvent = class CreateJS_MouseEvent {
        static Type = {
            Drag: "Drag",
            Click: "Click",
            DoubleClick: "DoubleClick",
        } as const;

        static Handler = class MouseEvent_Handler<ObjectType = any> {
            private _binded: ObjectType | undefined;
            private _callbacks: Callback<ObjectType>[] = [];
            private _unhandle: boolean = false;
            private _mouseDown: MouseEvent | undefined;
            private _mouseUp: MouseEvent | undefined;
            private _dblClick: MouseEvent | undefined;
            private _mouseMove: MouseEvent | undefined;
            private _beforeMouseMove: MouseEvent | undefined;
            private _initialEvent: MouseEvent | undefined;
            private _initialBinded: any;

            constructor() {
                addEventListener("mousedown", ( event ) => {
                    this._mouseDown = event;
                    this._mouseMove = event;
                    this._initialEvent = event;
                    this._initialBinded = deepCloneObject(this._binded);
                    if (CreateJS.mainThread) CreateJS.mainThread.initialOffset = CreateJS.mainThread.translateOffset;
                });

                addEventListener("mouseup", ( event ) => {
                    this._mouseUp = event;
                });

                addEventListener("mousemove", ( event ) => {
                    this._mouseMove = event;
                });

                addEventListener("dblclick", ( event ) => {
                    this._dblClick = event;
                });
            }

            async handle(fps: number): Promise<void> {
                while (true) {
                    if (this._unhandle) {
                        this._unhandle = false;
                        return;
                    }

                    this._callbacks.forEach(callback => {
                        if (callback.type === CreateJS.MouseEvent.Type.Click && this._mouseUp) {
                            callback.callback(this._binded, this._mouseUp.target, this._mouseUp);
                        }
                        if (callback.type === CreateJS.MouseEvent.Type.DoubleClick && this._dblClick) {
                            callback.callback(this._binded, this._dblClick.target, this._dblClick);
                        }
                        if (callback.type === CreateJS.MouseEvent.Type.Drag && this._mouseDown && this._initialEvent && this._mouseMove && this._beforeMouseMove) {
                            const offset = new CreateJS.Vec2(this._mouseMove.clientX, this._mouseMove.clientY);
                            offset.sub(new CreateJS.Vec2(this._beforeMouseMove.clientX, this._beforeMouseMove.clientY));
                            
                            callback.callback(this._binded, this._mouseMove.target, offset, this._mouseMove, this._initialEvent, this._initialBinded);
                        }
                    });

                    if (this._mouseDown) {
                        this._beforeMouseMove = this._mouseMove;
                    }

                    if (this._mouseUp) {
                        this._mouseDown = undefined;
                        this._mouseUp = undefined;
                        this._beforeMouseMove = undefined;
                    }

                    if (this._dblClick) {
                        this._dblClick = undefined;
                    }

                    await CreateJS.TimeHandler.wait(fps * 1000);
                }
            }

            unhandle(): void {
                this._unhandle = true;
            }

            bind(object: ObjectType): typeof this {
                this._binded = object;
                return this;
            }

            register<T extends keyof CallbackMap<ObjectType>>(type: T, callback: CallbackMap<ObjectType>[T]): void {
                this._callbacks.push({ type, callback } as Callback<ObjectType>);
            }

            unregister<T extends keyof CallbackMap>(type: T) {
                this._callbacks = this._callbacks.filter(callback => callback.type !== type);
            }
        }
    }

    static KeyboardEvent = class CreateJS_KeyboardEvent {
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

        static Handler = class KeyboardEvent_Handler<ObjectType = any> {
            private heldKeys: Set<string> = new Set();
            private pressedKeys: Map<string, boolean> = new Map();
            private callbacks: Map<string, { callback: ( eventHandler: CreateJS.KeyboardEvent.Handler<ObjectType>, bindedObject: ObjectType | undefined ) => void, options: CreateJS.KeyboardHandlerOptions }> = new Map();
            private _unhandle: boolean = false;
            private _binded: ObjectType | undefined;

            constructor() {
                addEventListener("keydown", ( event ) => {
                    this.heldKeys.add(event.code);
                    if (!this.pressedKeys.has(event.code)) {
                        this.pressedKeys.set(event.code, true);
                    }
                });

                addEventListener("keyup", ( event ) => {
                    this.heldKeys.delete(event.code);
                    this.pressedKeys.delete(event.code);
                });
            }

            bind(object: ObjectType): typeof this {
                this._binded = object;
                return this;
            }

            async handle(fps: number): Promise<void> {
                while (true) {
                    if (this._unhandle) {
                        this._unhandle = false;
                        return;
                    }

                    for (let key of this.heldKeys) {
                        if (this.callbacks.has(key)) {
                            if (this.callbacks.get(key)!.options.type === "hold") {
                                this.callbacks.get(key)!.callback(this, this._binded);
                            }
                        }
                    }

                    for (let [ key ] of this.pressedKeys) {
                        if (this.callbacks.has(key)) {
                            if (this.pressedKeys.get(key)) {
                                if (this.callbacks.get(key)!.options.type === "press") {
                                    this.callbacks.get(key)!.callback(this, this._binded);
                                    this.pressedKeys.set(key, false);
                                }
                            }
                        }
                    }

                    await CreateJS.TimeHandler.wait(fps * 1000);
                }
            }

            unhandle(): void {
                this._unhandle = true;
            }

            register(key: CreateJS.KeyboardKey, callback: ( eventHandler: CreateJS.KeyboardEvent.Handler<ObjectType>, bindedObject: ObjectType | undefined ) => void, options: CreateJS.KeyboardHandlerOptions = { type: "hold" }): void {
                this.callbacks.set(key, { callback, options });
            }

            unregister(key: CreateJS.KeyboardKey): void {
                this.callbacks.delete(key);
            }
        }
    }

    static Component = class CreateJS_Component {
        private static components: CreateJS.Component[] = [];
        id: string;
        classList: string[];
        filePath: string;
        stylePath: string;
        component: HTMLDivElement | undefined;

        constructor(componentID: string, classList: string[], filePath: string, stylePath: string) {
            this.id = componentID;
            this.classList = classList;
            this.filePath = filePath;
            this.stylePath = stylePath;
        }

        async generate(atId?: string): Promise<void> {
            if (!atId) {
                this.component = document.createElement("div");
                const element = await (await fetch(this.filePath)).text();
                this.component.innerHTML = element;
                document.body.appendChild(this.component);
            } else {
                this.component = document.createElement("div");
                const element = await (await fetch(this.filePath)).text();
                this.component.innerHTML = element;

                const foundElement = document.getElementById(atId);
                if (!foundElement) throw new Error("Element " + atId + " was not found!");
                foundElement.appendChild(this.component);
            }
            
            this.addClass(...this.classList);

            const styleComponent = document.createElement("style");
            const styles = await (await fetch(this.stylePath)).text();
            styleComponent.innerHTML = styles;
            document.head.appendChild(styleComponent);
        }

        remove(): void {
            if (!this.component) throw new Error("Component does not exist!");

            this.component.remove();
            this.component = undefined;
        }

        hide(): void {
            if (!this.component) throw new Error("Component does not exist!");

            this.component.style.visibility = "hidden";
        }

        show(): void {
            if (!this.component) throw new Error("Component does not exist!");

            this.component.style.visibility = "visible";
        }

        addClass(...classNames: string[]) {
            if (!this.component) throw new Error("Component does not exist!");
            this.component.classList.add(...classNames);
        }

        removeClass(...classNames: string[]) {
            if (!this.component) throw new Error("Component does not exist!");
            this.component.classList.remove(...classNames);
        }
    }

    static Point = class CreateJS_Point {
        position: CreateJS.Vec2;
        private _fillColor: string = "white";
        private _strokeColor: string = "white";
        private _size: number = 1;
        private _fill: boolean = false;
        private _stroke: boolean = false;

        constructor(x: number, y: number) {
            this.position = new CreateJS.Vec2(x, y);
        }

        size(size: number): CreateJS.Point {
            this._size = size;
            return this;
        }

        strokeColor(color: string): CreateJS.Point {
            this._strokeColor = color;
            return this;
        }

        fillColor(color: string): CreateJS.Point {
            this._fillColor = color;
            return this;
        }

        stroke(): CreateJS.Point {
            this._stroke = this._stroke;
            return this;
        }

        fill(): CreateJS.Point {
            this._fill = !this._fill;
            return this;
        }

        toVec2(): CreateJS.Vec2 {
            return new CreateJS.Vec2(this.position.x, this.position.y);
        }

        draw(c: CanvasRenderingContext2D): void {
            c.beginPath();
            c.fillStyle = this._fillColor;
            c.strokeStyle = this._strokeColor;
            c.arc(this.position.x, this.position.y, this._size, 0, 2 * Math.PI);
            if (this._fill) c.fill();
        }
    }

    static Line = class CreateJS_Line {
        private _width: number = 1;
        private _color: string = "white";
        private _stroke: boolean = false;
        constructor(public x1: number, public y1: number, public x2: number, public y2: number) {}

        width(width: number): CreateJS.Line {
            this._width = width;
            return this;
        }

        color(color: string): CreateJS.Line {
            this._color = color;
            return this;
        }

        stroke(): CreateJS.Line {
            this._stroke = !this._stroke;
            return this;
        }

        draw(c: CanvasRenderingContext2D): void {
            c.beginPath();
            c.lineWidth = this._width;
            c.strokeStyle = this._color;
            c.moveTo(this.x1, this.y1);
            c.lineTo(this.x2, this.y2);
            if (this._stroke) c.stroke();
            c.closePath();
        }

        toVec2(): CreateJS.Vec2 {
            return new CreateJS.Vec2(this.x2 - this.x1, this.y2 - this.y1);
        }
    }

    static Shape = class CreateJS_Shape {
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
        backgroundRendering: boolean = false;
        foregroundRendering: boolean = false;

        bindedShapes: CreateJS.Shape[] = [];

        protected _position: CreateJS.Vec2;

        constructor(x: number, y: number) {
            this._position = new CreateJS.Vec2(x, y);
            this.position = new CreateJS.Vec2(x, y);
        }

        set position(value: CreateJS.Vec2) {
            const difference = this._position.clone().sub(value);
            this.bindedShapes.forEach(shape => {
                shape.position.add(difference);
            });

            this._position = value;
        }

        get position(): CreateJS.Vec2 {
            return this._position;
        }

        fill(fill: boolean = true): typeof this {
            this._fill = fill;
            return this;
        }

        stroke(stroke: boolean = true): typeof this {
            this._stroke = stroke;
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

        bind(shape: CreateJS.Shape): typeof this {
            this.bindedShapes.push(shape);
            return this;
        }
        
        setBackgroundRendering(backgroundRendering: boolean): typeof this {
            this.backgroundRendering = backgroundRendering;
            return this;
        }

        setForegroundRendering(foregroundRendering: boolean): typeof this {
            this.foregroundRendering = foregroundRendering;
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

    static Rect = class CreateJS_Rect extends CreateJS.Shape {
        size: CreateJS.Vec2;

        constructor(x: number, y: number, width: number, height: number) {
            super(x, y);

            this.size = new CreateJS.Vec2(width, height);
        }

        get width(): number {
            return this.size.x;
        }

        get height(): number {
            return this.size.y;
        }

        clone(): typeof this {
            return deepCloneObject(this);
        }

        collidesWith(other: CreateJS.Rect): { collides: false } | { collides: true, normal: CreateJS.Vec2, depth: number} {
            const thisLeft = this.left();
            const thisRight = this.right();
            const thisTop = this.top();
            const thisBottom = this.bottom();
            const otherLeft = other.left();
            const otherRight = other.right();
            const otherTop = other.top();
            const otherBottom = other.bottom();

            let collides = this.containsPointExclusive(new CreateJS.Vec2(otherLeft, otherTop)) ||
                           this.containsPointExclusive(new CreateJS.Vec2(otherRight, otherTop)) ||
                           this.containsPointExclusive(new CreateJS.Vec2(otherLeft, otherBottom)) ||
                           this.containsPointExclusive(new CreateJS.Vec2(otherRight, otherBottom));

            if (!collides) return { collides };

            const overlapX = Math.min(thisRight, otherRight) - Math.max(thisLeft, otherLeft);
            const overlapY = Math.min(thisBottom, otherBottom) - Math.max(thisTop, otherTop);

            let depth, normal;
            if (overlapX < overlapY) {
                depth = overlapX;
                const direction = this.center().x - other.center().x;
                normal = new CreateJS.Vec2(Math.sign(direction), 0);
            } else {
                depth = overlapY;
                const direction = this.center().y - other.center().y;
                normal = new CreateJS.Vec2(0, Math.sign(direction));
            }

            return {
                collides,
                depth,
                normal
            }
        }

        containsPoint(point: CreateJS.Vec2): boolean {
            return point.x <= this.x + this.width && point.x >= this.x && point.y <= this.y + this.height && point.y >= this.y;
        }
        
        containsPointExclusive(point: CreateJS.Vec2): boolean {
            return point.x < this.x + this.width && point.x > this.x && point.y < this.y + this.height && point.y > this.y;
        }

        right(): number {
            return this.x + this.width;
        }

        left(): number {
            return this.x;
        }

        top(): number {
            return this.y;
        }

        bottom(): number {
            return this.y + this.height;
        }

        center(): CreateJS.Vec2 {
            return new CreateJS.Vec2(this.x + this.width / 2, this.y + this.height / 2);
        }

        isOnTopOf(rect: CreateJS.Rect) {
            return this.top() <= rect.top() && this.bottom() >= rect.top() && this.left() < rect.right() && this.right() > rect.left();
        }

        override draw(c: CanvasRenderingContext2D): void {
            c.beginPath();
            c.lineWidth = this._strokeWidth;
            c.fillStyle = this._fillColor;
            c.strokeStyle = this._strokeColor;
            c.rect(this.x, this.y, this.width, this.height);
            if (this._fill) c.fill();
            if (this._stroke) c.stroke();
            c.closePath();
        }
    }

    static Physics = class CreateJS_Physics {
        static Rigidbody = class Physics_Rigidbody extends CreateJS.Rect {
            velocity: CreateJS.Vec2 = new CreateJS.Vec2();
            acceleration: CreateJS.Vec2 = new CreateJS.Vec2();
            drag: number = 0.9;
            friction: number = 0.8;

            isStatic: boolean;

            constructor(isStatic: boolean, rect: CreateJS.Rect);
            constructor(isStatic: boolean, x: number, y: number, width: number, height: number);
            constructor(isStatic: boolean, x: number | CreateJS.Rect, y?: number, width?: number, height?: number) {
                let xNum, yNum, widthNum, heightNum;

                let rect: CreateJS.Rect | undefined;
                if (typeof x === "object") {
                    xNum = x.x;
                    yNum = x.y;
                    widthNum = x.width;
                    heightNum = x.height;

                    rect = x;
                } else {
                    xNum = x;
                    yNum = y as number;
                    widthNum = width as number;
                    heightNum = height as number;
                }
                
                super(xNum, yNum, widthNum, heightNum);

                this.isStatic = isStatic;
                
                if (rect) {
                    Object.assign(this, deepCloneObject(rect));
                }
            }

            setVelocity(velocity: CreateJS.Vec2): void {
                this.velocity.set(velocity);
            }

            getVelocity(): CreateJS.Vec2 {
                return this.velocity.clone();
            }

            setAcceleration(acceleration: CreateJS.Vec2): void {
                this.acceleration.set(acceleration);
            }

            getAcceleration(): CreateJS.Vec2 {
                return this.acceleration.clone();
            }

            setDrag(drag: number): void {
                this.drag = drag;
            }

            getDrag(): number {
                return this.drag;
            }
            
            setFriction(friction: number) {
                this.friction = friction;
            }

            getFriction(): number {
                return this.friction;
            }

            addAcceleration(acceleration: CreateJS.Vec2): void {
                this.acceleration.add(acceleration);
            }

            addVelocity(velocity: CreateJS.Vec2): void {
                this.velocity.add(velocity);
            }

            nextUpdateCollidesWith(other: CreateJS.Physics.Rigidbody): { collides: false } | { collides: true, depth: number, normal: CreateJS.Vec2 } {
                this.position.add(this.velocity);
                other.position.add(other.velocity);

                const collides = this.collidesWith(other).collides;

                const thisLeft = this.left();
                const thisRight = this.right();
                const thisTop = this.top();
                const thisBottom = this.bottom();
                const otherLeft = other.left();
                const otherRight = other.right();
                const otherTop = other.top();
                const otherBottom = other.bottom();
                
                this.position.sub(this.velocity);
                other.position.sub(other.velocity);

                if (!collides) return { collides };

                const overlapX = Math.min(thisRight, otherRight) - Math.max(thisLeft, otherLeft);
                const overlapY = Math.min(thisBottom, otherBottom) - Math.max(thisTop, otherTop);

                let depth, normal;
                if (overlapX < overlapY) {
                    depth = overlapX;
                    const direction = this.center().x - other.center().x;
                    normal = new CreateJS.Vec2(Math.sign(direction), 0);
                } else {
                    depth = overlapY;
                    const direction = this.center().y - other.center().y;
                    normal = new CreateJS.Vec2(0, Math.sign(direction));
                }

                return {
                    collides,
                    depth,
                    normal
                }
            }

            update(time: number, bodies: CreateJS.Physics.Rigidbody[]): void {
                if (!this.isStatic) {
                    this.velocity.add(this.getAcceleration().mul(time));
                    this.velocity.mul(this.drag ** time);
                }

                bodies.forEach(body => {
                    if (this === body) return;

                    if (this.bottom() + this.velocity.y * time >= body.top() + body.velocity.y * time && this.bottom() <= body.top() && this.left() <= body.right() && this.right() >= body.left()) {
                        if (!this.isStatic) this.position.add(new CreateJS.Vec2(0, body.top() + body.velocity.y - this.bottom()));
                        this.velocity.set(this.velocity.x, 0);
                    }

                    if (body.isStatic) {
                        if (this.top() + this.velocity.y * time <= body.bottom() + body.velocity.y * time && this.top() >= body.bottom() && this.left() <= body.right() && this.right() >= body.left()) {
                            if (!this.isStatic) this.position.add(new CreateJS.Vec2(0, body.bottom() - this.top()));
                            this.velocity.set(this.velocity.x, -this.velocity.y * 0.5);
                        }
                        
                        if (this.left() + this.velocity.x * time <= body.right() + body.velocity.x * time && this.left() >= body.right() && this.top() <= body.bottom() && this.bottom() >= body.top()) {
                            if (!this.isStatic) this.position.add(new CreateJS.Vec2(body.right() - this.left(), 0));
                            this.velocity.set(0, this.velocity.y);
                        }

                        if (this.right() + this.velocity.x * time >= body.left() + body.velocity.x * time && this.right() <= body.left() && this.top() <= body.bottom() && this.bottom() >= body.top()) {
                            if (!this.isStatic) this.position.add(new CreateJS.Vec2(body.left() - this.right(), 0));
                            this.velocity.set(0, this.velocity.y);
                        }

                        const collides = this.collidesWith(body);
                        if (collides.collides) {
                            const newPos = collides.normal.clone().mul(collides.depth + 1);
    
                            this.position.add(newPos);
                        }
                    }
                });

                if (!this.isStatic) {
                    this.position.add(this.getVelocity().mul(time));
                    this.acceleration.zero();

                    return;
                }

                this.velocity.zero();
                this.acceleration.zero();
            }
        }

        protected bodies: CreateJS.Physics.Rigidbody[] = [];
        protected gravity: CreateJS.Vec2 = new CreateJS.Vec2();

        constructor() {}

        setGravity(gravity: CreateJS.Vec2): void {
            this.gravity.set(gravity);
        }

        getGravity(): CreateJS.Vec2 {
            return this.gravity;
        }

        addBody(...bodies: CreateJS.Physics.Rigidbody[]): CreateJS.Physics {
            this.bodies.push(...bodies);
            return this;
        }

        applyJumpTo(body: CreateJS.Physics.Rigidbody, multiplier: number, condition: (current: CreateJS.Physics.Rigidbody, other: CreateJS.Physics.Rigidbody) => boolean): void {
            let flag = false;
            this.bodies.forEach(other => {
                if (body === other) return;

                if (condition(body, other)) flag = true;
            });
            if (flag) body.addAcceleration(this.gravity.clone().negate().add(this.gravity.clone().negate().mul(multiplier)));
        }

        update(time: number) {
            this.bodies.forEach(body => {
                body.addAcceleration(this.gravity);
                body.update(time, this.bodies);
            });
        }
    }

    static Image = class CreateJS_Image {
        private canvas = document.createElement("canvas");
        private c = this.canvas.getContext("2d")!;

        image: HTMLImageElement | undefined;
        frameWidth: number;
        frameHeight: number;
        frameTime: number;
        frames: number;
        isStatic: boolean = true;
        
        private currentFrame = 0;

        constructor(img?: HTMLImageElement, isStatic: boolean = true, frameWidth: number = 0, frameHeight: number = 0, frameTime: number = 0) {
            this.image = img;
            this.frameWidth = frameWidth;
            this.frameHeight = frameHeight;
            this.frameTime = frameTime;
            this.isStatic = isStatic;

            if (this.image)
                this.frames = Math.floor(this.image.width / this.frameWidth);
            else 
                this.frames = 1;

            if (this.isStatic) {
                if (this.image) {
                    this.frameWidth = this.image.width;
                    this.frameHeight = this.image.height;
                }
            }

            this.canvas.width = this.frameWidth;
            this.canvas.height = this.frameHeight;
            this.canvas.style.cssText = `
                image-rendering: pixelated;
            `;

            this.c.imageSmoothingEnabled = false;
        }

        nextFrame(): HTMLCanvasElement {
            this.c.clearRect(0, 0, this.frameWidth, this.frameHeight);

            if (!this.image)
                return this.canvas;

            if (this.isStatic) {
                this.c.drawImage(this.image, 0, 0);

                return this.canvas;
            }

            this.c.drawImage(this.image, this.frameWidth * this.currentFrame, 0, this.frameWidth, this.frameHeight, 0, 0, this.frameWidth, this.frameHeight);

            this.currentFrame = (this.currentFrame + 1) % this.frames;

            return this.canvas;
        }

        is(img: CreateJS.Image): boolean {
            return this.image === img.image && this.frameWidth === img.frameWidth
                   && this.frameHeight === img.frameHeight && this.frameTime === img.frameTime;
        }
    }

    static Sprite = class CreateJS_Sprite extends CreateJS.Physics.Rigidbody {
        image: CreateJS.Image = new CreateJS.Image();
        protected frame: HTMLCanvasElement = document.createElement("canvas");
        protected canDrawFrame: boolean = true;
        protected debug: boolean;
        protected timeout?: number;

        hitbox: CreateJS.Rect[] = [];

        constructor(isStatic: boolean, image: CreateJS.Image, hitbox: CreateJS.Rect[], debug: boolean, rect: CreateJS.Rect);
        constructor(isStatic: boolean, image: CreateJS.Image, hitbox: CreateJS.Rect[], debug: boolean, x: number, y: number, width: number, height: number);
        constructor(isStatic: boolean, image: CreateJS.Image, hitbox: CreateJS.Rect[], debug: boolean, x: number | CreateJS.Rect, y?: number, width?: number, height?: number) {
            let xNum, yNum, widthNum, heightNum;

            let rect: CreateJS.Rect | undefined;
            if (typeof x === "object") {
                xNum = x.x;
                yNum = x.y;
                widthNum = x.width;
                heightNum = x.height;

                rect = x;
            } else {
                xNum = x;
                yNum = y as number;
                widthNum = width as number;
                heightNum = height as number;
            }
            
            super(isStatic, xNum, yNum, widthNum, heightNum);

            this.isStatic = isStatic;
            
            if (rect) {
                Object.assign(this, deepCloneObject(rect));
            }

            hitbox.forEach(hb => {
                this.hitbox.push(deepCloneObject(hb));
                this.bind(hb);
            });
            this.image = image;
            this.debug = debug;
        }

        get width(): number {
            return this.size.x;
        }

        get height(): number {
            return this.size.y;
        }

        setImage(image: CreateJS.Image): typeof this {
            if (!this.image.is(image)) {
                this.image = image;
                clearTimeout(this.timeout);
                this.canDrawFrame = true;
            }
            return this;
        }

        addHitbox(...hitbox: CreateJS.Rect[]) {
            hitbox.forEach(hb => {
                this.hitbox.push(deepCloneObject(hb));
                this.bind(hb);
            });
        }

        draw(c: CanvasRenderingContext2D) {
            super.draw(c);
            if (this.debug) {
                this.hitbox.forEach(hitbox => {
                    hitbox.fill(false).strokeColor("red").strokeWidth(2).stroke();
                    hitbox.draw(c);   
                })
            }

            if (this.image?.image) {
                if (this.canDrawFrame && !this.image.isStatic) {
                    this.canDrawFrame = false;
    
                    this.frame = this.image.nextFrame();
    
                    this.timeout = setTimeout(() => {
                        this.canDrawFrame = true;
                    }, this.image.frameTime);
                };

                if (this.image.isStatic) {
                    this.frame = this.image.nextFrame();
                }

                c.drawImage(this.frame, this.x, this.y, this.width, this.height);
            }
        }
    }

    static Area = class CreateJS_Area extends CreateJS.Rect {
        protected frame: HTMLCanvasElement = document.createElement("canvas");
        protected floorFrame: HTMLCanvasElement = document.createElement("canvas");
        protected canDrawFrame: boolean = true;
        protected timeout?: number;
        protected floorTimeout?: number;
        protected canDrawFloorFrame: boolean = true;

        threshold: number;
        image: CreateJS.Image;
        floorImage: CreateJS.Image;
        floorWidth: number;
        floorHeight: number;

        constructor(x: number, y: number, width: number, height: number, image: CreateJS.Image, floorImage: CreateJS.Image, floorWidth: number, floorHeight: number, threshold: number) {
            super(x, y, width, height);

            this.threshold = threshold;
            this.image = image;
            this.floorImage = floorImage;
            this.floorWidth = floorWidth;
            this.floorHeight = floorHeight;
        }

        setImage(image: CreateJS.Image): typeof this {
            if (!this.image.is(image)) {
                this.image = image;
                clearTimeout(this.timeout);
                this.canDrawFrame = true;
            }
            return this;
        }

        setFloorImage(image: CreateJS.Image): typeof this {
            if (!this.floorImage.is(image)) {
                this.floorImage = image;
                clearTimeout(this.floorTimeout);
                this.canDrawFloorFrame = true;
            }
            return this;
        }

        draw(c: CanvasRenderingContext2D): void {
            super.draw(c);

            if (this.image?.image) {
                if (this.canDrawFrame && !this.image.isStatic) {
                    this.canDrawFrame = false;
    
                    this.frame = this.image.nextFrame();
    
                    this.timeout = setTimeout(() => {
                        this.canDrawFrame = true;
                    }, this.image.frameTime);
                };

                if (this.image.isStatic) {
                    this.frame = this.image.nextFrame();
                }

                c.drawImage(this.frame, this.x, this.y, this.width, this.height);
            }

            if (this.floorImage?.image) {
                if (this.canDrawFloorFrame && !this.image.isStatic) {
                    this.canDrawFloorFrame = false;
    
                    this.floorFrame = this.image.nextFrame();
    
                    this.timeout = setTimeout(() => {
                        this.canDrawFloorFrame = true;
                    }, this.image.frameTime);
                };

                if (this.image.isStatic) {
                    this.floorFrame = this.image.nextFrame();
                }

                const n = Math.floor(this.width / this.floorWidth);
                for (let i = 0; i < n + 1; i++) {
                    c.drawImage(this.floorFrame, this.left() + this.floorWidth * i, this.bottom(), this.floorWidth, this.floorHeight);
                }
            }
        }
    }

    static TimeHandler = class CreateJS_TimeHandler {
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

        static Preload = class Preload {
            static async images(urls: string[]): Promise<{ [key: string]: HTMLImageElement }> {
                const images = urls.map(url => this.loadImage(url));

                const loadedImages = await Promise.all(images);

                const object: { [key: string]: HTMLImageElement } = {};
                loadedImages.forEach(( image, index ) => {
                    object[urls[index]] = image;
                });

                return object;
            }

            static async sounds(urls: string[]): Promise<{ [key: string]: HTMLAudioElement }> {
                const sounds = urls.map(url => this.loadSound(url));

                const loadedSounds = await Promise.all(sounds);
                
                const object: { [key: string]: HTMLAudioElement } = {};
                loadedSounds.forEach(( sound, index ) => {
                    object[urls[index]] = sound;
                });

                return object;
            }

            private static loadImage(url: string): Promise<HTMLImageElement> {
                return new Promise(( resolve, reject ) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                    img.src = url;
                });
            }

            private static loadSound(url: string): Promise<HTMLAudioElement> {
                return new Promise(( resolve, reject ) => {
                    const audio = new Audio(url);
                    audio.onloadeddata = () => {
                        resolve(audio);
                    }
                    audio.onerror = reject;
                });
            }
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

                const dt = (performance.now() - CreateJS.TimeHandler.timeBefore) / 1000;
                CreateJS.TimeHandler.timeBefore = performance.now();

                const callbackReturn = callback(++tick, dt);
                if (callbackReturn !== undefined) {
                    tick = callbackReturn;
                }

                await CreateJS.TimeHandler.wait(fps * 1000);
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
    
    static mainThread: CreateJS | undefined = undefined;

    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
    private _binded: CreateJS.Rect | undefined;
    private _center: CreateJS.Vec2 = new CreateJS.Vec2(innerWidth / 2, innerHeight / 2);
    rotateAngle: number = 0;
    translateOffset: CreateJS.Vec2 = new CreateJS.Vec2();
    scale: CreateJS.Vec2 = new CreateJS.Vec2(1, 1);
    private _backgroundColor: string = "white";
    type: "main" | "secondary";
    initialOffset: CreateJS.Vec2 = new CreateJS.Vec2();
    objects: CreateJS.Rect[] = [];
    areas: CreateJS.Area[] = [];

    constructor(canvas: HTMLCanvasElement, type: "main" | "secondary") {
        this.canvas = canvas;
        this.c = canvas.getContext("2d")!;

        this.type = type;
        if (this.type === "main") {
            CreateJS.mainThread = this;
        }
    }

    init(): CreateJS {
        document.body.style.cssText = `
            margin: 0;
            overflow: hidden;
        `;

        this.canvas.style.cssText = `
            image-rendering: pixelated;
        `;

        this.c.imageSmoothingEnabled = false;

        addEventListener("resize", () => {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;
        });

        return this;
    }

    resizeCanvas(x: number, y: number): CreateJS {
        this.canvas.width = x;
        this.canvas.height = y;

        return this;
    }

    backgroundColor(color: string): CreateJS {
        this._backgroundColor = color;
        this.canvas.style.backgroundColor = `${color}`;

        return this;
    }

    bind(object: CreateJS.Rect, center?: CreateJS.Vec2): CreateJS {
        this._binded = object;
        if (center) this._center = center;
        return this;
    }

    unbind(): CreateJS {
        this._binded = undefined;
        return this;
    }

    rotate(angle: number): CreateJS {
        this.rotateAngle = angle;
        return this;
    }

    setScale(size: CreateJS.Vec2): CreateJS {
        this.scale = size;
        return this;
    }

    translate(offset: CreateJS.Vec2): CreateJS {
        this.translateOffset = offset;
        return this;
    }

    addObjects(...objects: CreateJS.Rect[]) {
        this.objects.push(...objects);
    }

    addAreas(...areas: CreateJS.Area[]) {
        this.areas.push(...areas);
    }

    render(): void {
        if (this._binded) {
            const offset = this._binded.center().sub(this._center);
            this.translate(offset.negate());
        }

        this.c.save();
        this.c.translate(this.translateOffset.x, this.translateOffset.y);
        this.c.rotate(this.rotateAngle);
        this.c.scale(this.scale.x, this.scale.y);
        this.c.imageSmoothingEnabled = false;
        this.c.fillStyle = this._backgroundColor;
        this.c.fillRect(-this.translateOffset.x, -this.translateOffset.y, this.canvas.width, this.canvas.height);

        this.objects.forEach(object => {
            if (object.backgroundRendering) object.draw(this.c);
        });

        this.objects.forEach(object => {
            if (!object.backgroundRendering && !object.foregroundRendering) object.draw(this.c);
        });

        this.objects.forEach(object => {
            if (object.foregroundRendering) object.draw(this.c);
        })
        this.c.restore();
    }
}

export namespace CreateJS {
    export type KeyboardKey = typeof CreateJS.KeyboardEvent.Key[keyof typeof CreateJS.KeyboardEvent.Key];
    export type MouseEventType =  typeof CreateJS.MouseEvent.Type[keyof typeof CreateJS.MouseEvent.Type];
    export type SATCollisionInfo = {
        collided: true;
    } & {
        normal: CreateJS.Vec2;
        depth: number;
        contactPoint: CreateJS.Vec2;
    } | {
        collided: false;
    };
    export type KeyboardHandlerOptions = {
        type: "hold" | "press";
    };

    export type Shape = InstanceType<typeof CreateJS.Shape>;
    export type Point = InstanceType<typeof CreateJS.Point>;
    export type Line = InstanceType<typeof CreateJS.Line>;
    export type Rect = InstanceType<typeof CreateJS.Rect>;
    export type Area = InstanceType<typeof CreateJS.Area>;
    export type Vec2 = InstanceType<typeof CreateJS.Vec2>;
    export type Physics = InstanceType<typeof CreateJS.Physics>;
    export type KeyboardEvent = InstanceType<typeof CreateJS.KeyboardEvent>;
    export type Component = InstanceType<typeof CreateJS.Component>;
    export type TouchEvent = InstanceType<typeof CreateJS.TouchEvent>;
    export type TimeHandler = InstanceType<typeof CreateJS.TimeHandler>;
    export type Utils = InstanceType<typeof CreateJS.Utils>;
    export type Image = InstanceType<typeof CreateJS.Image>;
    export type Sprite = InstanceType<typeof CreateJS.Sprite>;

    export namespace Utils {
        export type Keyboard = InstanceType<typeof CreateJS.Utils.Keyboard>;
    }

    export namespace KeyboardEvent {
        export type Key = typeof CreateJS.KeyboardEvent.Key;
        export type Handler<ObjectType extends any> = InstanceType<typeof CreateJS.KeyboardEvent.Handler<ObjectType>>;
    }

    export namespace MouseEvent {
        export type Type = typeof CreateJS.MouseEvent.Type;
        export type Handler = InstanceType<typeof CreateJS.MouseEvent.Handler>;
    }
    
    export namespace TouchEvent {
        export type Handler = InstanceType<typeof CreateJS.TouchEvent.Handler>;
    }

    export namespace Shape {
        export type Anchors = typeof CreateJS.Shape.Anchors;
    }

    export namespace Physics {
        export type Rigidbody = InstanceType<typeof CreateJS.Physics.Rigidbody>;
    }
}

export default CreateJS;
