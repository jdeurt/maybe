# @jdeurt/maybe

An implementation of the Maybe monad in Typescript.

## Installation

To install, run:

```bash
yarn add @jdeurt/maybe
```

## API Documentation

### Class: `Maybe<A>`

`Maybe<A>` is an abstract class that represents a type that may either hold a value of type `A` (represented as `Just<A>`) or not (represented as `Nothing<A>`).

#### Static Method: `of`

Creates a new `Maybe<A>` instance.

#### Static Method: `nothing`

Creates a new `Nothing<A>` instance.

#### Static Method: `just`

Creates a new `Just<A>` instance.

#### Method: `isNothing`

Returns `true` if the `Maybe<A>` instance is `Nothing<A>`, `false` otherwise.

#### Method: `isJust`

Returns `true` if the `Maybe<A>` instance is `Just<A>`, `false` otherwise.

#### Method: `map`

Transforms the value in the `Just<A>` using the function, if the `Maybe<A>` is `Just<A>`. If the `Maybe<A>` is `Nothing<A>`, does nothing.

#### Method: `flatMap`

Similar to `map`, but the provided function should return a `Maybe<B>` instance.

#### Method: `apply`

Applies the function contained in the `Maybe<A>` to another `Maybe<A>`, if both `Maybe<A>` instances are `Just<A>`. If either `Maybe<A>` is `Nothing<A>`, does nothing.

#### Method: `equals`

Checks if two `Maybe<A>` instances are equal.

#### Method: `getOrElse`

If the `Maybe<A>` instance is `Just<A>`, returns its value, otherwise returns the default value.

#### Method: `orElse`

If the `Maybe<A>` instance is `Just<A>`, returns it, otherwise returns `Just<A>` of the default value.

#### Method: `get`

Returns the value of the `Maybe<A>` instance if it's `Just<A>`, otherwise throws an error.

#### Method: `toString`

Returns the string representation of the `Maybe<A>` instance.

### Class: `Nothing<A>`

`Nothing<A>` is a class that represents the absence of a value. It extends `Maybe<A>`.

#### Static Method: `of`

Creates a new `Nothing<A>` instance.

### Class: `Just<A>`

`Just<A>` is a class that represents the presence of a value. It extends `Maybe<A>`.

#### Static Method: `of`

Creates a new `Just<A>` instance.
