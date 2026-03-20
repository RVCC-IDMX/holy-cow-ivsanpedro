// Use fast-string-width for Unicode/emoji width calculations
// Use fast-string-width for Unicode/emoji width calculations
const fastStringWidth = require('fast-string-width').default;
const widthOptions = {
	controlWidth: 0,
	tabWidth: 8,
	emojiWidth: 2,
	regularWidth: 1,
	wideWidth: 2
};

/**
 * Generates a speech balloon for the given text.
 * @param {string} text - The message to display in the balloon.
 * @param {number} wrap - Optional wrap column for the text.
 * @returns {string} The formatted speech balloon.
 */
exports.say = function (text, wrap) {
	var delimiters = {
		first : ["/", "\\"],
		middle : ["|", "|"],
		last : ["\\", "/"],
		only : ["<", ">"]
	};

	return format(text, wrap, delimiters);
}

/**
 * Generates a thought balloon for the given text.
 * @param {string} text - The message to display in the balloon.
 * @param {number} wrap - Optional wrap column for the text.
 * @returns {string} The formatted thought balloon.
 */
exports.think = function (text, wrap) {
	var delimiters = {
		first : ["(", ")"],
		middle : ["(", ")"],
		last : ["(", ")"],
		only : ["(", ")"]
	};
	return format(text, wrap, delimiters);
}

/**
 * Formats the text into a balloon using the specified delimiters.
 * @param {string} text - The message to display.
 * @param {number} wrap - Optional wrap column for the text.
 * @param {Object} delimiters - Delimiters for the balloon edges.
 * @returns {string} The formatted balloon.
 */
function format (text, wrap, delimiters) {
	var lines = split(text, wrap);
	var maxLength = max(lines);

	var balloon;
	if (lines.length === 1) {
		balloon = [
			" " + top(maxLength),
			delimiters.only[0] + " " + lines[0] + " " + delimiters.only[1],
			" " + bottom(maxLength)
		];
	} else {
		balloon = [" " + top(maxLength)];

		for (var i = 0, len = lines.length; i < len; i += 1) {
			var delimiter;

			if (i === 0) {
				delimiter = delimiters.first;
			} else if (i === len - 1) {
				delimiter = delimiters.last;
			} else {
				delimiter = delimiters.middle;
			}

			balloon.push(delimiter[0] + " " + pad(lines[i], maxLength) + " " + delimiter[1]);
		}

		balloon.push(" " + bottom(maxLength));
	}

	return balloon.join("\n");
}

/**
 * Splits the text into lines, wrapping if needed.
 * @param {string} text - The message to split.
 * @param {number} wrap - Optional wrap column for the text.
 * @returns {string[]} Array of lines.
 */
function split (text, wrap) {
	text = text.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '').replace(/\t/g, '        ');

	var lines = [];
	if (!wrap) {
		lines = text.split("\n");
	} else {
		var start = 0;
		while (start < text.length) {
			var nextNewLine = text.indexOf("\n", start);

			var wrapAt = Math.min(start + wrap, nextNewLine === -1 ? text.length : nextNewLine);

			lines.push(text.substring(start, wrapAt));
			start = wrapAt;

			// Ignore next new line
			if (text.charAt(start) === "\n") {
				start += 1;
			}
		}
	}

	return lines;
}

/**
 * Finds the maximum visual width among all lines.
 * @param {string[]} lines - Array of lines.
 * @returns {number} The maximum width.
 */
function max (lines) {
	var max = 0;
	for (var i = 0, len = lines.length; i < len; i += 1) {
		const lineWidth = fastStringWidth(lines[i], widthOptions);
		if (lineWidth > max) {
			max = lineWidth;
		}
	}

	return max;
}

/**
 * Pads the text with spaces to match the given length.
 * @param {string} text - The text to pad.
 * @param {number} length - The target length.
 * @returns {string} The padded text.
 */
function pad (text, length) {
	const textWidth = fastStringWidth(text, widthOptions);
	return text + (new Array(length - textWidth + 1)).join(" ");
}

/**
 * Generates the top border of the balloon.
 * @param {number} length - The width of the balloon.
 * @returns {string} The top border.
 */
function top (length) {
	return new Array(length + 3).join("_");
}

/**
 * Generates the bottom border of the balloon.
 * @param {number} length - The width of the balloon.
 * @returns {string} The bottom border.
 */
function bottom (length) {
	return new Array(length + 3).join("-");
}
