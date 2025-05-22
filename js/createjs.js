var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c;
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
    run(objects) {
        this.c.fillStyle = this._backgroundColor;
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (objects) {
            objects.forEach(object => {
                object.draw(this.c);
            });
        }
    }
}
CreateJS.Vec2 = class {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
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
        this.set(0, 1);
        return this;
    }
    down() {
        this.set(0, -1);
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
CreateJS.Math = class {
    static degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    static radToDeg(radians) {
        return radians * 180 / Math.PI;
    }
};
CreateJS.KeyboardEvent = (_a = class {
    },
    __setFunctionName(_a, "KeyboardEvent"),
    _a.Key = {
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
    _a.Handler = class {
        constructor() {
            this.heldKeys = new Set();
            this.callbacks = new Map();
            this._unhandle = false;
            addEventListener("keydown", (event) => {
                this.heldKeys.add(event.code);
            });
            addEventListener("keyup", (event) => {
                this.heldKeys.delete(event.code);
            });
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
                            this.callbacks.get(key)();
                        }
                    }
                    yield CreateJS.TimeHandler.wait(fps);
                }
            });
        }
        unhandle() {
            this._unhandle = true;
        }
        register(key, callback) {
            this.callbacks.set(key, callback);
        }
        unregister(key) {
            this.callbacks.delete(key);
        }
    },
    _a);
CreateJS.Physics = class {
};
CreateJS.Point = class {
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
CreateJS.Line = class {
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
CreateJS.Shape = (_b = class {
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
    __setFunctionName(_b, "Shape"),
    _b.Anchors = {
        TopLeft: "TopLeft",
        TopRight: "TopRight",
        BottomRight: "BottomRight",
        BottomLeft: "BottomLeft"
    },
    _b);
CreateJS.ConvexPolygon = class extends CreateJS.Shape {
    constructor(x, y, ...args) {
        super(x, y);
        this.points = [];
        this.points = args;
    }
    draw(c) {
        c.beginPath();
        c.moveTo(this.x, this.y);
        for (let i = 0; i < this.points.length; i++) {
            const pointPosition = this.position.clone().add(this.points[i]);
            c.lineTo(pointPosition.x, pointPosition.y);
        }
        c.closePath();
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
};
CreateJS.Rect = class extends CreateJS.Shape {
    constructor(x, y, w, h) {
        super(x, y);
        this.size = new CreateJS.Vec2(w, h);
    }
    draw(c) {
        c.beginPath();
        c.strokeStyle = this._strokeColor;
        c.fillStyle = this._fillColor;
        c.lineWidth = this._strokeWidth;
        c.rect(this.x, this.y, this.w, this.h);
        if (this._fill)
            c.fill();
        if (this._stroke)
            c.stroke();
        c.closePath();
    }
    get w() {
        return this.size.x;
    }
    get h() {
        return this.size.y;
    }
    alignTo(thisAnchor, rect, toAnchor) {
        let point = new CreateJS.Vec2();
        switch (thisAnchor) {
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
        switch (toAnchor) {
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
    anchorAt(vec2, anchor) {
        this.position.set(vec2);
        switch (anchor) {
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
    translate(dx, dy) {
        this.position.add(new CreateJS.Vec2(dx, dy));
        return this;
    }
    scale(wFactor, hFactor) {
        if (hFactor === undefined) {
            this.size.mul(wFactor);
            return this;
        }
        else {
            this.size.x *= wFactor;
            this.size.y *= hFactor;
            return this;
        }
    }
    scaleFrom(origin, wFactor, hFactor) {
        const offset = this.position.clone().sub(origin);
        if (hFactor === undefined) {
            const scaledOffset = offset.mul(wFactor);
            this.size.mul(wFactor);
            this.position = origin.clone().add(scaledOffset);
            return this;
        }
        else {
            const scaledOffset = offset.mul(new CreateJS.Vec2(wFactor, hFactor));
            this.size.mul(new CreateJS.Vec2(wFactor, hFactor));
            this.position = origin.clone().add(scaledOffset);
            return this;
        }
    }
    containsPoint(point) {
        return (point.x >= this.position.x &&
            point.x <= this.position.x + this.size.x &&
            point.y >= this.position.y &&
            point.y <= this.position.y + this.size.y);
    }
    contains(rect) {
        return (this.containsPoint(rect.topLeft()) &&
            this.containsPoint(rect.topRight()) &&
            this.containsPoint(rect.bottomRight()) &&
            this.containsPoint(rect.bottomLeft()));
    }
    aspectRatio() {
        return this.w / this.h;
    }
    area() {
        return this.w * this.h;
    }
    topLeft() {
        return this.position.clone();
    }
    topRight() {
        return this.position.clone().add(new CreateJS.Vec2(this.size.x, 0));
    }
    bottomRight() {
        return this.position.clone().add(this.size);
    }
    bottomLeft() {
        return this.position.clone().add(new CreateJS.Vec2(0, this.size.y));
    }
    center() {
        return this.position.clone().add(this.size.clone().div(2));
    }
    toBounds() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h
        };
    }
    toPolygon() {
        return [
            this.topLeft().clone().sub(this.position),
            this.topRight().clone().sub(this.position),
            this.bottomRight().clone().sub(this.position),
            this.bottomLeft().clone().sub(this.position)
        ];
    }
    static fromCenter(center, size) {
        const rectSize = new CreateJS.Vec2(size, size);
        const pos = center.clone().sub(rectSize.div(2));
        return new CreateJS.Rect(pos.x, pos.y, size, size);
    }
    static fromPoints(point1, point2) {
        const size = point1.vectorTo(point2);
        return new CreateJS.Rect(point1.x, point1.y, size.x, size.y);
    }
};
CreateJS.TimeHandler = (_c = class {
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
    __setFunctionName(_c, "TimeHandler"),
    _c.timeBefore = 0,
    _c._stop = false,
    _c._pause = false,
    _c);
export default CreateJS;
