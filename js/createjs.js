function deepCloneObject(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (obj instanceof Date)
        return new Date(obj);
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
        x;
        y;
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        add(vec2) {
            if (typeof vec2 === "number") {
                this.x += vec2;
                this.y += vec2;
                return this;
            }
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        }
        sub(vec2) {
            if (typeof vec2 === "number") {
                this.x -= vec2;
                this.y -= vec2;
                return this;
            }
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        }
        mul(scalar) {
            if (typeof scalar === "object") {
                this.x *= scalar.x;
                this.y *= scalar.y;
            }
            else if (typeof scalar === "number") {
                this.x *= scalar;
                this.y *= scalar;
            }
            return this;
        }
        div(scalar) {
            if (typeof scalar === "object") {
                this.x /= scalar.x;
                this.y /= scalar.y;
            }
            else if (typeof scalar === "number") {
                this.x /= scalar;
                this.y /= scalar;
            }
            return this;
        }
        negate() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }
        normalize() {
            if (this.isZero()) {
                throw new Error("Normalized zero vector!");
            }
            const length = this.length();
            this.x /= length;
            this.y /= length;
            return this;
        }
        dot(vec2) {
            return this.x * vec2.x + this.y * vec2.y;
        }
        lerp(vec2, t) {
            this.x = this.x * (1 - t) + vec2.x * t;
            this.y = this.y * (1 - t) + vec2.y * t;
            return this;
        }
        clamp(minVec, maxVec) {
            this.x = this.x < minVec.x ? minVec.x : (this.x > maxVec.x ? maxVec.x : this.x);
            this.y = this.y < minVec.y ? minVec.y : (this.y > maxVec.y ? maxVec.y : this.y);
            return this;
        }
        min(vec2) {
            this.x = Math.min(this.x, vec2.x);
            this.y = Math.min(this.y, vec2.y);
            return this;
        }
        max(vec2) {
            this.x = Math.max(this.x, vec2.x);
            this.y = Math.max(this.y, vec2.y);
            return this;
        }
        perpendicular() {
            [this.x, this.y] = [-this.y, this.x];
            return this;
        }
        scaleTo(length) {
            this.normalize().mul(length);
            return this;
        }
        rotate(angle_radians) {
            const x = this.x * Math.cos(angle_radians) - this.y * Math.sin(angle_radians);
            const y = this.x * Math.sin(angle_radians) + this.y * Math.cos(angle_radians);
            this.x = x;
            this.y = y;
            return this;
        }
        reflect(vec2) {
            const n = vec2.clone().normalize();
            const x = this.x - 2 * this.dot(n) * n.x;
            const y = this.y - 2 * this.dot(n) * n.y;
            this.x = x;
            this.y = y;
            return this;
        }
        project(onto) {
            const vec2 = onto.clone().normalize();
            const dot = this.dot(vec2);
            this.x = dot * vec2.x;
            this.y = dot * vec2.y;
            return this;
        }
        cross(vec2) {
            return this.x * vec2.y - this.y * vec2.x;
        }
        angleTo(vec2) {
            return Math.acos(this.dot(vec2) / (this.length() * vec2.length()));
        }
        angle() {
            return Math.atan2(this.y, this.x);
        }
        abs() {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            return this;
        }
        floor(decimalPlace = 0) {
            this.x = Math.floor(this.x * 10 ** decimalPlace) / 10 ** decimalPlace;
            this.y = Math.floor(this.y * 10 ** decimalPlace) / 10 ** decimalPlace;
            return this;
        }
        ceil(decimalPlace = 0) {
            this.x = Math.ceil(this.x * 10 ** decimalPlace) / 10 ** decimalPlace;
            this.y = Math.ceil(this.y * 10 ** decimalPlace) / 10 ** decimalPlace;
            return this;
        }
        round(decimalPlace = 0) {
            this.x = Math.round(this.x * 10 ** decimalPlace) / 10 ** decimalPlace;
            this.y = Math.round(this.y * 10 ** decimalPlace) / 10 ** decimalPlace;
            return this;
        }
        length() {
            return Math.sqrt(this.x ** 2 + this.y ** 2);
        }
        clone() {
            return new CreateJS.Vec2(this.x, this.y);
        }
        isZero() {
            return this.x === 0 && this.y === 0;
        }
        equals(vec) {
            return this.x === vec.x && this.y === vec.y;
        }
        distanceTo(vec2) {
            return Math.sqrt((vec2.x - this.x) ** 2 + (vec2.y - this.y) ** 2);
        }
        vectorTo(vec2) {
            return vec2.clone().sub(this);
        }
        set(x, y) {
            if (typeof x === 'object' && x !== null && 'x' in x && 'y' in x) {
                this.x = x.x;
                this.y = x.y;
            }
            else if (typeof x === 'number' && typeof y === 'number') {
                this.x = x;
                this.y = y;
            }
            return this;
        }
        up() {
            this.set(0, -1);
            return this;
        }
        down() {
            this.set(0, 1);
            return this;
        }
        left() {
            this.set(-1, 0);
            return this;
        }
        right() {
            this.set(1, 0);
            return this;
        }
        zero() {
            this.set(0, 0);
            return this;
        }
        toArray() {
            return [this.x, this.y];
        }
        toString() {
            return `x: ${this.x}, y: ${this.y}`;
        }
        toLine(startX = 0, startY = 0) {
            return new CreateJS.Line(startX, startY, startX + this.x, startY + this.y);
        }
        toPoint() {
            return new CreateJS.Point(this.x, this.y);
        }
        static fromArray(arr) {
            return new CreateJS.Vec2(arr[0], arr[1]);
        }
    };
    static Math = class CreateJS_Math {
        static degToRad(degrees) {
            return degrees * Math.PI / 180;
        }
        static radToDeg(radians) {
            return radians * 180 / Math.PI;
        }
        static clamp(num, min, max) {
            return num < min ? min : (num > max ? max : num);
        }
        static random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        static framesToFPS(frames) {
            return 1 / frames;
        }
    };
    static Utils = class Utils {
        static Mouse = class Utils_Mouse {
            static DragObject(bindedObject, target, offset, event, initialEvent, initialBinded) {
                if (typeof bindedObject === "object"
                    && bindedObject instanceof HTMLElement) {
                    const x = initialBinded.getBoundingClientRect().left;
                    const y = initialBinded.getBoundingClientRect().top;
                    const width = initialBinded.getBoundingClientRect().right - x;
                    const height = initialBinded.getBoundingClientRect().bottom - y;
                    const rect = new CreateJS.Rect(x, y, width, height);
                    const isMouseOver = rect.containsPoint(new CreateJS.Vec2(initialEvent.clientX, initialEvent.clientY));
                    if (isMouseOver) {
                        const pos = new CreateJS.Vec2(x, y);
                        pos.add(offset);
                        bindedObject.style.left = pos.x + "px";
                        bindedObject.style.top = pos.y + "px";
                    }
                }
                if (typeof bindedObject === "object"
                    && bindedObject instanceof CreateJS.Physics.Rigidbody) {
                    const vec = new CreateJS.Vec2(initialEvent.clientX, initialEvent.clientY);
                    if (CreateJS.mainThread) {
                        console.log(vec, CreateJS.mainThread.translateOffset, initialBinded.position);
                        vec.sub(CreateJS.mainThread.translateOffset);
                    }
                    ;
                    if (initialBinded.containsPoint(vec)) {
                        bindedObject.position.add(offset);
                        bindedObject.velocity.zero();
                        bindedObject.acceleration.zero();
                    }
                }
            }
        };
        static Keyboard = class Utils_Keyboard {
            static MoveLeft(bindedObject) {
            }
        };
    };
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
        FromRGBA: (red, green, blue, alpha = 1) => {
            return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        },
        FromHSLA: (hue, saturation, lightness, alpha = 1) => {
            return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        },
        FromHex: (hex) => {
            return `#${hex}`;
        }
    };
    static TouchEvent = class CreateJS_TouchEvent {
        static Handler = class TouchEvent_Handler {
            _unhandle = false;
            _pinch = false;
            _pinchCallbacks = [];
            _rotate = false;
            _rotateCallbacks = [];
            _touches = {
                length: 0,
                item: function (index) {
                    return null;
                }
            };
            _previousTouches = {
                length: 0,
                item: function (index) {
                    return null;
                }
            };
            _callbacks = new Map();
            _options;
            constructor(options = { preventDefault: false }) {
                this._options = options;
                addEventListener("touchstart", (event) => {
                    if (this._options.preventDefault)
                        event.preventDefault();
                    this._touches = event.touches;
                });
                addEventListener("touchmove", (event) => {
                    if (this._options.preventDefault)
                        event.preventDefault();
                    this._touches = event.touches;
                });
                addEventListener("touchend", (event) => {
                    if (this._options.preventDefault)
                        event.preventDefault();
                    this._touches = event.touches;
                });
            }
            async handle(fps) {
                let pinchBeforeDistance = null;
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
            unhandle() {
                this._unhandle = false;
                return this;
            }
            register(id, callback) {
                this._callbacks.set(id, callback);
            }
            unregister(id) {
                this._callbacks.delete(id);
            }
            pinch(callback) {
                this._pinch = true;
                this._pinchCallbacks.push(callback);
            }
            pinch$(pinchBeforeDistance) {
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
                        return distance;
                    }
                    else {
                        return null;
                    }
                }
                return null;
            }
            rotate(callback) {
                this._rotate = true;
                this._rotateCallbacks.push(callback);
            }
            rotate$() {
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
        };
    };
    static MouseEvent = class CreateJS_MouseEvent {
        static Type = {
            Drag: "Drag",
            Click: "Click",
            DoubleClick: "DoubleClick",
        };
        static Handler = class MouseEvent_Handler {
            _binded;
            _callbacks = [];
            _unhandle = false;
            _mouseDown;
            _mouseUp;
            _dblClick;
            _mouseMove;
            _beforeMouseMove;
            _initialEvent;
            _initialBinded;
            constructor() {
                addEventListener("mousedown", (event) => {
                    this._mouseDown = event;
                    this._mouseMove = event;
                    this._initialEvent = event;
                    this._initialBinded = deepCloneObject(this._binded);
                });
                addEventListener("mouseup", (event) => {
                    this._mouseUp = event;
                });
                addEventListener("mousemove", (event) => {
                    this._mouseMove = event;
                });
                addEventListener("dblclick", (event) => {
                    this._dblClick = event;
                });
            }
            async handle(fps) {
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
            unhandle() {
                this._unhandle = true;
            }
            bind(object) {
                this._binded = object;
                return this;
            }
            register(type, callback) {
                this._callbacks.push({ type, callback });
            }
            unregister(type) {
                this._callbacks = this._callbacks.filter(callback => callback.type !== type);
            }
        };
    };
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
        static Handler = class KeyboardEvent_Handler {
            heldKeys = new Set();
            pressedKeys = new Map();
            callbacks = new Map();
            _unhandle = false;
            _binded;
            constructor() {
                addEventListener("keydown", (event) => {
                    this.heldKeys.add(event.code);
                    if (!this.pressedKeys.has(event.code)) {
                        this.pressedKeys.set(event.code, true);
                    }
                });
                addEventListener("keyup", (event) => {
                    this.heldKeys.delete(event.code);
                    this.pressedKeys.delete(event.code);
                });
            }
            bind(object) {
                this._binded = object;
                return this;
            }
            async handle(fps) {
                while (true) {
                    if (this._unhandle) {
                        this._unhandle = false;
                        return;
                    }
                    for (let key of this.heldKeys) {
                        if (this.callbacks.has(key)) {
                            if (this.callbacks.get(key).options.type === "hold") {
                                this.callbacks.get(key).callback(this._binded);
                            }
                        }
                    }
                    for (let [key] of this.pressedKeys) {
                        if (this.callbacks.has(key)) {
                            if (this.pressedKeys.get(key)) {
                                if (this.callbacks.get(key).options.type === "press") {
                                    this.callbacks.get(key).callback(this._binded);
                                    this.pressedKeys.set(key, false);
                                }
                            }
                        }
                    }
                    await CreateJS.TimeHandler.wait(fps * 1000);
                }
            }
            unhandle() {
                this._unhandle = true;
            }
            register(key, callback, options = { type: "hold" }) {
                this.callbacks.set(key, { callback, options });
            }
            unregister(key) {
                this.callbacks.delete(key);
            }
        };
    };
    static Component = class CreateJS_Component {
        static components = [];
        id;
        classList;
        filePath;
        stylePath;
        component;
        constructor(componentID, classList, filePath, stylePath) {
            this.id = componentID;
            this.classList = classList;
            this.filePath = filePath;
            this.stylePath = stylePath;
        }
        async generate(atId) {
            if (!atId) {
                this.component = document.createElement("div");
                const element = await (await fetch(this.filePath)).text();
                this.component.innerHTML = element;
                document.body.appendChild(this.component);
            }
            else {
                this.component = document.createElement("div");
                const element = await (await fetch(this.filePath)).text();
                this.component.innerHTML = element;
                const foundElement = document.getElementById(atId);
                if (!foundElement)
                    throw new Error("Element " + atId + " was not found!");
                foundElement.appendChild(this.component);
            }
            this.addClass(...this.classList);
            const styleComponent = document.createElement("style");
            const styles = await (await fetch(this.stylePath)).text();
            styleComponent.innerHTML = styles;
            document.head.appendChild(styleComponent);
        }
        remove() {
            if (!this.component)
                throw new Error("Component does not exist!");
            this.component.remove();
            this.component = undefined;
        }
        hide() {
            if (!this.component)
                throw new Error("Component does not exist!");
            this.component.style.visibility = "hidden";
        }
        show() {
            if (!this.component)
                throw new Error("Component does not exist!");
            this.component.style.visibility = "visible";
        }
        addClass(...classNames) {
            if (!this.component)
                throw new Error("Component does not exist!");
            this.component.classList.add(...classNames);
        }
        removeClass(...classNames) {
            if (!this.component)
                throw new Error("Component does not exist!");
            this.component.classList.remove(...classNames);
        }
    };
    static Point = class CreateJS_Point {
        position;
        _fillColor = "white";
        _strokeColor = "white";
        _size = 1;
        _fill = false;
        _stroke = false;
        constructor(x, y) {
            this.position = new CreateJS.Vec2(x, y);
        }
        size(size) {
            this._size = size;
            return this;
        }
        strokeColor(color) {
            this._strokeColor = color;
            return this;
        }
        fillColor(color) {
            this._fillColor = color;
            return this;
        }
        stroke() {
            this._stroke = this._stroke;
            return this;
        }
        fill() {
            this._fill = !this._fill;
            return this;
        }
        toVec2() {
            return new CreateJS.Vec2(this.position.x, this.position.y);
        }
        draw(c) {
            c.beginPath();
            c.fillStyle = this._fillColor;
            c.strokeStyle = this._strokeColor;
            c.arc(this.position.x, this.position.y, this._size, 0, 2 * Math.PI);
            if (this._fill)
                c.fill();
        }
    };
    static Line = class CreateJS_Line {
        x1;
        y1;
        x2;
        y2;
        _width = 1;
        _color = "white";
        _stroke = false;
        constructor(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        width(width) {
            this._width = width;
            return this;
        }
        color(color) {
            this._color = color;
            return this;
        }
        stroke() {
            this._stroke = !this._stroke;
            return this;
        }
        draw(c) {
            c.beginPath();
            c.lineWidth = this._width;
            c.strokeStyle = this._color;
            c.moveTo(this.x1, this.y1);
            c.lineTo(this.x2, this.y2);
            if (this._stroke)
                c.stroke();
            c.closePath();
        }
        toVec2() {
            return new CreateJS.Vec2(this.x2 - this.x1, this.y2 - this.y1);
        }
    };
    static Shape = class CreateJS_Shape {
        static Anchors = {
            TopLeft: "TopLeft",
            TopRight: "TopRight",
            BottomRight: "BottomRight",
            BottomLeft: "BottomLeft"
        };
        _fillColor = "white";
        _strokeColor = "white";
        _strokeWidth = 0;
        _fill = false;
        _stroke = false;
        backgroundRendering = false;
        foregroundRendering = false;
        bindedShapes = [];
        _position;
        constructor(x, y) {
            this._position = new CreateJS.Vec2(x, y);
            this.position = new CreateJS.Vec2(x, y);
        }
        set position(value) {
            const difference = this._position.clone().sub(value);
            this.bindedShapes.forEach(shape => {
                shape.position.add(difference);
            });
            this._position = value;
        }
        get position() {
            return this._position;
        }
        fill(fill = true) {
            this._fill = fill;
            return this;
        }
        stroke(stroke = true) {
            this._stroke = stroke;
            return this;
        }
        strokeWidth(strokeWidth) {
            this._strokeWidth = strokeWidth;
            return this;
        }
        strokeColor(strokeColor) {
            this._strokeColor = strokeColor;
            return this;
        }
        fillColor(fillColor) {
            this._fillColor = fillColor;
            return this;
        }
        bind(shape) {
            this.bindedShapes.push(shape);
            return this;
        }
        setBackgroundRendering(backgroundRendering) {
            this.backgroundRendering = backgroundRendering;
            return this;
        }
        setForegroundRendering(foregroundRendering) {
            this.foregroundRendering = foregroundRendering;
            return this;
        }
        get x() {
            return this.position.x;
        }
        get y() {
            return this.position.y;
        }
        draw(c) {
            throw new Error("Function not implemented");
        }
    };
    static Rect = class CreateJS_Rect extends CreateJS.Shape {
        size;
        constructor(x, y, width, height) {
            super(x, y);
            this.size = new CreateJS.Vec2(width, height);
        }
        get width() {
            return this.size.x;
        }
        get height() {
            return this.size.y;
        }
        clone() {
            return deepCloneObject(this);
        }
        collidesWith(other) {
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
            if (!collides)
                return { collides };
            const overlapX = Math.min(thisRight, otherRight) - Math.max(thisLeft, otherLeft);
            const overlapY = Math.min(thisBottom, otherBottom) - Math.max(thisTop, otherTop);
            let depth, normal;
            if (overlapX < overlapY) {
                depth = overlapX;
                const direction = this.center().x - other.center().x;
                normal = new CreateJS.Vec2(Math.sign(direction), 0);
            }
            else {
                depth = overlapY;
                const direction = this.center().y - other.center().y;
                normal = new CreateJS.Vec2(0, Math.sign(direction));
            }
            return {
                collides,
                depth,
                normal
            };
        }
        containsPoint(point) {
            return point.x <= this.x + this.width && point.x >= this.x && point.y <= this.y + this.height && point.y >= this.y;
        }
        containsPointExclusive(point) {
            return point.x < this.x + this.width && point.x > this.x && point.y < this.y + this.height && point.y > this.y;
        }
        right() {
            return this.x + this.width;
        }
        left() {
            return this.x;
        }
        top() {
            return this.y;
        }
        bottom() {
            return this.y + this.height;
        }
        center() {
            return new CreateJS.Vec2(this.x + this.width / 2, this.y + this.height / 2);
        }
        draw(c) {
            c.beginPath();
            c.lineWidth = this._strokeWidth;
            c.fillStyle = this._fillColor;
            c.strokeStyle = this._strokeColor;
            c.rect(this.x, this.y, this.width, this.height);
            if (this._fill)
                c.fill();
            if (this._stroke)
                c.stroke();
            c.closePath();
        }
    };
    static Physics = class CreateJS_Physics {
        static Rigidbody = class Physics_Rigidbody extends CreateJS.Rect {
            velocity = new CreateJS.Vec2();
            acceleration = new CreateJS.Vec2();
            drag = 0.9;
            friction = 0.99;
            isStatic;
            constructor(isStatic, x, y, width, height) {
                let xNum, yNum, widthNum, heightNum;
                let rect;
                if (typeof x === "object") {
                    xNum = x.x;
                    yNum = x.y;
                    widthNum = x.width;
                    heightNum = x.height;
                    rect = x;
                }
                else {
                    xNum = x;
                    yNum = y;
                    widthNum = width;
                    heightNum = height;
                }
                super(xNum, yNum, widthNum, heightNum);
                this.isStatic = isStatic;
                if (rect) {
                    Object.assign(this, deepCloneObject(rect));
                }
            }
            setVelocity(velocity) {
                this.velocity.set(velocity);
            }
            getVelocity() {
                return this.velocity.clone();
            }
            setAcceleration(acceleration) {
                this.acceleration.set(acceleration);
            }
            getAcceleration() {
                return this.acceleration.clone();
            }
            setDrag(drag) {
                this.drag = drag;
            }
            getDrag() {
                return this.drag;
            }
            setFriction(friction) {
                this.friction = friction;
            }
            getFriction() {
                return this.friction;
            }
            addAcceleration(acceleration) {
                this.acceleration.add(acceleration);
            }
            addVelocity(velocity) {
                this.velocity.add(velocity);
            }
            nextUpdateCollidesWith(other) {
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
                if (!collides)
                    return { collides };
                const overlapX = Math.min(thisRight, otherRight) - Math.max(thisLeft, otherLeft);
                const overlapY = Math.min(thisBottom, otherBottom) - Math.max(thisTop, otherTop);
                let depth, normal;
                if (overlapX < overlapY) {
                    depth = overlapX;
                    const direction = this.center().x - other.center().x;
                    normal = new CreateJS.Vec2(Math.sign(direction), 0);
                }
                else {
                    depth = overlapY;
                    const direction = this.center().y - other.center().y;
                    normal = new CreateJS.Vec2(0, Math.sign(direction));
                }
                return {
                    collides,
                    depth,
                    normal
                };
            }
            update(time, bodies) {
                if (!this.isStatic) {
                    this.velocity.add(this.getAcceleration().mul(time));
                    this.velocity.mul(this.drag ** time);
                }
                bodies.forEach(body => {
                    if (this === body)
                        return;
                    if (this.bottom() + this.velocity.y * time >= body.top() + body.velocity.y * time && this.bottom() <= body.top() && this.left() <= body.right() && this.right() >= body.left()) {
                        this.position.add(new CreateJS.Vec2(0, body.top() + body.velocity.y - this.bottom()));
                        this.velocity.set(this.velocity.x, 0);
                    }
                    if (body.isStatic) {
                        if (this.left() + this.velocity.x * time <= body.right() + body.velocity.x * time && this.left() >= body.right() && this.top() <= body.bottom() && this.bottom() >= body.top()) {
                            this.position.add(new CreateJS.Vec2(this.left() - body.right(), 0));
                            this.velocity.set(0, this.velocity.y);
                        }
                        if (this.right() + this.velocity.x * time >= body.left() + body.velocity.x * time && this.right() <= body.left() && this.top() <= body.bottom() && this.bottom() >= body.top()) {
                            this.position.add(new CreateJS.Vec2(body.left() - this.right(), 0));
                            this.velocity.set(0, this.velocity.y);
                        }
                        const collides = this.collidesWith(body);
                        if (collides.collides) {
                            const newPos = collides.normal.clone().mul(collides.depth);
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
        };
        bodies = [];
        gravity = new CreateJS.Vec2();
        constructor() { }
        setGravity(gravity) {
            this.gravity.set(gravity);
        }
        getGravity() {
            return this.gravity;
        }
        addBody(...bodies) {
            this.bodies.push(...bodies);
            return this;
        }
        update(time) {
            this.bodies.forEach(body => {
                body.addAcceleration(this.gravity);
                body.update(time, this.bodies);
            });
        }
    };
    static Image = class CreateJS_Image {
        canvas = document.createElement("canvas");
        c = this.canvas.getContext("2d");
        image;
        frameWidth;
        frameHeight;
        frameTime;
        frames;
        isStatic = true;
        currentFrame = 0;
        constructor(img, isStatic = true, frameWidth = 0, frameHeight = 0, frameTime = 0) {
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
        nextFrame() {
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
    };
    static Sprite = class CreateJS_Sprite extends CreateJS.Physics.Rigidbody {
        image = new CreateJS.Image();
        frame = document.createElement("canvas");
        canDrawFrame = true;
        debug;
        timeout;
        hitbox = [];
        constructor(isStatic, image, hitbox, debug, x, y, width, height) {
            let xNum, yNum, widthNum, heightNum;
            let rect;
            if (typeof x === "object") {
                xNum = x.x;
                yNum = x.y;
                widthNum = x.width;
                heightNum = x.height;
                rect = x;
            }
            else {
                xNum = x;
                yNum = y;
                widthNum = width;
                heightNum = height;
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
        get width() {
            return this.size.x;
        }
        get height() {
            return this.size.y;
        }
        setImage(image) {
            this.image = image;
            clearTimeout(this.timeout);
            return this;
        }
        addHitbox(...hitbox) {
            hitbox.forEach(hb => {
                this.hitbox.push(deepCloneObject(hb));
                this.bind(hb);
            });
        }
        draw(c) {
            super.draw(c);
            if (this.debug) {
                this.hitbox.forEach(hitbox => {
                    hitbox.fill(false).strokeColor("red").strokeWidth(2).stroke();
                    hitbox.draw(c);
                });
            }
            if (this.image.image) {
                if (this.canDrawFrame && !this.image.isStatic) {
                    this.canDrawFrame = false;
                    this.frame = this.image.nextFrame();
                    this.timeout = setTimeout(() => {
                        this.canDrawFrame = true;
                    }, this.image.frameTime);
                }
                ;
                if (this.image.isStatic) {
                    this.frame = this.image.nextFrame();
                }
                c.drawImage(this.frame, this.x, this.y, this.width, this.height);
            }
        }
    };
    static TimeHandler = class CreateJS_TimeHandler {
        static timeBefore = 0;
        static _stop = false;
        static _pause = false;
        static wait(ms) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, ms);
            });
        }
        static Preload = class Preload {
            static async images(urls) {
                const images = urls.map(url => this.loadImage(url));
                const loadedImages = await Promise.all(images);
                const object = {};
                loadedImages.forEach((image, index) => {
                    object[urls[index]] = image;
                });
                return object;
            }
            static async sounds(urls) {
                const sounds = urls.map(url => this.loadSound(url));
                const loadedSounds = await Promise.all(sounds);
                const object = {};
                loadedSounds.forEach((sound, index) => {
                    object[urls[index]] = sound;
                });
                return object;
            }
            static loadImage(url) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                    img.src = url;
                });
            }
            static loadSound(url) {
                return new Promise((resolve, reject) => {
                    const audio = new Audio(url);
                    audio.onloadeddata = () => {
                        resolve(audio);
                    };
                    audio.onerror = reject;
                });
            }
        };
        static async tick(fps, callback) {
            let tick = 0;
            CreateJS.TimeHandler.timeBefore = performance.now();
            while (true) {
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
        static stop() {
            CreateJS.TimeHandler.timeBefore = 0;
            CreateJS.TimeHandler._stop = true;
        }
        static pause() {
            CreateJS.TimeHandler._pause = true;
        }
        static resume() {
            CreateJS.TimeHandler._pause = false;
        }
    };
    static mainThread = undefined;
    canvas;
    c;
    _binded;
    _center = new CreateJS.Vec2(innerWidth / 2, innerHeight / 2);
    rotateAngle = 0;
    translateOffset = new CreateJS.Vec2();
    scale = new CreateJS.Vec2(1, 1);
    _backgroundColor = "white";
    type;
    constructor(canvas, type) {
        this.canvas = canvas;
        this.c = canvas.getContext("2d");
        this.type = type;
        if (this.type === "main") {
            CreateJS.mainThread = this;
        }
    }
    init() {
        document.body.style.cssText = `
            margin: 0;
            overflow: hidden;
        `;
        this.canvas.style.cssText = `
            image-rendering: pixelated;
        `;
        this.c.imageSmoothingEnabled = false;
        return this;
    }
    resizeCanvas(x, y) {
        this.canvas.width = x;
        this.canvas.height = y;
        return this;
    }
    backgroundColor(color) {
        this._backgroundColor = color;
        return this;
    }
    bind(object, center) {
        this._binded = object;
        if (center)
            this._center = center;
        return this;
    }
    unbind() {
        this._binded = undefined;
        return this;
    }
    rotate(angle) {
        this.rotateAngle = angle;
        return this;
    }
    setScale(size) {
        this.scale = size;
        return this;
    }
    translate(offset) {
        this.translateOffset = offset;
        return this;
    }
    render(...objects) {
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
        objects.forEach(object => {
            if (object.backgroundRendering)
                object.draw(this.c);
        });
        objects.forEach(object => {
            if (!object.backgroundRendering && !object.foregroundRendering)
                object.draw(this.c);
        });
        objects.forEach(object => {
            if (object.foregroundRendering)
                object.draw(this.c);
        });
        this.c.restore();
    }
}
export default CreateJS;
