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

You can use it for basicaly anything but it is suited for game programming.

## Vec2(x?: number, y?: number)

If arguments are not passed the constructor will construct **zero vector** `{ x: 0, y: 0 }`

Vec2 class gives you many methods to choose from, methods **change** the current vector (it **doesn't** create a new one). 

Methods:

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


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
