import test from "node:test";
import assert from "node:assert/strict";
import {generateName} from "./index.js";

test("returns a non empty string", () => {
    const name = generateName({ theme: "earthy", gender: "male", format: "single"});
    assert.equal(typeof name, "string");
    assert.ok(name.length > 0);
    console.log(name);
});

test("format: single+last produces two words", () => {
    const name = generateName({format: "single+last"});
    assert.match(name, /^\w+\s+\w+$/);
    console.log(name);
})

test("format: single+title contains 'the '", () => {
    const name = generateName({ format: "single+title", seed: 1 });
    assert.match(name.toLowerCase(), /\bthe\b/);
    console.log(name);
  });

  // deterministic seeds
test("same seed -> same output", () => {
    const a = generateName({ seed: 42, gender: "female", format: "single+last" });
    const b = generateName({ seed: 42, gender: "female", format: "single+last" });
    assert.equal(a, b);
    console.log(a);
  });

  test("different seeds -> usually different output", () => {
    const a = generateName({ seed: 1 });
    const b = generateName({ seed: 2 });
    assert.notEqual(a, b);
    console.log(a);
    console.log(b);
  });