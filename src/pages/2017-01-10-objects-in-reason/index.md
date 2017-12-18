---
title: let binding in Reason class definitions
tags: ocaml, objects, mistakes, reasonml
date: "2017-01-10T20:04:30+0000"
description: avoid this trap
---

*This post was orginally written on `2017-01-10` and was in OCaml*

I like the `object` layer in ReasonML but here's one quirk of the
language that sometimes I forget about and it can bite you...like I
just got bit in my
`OCaml`
[bindings](https://github.com/fxfactorial/ocaml-java-scriptengine) to
`Java`'s `ScriptEngine`. (Let's you evaluate `JavaScript` in `OCaml`
using the JVM)

ReasonML lets you define an object like so: 

```javascript
class thing = {
  as _;
  pub speak = print_endline("Hello");
};

let () = (new thing)#speak;
```

Note that `method`s don't need arguments, they will always go off when
you call them.

and you can also have fields

```javascript
class thing = {
  as _;
  val coder = "coder";
  val mutable name = "Edgar";
  pub speak = print_endline(name ++ coder);
  pub set_name = (s) => name = s;
};

let () = {
  let p = new thing;
  p#speak;
  p#set_name("Gohar");
  p#speak;
};
```

Notice that we can also make fields `mutable` and they are private by
default. 

Now here's one situation you might encounter: 

```javascript
class compute = {
  as _;
  val first_field = Other_module.init();
  val second_field = Some_module.use_it(first_field);
};
```


This won't work though because you can't use one field in another
field.

One solution might be: 

```javascript
class compute = {
  let first_field = Other_module.init();
  let second_field = Some_module.use_it(first_field);
  as _;
  val first = first_field;
  val second = second_field;
};
```

Now question, are `first_field` and `second_field` created each time
a new instance of `compute` is made? 

...

The answer is no and this might be counter intuitive to some, at least
it was to me and I sometimes forget this.

Verify it with: 

```javascript
class thing = {
  let foo = 1 + 2;
  let () = print_endline("I was called");
  as _;
};

let () = {
  let a = new thing;
  let b = new thing;
  ();
};
```

And see how many times `I was called` is printed to the screen; hence
be aware of this when you use objects in ReasonML.
