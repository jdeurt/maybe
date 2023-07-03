import { testProp, fc } from "@fast-check/ava";
import test from "ava";
import { Maybe } from "../src";

testProp(
    "should return Nothing when value is null or undefined",
    [fc.anything()],
    (t, x) => {
        const m = Maybe.of(x);
        t.is(m.isNothing(), x === null || x === undefined);
    }
);

testProp(
    "should return Just when value is not null or undefined",
    [fc.anything()],
    (t, x) => {
        const m = Maybe.of(x);
        t.is(m.isJust(), x !== null && x !== undefined);
    }
);

testProp(
    "should correctly apply the function to the inner value when the Maybe is a Just",
    [fc.anything()],
    (t, x) => {
        if (x !== null && x !== undefined) {
            const m = Maybe.of(x);
            const f = (val: any) => val.toString();
            t.is(m.map(f).getOrElse(""), f(x));
        } else {
            t.pass();
        }
    }
);

testProp(
    "flatMap should correctly apply the function and flatten the result",
    [fc.anything()],
    (t, x) => {
        if (x !== null && x !== undefined) {
            const m = Maybe.of(x);
            const f = (val: any) => Maybe.of(val.toString());
            t.is(m.flatMap(f).getOrElse(""), f(x).getOrElse(""));
        } else {
            t.pass();
        }
    }
);

testProp(
    "apply should correctly apply the function wrapped in Maybe",
    [fc.string(), fc.func(fc.string())],
    (t, x, fab) => {
        const m = Maybe.of(x);
        const maybeFn = Maybe.of(fab);
        const expected = m.isNothing() || maybeFn.isNothing() ? "" : fab(x);
        t.is(m.apply(maybeFn).getOrElse(""), expected);
    }
);

testProp(
    "orElse should provide the default value when Maybe is Nothing",
    [fc.anything()],
    (t, x) => {
        const m = Maybe.of(x);
        const defaultValue = "default";
        t.is(
            m.orElse(defaultValue).getOrElse(""),
            m.isNothing() ? defaultValue : x
        );
    }
);

testProp(
    "getOrElse should return the inner value if Maybe is Just, otherwise return the provided default value",
    [fc.anything()],
    (t, x) => {
        const m = Maybe.of(x);
        const defaultValue = "default";
        t.is(m.getOrElse(defaultValue), m.isJust() ? x : defaultValue);
    }
);

test("Just should equal Just with the same value", (t) => {
    const m1 = Maybe.just(10);
    const m2 = Maybe.just(10);
    t.true(m1.equals(m2));
});

test("Just should not equal Just with a different value", (t) => {
    const m1 = Maybe.just(10);
    const m2 = Maybe.just(20);
    t.false(m1.equals(m2));
});

test("Just should not equal Nothing", (t) => {
    const m1 = Maybe.just(10);
    const m2 = Maybe.nothing<number>();
    t.false(m1.equals(m2));
});

test("Nothing should equal Nothing", (t) => {
    const m1 = Maybe.nothing();
    const m2 = Maybe.nothing();
    t.true(m1.equals(m2));
});

test("Nothing should not equal Just", (t) => {
    const m1 = Maybe.nothing();
    const m2 = Maybe.just(10);
    t.false(m1.equals(m2));
});
