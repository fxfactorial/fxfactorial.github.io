---
title: Simple timeout usage
tags: reasonml, unix, timeout
date: "2016-03-22T20:04:30+0000"
description: Example code timeout
---

*This post was orginally written on `2016-03-22` and was in OCaml*

I wanted to use a timeout in OCaml for some shell coding but I didn't
want to introduce a big dependency on `Lwt`. After some googling I
found
[this](https://www.reddit.com/r/ocaml/comments/3qapbv/question_about_writing_a_timeout_function_and_the/)

Here's my take on the timeout function, basically its the same but I
push everything into the timeout function itself and use labeled args
along a callback for when the timeout goes off.

```javascript
let timeout = (~on_timeout=() => (), ~arg, ~timeout, ~default_value, f) => {
  module Wrapper = {
    exception Timeout;
  };
  let sigalrm_handler = Sys.Signal_handle((_) => raise(Wrapper.Timeout));
  let old_behavior = Sys.signal(Sys.sigalrm, sigalrm_handler);
  let reset_sigalrm = () => Sys.set_signal(Sys.sigalrm, old_behavior);
  ignore(Unix.alarm(timeout));
  try {
    let res = f(arg);
    reset_sigalrm();
    res;
  } {
  | exc =>
    reset_sigalrm();
    if (exc == Wrapper.Timeout) {
      on_timeout();
      default_value;
    } else {
      raise(exc);
    };
  };
};
```

and you can can use it like so:

```javascript
 Sys.command
  |> timeout(
       ~arg="sleep 3",
       ~timeout=2,
       ~default_value=-1,
       ~on_timeout=() => print_endline("func timed out")
     );
```

You might notice that your wrapped function only gets one arg, so how
can we use this timeout wrapper on functions that take more than one
argument? By currying and using a dummy arg of unit. 

Example:

```javascript
let () = {
  let partialed = (first, second, third, ()) => first + second + third;
  timeout(~arg=(), ~timeout=4, ~default_value=-1, partialed(1, 2, 3)) |> ignore;
};
```
