# Create.js

Create.js is a JavaScript (or TypeScript) library which provides game engine-like methods to use.

This can be helpful when making games. This library provides many classes to choose from, for example: Vec2, KeyboardEvent, Physics, Point, Line, Rect, ConvexShape and much more.

## Installation

To install Create.js, first you choose the version:

[TypeScript Here](https://raw.githubusercontent.com/SPRsosso/Create.js/refs/heads/main/ts/createjs.ts)

[JavaScript Here](https://raw.githubusercontent.com/SPRsosso/Create.js/refs/heads/main/js/createjs.js)

Then you need to drop the file in your codebase. After that you need to import it and you are good to go!

```typescript
import { CreateJS } from "createjs.js"
```

or

```typescript
import CreateJS from "createjs.js"
```

# Usage

You can use it for basicaly anything but it is suited for making games.

## CreateJS.Vec2(x?: number, y?: number)

If arguments are not passed the constructor will construct **zero vector** `{ x: 0, y: 0 }`

Vec2 class gives you many methods to choose from, methods **change** the current vector (it **doesn't** create a new one). 

#### `clone(): CreateJS.Vec2`

To make a new vector with the same values you can use the clone() method. It returns the cloned (copied) vector (new instance).

```typescript
const vector = new CreateJS.Vec2(20, 50);
const copiedVector = vector.clone(); // Returns Vec2 { x: 20, y: 50 }
```

#### `add(vec2: CreateJS.Vec2): CreateJS.Vec2`

It adds to the current vector another vector. Returns itself.

```typescript
const vector = new CreateJS.Vec2(20, 50); 
const addedVector = new CreateJS.Vec2(5, 9);

vector.add(addedVector); // Vector is Vec2 { x: 25, y: 59 }
```

#### `sub(vec2: CreateJS.Vec2): CreateJS.Vec2`

It substracts to current vector another vector. Returns itself.

```typescript
const vector = new CreateJS.Vec2(20, 50);
const substractedVector = new CreateJS.Vec2(23, 9);

vector.sub(substractedVector); // Vector is Vec2 { x: -3, y: 41 }
```

#### `mul(scalar: number): CreateJS.Vec2` | `mul(vec2: CreateJS.Vec2): CreateJS.Vec2`

It multiplies current vector by a scalar or another vector. Returns itself.

```typescript
const vector = new CreateJS.Vec2(2, 3);
const multiplyBy = 2;

vector.mul(multiplyBy); // Vector is Vec2 { x: 4, y: 6 }
```
or
```typescript
const vector = new CreateJS.Vec2(2, 3);
const multiplyBy = new CreateJS.Vec2(3, 4);

vector.mul(multiplyBy); // Vector is Vec2 { x: 6, y: 12 }
```

#### `div(scalar: number): CreateJS.Vec2` | `div(vec2: CreateJS.Vec2): CreateJS.Vec2`

It divides the current vector by a scalar or another vector. Returns itself.

```typescript
const vector = new CreateJS.Vec2(2, 10);
const divideBy = 2;

vector.div(divideBy); // Vector is Vec2 { x: 1, y: 5 }
```
or
```typescript
const vector = new CreateJS.Vec2(6, 12);
const divideBy = new CreateJS.Vec2(3, 4);

vector.div(divideBy); // Vector is Vec2 { x: 2, y: 3 }
```

#### `negate(): CreateJS.Vec2`

Negates current vector's x and y. Returns itself.

```typescript
const vector = new CreateJS.Vec2(-19, 26);

vector.negate(); // Vector is Vec2 { x: 19, y: -26 }
```

#### `dot(vec2: CreateJS.Vec2): number`

Returns dot product between current vector and other vector.

```typescript
const vector = new CreateJS.Vec2(3, 3);
const vector2 = new CreateJS.Vec2(3, 3);

vector.dot(vector2); // Returns 18
```

#### `lerp(vec2: CreateJS.Vec2, t: number): CreateJS.Vec2`

Linear interpolates the current vector to another one by the `t` factor. Returns itself.

```typescript
const vector = new CreateJS.Vec2(0, 0);
const vector2 = new CreateJS.Vec2(10, 10);
const tFactor = 0.5;

vector.lerp(vector2, tFactor); // Vector is Vec2 { x: 5, y: 5 }
```
another example:
```typescript
const vector = new CreateJS.Vec2(0, 0);
const vector2 = new CreateJS.Vec2(10, 10);
const tFactor = 0.85;

vector.lerp(vector2, tFactor); // Vector is Vec2 { x: 8.5, y: 8.5 }
```

#### `clamp(minVec: CreateJS.Vec2, maxVec: CreateJS.Vec2): CreateJS.Vec2`

Clamps the current vector to expected values. Returns itself.


```typescript
const vector = new CreateJS.Vec2(-10, 30);
const minVector = new CreateJS.Vec2(-5, 10);
const maxVector = new CreateJS.Vec2(10, 20);

vector.clamp(minVector, maxVector); // Vector is Vec2 { x: -5, y: 20 }
```

#### `min(vec2: CreateJS.Vec2): CreateJS.Vec2`

Sets current vector's x and y based on smaller **other** and **current vector** values. Returns itself.

```typescript
const vector = new CreateJS.Vec2(59, 13);
const minVector = new CreateJS.Vec2(104, 7);

vector.min(minVector); // Vector is Vec2 { x: 59, y: 7 }
```

#### `max(vec2: CreateJS.Vec2): CreateJS.Vec2`

Sets current vector's x and y based on larger **other** and **current vector** values. Returns itself.

```typescript
const vector = new CreateJS.Vec2(59, 13);
const maxVector = new CreateJS.Vec2(104, 7);

vector.max(maxVector); // Vector is Vec2 { x: 104, y: 13 }
```

#### `perpendicular(): CreateJS.Vec2`

Sets current vector's x and y to it's perpendicular, i.e. `{ x: -y, y: x }`. Returns itself.

```typescript
const vector = new CreateJS.Vec2(10, 13);

vector.perpendicular(); // Vector is Vec2 { x: -13, y: 10 }
```

#### `scaleTo(length: number): CreateJS.Vec2`

Scales current vector's length to specified `length`. Returns itself.

```typescript
const vector = new CreateJS.Vec2(3, 4);

vector.scaleTo(13); // Vector is Vec2 { x: 7.8, y: 10.4 } and length is 13
```

#### `rotate(angle_radians: number): CreateJS.Vec2`

Rotates current vector clockwise by specified `angle_radians`. Returns itself.

```typescript
const vector = new CreateJS.Vec2(3, 4);

vector.rotate(Math.PI / 2); // Rotate by PI/2 radians, i.e. 90 degrees
                            // Vector is Vec2 { x: -4, y: 3 }, same as vector.perpendicular()
```

#### `reflect(vec2: CreateJS.Vec2): CreateJS.Vec2`

Reflects current vector depending on surface (another vector). Works like a laser (**current vector**) reflecting of a mirror (**surface (another vector)**) positioned at some angle. Returns itself.

```typescript
const vector = new CreateJS.Vec2(2, 4);
const surfaceVector = new CreateJS.Vec2(-1, 0);

vector.reflect(surfaceVector); // Vector is Vec2 { x: -2, y: 4 }
```

#### `project(onto: CreateJS.Vec2): CreateJS.Vec2`

Projects the current vector onto another vector (**`onto`**) — it gives the component of the current vector that lies in the direction of **`onto`**. Returns itself.

```typescript
const vector = new CreateJS.Vec2(3, 4);
const onto = new CreateJS.Vec2(5, 0); // x-axis direction

vector.project(onto); // Vector is Vec2 { x: 3, y: 0 }
```

Here, (3, 4) is projected onto the x-axis, so the result is (3, 0).

#### `cross(vec2: CreateJS.Vec2): number`

Returns cross product between **current vector** and **another**.

```typescript
const vectorA = new CreateJS.Vec2(2, 3);
const vectorB = new CreateJS.Vec2(4, 1);

const result = vectorA.cross(vectorB); // result = 2*1 - 3*4 = 2 - 12 = -10
```

#### `angleTo(vec2: CreateJS.Vec2): number`

Returns angle from **current vector** to **another**.

```typescript
const vectorA = new CreateJS.Vec2(10, 10);
const vectorB = new CreateJS.Vec2(-4, 4);

const angle = vectorA.angleTo(vectorB) // angle = 1.5707963267948966 radians = 90 degrees
```

#### `angle(): number`

Returns angle at which the **vector** is facing.

```typescript
const vector = new CreateJS.Vec2(4, 4 * Math.sqrt(3)); // 30-60-90 right triangle

const angle = vector.angle(); // angle = 1.0471975511965976 radians = 60 degrees
```

#### `abs(): CreateJS.Vec2`

Takes the **absolute** value of vector's x and y. Returns itself.

```typescript
const vector = new CreateJS.Vec2(-5, 13);

vector.abs(); // Vector is Vec2 { x: 5, y: 13 }
```

#### `floor(decimalPlace: number = 0): CreateJS.Vec2`

**Floors** current vector's x and y to passed `decimal places`. Returns itself.

```typescript
const vector = new CreateJS.Vec2(0.00045, 3.345);

vector.floor(); // Vector is Vec2 { x: 0, y: 3 }
```
or
```typescript
const vector = new CreateJS.Vec2(0.00045, 3.345);

vector.floor(4); // Vector is Vec2 { x: 0.0004, y: 3.345 }
```

#### `ceil(decimalPlace: number = 0): CreateJS.Vec2`

**Ceils** current vector's x and y to passed `decimal places`. Returns itself.

```typescript
const vector = new CreateJS.Vec2(0.00045, 3.345);

vector.ceil(); // Vector is Vec2 { x: 1, y: 4 }
```
or
```typescript
const vector = new CreateJS.Vec2(0.00045, 3.345);

vector.ceil(4); // Vector is Vec2 { x: 0.0005, y: 3.345 }
```

#### `round(decimalPlace: number = 0): CreateJS.Vec2`

**Rounds** current vector's x and y to passed `decimal places`. Returns itself.

```typescript
const vector = new CreateJS.Vec2(0.00045, 3.345);

vector.round(); // Vector is Vec2 { x: 0, y: 3 }
```
or
```typescript
const vector = new CreateJS.Vec2(0.00045, 3.345);

vector.round(4); // Vector is Vec2 { x: 0.0005, y: 3.345 }
```

#### `length(): number`

Returns **length** of current vector.

```typescript
const vector = new CreateJS.Vec2(3, 4);

const length = vector.length(); // length = 5
```

#### `isZero(): boolean`

Returns true if current vector is a **zero vector**

```typescript
const vector = new CreateJS.Vec2();

const result = vector.isZero(); // result = true
```
or
```typescript
const vector = new CreateJS.Vec2(3, 0);

const result = vector.isZero(); // result = false
```

#### `equals(vec: CreateJS.Vec2): boolean`

Returns true if vectors **are equal**, i.e. if this.x === vec.x && this.y === vec.y.

```typescript
const vectorA = new CreateJS.Vec2(3, 5);
const vectorB = new CreateJS.Vec2(3, 4);

const result = vectorA.equals(vectorB); // result = false
```
or
```typescript
const vectorA = new CreateJS.Vec2(3, 5);
const vectorB = new CreateJS.Vec2(3, 5);

const result = vectorA.equals(vectorB); // result = true
```
or
```typescript
const vectorA = new CreateJS.Vec2(3, 5);
const vectorB = vectorA.clone();

const result = vectorA.equals(vectorB); // result = true
```

#### `distanceTo(vec2: CreateJS.Vec2): number`

Returns the **distance** between **current vector** and **other**.

```typescript
const vectorA = new CreateJS.Vec2();
const vectorB = new CreateJS.Vec2(3, 4);

const result = vectorA.distanceTo(vectorB); // result = 5
```

#### `vectorTo(vec2: CreateJS.Vec2): CreateJS.Vec2`

Returns **new** vector as the **difference** between vec2 and current vector.

```typescript
const vectorA = new CreateJS.Vec2(1, 1);
const vectorB = new CreateJS.Vec2(5, 3);

const resultVector = vectorA.vectorTo(vectorB); // resultVector = Vec2 { x: 4, y: 2 }
```

#### `set(x: number, y: number): CreateJS.Vec2` | `set(vec2: CreateJS.Vec2): CreateJS.Vec2`

**Sets** current vector's to `x` and `y`, or **copies** `x` and `y` from **another vector**. Passing vector in `set()` method will **set the current vector** to another, not like `copy()` method **which copies (returns new vector)**. Returns itself.

```typescript
const vector = new CreateJS.Vec2(3, 5);

vector.set(2, 9); // Vector is Vec2 { x: 2, y: 9 }
```
or
```typescript
const vector = new CreateJS.Vec2(3, 5);
const copyVector = new CreateJS.Vec2(13, 7);

vector.set(copyVector); // Vector is Vec2 { x: 13, y: 7 }
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
