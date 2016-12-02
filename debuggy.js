// I provide the debuggy service.
module.exports = function DebuggyFactory( chalk ) {

    // Return the public API.
    return( debuggy );


    // ---
    // PUBLIC METHODS.
    // ---


    // I log the debugging message to the console. The message supports %s style
    // interpolation as it is being handed off to the console.log().
    function debuggy( message ) {

        // Rewire the first argument to be colorful.
        arguments[ 0 ] = (
            chalk.bgBlack.yellow( " DEBUG: " ) +
            " " +
            chalk.yellow( arguments[ 0 ] )
        );

        console.log.apply( console, arguments );

    }

};