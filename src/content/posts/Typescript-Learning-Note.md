---
title: Typescript-Learning-Note
date: 2023-06-01 17:59:40
tags:
 - Typescript
categories: web前端
---
# Typescript Properties(Notice)

##  Optional properties
add a ? after the property name
```bash
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```
## Union Types
Defining a Union Type
```bash
function printId(id: number | string) {  //use | to separate
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
```
if you have the union string | number, you can’t use methods that are only available on string
```bash
function printId(id: number | string) {
  console.log(id.toUpperCase());
Property 'toUpperCase' does not exist on type 'string | number'.
  Property 'toUpperCase' does not exist on type 'number'.
}
// solution of upstairs
function printId(id: number | string) {
  if (typeof id === "string") { // use typeof that Typescript knows that only a string value
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```
## Type Aliases
use a type to give a name to any type at all
```bash
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```
## Interfaces
An interface declaration is another way to name an object type:
```bash
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```
## Differences Between Interfaces and Type Alias
Differences of Extending
```bash
interface Animal { // interfaces
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;

type Animal = { // type
  name: string;
}

type Bear = Animal & { 
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```
Difference of Adding new fields
```bash
interface Window { //interfaces
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});


type Window = { // A Type cannot be changed after being created
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}

 // Error: Duplicate identifier 'Window'.
```
## null and undefined
strictNullChecks on
```bash
// handle method
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

// use ! after any expression
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

```
# More on Function
## Function Type Expressions
Typeof Function is fn
```bash
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```
## Generic Functions
```bash
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];   // the Type can be meant every type return
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```
Inference Function - The type were inferred - chosen automatically by Typescript
```bash
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```
## Specifying Type Arguments
```bash
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

const arr = combine([1, 2, 3], ["hello"]); // mismatched arrays
Type 'string' is not assignable to type 'number'.

const arr = combine<string | number>([1, 2, 3], ["hello"]); // use specify Type
```
## Optional Parameters
```bash
// method one
function f(x?: number) { //marking the parameters as optional with ?
  // ...
}
f(); // OK
f(10); // OK

function f(x = 10) { // param is specified as type <number | undefined>,provide a default value
  // ...
}

// method two
Partial<ListApiOption<unknown, unknown>> // use Partial before type call
```
## OtherTypes to Know About
```bash
// 1. void
// The inferred return type is void
function noop() {
  return;
}

// 2. unknown
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) { // similar to the any type,but not legal to do anything
  a.b();
'a' is of type 'unknown'.
}

// 3. never
function fail(msg: string): never { // some functions never return a value
  throw new Error(msg);
}
```
## Parameter Destructuring
```bash
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) { // unpack objects provided as an argument
  console.log(a + b + c);
}
```
# Object Types
## readonly Properties
```bash
interface SomeType {
  readonly prop: string; //readonly can't be written to during type-checking
}
 
function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);
 
  // But we can't re-assign it.
  obj.prop = "hello";
Cannot assign to 'prop' because it is a read-only property.
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
 
let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};
 
// works
let readonlyPerson: ReadonlyPerson = writablePerson;
 
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'
```
## Extending  Types
```bash
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```
## Generic Object Types
use <> declares a type parameter
```bash
interface Array<Type> {   // Array is a generic type
  /**
   * Gets or sets the length of the array.
   */
  length: number;
 
  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;
 
  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;
 
  // ...
}
```
## Tuple Types
```bash
function doSomething(pair: [string, number]) {
  const a = pair[0];
       
const a: string
  const b = pair[1];
       
const b: number
  // ...
}
 
doSomething(["hello", 42]);

// index shouldn't past the number of elements
function doSomething(pair: [string, number]) {
  // ...
 
  const c = pair[2];
Tuple type '[string, number]' of length '2' has no element at index '2'.
}

// we can destructure tuples 
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
 
  console.log(inputString);
                  
const inputString: string
 
  console.log(hash);
               
const hash: number
}
```
# Utility Types
## Partial <Type>
```bash
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) { // use Partial and bracket <> inside Type
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```
## Required <Type>
opposite of Partial
```bash
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
const obj2: Required<Props> = { a: 5 };
Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```
## Record<Keys, Type>
```bash
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = { // can be used to map the properties
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
 
cats.boris;
```
## Pick<Type, Keys>
```bash
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
todo;  //const todo:TodoPreview
```
## Omit<Type, Keys>
remove keys,The opposite of Pick
```bash
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreview = Omit<Todo, "description">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
 
todo;
 
const todo: TodoPreview
 
type TodoInfo = Omit<Todo, "completed" | "createdAt">;
 
const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
 
todoInfo;
```