/**
 * Maybe monad implementation for handling optional values and null safety.
 */
export abstract class Maybe<A> {
    constructor(private readonly value: A) {}

    /**
     * Creates a new Maybe instance.
     * @param value The value to be wrapped.
     * @returns A Just(value) if value is not null or undefined, otherwise returns Nothing.
     */
    static of<A>(value: A): Maybe<A> {
        return value === null || value === undefined
            ? Nothing.of()
            : Just.of(value);
    }

    /**
     * Creates a new Nothing instance.
     * @returns A Nothing instance.
     */
    static nothing<A>(): Maybe<A> {
        return Nothing.of();
    }

    /**
     * Creates a new Just instance.
     * @param value The value to be wrapped.
     * @returns A Just instance with the value.
     */
    static just<A>(value: A): Maybe<A> {
        return Just.of(value);
    }

    /**
     * Checks if the Maybe instance is Nothing.
     * @returns True if the Maybe instance is Nothing, false otherwise.
     */
    isNothing(): boolean {
        return this.value === null || this.value === undefined;
    }

    /**
     * Checks if the Maybe instance is Just.
     * @returns True if the Maybe instance is Just, false otherwise.
     */
    isJust(): boolean {
        return !this.isNothing();
    }

    /**
     * Transforms the value in the Just using the function f, if the Maybe is Just.
     * If the Maybe is Nothing, does nothing.
     * @param f The function to transform the value.
     * @returns A new Maybe instance with the transformed value.
     */
    map<B>(f: (a: A) => B): Maybe<B> {
        return this.isNothing() ? Maybe.nothing() : Maybe.of(f(this.value));
    }

    /**
     * Transforms the value in the Just using the function f, if the Maybe is Just.
     * If the Maybe is Nothing, does nothing.
     * The function f should return a Maybe instance.
     * @param f The function to transform the value.
     * @returns A new Maybe instance with the transformed value.
     */
    flatMap<B>(f: (a: A) => Maybe<B>): Maybe<B> {
        return this.isNothing() ? Maybe.nothing() : f(this.value);
    }

    /**
     * Applies the function contained in the Maybe to another Maybe, if both Maybe instances are Just.
     * If either Maybe is Nothing, does nothing.
     * @param fab The Maybe instance containing the function to apply.
     * @returns A new Maybe instance with the result of applying the function.
     */
    apply<B>(fab: Maybe<(a: A) => B>): Maybe<B> {
        return this.isNothing()
            ? Maybe.nothing()
            : fab.map((f) => f(this.value));
    }

    /**
     * Checks if two Maybe instances are equal.
     * @param ma The other Maybe instance to compare with.
     * @returns True if the two Maybe instances are equal, false otherwise.
     */
    equals(ma: Maybe<A>): boolean {
        return this.isNothing()
            ? ma.isNothing()
            : ma.isJust() && this.value === ma.value;
    }

    /**
     * If the Maybe instance is Just, returns its value, otherwise returns the default value.
     * @param defaultValue The default value to return if the Maybe instance is Nothing.
     * @returns The value of the Maybe instance if it's Just, otherwise the default value.
     */
    getOrElse(defaultValue: A): A {
        return this.isNothing() ? defaultValue : this.value;
    }

    /**
     * If the Maybe instance is Just, returns it, otherwise returns Just(defaultValue).
     * @param defaultValue The default value to wrap in a Just if the Maybe instance is Nothing.
     * @returns The original Maybe instance if it's Just, otherwise Just(defaultValue).
     */
    orElse(defaultValue: A): Maybe<A> {
        return this.isNothing() ? Maybe.of(defaultValue) : this;
    }

    /**
     * Returns the value of the Maybe instance if it's Just, otherwise throws an error.
     * @throws {Error} Throws an error if the Maybe instance is Nothing.
     * @returns The value of the Maybe instance.
     */
    get(): A {
        if (this.isNothing()) {
            throw new Error("Cannot get value from Nothing");
        }

        return this.value;
    }

    /**
     * Returns the string representation of the Maybe instance.
     * @returns A string representing the Maybe instance.
     */
    toString(): string {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return this.isNothing() ? "Nothing" : `Just(${this.value})`;
    }
}

/**
 * Nothing class for representing the absence of a value.
 */
export class Nothing<A> extends Maybe<A> {
    constructor() {
        super(undefined as never);
    }

    /**
     * Creates a new Nothing instance.
     * @returns A Nothing instance.
     */
    static of<A>(): Maybe<A> {
        return new Nothing();
    }
}

/**
 * Just class for representing the presence of a value.
 */
export class Just<A> extends Maybe<A> {
    /**
     * Creates a new Just instance.
     * @param value The value to be wrapped.
     * @returns A Just instance with the value.
     */
    static of<A>(value: A): Maybe<A> {
        return new Just(value);
    }
}
