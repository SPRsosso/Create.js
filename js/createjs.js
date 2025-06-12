var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e, _f, _g;
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
    constructor(canvas) {
        this._backgroundColor = "white";
        this.canvas = canvas;
        this.c = canvas.getContext("2d");
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
    render(...objects) {
        this.c.imageSmoothingEnabled = false;
        this.c.fillStyle = this._backgroundColor;
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (objects) {
            objects.forEach(object => {
                object.draw(this.c);
            });
        }
    }
}
CreateJS.Vec2 = class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(vec2) {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    }
    sub(vec2) {
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
        this.x = Math.floor(this.x * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
        this.y = Math.floor(this.y * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
        return this;
    }
    ceil(decimalPlace = 0) {
        this.x = Math.ceil(this.x * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
        this.y = Math.ceil(this.y * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
        return this;
    }
    round(decimalPlace = 0) {
        this.x = Math.round(this.x * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
        this.y = Math.round(this.y * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
        return this;
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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
        return Math.sqrt(Math.pow((vec2.x - this.x), 2) + Math.pow((vec2.y - this.y), 2));
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
CreateJS.Math = class CreateJS_Math {
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
};
CreateJS.Utils = (_a = class Utils {
    },
    _a.Mouse = class Utils_Mouse {
        static DragObject(bindedObject, target, offset, event) {
            if (typeof bindedObject === "object"
                && bindedObject instanceof HTMLElement) {
                const x = bindedObject.getBoundingClientRect().left;
                const y = bindedObject.getBoundingClientRect().top;
                const width = bindedObject.getBoundingClientRect().right - x;
                const height = bindedObject.getBoundingClientRect().bottom - y;
                const rect = CreateJS.ConvexPolygon.createRect(x, y, width, height);
                const isMouseOver = rect.containsPoint(new CreateJS.Vec2(event.clientX, event.clientY));
                if (isMouseOver) {
                    const pos = new CreateJS.Vec2(x, y);
                    pos.add(offset);
                    bindedObject.style.left = pos.x + "px";
                    bindedObject.style.top = pos.y + "px";
                }
            }
            if (typeof bindedObject === "object"
                && bindedObject instanceof CreateJS.Physics.Rigidbody) {
                const vec = new CreateJS.Vec2(event.clientX, event.clientY);
                if (bindedObject.containsPoint(vec)) {
                    bindedObject.position.add(offset);
                }
            }
        }
    },
    _a.Keyboard = class Utils_Keyboard {
        static MoveLeft(bindedObject) {
        }
    },
    _a);
CreateJS.Colors = {
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
CreateJS.TouchEvent = (_b = class CreateJS_TouchEvent {
    },
    _b.Handler = class TouchEvent_Handler {
        constructor(options = { preventDefault: false }) {
            this._unhandle = false;
            this._pinch = false;
            this._pinchCallbacks = [];
            this._rotate = false;
            this._rotateCallbacks = [];
            this._touches = {
                length: 0,
                item: function (index) {
                    return null;
                }
            };
            this._previousTouches = {
                length: 0,
                item: function (index) {
                    return null;
                }
            };
            this._callbacks = new Map();
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
        handle(fps) {
            return __awaiter(this, void 0, void 0, function* () {
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
                    yield CreateJS.TimeHandler.wait(fps);
                }
            });
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
    },
    _b);
CreateJS.MouseEvent = (_c = class CreateJS_MouseEvent {
    },
    _c.Type = {
        Drag: "Drag",
        Click: "Click",
        DoubleClick: "DoubleClick",
    },
    _c.Handler = class MouseEvent_Handler {
        constructor() {
            this._callbacks = [];
            this._unhandle = false;
            addEventListener("mousedown", (event) => {
                this._mouseDown = event;
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
        handle(fps) {
            return __awaiter(this, void 0, void 0, function* () {
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
                        if (callback.type === CreateJS.MouseEvent.Type.Drag && this._mouseDown && this._mouseMove && this._beforeMouseMove) {
                            const offset = new CreateJS.Vec2(this._mouseMove.clientX, this._mouseMove.clientY);
                            offset.sub(new CreateJS.Vec2(this._beforeMouseMove.clientX, this._beforeMouseMove.clientY));
                            callback.callback(this._binded, this._mouseMove.target, offset, this._mouseMove);
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
                    yield CreateJS.TimeHandler.wait(fps);
                }
            });
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
    },
    _c);
CreateJS.KeyboardEvent = (_d = class CreateJS_KeyboardEvent {
    },
    _d.Key = {
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
    },
    _d.Handler = class KeyboardEvent_Handler {
        constructor() {
            this.heldKeys = new Set();
            this.pressedKeys = new Map();
            this.callbacks = new Map();
            this._unhandle = false;
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
        handle(fps) {
            return __awaiter(this, void 0, void 0, function* () {
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
                    yield CreateJS.TimeHandler.wait(fps);
                }
            });
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
    },
    _d);
CreateJS.Point = class CreateJS_Point {
    constructor(x, y) {
        this._fillColor = "white";
        this._strokeColor = "white";
        this._size = 1;
        this._fill = false;
        this._stroke = false;
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
CreateJS.Line = class CreateJS_Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this._width = 1;
        this._color = "white";
        this._stroke = false;
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
CreateJS.Shape = (_e = class CreateJS_Shape {
        constructor(x, y) {
            this._fillColor = "white";
            this._strokeColor = "white";
            this._strokeWidth = 0;
            this._fill = false;
            this._stroke = false;
            this.position = new CreateJS.Vec2(x, y);
        }
        fill() {
            this._fill = !this._fill;
            return this;
        }
        stroke() {
            this._stroke = !this._stroke;
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
        get x() {
            return this.position.x;
        }
        get y() {
            return this.position.y;
        }
        draw(c) {
            throw new Error("Function not implemented");
        }
    },
    _e.Anchors = {
        TopLeft: "TopLeft",
        TopRight: "TopRight",
        BottomRight: "BottomRight",
        BottomLeft: "BottomLeft"
    },
    _e);
CreateJS.ConvexPolygon = class CreateJS_ConvexPolygon extends CreateJS.Shape {
    constructor(x, y, ...args) {
        super(x, y);
        this.points = [];
        this._minScale = -Infinity;
        this._maxScale = Infinity;
        this.points = args;
    }
    draw(c) {
        c.beginPath();
        for (let i = 0; i < this.points.length; i++) {
            const pointPosition = this.position.clone().add(this.points[i]);
            c.lineTo(pointPosition.x, pointPosition.y);
        }
        c.closePath();
        c.lineWidth = this._strokeWidth;
        c.fillStyle = this._fillColor;
        c.strokeStyle = this._strokeColor;
        if (this._fill)
            c.fill();
        if (this._stroke)
            c.stroke();
    }
    center() {
        let area = 0;
        let cx = 0;
        let cy = 0;
        const n = this.points.length;
        for (let i = 0; i < n; i++) {
            const curr = this.points[i].clone().add(this.position);
            const next = this.points[(i + 1) % n].clone().add(this.position);
            const cross = curr.cross(next);
            area += cross;
            cx += (curr.x + next.x) * cross;
            cy += (curr.y + next.y) * cross;
        }
        area *= 0.5;
        if (area === 0) {
            throw new Error("Polygon has zero area (possibly degenerate)");
        }
        cx /= 6 * area;
        cy /= 6 * area;
        return new CreateJS.Vec2(cx, cy);
    }
    translate(x, y) {
        this.position.add(new CreateJS.Vec2(x, y));
        return this;
    }
    scaleFrom(factor, origin = this.center()) {
        if (typeof factor === "number") {
            this.points.forEach(v => {
                v.add(this.position).sub(origin).mul(factor).add(this.position.vectorTo(origin));
            });
            if (this.area() * factor < this._minScale) {
                this.scaleTo(this._minScale);
            }
            if (this.area() * factor > this._maxScale) {
                this.scaleTo(this._maxScale);
            }
        }
        else if (typeof factor === "object") {
            this.points.forEach(v => {
                v.add(this.position).sub(origin).mul(factor).add(this.position.vectorTo(origin));
            });
            if ((this.area() * factor.x < this._minScale || this.area() * factor.y < this._minScale)) {
                this.scaleTo(this._minScale);
            }
            if ((this.area() * factor.x > this._maxScale || this.area() * factor.y > this._maxScale)) {
                this.scaleTo(this._maxScale);
            }
        }
        return this;
    }
    getVerticesPositions() {
        return this.points.map(p => p.clone().add(this.position));
    }
    getBoundingBox() {
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        for (const v of this.points) {
            if (v.x < minX)
                minX = v.x;
            if (v.y < minY)
                minY = v.y;
            if (v.x > maxX)
                maxX = v.x;
            if (v.y > maxY)
                maxY = v.y;
        }
        return CreateJS.ConvexPolygon.createRect(this.position.x + minX, this.position.y + minY, maxX - minX, maxY - minY);
    }
    getNormals() {
        const normals = [];
        for (let i = 0; i < this.points.length; i++) {
            const current = this.points[i].clone();
            const next = this.points[(i + 1) % this.points.length].clone();
            const edge = next.sub(current);
            const normal = edge.perpendicular().normalize();
            normals.push(normal);
        }
        return normals;
    }
    area() {
        let total = 0;
        const n = this.points.length;
        for (let i = 0; i < n; i++) {
            const current = this.points[i];
            const next = this.points[(i + 1) % n];
            total += current.x * next.y - next.x * current.y;
        }
        return Math.abs(total) / 2;
    }
    perimeter() {
        let total = 0;
        for (let i = 0; i < this.points.length; i++) {
            const current = this.points[i];
            const next = this.points[(i + 1) % this.points.length];
            total += current.distanceTo(next);
        }
        return total;
    }
    rotate(angle, origin = this.center()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        this.points = this.points.map(p => {
            const point = this.position.clone().add(p);
            const dx = point.x - origin.x;
            const dy = point.y - origin.y;
            const rotated = new CreateJS.Vec2(origin.x + dx * cos - dy * sin, origin.y + dx * sin + dy * cos);
            return rotated.sub(this.position);
        });
        return this;
    }
    getClosestVertexTo(point) {
        const points = this.getVerticesPositions();
        let minDist = Infinity;
        let minPoint = points[0];
        for (let p of points) {
            if (p.distanceTo(point) < minDist) {
                minDist = p.distanceTo(point);
                minPoint = p;
            }
            ;
        }
        return minPoint;
    }
    getFarthestPointInDirection(dir) {
        let farthest = this.getVerticesPositions()[0];
        let maxDot = -Infinity;
        for (let v of this.getVerticesPositions()) {
            const dot = v.dot(dir);
            if (dot > maxDot) {
                maxDot = dot;
                farthest = v;
            }
        }
        return farthest;
    }
    isConvex() {
        const verts = this.getVerticesPositions();
        let sign = null;
        for (let i = 0; i < verts.length; i++) {
            const a = verts[i].clone();
            const b = verts[(i + 1) % verts.length].clone();
            const c = verts[(i + 2) % verts.length].clone();
            const ab = b.clone().sub(a);
            const bc = c.clone().sub(b);
            const cross = ab.cross(bc);
            if (cross !== 0) {
                if (sign === null) {
                    sign = Math.sign(cross);
                }
                else if (Math.sign(cross) !== sign) {
                    return false;
                }
            }
        }
        return true;
    }
    getSides() {
        const points = this.getVerticesPositions();
        const sides = [];
        const n = points.length;
        for (let i = 0; i < n; i++) {
            sides.push({ a: new CreateJS.Vec2(points[i].x, points[i].y), b: new CreateJS.Vec2(points[(i + 1) % n].x, points[(i + 1) % n].y) });
        }
        return sides;
    }
    intersectsWith(other) {
        const axesA = this.getNormals();
        const axesB = other.getNormals();
        const axes = axesA.concat(axesB);
        let minOverlap = Infinity;
        let smallestAxis = null;
        for (const axis of axes) {
            const projA = this.project(axis);
            const projB = other.project(axis);
            if (!(projA.max >= projB.min && projB.max >= projA.min)) {
                return {
                    collided: false
                };
            }
            const overlap = Math.min(projA.max, projB.max) - Math.max(projA.min, projB.min);
            if (overlap < minOverlap) {
                minOverlap = overlap;
                smallestAxis = axis;
            }
        }
        if (!smallestAxis) {
            return { collided: false };
        }
        const centerDelta = other.center().sub(this.center());
        if (centerDelta.dot(smallestAxis) < 0) {
            smallestAxis = smallestAxis.mul(-1);
        }
        const contactPoints = [];
        for (const vertex of this.getVerticesPositions()) {
            if (other.containsPoint(vertex)) {
                contactPoints.push(vertex);
            }
        }
        for (const vertex of other.getVerticesPositions()) {
            if (this.containsPoint(vertex)) {
                contactPoints.push(vertex);
            }
        }
        let contactPoint;
        if (contactPoints.length > 0) {
            const sum = contactPoints.reduce((acc, v) => acc.add(v), new CreateJS.Vec2(0, 0));
            contactPoint = sum.mul(1 / contactPoints.length);
        }
        else {
            contactPoint = this.center().add(other.center()).mul(0.5);
        }
        return {
            collided: true,
            normal: smallestAxis.normalize(),
            depth: minOverlap,
            contactPoint: contactPoint
        };
    }
    containsPoint(point) {
        const sides = this.getSides();
        let count = 0;
        const x = point.x;
        const y = point.y;
        sides.forEach(side => {
            const x1 = side.a.x;
            const x2 = side.b.x;
            const y1 = side.a.y;
            const y2 = side.b.y;
            if (y < y1 !== y < y2 && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) {
                count++;
            }
        });
        return count % 2 !== 0;
    }
    project(axis) {
        let min = Infinity;
        let max = -Infinity;
        for (let v of this.getVerticesPositions()) {
            const projection = v.dot(axis);
            if (projection < min)
                min = projection;
            if (projection > max)
                max = projection;
        }
        return { min, max };
    }
    scaleTo(area) {
        const currentArea = this.area(); // Your polygon's current area
        const factor = Math.sqrt(area / (currentArea === 0 ? 1 : currentArea));
        this.scaleFrom(factor);
        return this;
    }
    minScale(area) {
        this._minScale = area;
        return this;
    }
    maxScale(area) {
        this._maxScale = area;
        return this;
    }
    isOnTopOf(shape) {
        const maxYA = Math.max(...(this.getVerticesPositions().map(p => p.y)));
        const minYB = Math.min(...(shape.getVerticesPositions().map(p => p.y)));
        const verticallyAligned = Math.abs(maxYA - minYB) < 1;
        return verticallyAligned && this.intersectsWith(shape).collided;
    }
    clone() {
        return deepCloneObject(this);
    }
    static createRect(x, y, w, h) {
        const points = [
            new CreateJS.Vec2(0, 0),
            new CreateJS.Vec2(w, 0),
            new CreateJS.Vec2(w, h),
            new CreateJS.Vec2(0, h)
        ];
        return new CreateJS.ConvexPolygon(x, y, ...points);
    }
    static createCircle(x, y, radius, accuracy = 4) {
        const degreePerStep = 360 / accuracy;
        const rotatingVector = new CreateJS.Vec2().up();
        const points = [];
        for (let i = 0; i < accuracy; i++) {
            points.push(rotatingVector.clone().scaleTo(radius));
            rotatingVector.rotate(CreateJS.Math.degToRad(degreePerStep));
        }
        return new CreateJS.ConvexPolygon(x, y, ...points);
    }
    static convexHull(points) {
        points = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
        const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
        const lower = [];
        for (let p of points) {
            while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
                lower.pop();
            lower.push(p);
        }
        const upper = [];
        for (let i = points.length - 1; i >= 0; i--) {
            const p = points[i];
            while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
                upper.pop();
            upper.push(p);
        }
        upper.pop();
        lower.pop();
        const hullPoints = lower.concat(upper);
        return new CreateJS.ConvexPolygon(hullPoints[0].x, hullPoints[0].y, ...hullPoints.map(point => point.clone().sub(hullPoints[0])));
    }
};
CreateJS.Physics = (_f = class CreateJS_Physics {
        constructor() {
            this._bodies = [];
            this.gravity = new CreateJS.Vec2(0, 0);
            this.airDensity = 1.225;
        }
        addBody(...bodies) {
            this._bodies.push(...bodies);
            return this;
        }
        removeBody(index, deleteCount = 0) {
            this._bodies.splice(index, deleteCount);
            return this;
        }
        clearBodies() {
            this._bodies.length = 0;
            return this;
        }
        setGravity(force) {
            this.gravity.set(0, force);
            return this;
        }
        setAirDensity(density) {
            this.airDensity = density;
        }
        applyJumpTo(body, force, condition) {
            let canJump = !condition;
            this._bodies.forEach(b => {
                if (b === body)
                    return;
                if (condition && condition(body, b) && canJump === false) {
                    canJump = true;
                }
            });
            if (canJump) {
                body.applyForce(this.gravity.clone().mul(body.mass).mul(-force));
            }
        }
        penetrationResolution(A, B, collisionInfo) {
            if (!collisionInfo.collided)
                return;
            const slop = 0.01; // allow small overlap
            const percent = 1; // dampen correction
            const penetration = Math.max(collisionInfo.depth - slop, 0);
            const correction = collisionInfo.normal.clone().normalize().mul(penetration * 0.5 * percent);
            if (!A.static)
                A.position.sub(correction);
            if (!B.static)
                B.position.add(correction);
        }
        resolveVelocity(A, B, collisionInfo) {
            if (!collisionInfo.collided)
                return;
            const relVel = B.velocity.clone().sub(A.velocity);
            const velAlongNormal = relVel.dot(collisionInfo.normal);
            if (velAlongNormal > 0)
                return;
            const restitution = Math.min(A.elasticity, B.elasticity);
            const impulseMag = -(1 + restitution) * velAlongNormal / (A.inverseMass + B.inverseMass);
            const impulse = collisionInfo.normal.clone().mul(impulseMag);
            if (!A.static)
                A.velocity.sub(impulse.clone().mul(A.inverseMass));
            if (!B.static)
                B.velocity.add(impulse.clone().mul(B.inverseMass));
        }
        update(dt) {
            this._bodies.forEach((body) => {
                if (!body.static) {
                    body.applyForce(this.gravity.clone().mul(body.mass));
                    body.step(dt);
                }
            });
            for (let i = 0; i < 12; i++) {
                this._bodies.forEach((body, index) => {
                    for (let i = index + 1; i < this._bodies.length; i++) {
                        const body2 = this._bodies[i];
                        const collisionInfo = body.intersectsWith(body2);
                        if (collisionInfo.collided) {
                            this.penetrationResolution(body, body2, collisionInfo);
                            this.resolveVelocity(body, body2, collisionInfo);
                        }
                    }
                });
            }
        }
    },
    _f.Rigidbody = class Physics_Rigidbody extends CreateJS.ConvexPolygon {
        constructor(isStatic, x, y, ...args) {
            let xNum;
            let yNum;
            let points = [];
            let polygon;
            if (typeof x === "object") {
                xNum = x.x;
                yNum = x.y;
                points = x.points;
                polygon = x;
            }
            else {
                xNum = x;
                yNum = y;
                points = args;
            }
            super(xNum, yNum, ...points);
            this.mass = 1;
            this.velocity = new CreateJS.Vec2(0, 0);
            this.acceleration = new CreateJS.Vec2(0, 0);
            this.elasticity = 0;
            this.friction = 0.95;
            this.dragArea = 1;
            this.dragCoefficient = 1.2;
            this.angularDamping = 0.95;
            this.angularVelocity = 0;
            this.momentOfInertia = 0;
            this.force = new CreateJS.Vec2();
            if (polygon) {
                Object.assign(this, deepCloneObject(polygon));
            }
            this.static = isStatic;
            if (this.static)
                this.mass = 0;
        }
        get inverseMass() {
            return this.mass === 0 ? 0 : 1 / this.mass;
        }
        setDragArea() {
            if (this.velocity.isZero())
                return;
            const dragDirection = this.velocity.clone().normalize();
            const dragNormal = dragDirection.clone().perpendicular();
            let min = Infinity;
            let max = -Infinity;
            for (const vertex of this.getVerticesPositions()) {
                const projection = vertex.dot(dragNormal);
                min = Math.min(min, projection);
                max = Math.max(max, projection);
            }
            const projectedLength = max - min;
            this.dragArea = projectedLength;
        }
        setMass(mass) {
            if (this.static)
                return this;
            this.mass = mass;
            return this;
        }
        setElasticity(elasticity) {
            this.elasticity = elasticity;
            return this;
        }
        setFriction(friction) {
            this.friction = friction;
            return this;
        }
        applyForce(force) {
            this.force.add(force);
        }
        applyAngularVelocity(body, collisionInfo, dt) {
            if (!collisionInfo.collided)
                return;
            const contactPoint = collisionInfo.contactPoint;
            const r = contactPoint.clone().sub(this.center());
            // force
            const relativeVel = body.velocity.clone().sub(this.velocity);
            const velAlongNormal = relativeVel.dot(collisionInfo.normal);
            const relativeVelocity = body.velocity.clone().sub(this.velocity);
            const separatingVelocity = relativeVelocity.dot(collisionInfo.normal);
            const elasticity = Math.min(this.elasticity, body.elasticity);
            const impulseMag = -(1 + elasticity) * separatingVelocity / (this.inverseMass + body.inverseMass);
            const impulse = collisionInfo.normal.clone().mul(impulseMag);
            if (velAlongNormal <= 0) {
                const torque = r.cross(impulse);
                const angularImpulse = torque * dt;
                this.angularVelocity += angularImpulse / this.momentOfInertia;
            }
            // rotational friction
            const rotationalFrictionCoefficient = 0.15;
            const normalForce = Math.abs(impulseMag);
            const frictionTorque = -Math.sign(this.angularVelocity) * rotationalFrictionCoefficient * normalForce * r.length();
            const angularFrictionImpulse = frictionTorque * dt;
            this.angularVelocity += angularFrictionImpulse / this.momentOfInertia;
        }
        applyAirDrag(airDensity = 1.225) {
            const speed = this.velocity.length();
            if (speed === 0)
                return;
            this.setDragArea();
            const dragMagnitude = 0.5 * this.dragCoefficient * airDensity * this.dragArea * speed * speed;
            const dragDirection = this.velocity.clone().normalize().mul(-1);
            const dragForce = dragDirection.clone().mul(dragMagnitude);
            this.applyForce(dragForce);
        }
        computeMomentOfInertia() {
            const vertices = this.points.map(p => p.clone());
            let numerator = 0;
            let denominator = 0;
            for (let i = 0; i < vertices.length; i++) {
                const v0 = vertices[i];
                const v1 = vertices[(i + 1) % vertices.length];
                const cross = Math.abs(v0.cross(v1));
                const dot = v0.dot(v0) + v0.dot(v1) + v1.dot(v1);
                numerator += cross * dot;
                denominator += cross;
            }
            return (this.mass / 6) * (numerator / denominator);
        }
        nextStepIntersectsWith(body) {
            const thisClone = this.clone();
            const bodyClone = body.clone();
            thisClone.step(1);
            bodyClone.step(1);
            return thisClone.intersectsWith(bodyClone);
        }
        step(dt) {
            this.acceleration.set(this.force.clone().div(this.mass));
            this.velocity.add(this.acceleration.clone());
            if (this.velocity.length() < 0.1) {
                this.velocity.zero();
            }
            this.position.add(this.velocity.clone());
            this.velocity.mul(new CreateJS.Vec2(this.friction, 1));
            this.force.zero();
            return this;
        }
    },
    _f);
CreateJS.Image = class CreateJS_Image {
    constructor(img, isStatic = true, frameWidth = 0, frameHeight = 0, frameTime = 0) {
        this.canvas = document.createElement("canvas");
        this.c = this.canvas.getContext("2d");
        this.isStatic = true;
        this.currentFrame = 0;
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
CreateJS.Sprite = class CreateJS_Sprite extends CreateJS.Physics.Rigidbody {
    constructor(isStatic, x, y, ...args) {
        let xNum;
        let yNum;
        let points = [];
        let polygon;
        if (typeof x === "object") {
            xNum = x.x;
            yNum = x.y;
            points = x.points;
            polygon = x;
        }
        else {
            xNum = x;
            yNum = y;
            points = args;
        }
        super(isStatic, xNum, yNum, ...points);
        this.image = new CreateJS.Image();
        this.frame = document.createElement("canvas");
        this.canDrawFrame = true;
        if (polygon) {
            Object.assign(this, deepCloneObject(polygon));
        }
    }
    setImage(image) {
        this.image = image;
        return this;
    }
    draw(c) {
        super.draw(c);
        if (this.image.image) {
            if (this.canDrawFrame && !this.image.isStatic) {
                this.canDrawFrame = false;
                this.frame = this.image.nextFrame();
                setTimeout(() => {
                    this.canDrawFrame = true;
                }, this.image.frameTime);
            }
            ;
            if (this.image.isStatic) {
                this.frame = this.image.nextFrame();
            }
            const bounding = this.getBoundingBox();
            const points = bounding.getVerticesPositions();
            const pointsX = points.map(p => p.x);
            const pointsY = points.map(p => p.y);
            const left = Math.min(...pointsX);
            const right = Math.max(...pointsX);
            const top = Math.min(...pointsY);
            const bottom = Math.max(...pointsY);
            c.drawImage(this.frame, left, top, right - left, bottom - top);
        }
    }
};
CreateJS.TimeHandler = (_g = class CreateJS_TimeHandler {
        static wait(ms) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, ms);
            });
        }
        static tick(fps, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                let tick = 0;
                CreateJS.TimeHandler.timeBefore = performance.now();
                while (true) {
                    if (CreateJS.TimeHandler._stop) {
                        CreateJS.TimeHandler._stop = false;
                        break;
                    }
                    if (CreateJS.TimeHandler._pause) {
                        yield CreateJS.TimeHandler.wait(fps);
                        continue;
                    }
                    const dt = (performance.now() - CreateJS.TimeHandler.timeBefore) / fps;
                    CreateJS.TimeHandler.timeBefore = performance.now();
                    const callbackReturn = callback(++tick, dt);
                    if (callbackReturn !== undefined) {
                        tick = callbackReturn;
                    }
                    yield CreateJS.TimeHandler.wait(fps);
                }
            });
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
    },
    _g.timeBefore = 0,
    _g._stop = false,
    _g._pause = false,
    _g.Preload = class Preload {
        static images(urls) {
            return __awaiter(this, void 0, void 0, function* () {
                const images = urls.map(url => this.loadImage(url));
                const loadedImages = yield Promise.all(images);
                const object = {};
                loadedImages.forEach((image, index) => {
                    object[urls[index]] = image;
                });
                return object;
            });
        }
        static sounds(urls) {
            return __awaiter(this, void 0, void 0, function* () {
                const sounds = urls.map(url => this.loadSound(url));
                const loadedSounds = yield Promise.all(sounds);
                const object = {};
                loadedSounds.forEach((sound, index) => {
                    object[urls[index]] = sound;
                });
                return object;
            });
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
    },
    _g);
export default CreateJS;
