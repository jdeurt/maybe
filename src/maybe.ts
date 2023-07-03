/* eslint-disable @typescript-eslint/no-non-null-assertion */

export abstract class Maybe<A> {
    constructor(private readonly value: A) {}

    static of<A>(value: A): Maybe<A> {
        return value === null || value === undefined
            ? Nothing.of()
            : Just.of(value);
    }

    static nothing<A>(): Maybe<A> {
        return Nothing.of();
    }

    static just<A>(value: A): Maybe<A> {
        return Just.of(value);
    }

    isNothing(): boolean {
        return this.value === null || this.value === undefined;
    }

    isJust(): boolean {
        return !this.isNothing();
    }

    map<B>(f: (a: A) => B): Maybe<B> {
        return this.isNothing()
            ? Maybe.of(undefined as never)
            : Maybe.of(f(this.value));
    }

    flatMap<B>(f: (a: A) => Maybe<B>): Maybe<B> {
        return this.isNothing() ? Maybe.of(undefined as never) : f(this.value);
    }

    apply<B>(fab: Maybe<(a: A) => B>): Maybe<B> {
        return this.isNothing()
            ? Maybe.of(undefined as never)
            : fab.map((f) => f(this.value));
    }

    equals(ma: Maybe<A>): boolean {
        return this.isNothing()
            ? ma.isNothing()
            : ma.isJust() && this.value === ma.value;
    }

    getOrElse(a: A): A {
        return this.isNothing() ? a : this.value;
    }

    orElse(a: A): Maybe<A> {
        return this.isNothing() ? Maybe.of(a) : this;
    }

    get(): A {
        if (this.isNothing()) {
            throw new Error("Cannot get value from Nothing");
        }

        return this.value;
    }

    toString(): string {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return this.isNothing() ? "Nothing" : `Just(${this.value})`;
    }
}

export class Nothing<A> extends Maybe<A> {
    constructor() {
        super(undefined as never);
    }

    static of<A>(): Maybe<A> {
        return new Nothing();
    }
}

export class Just<A> extends Maybe<A> {
    static of<A>(value: A): Maybe<A> {
        return new Just(value);
    }
}
