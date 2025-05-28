export class CreateJS {
    static Vec2 = class {
        constructor(public x: number = 0, public y: number = 0) {}

        add(vec2: CreateJS.Vec2): CreateJS.Vec2 {
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        }

        sub(vec2: CreateJS.Vec2): CreateJS.Vec2 {
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

    static Math = class {
        static METER = 1 / 100;

        static degToRad(degrees: number): number {
            return degrees * Math.PI / 180;
        }

        static radToDeg(radians: number): number {
            return radians * 180 / Math.PI;
        }

        static clamp(num: number, min: number, max: number): number {
            return num < min ? min : (num > max ? max : num);
        }

        static pxToMeter(px: number): number {
            return px * CreateJS.Math.METER;
        }

        static meterToPx(meter: number): number {
            return meter / CreateJS.Math.METER;
        }
    }
    
    static TouchEvent = class {
        
        static Handler = class {
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
                    
                    await CreateJS.TimeHandler.wait(fps);
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

            unhandle(): CreateJS.KeyboardEvent.Handler {
                this._unhandle = true;
                return this;
            }

            register(key: CreateJS.Key, callback: () => void): void {
                this.callbacks.set(key, callback);
            }

            unregister(key: CreateJS.Key): void {
                this.callbacks.delete(key);
            }
        }
    }

    static Point = class {
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

    static Line = class {
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
        private _minScale: number = -Infinity;
        private _maxScale: number = Infinity;
        
        constructor(x: number, y: number, ...args: CreateJS.Vec2[]) {
            super(x, y);
            this.points = args;
        }

        draw(c: CanvasRenderingContext2D) {
            c.beginPath();
            for (let i = 0; i < this.points.length; i++) {
                const pointPosition = this.position.clone().add(this.points[i]);
                c.lineTo(pointPosition.x, pointPosition.y);
            }
            c.closePath();
            c.lineWidth = this._strokeWidth;
            c.fillStyle = this._fillColor;
            c.strokeStyle = this._strokeColor;
            if (this._fill) c.fill();
            if (this._stroke) c.stroke();
        }

        center(): CreateJS.Vec2 {
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

        translate(x: number, y: number): CreateJS.ConvexPolygon {
            this.position.add(new CreateJS.Vec2(x, y));
            return this;
        }

        scaleFrom(factor: number, origin?: CreateJS.Vec2): CreateJS.ConvexPolygon;
        scaleFrom(sizeVec: CreateJS.Vec2, origin?: CreateJS.Vec2): CreateJS.ConvexPolygon;
        scaleFrom(factor: number | CreateJS.Vec2, origin: CreateJS.Vec2 = this.center()): CreateJS.ConvexPolygon {
            if (typeof factor === "number") {
                this.points.forEach(v => {
                    v.add(this.position).sub(origin).mul(factor as number).add(this.position.vectorTo(origin));
                });

                if (this.area() * factor < this._minScale) {
                    this.scaleTo(this._minScale);
                }
                if (this.area() * factor > this._maxScale) {
                    this.scaleTo(this._maxScale);
                }
            } else if (typeof factor === "object") {
                this.points.forEach(v => {
                    v.add(this.position).sub(origin).mul(factor as CreateJS.Vec2).add(this.position.vectorTo(origin));
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

        getVerticesPositions(): CreateJS.Vec2[] {
            return this.points.map(p => p.clone().add(this.position));
        }

        getBoundingBox(): CreateJS.ConvexPolygon {
            let minX = Infinity, minY = Infinity;
            let maxX = -Infinity, maxY = -Infinity;

            for (const v of this.points) {
                if (v.x < minX) minX = v.x;
                if (v.y < minY) minY = v.y;
                if (v.x > maxX) maxX = v.x;
                if (v.y > maxY) maxY = v.y;
            }

            return CreateJS.ConvexPolygon.createRect(this.position.x + minX, this.position.y + minY, maxX - minX, maxY - minY);
        }

        getNormals(): CreateJS.Vec2[] {
            const normals: CreateJS.Vec2[] = [];

            for (let i = 0; i < this.points.length; i++) {
                const current = this.points[i].clone();
                const next = this.points[(i + 1) % this.points.length].clone();
                const edge = next.sub(current);

                const normal = edge.perpendicular().normalize();
                normals.push(normal);
            }

            return normals;
        }

        area(): number {
            let total = 0;
            const n = this.points.length;

            for (let i = 0; i < n; i++) {
                const current = this.points[i];
                const next = this.points[(i + 1) % n];
                total += current.x * next.y - next.x * current.y;
            }

            return Math.abs(total) / 2;
        }

        perimeter(): number {
            let total = 0;
            for (let i = 0; i < this.points.length; i++) {
                const current = this.points[i];
                const next = this.points[(i + 1) % this.points.length];

                total += current.distanceTo(next);
            }
            return total;
        }

        rotate(angle: number, origin: CreateJS.Vec2 = this.center()): CreateJS.ConvexPolygon {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            this.points = this.points.map(p => {
                const point = this.position.clone().add(p);
                const dx = point.x - origin.x;
                const dy = point.y - origin.y;

                const rotated = new CreateJS.Vec2(
                    origin.x + dx * cos - dy * sin,
                    origin.y + dx * sin + dy * cos
                );

                return rotated.sub(this.position);
            });

            return this;
        }

        getClosestVertexTo(point: CreateJS.Vec2): CreateJS.Vec2 {
            const points = this.getVerticesPositions();
            let minDist = Infinity;
            let minPoint: CreateJS.Vec2 = points[0];

            for (let p of points) {
                if (p.distanceTo(point) < minDist) {
                    minDist = p.distanceTo(point)
                    minPoint = p;
                };
            }

            return minPoint;
        }

        getFarthestPointInDirection(dir: CreateJS.Vec2): CreateJS.Vec2 {
            let farthest: CreateJS.Vec2 = this.getVerticesPositions()[0];
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

        isConvex(): boolean {
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
                    } else if (Math.sign(cross) !== sign) {
                        return false;
                    }
                }
            }

            return true;
        }
        
        intersectsWith(other: CreateJS.ConvexPolygon): CreateJS.SATCollisionInfo {
            const axesA = this.getNormals();
            const axesB = other.getNormals();
            const axes = axesA.concat(axesB);

            let minOverlap = Infinity;
            let smallestAxis: CreateJS.Vec2 | null = null;
            
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

            const contactPoints: CreateJS.Vec2[] = [];

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

            let contactPoint: CreateJS.Vec2;
            if (contactPoints.length > 0) {
                const sum = contactPoints.reduce((acc, v) => acc.add(v), new CreateJS.Vec2(0, 0));
                contactPoint = sum.mul(1 / contactPoints.length);
            } else {
                contactPoint = this.center().add(other.center()).mul(0.5);
            }

            return {
                collided: true,
                normal: smallestAxis.normalize(),
                depth: minOverlap,
                contactPoint: contactPoint
            };
        }

        containsPoint(point: CreateJS.Vec2): boolean {
            const vertices = this.getVerticesPositions();
            let sign = 0;

            for (let i = 0; i < vertices.length; i++) {
                const v0 = vertices[i];
                const v1 = vertices[(i + 1) % vertices.length];

                const edge = v1.sub(v0);
                const toPoint = point.sub(v0);

                const cross = edge.cross(toPoint);

                if (cross !== 0) {
                    if (sign === 0) {
                        sign = Math.sign(cross);
                    } else if (Math.sign(cross) !== sign) {
                        return false;
                    }
                }
            }

            return true;
        }

        project(axis: CreateJS.Vec2): { min: number, max: number } {
            let min = Infinity;
            let max = -Infinity;

            for (let v of this.getVerticesPositions()) {
                const projection = v.dot(axis);
                if (projection < min) min = projection;
                if (projection > max) max = projection;
            }

            return { min, max };
        }
        
        copy(): CreateJS.ConvexPolygon {
            return new CreateJS.ConvexPolygon(this.position.x, this.position.y, ...this.points);
        }
        
        scaleTo(area: number): CreateJS.ConvexPolygon {
            const currentArea = this.area(); // Your polygon's current area

            const factor = Math.sqrt(area / (currentArea === 0 ? 1 : currentArea));
            this.scaleFrom(factor);

            return this;
        }

        minScale(area: number): CreateJS.ConvexPolygon {
            this._minScale = area;
            return this;
        }

        maxScale(area: number): CreateJS.ConvexPolygon {
            this._maxScale = area;
            return this;
        }

        static createRect(x: number, y: number, w: number, h: number): CreateJS.ConvexPolygon {
            const points = [
                new CreateJS.Vec2(0, 0),
                new CreateJS.Vec2(w, 0),
                new CreateJS.Vec2(w, h),
                new CreateJS.Vec2(0, h)
            ];
            
            return new CreateJS.ConvexPolygon(x, y, ...points);
        }

        static createCircle(x: number, y: number, radius: number, accuracy: number = 4) {
            const degreePerStep = 360 / accuracy;
            const rotatingVector = new CreateJS.Vec2().up();
            const points: CreateJS.Vec2[] = [];

            for (let i = 0; i < accuracy; i++) {
                points.push(rotatingVector.clone().scaleTo(radius));
                rotatingVector.rotate(CreateJS.Math.degToRad(degreePerStep));
            }

            return new CreateJS.ConvexPolygon(x, y, ...points);
        }

        static convexHull(points: CreateJS.Vec2[]): CreateJS.ConvexPolygon {
            points = [...points].sort((a, b) => a.x - b.x || a.y - b.y);

            const cross = (o: CreateJS.Vec2, a: CreateJS.Vec2, b: CreateJS.Vec2): number =>
                (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

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

            const hullPoints: CreateJS.Vec2[] = lower.concat(upper);
            return new CreateJS.ConvexPolygon(hullPoints[0].x, hullPoints[0].y, ...hullPoints.map(point => point.clone().sub(hullPoints[0])));
        }
    }

    static Physics = class {
        static PhysicsBody = class extends CreateJS.ConvexPolygon {
            static: boolean;
            mass: number = 1;
            velocity: CreateJS.Vec2 = new CreateJS.Vec2(0, 0);
            acceleration: CreateJS.Vec2 = new CreateJS.Vec2(0, 0);
            elasticity: number = 0.5;
            dragArea: number = 1;
            dragCoefficient: number = 1.2;
            angularDamping: number = 0.98;
            angularVelocity: number = 0;
            momentOfInertia: number;

            constructor(isStatic: boolean, polygon: CreateJS.ConvexPolygon);
            constructor(isStatic: boolean, x: number, y: number, ...args: CreateJS.Vec2[]);
            constructor(isStatic: boolean, x: number | CreateJS.ConvexPolygon, y?: number, ...args: CreateJS.Vec2[]) {
                let xNum;
                let yNum;
                let points: CreateJS.Vec2[] = [];

                let polygon: CreateJS.ConvexPolygon | undefined;
                if (typeof x === "object") {
                    xNum = x.x;
                    yNum = x.y;
                    points = x.points;

                    polygon = x;
                } else {
                    xNum = x;
                    yNum = y as number;
                    points = args;
                }
                
                super(xNum, yNum, ...points);
                
                if (polygon) {
                    Object.assign(this, polygon);
                }

                this.static = isStatic;
                if (this.static) this.mass = 0;

                // Moment of inertia
                this.momentOfInertia = this.computeMomentOfInertia();

                // Find dragCoefficient
                const compactness = this.area() / this.perimeter();
                this.dragCoefficient = CreateJS.Math.clamp(compactness, 0.2, 1.3);
            }

            get inverseMass() {
                return this.mass === 0 ? 0 : 1 / this.mass;
            }

            setDragArea() {
                if (this.velocity.isZero()) return;

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
                this.dragArea = projectedLength * CreateJS.Math.METER;
            }

            setMass(mass: number): CreateJS.Physics.PhysicsBody {
                if (this.static) return this;

                this.mass = mass;
                return this;
            }

            setElasticity(elasticity: number): CreateJS.Physics.PhysicsBody {
                this.elasticity = elasticity;
                return this;
            }
            
            applyForce(force: CreateJS.Vec2): CreateJS.Physics.PhysicsBody {
                const acceleration = force.clone().div(this.mass);
                this.acceleration.add(acceleration);
                return this;
            }

            applyAngularVelocity(body: CreateJS.Physics.PhysicsBody, collisionInfo: CreateJS.SATCollisionInfo, dt: number): CreateJS.Physics.PhysicsBody {
                if (!collisionInfo.collided) return this;

                const contactPoint = collisionInfo.contactPoint;
                const r = contactPoint.clone().sub(this.center()).mul(CreateJS.Math.METER);

                // force
                const relativeVel = body.velocity.clone().sub(this.velocity);
                const velAlongNormal = relativeVel.dot(collisionInfo.normal);

                const relativeVelocity = body.velocity.clone().sub(this.velocity);
                const separatingVelocity = relativeVelocity.dot(collisionInfo.normal);

                const elasticity = Math.min(this.elasticity, body.elasticity);
                const impulseMag = -(1 + elasticity) * separatingVelocity / (this.inverseMass + body.inverseMass);
                const impulse = collisionInfo.normal.clone().mul(impulseMag * CreateJS.Math.METER);

                if (velAlongNormal <= 0) {
                    const torque = r.cross(impulse);
                    const angularImpulse = torque * dt;
                    this.angularVelocity += angularImpulse / this.momentOfInertia;
                }
                

                // rotational friction
                const rotationalFrictionCoefficient = 0.15;
                const normalForce = Math.abs(impulseMag * CreateJS.Math.METER);
                const frictionTorque = -Math.sign(this.angularVelocity) * rotationalFrictionCoefficient * normalForce * r.length();

                const angularFrictionImpulse = frictionTorque * dt;
                this.angularVelocity += angularFrictionImpulse / this.momentOfInertia;

                return this;
            }
            
            applyAirDrag(airDensity: number = 1.225): void {
                const speed = this.velocity.length();

                if (speed === 0) return;

                this.setDragArea();

                const dragMagnitude = 0.5 * this.dragCoefficient * airDensity * this.dragArea * speed * speed;

                const dragDirection = this.velocity.clone().normalize().mul(-1);
                const dragForce = dragDirection.clone().mul(dragMagnitude);

                this.applyForce(dragForce);
            }

            computeMomentOfInertia(): number {
                const vertices = this.points.map(p => p.clone().mul(CreateJS.Math.METER));

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

                return (this.mass / 6) * (numerator / denominator) * ((1 / CreateJS.Math.METER) ** 2);
            }

            integrate(dt: number): CreateJS.Physics.PhysicsBody {
                this.velocity.add(this.acceleration.clone().mul(dt));
                if (this.velocity.length() < 0.01) {
                    this.velocity.set(0, 0);
                }
                this.position.add(this.velocity.clone().mul(dt));

                this.angularVelocity *= this.angularDamping;
                if (this.angularVelocity < 0.001) {
                    this.angularVelocity = 0;
                }
                this.rotate(this.angularVelocity);

                this.acceleration.set(0, 0);

                return this;
            }
        }

        private _bodies: CreateJS.Physics.PhysicsBody[] = [];
        private gravity: CreateJS.Vec2 = new CreateJS.Vec2(0, 0);
        private airDensity: number = 1.225;

        addBody(...bodies: CreateJS.Physics.PhysicsBody[]): CreateJS.Physics {
            this._bodies.push(...bodies);
            return this;
        }

        removeBody(index: number, deleteCount: number = 0): CreateJS.Physics {
            this._bodies.splice(index, deleteCount);
            return this;
        }

        clearBodies(): CreateJS.Physics {
            this._bodies.length = 0;
            return this;
        }

        setGravity(force: number): CreateJS.Physics {
            this.gravity.set(0, force);
            return this;
        }

        setAirDensity(density: number) {
            this.airDensity = density;
        }

        penetrationResolution(A: CreateJS.Physics.PhysicsBody, B: CreateJS.Physics.PhysicsBody, collisionInfo: CreateJS.SATCollisionInfo): void {
            if (!collisionInfo.collided) return;

            const correction = collisionInfo.normal.clone().mul(collisionInfo.depth / (A.inverseMass + B.inverseMass));
            A.position.sub(correction.mul(A.inverseMass));
            B.position.add(correction.mul(B.inverseMass));
        }

        resolveVelocity(A: CreateJS.Physics.PhysicsBody, B: CreateJS.Physics.PhysicsBody, collisionInfo: CreateJS.SATCollisionInfo): void {
            if (!collisionInfo.collided) return;

            const relativeVelocity = B.velocity.clone().sub(A.velocity);
            const velAlongNormal = relativeVelocity.dot(collisionInfo.normal);

            if (velAlongNormal > 0) return;

            const elasticity = Math.min(A.elasticity, B.elasticity);

            const impulseMag = -(1 + elasticity) * velAlongNormal / (A.inverseMass + B.inverseMass);

            const impulse = collisionInfo.normal.clone().mul(impulseMag);

            A.velocity.sub(impulse.mul(A.inverseMass));
            B.velocity.add(impulse.mul(B.inverseMass));
        }

        update(dt: number): void {
            this._bodies.forEach(body => {
                if (!body.static) {
                    body.applyForce(this.gravity.clone().mul(body.mass));

                    body.applyAirDrag(this.airDensity);
                }

                this._bodies.forEach((body2) => {
                    if (body === body2) return;

                    const collisionInfo = body.intersectsWith(body2);

                    if (collisionInfo.collided) {
                        this.penetrationResolution(body, body2, collisionInfo);
                        this.resolveVelocity(body, body2, collisionInfo);
                        body.applyAngularVelocity(body2, collisionInfo, dt);
                    }
                });

                if (!body.static) {
                    body.integrate(dt);
                }
            });
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

    render(objects?: CreateJS.Drawable[]): void {
        this.c.fillStyle = this._backgroundColor;
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (objects) {
            objects.forEach(object => {
                object.draw(this.c);
            });
        }
    }
}

export namespace CreateJS {
    export type Key = string;
    export type SATCollisionInfo = {
        collided: true;
    } & {
        normal: CreateJS.Vec2;
        depth: number;
        contactPoint: CreateJS.Vec2;
    } | {
        collided: false;
    };

    export type Shape = InstanceType<typeof CreateJS.Shape>;
    export type Point = InstanceType<typeof CreateJS.Point>;
    export type Line = InstanceType<typeof CreateJS.Line>;
    export type ConvexPolygon = InstanceType<typeof CreateJS.ConvexPolygon>;
    export type Vec2 = InstanceType<typeof CreateJS.Vec2>;
    export type Physics = InstanceType<typeof CreateJS.Physics>;
    export type KeyboardEvent = InstanceType<typeof CreateJS.KeyboardEvent>;
    export type TouchEvent = InstanceType<typeof CreateJS.TouchEvent>;
    export type TimeHandler = InstanceType<typeof CreateJS.TimeHandler>;
    export type Drawable = {
        draw: (c: CanvasRenderingContext2D) => void;
    }


    export namespace KeyboardEvent {
        export type Key = typeof CreateJS.KeyboardEvent.Key;
        export type Handler = InstanceType<typeof CreateJS.KeyboardEvent.Handler>;
    }
    
    export namespace TouchEvent {
        export type Handler = InstanceType<typeof CreateJS.TouchEvent.Handler>;
    }

    export namespace Shape {
        export type Anchors = typeof CreateJS.Shape.Anchors;
    }

    export namespace Physics {
        export type PhysicsBody = InstanceType<typeof CreateJS.Physics.PhysicsBody>;
    }
}

export default CreateJS;
