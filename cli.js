#!/usr/bin/env node
const yargs = require('yargs')
	.usage(`
Usage: $0 [-e eye_string] [-f cowfile] [-h] [-l] [-n] [-T tongue_string] [-W column] [-bdgpstwy] text
		
If any command-line arguments are left over after all switches have been processed, they become the cow's message.
		
If the program is invoked as cowthink then the cow will think its message instead of saying it.
`)
  .options({
    e: {
      default: 'oo',
    },
    T: {
      default: '  ',
    },
    W: {
      default: 40,
      type: 'number',
    },
    f: {
      default: 'default',
    },
    think: {
      type: 'boolean',
    },
  })
  .describe({
    b: 'Mode: Borg',
    d: 'Mode: Dead',
    g: 'Mode: Greedy',
    p: 'Mode: Paranoia',
    s: 'Mode: Stoned',
    t: 'Mode: Tired',
    w: 'Mode: Wired',
    y: 'Mode: Youthful',
    e: "Select the appearance of the cow's eyes.",
    T:
      'The tongue is configurable similarly to the eyes through -T and tongue_string.',
    h: 'Display this help message',
    n: 'If it is specified, the given message will not be word-wrapped.',
    W:
      'Specifies roughly where the message should be wrapped. The default is equivalent to -W 40 i.e. wrap words at or before the 40th column.',
    f:
      "Specifies a cow picture file (''cowfile'') to use. It can be either a path to a cow file or the name of one of cows included in the package.",
    r: 'Select a random cow',
    l: 'List all cowfiles included in this package.',
    think: 'Think the message instead of saying it aloud.',
  })
  .boolean(['b', 'd', 'g', 'p', 's', 't', 'w', 'y', 'n', 'h', 'r', 'l'])
  .help()
  .alias('h', 'help');

const argv = yargs.argv;

// The code below is adapted from the original cowsay CLI implementation in lib/balloon.js
/**
 * Decodes Unicode escape sequences (e.g., \u{1F98A}) in a string to their actual characters.
 * @param {string} str - The input string possibly containing Unicode escapes.
 * @returns {string} The decoded string with Unicode characters.
 */
function decodeUnicodeEscapes(str) {
  return str.replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, code) =>
    String.fromCodePoint(parseInt(code, 16))
  );
}

if (argv.l) {
  listCows();
} else if (argv._.length) {
  argv._ = argv._.map(decodeUnicodeEscapes);
  say();
} else {
  require('get-stdin')().then((data) => {
    if (data) {
      argv._ = [decodeUnicodeEscapes(require('strip-final-newline')(data))];
      say();
    } else {
      yargs.showHelp();
    }
  });
}

/**
 * Outputs the cow saying or thinking the message, depending on CLI invocation.
 */
function say() {
  const module = require('./index');
  const think = /think$/.test(argv['$0']) || argv.think;
  console.log(think ? module.think(argv) : module.say(argv));
}

/**
 * Lists all available cowfiles included in the package.
 */
function listCows() {
  require('./index').list((err, list) => {
    if (err) throw new Error(err);
    console.log(list.join('  '));
  });
}
