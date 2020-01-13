_This post was orginally written on `2016-07-18` and was in OCaml_

OCaml/ReasonML tree examples tend to be defined with algebraic data
types and tend to be functional examples. Here are two imperative tree
traversals, a pre-order and in-order. I'm still trying to work out a
nice post-order imperative solution in OCaml/ReasonML so if you have
one then please tweet it at me: <a href='https://twitter.com/@edgararout'>@edgararout</a>

```javascript
type node('a) = {
  mutable data: 'a,
  mutable left: option(node('a)),
  mutable right: option(node('a))
};

let new_node = (data) => {data, left: None, right: None};

let insert = (tree, new_data) => {
  module Wrapper = {
    exception Stop_loop;
  };
  let iter = ref(tree);
  try (
    while (true) {
      if (new_data < iter^.data) {
        switch iter^.left {
        | None =>
          iter^.left = Some(new_node(new_data));
          raise(Wrapper.Stop_loop);
        | Some(left_tree) => iter := left_tree
        };
      } else if (new_data > iter^.data) {
        switch iter^.right {
        | None =>
          iter^.right = Some(new_node(new_data));
          raise(Wrapper.Stop_loop);
        | Some(right_tree) => iter := right_tree
        };
      };
    }
  ) {
  | Wrapper.Stop_loop => ()
  };
};

let pre_order_traversal = (tree) => {
  let s = Stack.create();
  Stack.push(tree, s);
  while (! Stack.is_empty(s)) {
    let iter_node = Stack.pop(s);
    Printf.sprintf("%s ", iter_node.data) |> print_string;
    switch iter_node.right {
    | None => ()
    | Some(right) => Stack.push(right, s)
    };
    switch iter_node.left {
    | None => ()
    | Some(left) => Stack.push(left, s)
    };
  };
};

let in_order_traversal = (tree) => {
  module W = {
    exception Stop_loop;
  };
  let visited_stack = Stack.create();
  let iter_node = ref(Some(tree));
  try (
    while (true) {
      /* Inner loop, we keep trying to go left */
      try (
        while (true) {
          switch iter_node^ {
          | None => raise(W.Stop_loop)
          | Some(left) =>
            Stack.push(left, visited_stack);
            iter_node := left.left;
          };
        }
      ) {
      | W.Stop_loop => ()
      };
      /* If we have no more to process in the stack, then we're
         done */
      if (Stack.length(visited_stack) == 0) {
        raise(W.Stop_loop);
      } else {
        /* Here we're forced to start moving rightward */
        let temp = Stack.pop(visited_stack);
        Printf.sprintf("%s ", temp.data) |> print_string;
        iter_node := temp.right;
      };
    }
  ) {
  | W.Stop_loop => ()
  };
};

let print_spiral = (root) => {
  let (current, next) = Stack.(ref(create()), ref(create()));
  let left_to_right = ref(true);
  let swap = (a, b) => {
    let (a_, b_) = (a^, b^);
    a := b_;
    b := a_;
  };
  Stack.push(root, current^);
  while (! Stack.is_empty(current^)) {
    let r = Stack.top(current^);
    Stack.pop(current^) |> ignore;
    Printf.sprintf("%s ", r.data) |> print_string;
    if (left_to_right^) {
      switch r.left {
      | None => ()
      | Some(l) => Stack.push(l, next^)
      };
      switch r.right {
      | None => ()
      | Some(r) => Stack.push(r, next^)
      };
    } else {
      switch r.right {
      | None => ()
      | Some(r) => Stack.push(r, next^)
      };
      switch r.left {
      | None => ()
      | Some(l) => Stack.push(l, next^)
      };
    };
    if (Stack.length(current^) == 0) {
      left_to_right := ! left_to_right^;
      swap(current, next);
    };
  };
};

let () = {
  let root = new_node("F");
  ["B", "G", "A", "D", "I", "C", "E", "H"] |> List.iter(insert(root));
  pre_order_traversal(root);
  print_newline();
  in_order_traversal(root);
  print_newline();
  print_spiral(root);
};
```
