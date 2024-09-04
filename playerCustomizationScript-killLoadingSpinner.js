(function (window) {

	// put load handler on the iframe in the player that is loading the content
	// this is only relevant if you are launching with PlayerScoLaunchType = FRAMESET. 
	// Otherwise, the content will pop in a separate window
    $('#ContentDiv iframe').on('load', function () {
        // here you have to check whether the loaded file is _not_ intermediate.html so you don't kill the spinner too early
        // Have to wrap in try/catch in case the page is cross-domain
        try {
        	var newUrl = this.contentWindow.location.href;

        	if (newUrl.indexOf('intermediate.html') < 0) {
        		// now tell your parent window that the page is loaded
        		window.parent.postMessage(JSON.stringify(buildContentLoadedMessage()), '*');

        		// and remove the event handler so you don't keep getting notified
        		$(this).off('load');
        	}
        }
        catch (ex) {
        	// do nothing as we don't care; might log to console if you want
        }
    });

	// builds an object to send in the postMessage that mimics what
    // Engine will ultimately start sending itself once implemented there.
    function buildContentLoadedMessage() {
        return {
            "topic": "ContentLoaded",
            "version": 0,
            "rusticiEngine": true
        }
    }

    // must call this last so the player continues loading
    rscpCustomizationCompleted();

})(window);