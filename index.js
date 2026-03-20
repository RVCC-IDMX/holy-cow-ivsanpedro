import balloon from "./lib/balloon.js";
import cows from "./lib/cows.js";
import faces from "./lib/faces.js";
import fastStringWidth from 'fast-string-width';

// Width of various classes of characters

const options = {
  controlWidth: 0,
  tabWidth: 8,
  emojiWidth: 2,
  regularWidth: 1,
  wideWidth: 2
};

// Calculating the visual width of some strings

fastStringWidth ( 'hello', options ); // => 5
// ANSI escape codes are ignored. Sets the color of the text to red, 
// but does not affect the width.
fastStringWidth ( '\x1b[31mhello', options ); // => 5
fastStringWidth ( '👨‍👩‍👧‍👦', options ); // => 2
fastStringWidth ( 'hello👨‍👩‍👧‍👦', options ); // => 7

// Calculating the visual width while tweaking the width of emojis

fastStringWidth ( '👶👶🏽', { ...options, emojiWidth: 1.5 } ); // => 3

/**
 * @param options
 * ## Face :
 * Either choose a mode (set the value as true) **_or_**
 * set your own defined eyes and tongue to `e` and `T`.
 * - ### `e` : eyes
 * - ### `T` : tongue
 * 
 * ## Cow :
 * Either specify a cow name (e.g. "fox") **_or_**
 * set the value of `r` to true which selects a random cow.
 * - ### `r` : random selection
 * - ### `f` : cow name - from `cows` folder
 * 
 * ## Modes :
 * Modes are just ready-to-use faces, here's their list:
 * - #### `b` : borg
 * - #### `d` : dead      
 * - #### `g` : greedy
 * - #### `p` : paranoia
 * - #### `s` : stoned
 * - #### `t` : tired
 * - #### `w` : wired
 * - #### `y` : youthful
 * 
 * @example
 * ```
 * // custom cow and face
 * cowsay.say({
 *     text: 'Hello world!',
 *     e: '^^', // eyes
 *     T: 'U ', // tongue
 *     f: 'USA' // name of the cow from `cows` folder
 * })
 * 
 * // using a random cow
 * cowsay.say({
 *     text: 'Hello world!',
 *     e: 'xx', // eyes
 *     r: true, // random mode - use a random cow.
 * })
 * 
 * // using a mode
 * cowsay.say({
 *     text: 'Hello world!',
 *     y: true, // using y mode - youthful mode
 * })
 * ```
 * 
 * @returns {string} compiled cow
 */
/**
 * Generates a cow saying the provided message.
 * @param {Object} options - Options for customizing the cow and message.
 * @returns {string} The cow with a speech balloon.
 */
export function say(options) {
	return doIt(options, true);
}

/**
 * @param options
 * ## Face :
 * Either choose a mode (set the value as true) **_or_**
 * set your own defined eyes and tongue to `e` and `T`.
 * - ### `e` : eyes
 * - ### `T` : tongue
 * 
 * ## Cow :
 * Either specify a cow name (e.g. "fox") **_or_**
 * set the value of `r` to true which selects a random cow.
 * - ### `r` : random selection
 * - ### `f` : cow name - from `cows` folder
 * 
 * ## Modes :
 * Modes are just ready-to-use faces, here's their list:
 * - #### `b` : borg
 * - #### `d` : dead      
 * - #### `g` : greedy
 * - #### `p` : paranoia
 * - #### `s` : stoned
 * - #### `t` : tired
 * - #### `w` : wired
 * - #### `y` : youthful
 * 
 * @example
 * ```
 * // custom cow and face
 * cowsay.think({
 *     text: 'Hello world!',
 *     e: '^^', // eyes
 *     T: 'U ', // tongue
 *     f: 'USA' // name of the cow from `cows` folder
 * })
 * 
 * // using a random cow
 * cowsay.think({
 *     text: 'Hello world!',
 *     e: 'xx', // eyes
 *     r: true, // random mode - use a random cow.
 * })
 * 
 * // using a mode
 * cowsay.think({
 *     text: 'Hello world!',
 *     y: true, // using y mode - youthful mode
 * })
 * ```
 * 
 * @returns {string} compiled cow
 */
/**
 * Generates a cow thinking the provided message.
 * @param {Object} options - Options for customizing the cow and message.
 * @returns {string} The cow with a thought balloon.
 */
export function think(options) {
	return doIt(options, false);
}

/**
 * @example
 * ```
 * function get_cows(error, cow_names) {
 *    if (error) {
 *        console.log(error);
 *    }
 *    else if (cow_names) {
 *        console.log(`Number of cows available: ${cow_names.length}`);
 *    }
 *  }
 * 
 * cowsay.list(get_cows);
 * ```
 * @param callback
 * @returns {Promise} promise
 */
/**
 * Returns a promise that resolves to the list of available cow names.
 * @param {Function} callback - Callback to receive the list or error.
 * @returns {Promise}
 */
export const list = cows.list;

/**
 * Internal helper to generate the cow output (saying or thinking).
 * @param {Object} options - Options for customizing the cow and message.
 * @param {boolean} sayAloud - If true, cow says; if false, cow thinks.
 * @returns {string} The cow with the appropriate balloon.
 */
function doIt (options, sayAloud) {
	var cowFile;

	if (options.r) {
		var cowsList = cows.listSync();
		cowFile = cowsList[Math.floor(Math.random() * cowsList.length)];
	} else {
		cowFile = options.f || "default";
	}

	var cow = cows.get(cowFile);
	var face = faces(options);
	face.thoughts = sayAloud ? "\\" : "o";

	var action = sayAloud ? "say" : "think";
	return balloon[action](options.text || options._.join(" "), options.n ? null : options.W) + "\n" + cow(face);
}
