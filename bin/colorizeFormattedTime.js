// deps

    // externals

    let colors = null;
    try { // test require optional deps
        colors = require("colors/safe");
    }
    catch (e) {
        // nothing to do here
    }

// module

module.exports = function colorizeFormattedTime (content) {

    return (colors && colors.white ? colors.white("[") : "[")
        + (colors && colors.grey ? colors.grey(content) : content)
        + (colors && colors.white ? colors.white("]") : "]");

};
