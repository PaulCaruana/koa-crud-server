// I provide the greeter service.
module.exports = function GreeterFactory( debuggy, greeting ) {

    testGreeting( greeting );

    // Return the public API.
    return({
        greet: greet
    });


    // ---
    // PUBLIC METHODS.
    // ---


    // I return a greeting message for the given name.
    function greet( name ) {

        ( debuggy && debuggy( "Processing greeting for %s.", name ) );

        // Replace all instances of %s with the given name.
        var message = greeting.replace(
            /%s/gi,
            function interpolateName( $0 ) {

                return( name );

            }
        );

        return( message );

    }


    // ---
    // PRIVATE METHODS.
    // ---


    // I test the incoming greeting to make sure it is suitable for our purposes.
    function testGreeting( newGreeting ) {

        if ( ! newGreeting || ( newGreeting.indexOf( "%s" ) === -1 ) ) {

            throw( new Error( "InvalidArgument" ) );

        }

    }

};