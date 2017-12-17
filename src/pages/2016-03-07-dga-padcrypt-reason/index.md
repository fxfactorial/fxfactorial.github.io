---
title: A Domain Generating Algorithm in ReasonML
tags: reasonml, dga, padcrypt
date: "2016-03-07T20:04:30+0000"
description: ReasonML, implementation, dga
---

*This post was orginally written on `2016-03-07` and was in OCaml*

Scrolling through twitter I saw someone mention something about the
padcrypt
[dga](https://en.wikipedia.org/wiki/Domain_generation_algorithm). Basically
it generates random ish domain names. 

Here's a `ReasonML` reimplementation of the Python code written
[here](http://johannesbader.ch/2016/03/the-dga-of-padcrypt/).


```javascript
/*  assume this is example_core.re */

module D = CalendarLib.Date;

let tlds = [|"com", "co.uk", "de", "org", "net", "eu", "info", "online", "co", "cc", "website"|];

let tlds_count = Array.length(tlds);

let nr_domains = 24 * 3;

let digit_mapping = "abcdnfolmk";

let seed_string = (~date, i) =>
  Printf.sprintf(
    "%d-%d-%d|%d",
    D.day_of_month(date),
    D.month(date) |> D.int_of_month,
    D.year(date),
    i
  );

let domain_generate = (date) => {
  let rec helper = (count, accum) =>
    if (count == nr_domains) {
      accum;
    } else {
      [seed_string(~date, count), ...helper(count + 1, accum)];
    };
  helper(0, []);
};

let () = {
  Nocrypto_entropy_unix.initialize();
  CalendarLib.Date.today()
  |> domain_generate
  |> List.iter(
       (date_stamp) => {
         let hashed =
           Cstruct.of_string(date_stamp)
           |> Nocrypto.Hash.digest(`SHA256)
           |> Hex.of_cstruct
           |> (
             fun
             | `Hex(s) => s
           );
         let domain =
           String.sub(hashed, 3, 16)
           |> Stringext.to_list
           |> List.map(
                fun
                | '0'..'9' as hh => Char.code(hh) - 48 |> String.get(digit_mapping)
                | o => o
              )
           |> Stringext.of_list;
         let tld_index =
           hashed.[String.length(hashed) - 1]
           |> Printf.sprintf("0x%c")
           |> int_of_string
           |> (
             (tld) =>
               if (tld >= tlds_count) {
                 0;
               } else {
                 tld;
               }
           );
         Printf.sprintf("%s.%s", domain, tlds[tld_index]) |> print_endline;
       }
     );
};
```

To build: 

```
$ opam install stringext calendar nocrypto hex jbuilder -y
```

And make this simple `jbuild` file:

```lisp
(jbuild_version 1)

(executable
 ((name example_code)
  (libraries (calendar nocrypto.unix hex stringext))))
```

and invoke with:

```
$ jbuilder build example_code.exe
```

And a sample run:

```
$ ./_build/default/example_code.exe
bbkndddlcdbbcbol.info
ooadbecmcfakmdbd.com
beafomcedbbdcfad.com
cdkkddmefboeebed.com
ckdnofmaonfffdkd.com
blfdkfocbanaafof.com
mloaaboambcofbdl.eu
akacnklebmaenkea.website
caafakaocnldbbbf.com
famcfokdblcbdobd.website
cbbcdbbocamdmcmd.website
kaacmbbbldebeefm.org
dnbbcdfcckedkfdf.online
lkcclcflfbfaknmc.de
cmbadacbfokckabn.com
naldlmmeedfaabdd.com
afdcfkdocfckcfda.cc
...
```
