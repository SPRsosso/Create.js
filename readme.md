# Create.js

Create.js is a JavaScript (or TypeScript) library which provides game engine like methods to use.

This can be helpful when making games. This library provides many classes to choose from, for example: Vec2, KeyboardEvent, Physics, Point, Line, Rect, ConvexShape and much more.

## Installation

To install Create.js, first you choose version:

[TypeScript Here](https://raw.githubusercontent.com/SPRsosso/Create.js/refs/heads/main/ts/createjs.ts)

[JavaScript Here]()

Then you need to drop the file in your codebase. After that you need to import it and you are good to go!

```typescript
import { CreateJS } from "createjs.js"
```

or

```typescript
import CreateJS from "createjs.js"
```

## Usage

You can use it for basicaly anything but it is suited for game programming.

### Vec2 Class

Vec2 class gives you many methods to choose from, methods CHANGE the current vector (it DOESN'T create new one). 

Methods:

#### ```clone(): CreateJS.Vec2```

To make a new vector with the same values you can use clone() method. It returns the cloned (copied) vector (new instance).

```typescript
const vector = new CreateJS.Vec2(20, 50);
const copiedVector = vector.clone(); // Returns Vec2 { x: 20, y: 50 }
```

#### ```add(vec2: CreateJS.Vec2): CreateJS.Vec2```

It adds to current vector another vector. Returns itself.

```typescript
const vector = new CreateJS.Vec2(20, 50); 
const addedVector = new CreateJS.Vec2(5, 9);

vector.add(addedVector) // vector now is Vec2 { x: 25, y: 59 }
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)