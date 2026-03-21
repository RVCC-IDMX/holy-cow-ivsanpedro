# cowsay

````
 __________________
< srsly dude, why? >
 ------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
````

cowsay is a configurable talking cow, originally written in Perl by [Tony Monroe](https://github.com/tnalpgge/rank-amateur-cowsay)

This project is a translation in JavaScript of the original program and an attempt to bring the same silliness to node.js.

## Install

    npm install -g cowsay


## Usage

    cowsay JavaScript FTW!

or

    cowthink node.js is cool

### Unicode and Emoji Support

You can now use Unicode and emoji characters in your messages, both in the CLI and browser. For example:

#### CLI

        cowsay "Unicode test: 🦊"
        cowsay "Unicode test: \u{1F98A}"

The CLI will automatically convert Unicode escape sequences (e.g., `\u{1F98A}`) to the correct emoji (🦊).

#### Browser

If you want to use a Unicode escape sequence in the browser, use the provided helper function to decode it:

```js
function decodeUnicodeEscapes(str) {
    return str.replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, code) =>
        String.fromCodePoint(parseInt(code, 16))
    );
}

output.textContent = cowsay.say({
    text: decodeUnicodeEscapes('grazing in the browser \\u{1F409}'),
    cow: cowsay.DRAGON,
});

````
___________________________
< grazing in the browser 🐉 >
 ---------------------------
      \                    / \  //\
       \    |\___/|      /   \//  \\
            /o  o  \__  /    //  | \ \    
           /     /  \/_/    //   |  \  \  
           @_^_@'/   \/_   //    |   \   \ 
           //_^_/     \/_ //     |    \    \
        ( //) |        \///      |     \     \
      ( / /) _|_ /   )  //       |      \     _\
    ( // /) '/,_ _ _/  ( ; -.    |    _ _\.-~        .-~~~^-.
  (( / / )) ,-{        _      `-.|.-~-.           .~         `.
 (( // / ))  '/\      /                 ~-. _ .-~      .-~^-.  \
 (( /// ))      `.   {            }                   /      \  \
  (( / ))     .----~-.\        \-'                 .~         \  `. \^-.
             ///.----..>        \             _ -~             `.  ^-`  ^-_
               ///-._ _ _ _ _ _ _}^ - - - - ~                     ~-- ,.-~
                                                                  /.-~
````                                  

```

Or simply use the emoji directly in your string:

```js
output.textContent = cowsay.say({
    text: 'grazing in the browser 🦊',
    cow: cowsay.FOX,
});

````
 ___________________________
< grazing in the browser 🦊 >
 ---------------------------
\
 \
   /\   /\   Todd Vargo
  //\\_//\\     ____
  \_     _/    /   /
   / * * \    /^^^]
   \_\O/_/    [   ]
    /   \_    [   /
    \     \_  /  /
     [ [ /  \/ _/
    _[ [ \  /_/
````


```

It acts in the same way as the original cowsay, so consult `cowsay(1)` or run `cowsay -h`

````
 ________
< indeed >
 --------
    \
     \
                                   .::!!!!!!!:.
  .!!!!!:.                        .:!!!!!!!!!!!!
  ~~~~!!!!!!.                 .:!!!!!!!!!UWWW$$$
      :$$NWX!!:           .:!!!!!!XUWW$$$$$$$$$P
      $$$$$##WX!:      .<!!!!UW$$$$"  $$$$$$$$#
      $$$$$  $$$UX   :!!UW$$$$$$$$$   4$$$$$*
      ^$$$B  $$$$\     $$$$$$$$$$$$   d$$R"
        "*$bd$$$$      '*$$$$$$$$$$$o+#"
             """"          """""""
````


## Usage as a module

cowsay can be used as any other npm dependency
```js
const cowsay = require("cowsay");

console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));

// or cowsay.think()
```
````
 _________________
( I'm a moooodule )
 -----------------
        o   ^__^
         o  (oO)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||
````

getting a list of cow names:
```js
function get_cows(error, cow_names) {
    if (error) {
        console.log(error)
    }
    else if (cow_names) {
        console.log(`Number of cows available: ${cow_names.length}`);
    }
}

cowsay.list(get_cows);
```

#### Typescript examples:
```ts
import * as cowsay from "cowsay"

let output: string = cowsay.say({ text: 'Hello from typescript!' });

console.log(output);
```

getting a list of cow names:
```ts
function get_cows(error: NodeJS.ErrnoException, cow_names: Array<string>): void {
    if (error) {
        console.log(`Error getting cow names: ${error.message}`)
    }
    else if (cow_names) {
        console.log(`Number of cows available: ${cow_names.length}`);
    }
}

cowsay.list(get_cows);
```

importing the `IOptions` interface directly:
```ts
import { IOptions } from "cowsay" // optional

let opts: IOptions = {
    text: "Hello from TypeScript!",
    e: '^^',
    r: true,
};

console.log(cowsay.say(opts));
```


## Pipe from standard input

    echo please repeat | cowsay

cowsay works in your browser too with rollup / webpack / browserify / you name it.

## Usage in the browser

cowsay works in your browser too with rollup / webpack / browserify / you name it.

```js
import { say } from 'cowsay';

console.log(say({ text: 'grazing in the browser' }));
```

You can customize the cow by importing the relevant one

```js
import { think, SQUIRREL } from 'cowsay';

console.log(think({
    text: 'grazing in the browser',
    cow: SQUIRREL,
    eyes: 'pp',
    tongue: ';;',
}));
```

All cows are included in the bundle, but you can use rollup / webpack tree-shake feature to reduce the final bundle size.


### Browser options

```js
say({
  text: 'hello',
  cow: '', // Template for a cow, get inspiration from `./cows`
  eyes: 'oo', // Select the appearance of the cow's eyes, equivalent to cowsay -e
  tongue: 'L|', // The tongue is configurable similarly to the eyes through -T and tongue_string, equivalent to cowsay -T
  wrap: false, // If it is specified, the given message will not be word-wrapped. equivalent to cowsay -n
  wrapLength: 40, // Specifies roughly where the message should be wrapped. equivalent to cowsay -W
  mode: 'b', // One of 	"b", "d", "g", "p", "s", "t", "w", "y"
});
```
