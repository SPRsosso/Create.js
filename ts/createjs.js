"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJS = void 0;
var CreateJS = /** @class */ (function () {
    function CreateJS(canvas) {
        this._backgroundColor = "white";
        this.canvas = canvas;
        this.c = canvas.getContext("2d");
    }
    CreateJS.prototype.init = function () {
        document.body.style.cssText = "\n            margin: 0;\n            overflow: hidden;\n        ";
        return this;
    };
    CreateJS.prototype.resizeCanvas = function (x, y) {
        this.canvas.width = x;
        this.canvas.height = y;
        return this;
    };
    CreateJS.prototype.backgroundColor = function (color) {
        this._backgroundColor = color;
        return this;
    };
    CreateJS.prototype.run = function (objects) {
        var _this = this;
        this.c.fillStyle = this._backgroundColor;
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (objects) {
            objects.forEach(function (object) {
                object.draw(_this.c);
            });
        }
    };
    var _a, _b, _c, _d;
    CreateJS.Vec2 = /** @class */ (function () {
        function class_1(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        class_1.prototype.add = function (vec2) {
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        };
        class_1.prototype.sub = function (vec2) {
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        };
        class_1.prototype.mul = function (scalar) {
            if (typeof scalar === "object") {
                this.x *= scalar.x;
                this.y *= scalar.y;
            }
            else if (typeof scalar === "number") {
                this.x *= scalar;
                this.y *= scalar;
            }
            return this;
        };
        class_1.prototype.div = function (scalar) {
            if (typeof scalar === "object") {
                this.x /= scalar.x;
                this.y /= scalar.y;
            }
            else if (typeof scalar === "number") {
                this.x /= scalar;
                this.y /= scalar;
            }
            return this;
        };
        class_1.prototype.negate = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        class_1.prototype.normalize = function () {
            if (this.isZero()) {
                throw new Error("Normalized zero vector!");
            }
            var length = this.length();
            this.x /= length;
            this.y /= length;
            return this;
        };
        class_1.prototype.dot = function (vec2) {
            return this.x * vec2.x + this.y * vec2.y;
        };
        class_1.prototype.lerp = function (vec2, t) {
            this.x = this.x * (1 - t) + vec2.x * t;
            this.y = this.y * (1 - t) + vec2.y * t;
            return this;
        };
        class_1.prototype.clamp = function (minVec, maxVec) {
            this.x = this.x < minVec.x ? minVec.x : (this.x > maxVec.x ? maxVec.x : this.x);
            this.y = this.y < minVec.y ? minVec.y : (this.y > maxVec.y ? maxVec.y : this.y);
            return this;
        };
        class_1.prototype.min = function (vec2) {
            this.x = Math.min(this.x, vec2.x);
            this.y = Math.min(this.y, vec2.y);
            return this;
        };
        class_1.prototype.max = function (vec2) {
            this.x = Math.max(this.x, vec2.x);
            this.y = Math.max(this.y, vec2.y);
            return this;
        };
        class_1.prototype.perpendicular = function () {
            var _a;
            _a = [-this.y, this.x], this.x = _a[0], this.y = _a[1];
            return this;
        };
        class_1.prototype.scaleTo = function (length) {
            this.normalize().mul(length);
            return this;
        };
        class_1.prototype.rotate = function (angle_radians) {
            var x = this.x * Math.cos(angle_radians) - this.y * Math.sin(angle_radians);
            var y = this.x * Math.sin(angle_radians) + this.y * Math.cos(angle_radians);
            this.x = x;
            this.y = y;
            return this;
        };
        class_1.prototype.reflect = function (vec2) {
            var n = vec2.clone().normalize();
            var x = this.x - 2 * this.dot(n) * n.x;
            var y = this.y - 2 * this.dot(n) * n.y;
            this.x = x;
            this.y = y;
            return this;
        };
        class_1.prototype.project = function (onto) {
            var vec2 = onto.clone().normalize();
            var dot = this.dot(vec2);
            this.x = dot * vec2.x;
            this.y = dot * vec2.y;
            return this;
        };
        class_1.prototype.cross = function (vec2) {
            return this.x * vec2.y - this.y * vec2.x;
        };
        class_1.prototype.angleTo = function (vec2) {
            return Math.acos(this.dot(vec2) / (this.length() * vec2.length()));
        };
        class_1.prototype.angle = function () {
            return Math.atan2(this.y, this.x);
        };
        class_1.prototype.abs = function () {
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            return this;
        };
        class_1.prototype.floor = function (decimalPlace) {
            if (decimalPlace === void 0) { decimalPlace = 0; }
            this.x = Math.floor(this.x * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
            this.y = Math.floor(this.y * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
            return this;
        };
        class_1.prototype.ceil = function (decimalPlace) {
            if (decimalPlace === void 0) { decimalPlace = 0; }
            this.x = Math.ceil(this.x * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
            this.y = Math.ceil(this.y * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
            return this;
        };
        class_1.prototype.round = function (decimalPlace) {
            if (decimalPlace === void 0) { decimalPlace = 0; }
            this.x = Math.round(this.x * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
            this.y = Math.round(this.y * Math.pow(10, decimalPlace)) / Math.pow(10, decimalPlace);
            return this;
        };
        class_1.prototype.length = function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        };
        class_1.prototype.clone = function () {
            return new CreateJS.Vec2(this.x, this.y);
        };
        class_1.prototype.isZero = function () {
            return this.x === 0 && this.y === 0;
        };
        class_1.prototype.equals = function (vec) {
            return this.x === vec.x && this.y === vec.y;
        };
        class_1.prototype.distanceTo = function (vec2) {
            return Math.sqrt(Math.pow((vec2.x - this.x), 2) + Math.pow((vec2.y - this.y), 2));
        };
        class_1.prototype.vectorTo = function (vec2) {
            return vec2.clone().sub(this);
        };
        class_1.prototype.set = function (x, y) {
            if (typeof x === 'object' && x !== null && 'x' in x && 'y' in x) {
                this.x = x.x;
                this.y = x.y;
            }
            else if (typeof x === 'number' && typeof y === 'number') {
                this.x = x;
                this.y = y;
            }
            return this;
        };
        class_1.prototype.up = function () {
            this.set(0, 1);
            return this;
        };
        class_1.prototype.down = function () {
            this.set(0, -1);
            return this;
        };
        class_1.prototype.left = function () {
            this.set(-1, 0);
            return this;
        };
        class_1.prototype.right = function () {
            this.set(1, 0);
            return this;
        };
        class_1.prototype.zero = function () {
            this.set(0, 0);
            return this;
        };
        class_1.prototype.toArray = function () {
            return [this.x, this.y];
        };
        class_1.prototype.toString = function () {
            return "x: ".concat(this.x, ", y: ").concat(this.y);
        };
        class_1.prototype.toLine = function (startX, startY) {
            if (startX === void 0) { startX = 0; }
            if (startY === void 0) { startY = 0; }
            return new CreateJS.Line(startX, startY, startX + this.x, startY + this.y);
        };
        class_1.prototype.toPoint = function () {
            return new CreateJS.Point(this.x, this.y);
        };
        class_1.fromArray = function (arr) {
            return new CreateJS.Vec2(arr[0], arr[1]);
        };
        return class_1;
    }());
    CreateJS.Math = /** @class */ (function () {
        function class_2() {
        }
        class_2.degToRad = function (degrees) {
            return degrees * Math.PI / 180;
        };
        class_2.radToDeg = function (radians) {
            return radians * 180 / Math.PI;
        };
        return class_2;
    }());
    CreateJS.TouchEvent = (_a = /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        _a.Event = {},
        _a.Handler = /** @class */ (function () {
            function class_4() {
                var _this = this;
                this._unhandle = false;
                this._touches = new TouchList();
                addEventListener("touchstart", function (event) {
                    _this._touches = event.touches;
                });
                addEventListener("touchmove", function (event) {
                    _this._touches = event.touches;
                });
                addEventListener("touchend", function (event) {
                    _this._touches = event.touches;
                });
            }
            class_4.prototype.handle = function (fps) {
                return __awaiter(this, void 0, Promise, function () {
                    var _i, _a, key;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!true) return [3 /*break*/, 2];
                                if (this._unhandle) {
                                    this._unhandle = false;
                                    return [2 /*return*/];
                                }
                                for (_i = 0, _a = this.heldKeys; _i < _a.length; _i++) {
                                    key = _a[_i];
                                    if (this.callbacks.has(key)) {
                                        this.callbacks.get(key)();
                                    }
                                }
                                return [4 /*yield*/, CreateJS.TimeHandler.wait(fps)];
                            case 1:
                                _b.sent();
                                return [3 /*break*/, 0];
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            };
            class_4.prototype.unhandle = function () {
                this._unhandle = false;
                return this;
            };
            class_4.prototype.register = function () {
            };
            return class_4;
        }()),
        _a);
    CreateJS.KeyboardEvent = (_b = /** @class */ (function () {
            function class_5() {
            }
            return class_5;
        }()),
        _b.Key = {
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
        _b.Handler = /** @class */ (function () {
            function class_6() {
                var _this = this;
                this.heldKeys = new Set();
                this.callbacks = new Map();
                this._unhandle = false;
                addEventListener("keydown", function (event) {
                    _this.heldKeys.add(event.code);
                });
                addEventListener("keyup", function (event) {
                    _this.heldKeys.delete(event.code);
                });
            }
            class_6.prototype.handle = function (fps) {
                return __awaiter(this, void 0, Promise, function () {
                    var _i, _a, key;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!true) return [3 /*break*/, 2];
                                if (this._unhandle) {
                                    this._unhandle = false;
                                    return [2 /*return*/];
                                }
                                for (_i = 0, _a = this.heldKeys; _i < _a.length; _i++) {
                                    key = _a[_i];
                                    if (this.callbacks.has(key)) {
                                        this.callbacks.get(key)();
                                    }
                                }
                                return [4 /*yield*/, CreateJS.TimeHandler.wait(fps)];
                            case 1:
                                _b.sent();
                                return [3 /*break*/, 0];
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            };
            class_6.prototype.unhandle = function () {
                this._unhandle = true;
                return this;
            };
            class_6.prototype.register = function (key, callback) {
                this.callbacks.set(key, callback);
            };
            class_6.prototype.unregister = function (key) {
                this.callbacks.delete(key);
            };
            return class_6;
        }()),
        _b);
    CreateJS.Physics = /** @class */ (function () {
        function class_7() {
        }
        return class_7;
    }());
    CreateJS.Point = /** @class */ (function () {
        function class_8(x, y) {
            this._fillColor = "white";
            this._strokeColor = "white";
            this._size = 1;
            this._fill = false;
            this._stroke = false;
            this.position = new CreateJS.Vec2(x, y);
        }
        class_8.prototype.size = function (size) {
            this._size = size;
            return this;
        };
        class_8.prototype.strokeColor = function (color) {
            this._strokeColor = color;
            return this;
        };
        class_8.prototype.fillColor = function (color) {
            this._fillColor = color;
            return this;
        };
        class_8.prototype.stroke = function () {
            this._stroke = this._stroke;
            return this;
        };
        class_8.prototype.fill = function () {
            this._fill = !this._fill;
            return this;
        };
        class_8.prototype.toVec2 = function () {
            return new CreateJS.Vec2(this.position.x, this.position.y);
        };
        class_8.prototype.draw = function (c) {
            c.beginPath();
            c.fillStyle = this._fillColor;
            c.strokeStyle = this._strokeColor;
            c.arc(this.position.x, this.position.y, this._size, 0, 2 * Math.PI);
            if (this._fill)
                c.fill();
        };
        return class_8;
    }());
    CreateJS.Line = /** @class */ (function () {
        function class_9(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this._width = 1;
            this._color = "white";
            this._stroke = false;
        }
        class_9.prototype.width = function (width) {
            this._width = width;
            return this;
        };
        class_9.prototype.color = function (color) {
            this._color = color;
            return this;
        };
        class_9.prototype.stroke = function () {
            this._stroke = !this._stroke;
            return this;
        };
        class_9.prototype.draw = function (c) {
            c.beginPath();
            c.lineWidth = this._width;
            c.strokeStyle = this._color;
            c.moveTo(this.x1, this.y1);
            c.lineTo(this.x2, this.y2);
            if (this._stroke)
                c.stroke();
            c.closePath();
        };
        class_9.prototype.toVec2 = function () {
            return new CreateJS.Vec2(this.x2 - this.x1, this.y2 - this.y1);
        };
        return class_9;
    }());
    CreateJS.Shape = (_c = /** @class */ (function () {
            function class_10(x, y) {
                this._fillColor = "white";
                this._strokeColor = "white";
                this._strokeWidth = 0;
                this._fill = false;
                this._stroke = false;
                this.position = new CreateJS.Vec2(x, y);
            }
            class_10.prototype.fill = function () {
                this._fill = !this._fill;
                return this;
            };
            class_10.prototype.stroke = function () {
                this._stroke = !this._stroke;
                return this;
            };
            class_10.prototype.strokeWidth = function (strokeWidth) {
                this._strokeWidth = strokeWidth;
                return this;
            };
            class_10.prototype.strokeColor = function (strokeColor) {
                this._strokeColor = strokeColor;
                return this;
            };
            class_10.prototype.fillColor = function (fillColor) {
                this._fillColor = fillColor;
                return this;
            };
            Object.defineProperty(class_10.prototype, "x", {
                get: function () {
                    return this.position.x;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_10.prototype, "y", {
                get: function () {
                    return this.position.y;
                },
                enumerable: false,
                configurable: true
            });
            class_10.prototype.draw = function (c) {
                throw new Error("Function not implemented");
            };
            return class_10;
        }()),
        _c.Anchors = {
            TopLeft: "TopLeft",
            TopRight: "TopRight",
            BottomRight: "BottomRight",
            BottomLeft: "BottomLeft"
        },
        _c);
    CreateJS.ConvexPolygon = /** @class */ (function (_super) {
        __extends(class_11, _super);
        function class_11(x, y) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var _this = _super.call(this, x, y) || this;
            _this.points = [];
            _this._minScale = -Infinity;
            _this._maxScale = Infinity;
            _this.points = args;
            return _this;
        }
        class_11.prototype.draw = function (c) {
            c.beginPath();
            // c.moveTo(this.x, this.y);
            for (var i = 0; i < this.points.length; i++) {
                var pointPosition = this.position.clone().add(this.points[i]);
                c.lineTo(pointPosition.x, pointPosition.y);
            }
            c.closePath();
            c.fillStyle = this._fillColor;
            c.strokeStyle = this._strokeColor;
            if (this._fill)
                c.fill();
            if (this._stroke)
                c.stroke();
        };
        class_11.prototype.center = function () {
            var area = 0;
            var cx = 0;
            var cy = 0;
            var n = this.points.length;
            for (var i = 0; i < n; i++) {
                var curr = this.points[i].clone().add(this.position);
                var next = this.points[(i + 1) % n].clone().add(this.position);
                var cross = curr.cross(next);
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
        };
        class_11.prototype.translate = function (x, y) {
            this.position.add(new CreateJS.Vec2(x, y));
            return this;
        };
        class_11.prototype.scaleFrom = function (factor, origin) {
            var _this = this;
            if (origin === void 0) { origin = this.center(); }
            if (typeof factor === "number") {
                this.points.forEach(function (v) {
                    v.add(_this.position).sub(origin).mul(factor).add(_this.position.vectorTo(origin));
                });
                if (this.area() * factor < this._minScale) {
                    this.scaleTo(this._minScale);
                }
                if (this.area() * factor > this._maxScale) {
                    this.scaleTo(this._maxScale);
                }
            }
            else if (typeof factor === "object") {
                this.points.forEach(function (v) {
                    v.add(_this.position).sub(origin).mul(factor).add(_this.position.vectorTo(origin));
                });
                if ((this.area() * factor.x < this._minScale || this.area() * factor.y < this._minScale)) {
                    this.scaleTo(this._minScale);
                }
                if ((this.area() * factor.x > this._maxScale || this.area() * factor.y > this._maxScale)) {
                    this.scaleTo(this._maxScale);
                }
            }
            return this;
        };
        class_11.prototype.getVerticesPositions = function () {
            var _this = this;
            return this.points.map(function (p) { return p.clone().add(_this.position); });
        };
        class_11.prototype.getBoundingBox = function () {
            var minX = Infinity, minY = Infinity;
            var maxX = -Infinity, maxY = -Infinity;
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.x < minX)
                    minX = v.x;
                if (v.y < minY)
                    minY = v.y;
                if (v.x > maxX)
                    maxX = v.x;
                if (v.y > maxY)
                    maxY = v.y;
            }
            return new CreateJS.Rect(this.position.x + minX, this.position.y + minY, maxX - minX, maxY - minY);
        };
        class_11.prototype.getNormals = function () {
            var normals = [];
            for (var i = 0; i < this.points.length; i++) {
                var current = this.points[i].clone();
                var next = this.points[(i + 1) % this.points.length].clone();
                var edge = next.sub(current);
                var normal = edge.perpendicular().normalize();
                normals.push(normal);
            }
            return normals;
        };
        class_11.prototype.area = function () {
            var total = 0;
            var n = this.points.length;
            for (var i = 0; i < n; i++) {
                var current = this.points[i];
                var next = this.points[(i + 1) % n];
                total += current.x * next.y - next.x * current.y;
            }
            return Math.abs(total) / 2;
        };
        class_11.prototype.rotate = function (angle, origin) {
            var _this = this;
            if (origin === void 0) { origin = this.center(); }
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            this.points = this.points.map(function (p) {
                var point = _this.position.clone().add(p);
                var dx = point.x - origin.x;
                var dy = point.y - origin.y;
                var rotated = new CreateJS.Vec2(origin.x + dx * cos - dy * sin, origin.y + dx * sin + dy * cos);
                return rotated.sub(_this.position);
            });
            return this;
        };
        class_11.prototype.getClosestVertexTo = function (point) {
            var points = this.getVerticesPositions();
            var minDist = Infinity;
            var minPoint = points[0];
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var p = points_1[_i];
                if (p.distanceTo(point) < minDist) {
                    minDist = p.distanceTo(point);
                    minPoint = p;
                }
                ;
            }
            return minPoint;
        };
        class_11.prototype.getFarthestPointInDirection = function (dir) {
            var farthest = this.getVerticesPositions()[0];
            var maxDot = -Infinity;
            for (var _i = 0, _a = this.getVerticesPositions(); _i < _a.length; _i++) {
                var v = _a[_i];
                var dot = v.dot(dir);
                if (dot > maxDot) {
                    maxDot = dot;
                    farthest = v;
                }
            }
            return farthest;
        };
        class_11.prototype.isConvex = function () {
            var verts = this.getVerticesPositions();
            var sign = null;
            for (var i = 0; i < verts.length; i++) {
                var a = verts[i].clone();
                var b = verts[(i + 1) % verts.length].clone();
                var c = verts[(i + 2) % verts.length].clone();
                var ab = b.clone().sub(a);
                var bc = c.clone().sub(b);
                var cross = ab.cross(bc);
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
        };
        class_11.prototype.project = function (axis) {
            var min = Infinity;
            var max = -Infinity;
            for (var _i = 0, _a = this.getVerticesPositions(); _i < _a.length; _i++) {
                var v = _a[_i];
                var projection = v.dot(axis);
                if (projection < min)
                    min = projection;
                if (projection > max)
                    max = projection;
            }
            return { min: min, max: max };
        };
        class_11.prototype.copy = function () {
            var _a;
            return new ((_a = CreateJS.ConvexPolygon).bind.apply(_a, __spreadArray([void 0, this.position.x, this.position.y], this.points, false)))();
        };
        class_11.prototype.scaleTo = function (area) {
            var currentArea = this.area(); // Your polygon's current area
            var factor = Math.sqrt(area / (currentArea === 0 ? 1 : currentArea));
            this.scaleFrom(factor);
            return this;
        };
        class_11.prototype.minScale = function (area) {
            this._minScale = area;
            return this;
        };
        class_11.prototype.maxScale = function (area) {
            this._maxScale = area;
            return this;
        };
        class_11.convexHull = function (points) {
            var _a;
            points = __spreadArray([], points, true).sort(function (a, b) { return a.x - b.x || a.y - b.y; });
            var cross = function (o, a, b) {
                return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
            };
            var lower = [];
            for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
                var p = points_2[_i];
                while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0)
                    lower.pop();
                lower.push(p);
            }
            var upper = [];
            for (var i = points.length - 1; i >= 0; i--) {
                var p = points[i];
                while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0)
                    upper.pop();
                upper.push(p);
            }
            upper.pop();
            lower.pop();
            var hullPoints = lower.concat(upper);
            return new ((_a = CreateJS.ConvexPolygon).bind.apply(_a, __spreadArray([void 0, hullPoints[0].x, hullPoints[0].y], hullPoints.map(function (point) { return point.clone().sub(hullPoints[0]); }), false)))();
        };
        return class_11;
    }(CreateJS.Shape));
    CreateJS.Rect = /** @class */ (function (_super) {
        __extends(class_12, _super);
        function class_12(x, y, w, h) {
            var _this = _super.call(this, x, y) || this;
            _this.size = new CreateJS.Vec2(w, h);
            return _this;
        }
        class_12.prototype.draw = function (c) {
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
        };
        Object.defineProperty(class_12.prototype, "w", {
            get: function () {
                return this.size.x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(class_12.prototype, "h", {
            get: function () {
                return this.size.y;
            },
            enumerable: false,
            configurable: true
        });
        class_12.prototype.alignTo = function (thisAnchor, rect, toAnchor) {
            var point = new CreateJS.Vec2();
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
            var position = new CreateJS.Vec2();
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
        };
        class_12.prototype.anchorAt = function (vec2, anchor) {
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
        };
        class_12.prototype.translate = function (dx, dy) {
            this.position.add(new CreateJS.Vec2(dx, dy));
            return this;
        };
        class_12.prototype.scale = function (wFactor, hFactor) {
            if (hFactor === undefined) {
                this.size.mul(wFactor);
                return this;
            }
            else {
                this.size.x *= wFactor;
                this.size.y *= hFactor;
                return this;
            }
        };
        class_12.prototype.scaleFrom = function (wFactor, hFactor, origin) {
            if (hFactor === void 0) { hFactor = this.center(); }
            if (origin === void 0) { origin = this.center(); }
            var offset = this.position.clone().sub(origin);
            if (typeof hFactor === "number") {
                var scaledOffset = offset.mul(new CreateJS.Vec2(wFactor, hFactor));
                this.size.mul(new CreateJS.Vec2(wFactor, hFactor));
                this.position = origin.clone().add(scaledOffset);
            }
            else if (typeof hFactor === "object") {
                var scaledOffset = offset.mul(wFactor);
                this.size.mul(wFactor);
                this.position = hFactor.clone().add(scaledOffset);
            }
            return this;
        };
        class_12.prototype.containsPoint = function (point) {
            return (point.x >= this.position.x &&
                point.x <= this.position.x + this.size.x &&
                point.y >= this.position.y &&
                point.y <= this.position.y + this.size.y);
        };
        class_12.prototype.contains = function (rect) {
            return (this.containsPoint(rect.topLeft()) &&
                this.containsPoint(rect.topRight()) &&
                this.containsPoint(rect.bottomRight()) &&
                this.containsPoint(rect.bottomLeft()));
        };
        class_12.prototype.aspectRatio = function () {
            return this.w / this.h;
        };
        class_12.prototype.area = function () {
            return this.w * this.h;
        };
        class_12.prototype.topLeft = function () {
            return this.position.clone();
        };
        class_12.prototype.topRight = function () {
            return this.position.clone().add(new CreateJS.Vec2(this.size.x, 0));
        };
        class_12.prototype.bottomRight = function () {
            return this.position.clone().add(this.size);
        };
        class_12.prototype.bottomLeft = function () {
            return this.position.clone().add(new CreateJS.Vec2(0, this.size.y));
        };
        class_12.prototype.center = function () {
            return this.position.clone().add(this.size.clone().div(2));
        };
        class_12.prototype.toBounds = function () {
            return {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h
            };
        };
        class_12.prototype.toPolygon = function () {
            return [
                this.topLeft().clone().sub(this.position),
                this.topRight().clone().sub(this.position),
                this.bottomRight().clone().sub(this.position),
                this.bottomLeft().clone().sub(this.position)
            ];
        };
        class_12.fromCenter = function (center, size) {
            var rectSize = new CreateJS.Vec2(size, size);
            var pos = center.clone().sub(rectSize.div(2));
            return new CreateJS.Rect(pos.x, pos.y, size, size);
        };
        class_12.fromPoints = function (point1, point2) {
            var size = point1.vectorTo(point2);
            return new CreateJS.Rect(point1.x, point1.y, size.x, size.y);
        };
        return class_12;
    }(CreateJS.Shape));
    CreateJS.TimeHandler = (_d = /** @class */ (function () {
            function class_13() {
            }
            class_13.wait = function (ms) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, ms);
                });
            };
            class_13.tick = function (fps, callback) {
                return __awaiter(this, void 0, Promise, function () {
                    var tick, dt, callbackReturn;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tick = 0;
                                CreateJS.TimeHandler.timeBefore = performance.now();
                                _a.label = 1;
                            case 1:
                                if (!true) return [3 /*break*/, 5];
                                if (CreateJS.TimeHandler._stop) {
                                    CreateJS.TimeHandler._stop = false;
                                    return [3 /*break*/, 5];
                                }
                                if (!CreateJS.TimeHandler._pause) return [3 /*break*/, 3];
                                return [4 /*yield*/, CreateJS.TimeHandler.wait(fps)];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 1];
                            case 3:
                                dt = (performance.now() - CreateJS.TimeHandler.timeBefore) / fps;
                                CreateJS.TimeHandler.timeBefore = performance.now();
                                callbackReturn = callback(++tick, dt);
                                if (callbackReturn !== undefined) {
                                    tick = callbackReturn;
                                }
                                return [4 /*yield*/, CreateJS.TimeHandler.wait(fps)];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 1];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            class_13.stop = function () {
                CreateJS.TimeHandler.timeBefore = 0;
                CreateJS.TimeHandler._stop = true;
            };
            class_13.pause = function () {
                CreateJS.TimeHandler._pause = true;
            };
            class_13.resume = function () {
                CreateJS.TimeHandler._pause = false;
            };
            return class_13;
        }()),
        _d.timeBefore = 0,
        _d._stop = false,
        _d._pause = false,
        _d);
    return CreateJS;
}());
exports.CreateJS = CreateJS;
exports.default = CreateJS;
