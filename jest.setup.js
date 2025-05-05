require("@testing-library/jest-dom"); // extiende expect()
import "@testing-library/jest-dom";
const util = require("util");
global.TextEncoder = util.TextEncoder; // polyfill para TextEncoder
global.TextDecoder = util.TextDecoder; // polyfill para TextDecoder
