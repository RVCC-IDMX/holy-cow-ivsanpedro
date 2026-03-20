# Unicode/Emoji Support Upgrade Report

**Project:** cowsay npm package
**Student:** [Ivana San Pedro]
**Date:** March 19, 2026

---

## Problem Statement
The original cowsay package only supported ASCII characters in its speech bubble rendering. This caused formatting issues when users input Unicode or emoji characters, resulting in misaligned or unreadable output. Modern communication often includes emojis and non-English characters, so this limitation reduced usability and accessibility.

## Proposed Solution
Upgrade the speech bubble rendering logic to handle Unicode and emoji characters correctly. This includes:
- Using a Unicode-aware width calculation library (fast-string-width)
- Adjusting bubble borders and padding for proper alignment
- Ensuring CLI and API accept and output Unicode text

## Implementation Steps
1. **Research Unicode Width Calculation**
   - Identified fast-string-width as a suitable library
2. **Integrate fast-string-width**
   - Replaced string-width with fast-string-width in lib/balloon.js
   - Updated max and pad functions for Unicode-aware logic
3. **Update CLI and Core Logic**
   - Ensured CLI accepts Unicode/emoji input and outputs correctly
   - Converted CLI and core files to ES module syntax for modern compatibility
4. **Testing**
   - Ran test cases with emojis and non-ASCII text
   - Validated bubble formatting and alignment
5. **Documentation**
   - Updated README.md to highlight Unicode/emoji support

## Challenges Encountered
- Node.js module compatibility issues (CommonJS vs ES modules)
- CLI file extension and import/export syntax errors
- Git revert and file restoration difficulties

## Outcome
- Speech bubbles now display Unicode and emoji characters with correct alignment and formatting
- CLI and API accept and output Unicode text without errors
- Codebase is modernized for ES module compatibility

## Next Steps
- Further testing with edge cases
- Share feedback and results with Professor Teeters

---

**Prepared for:** Professor Teeters
**By:** [Ivana San Pedro]
