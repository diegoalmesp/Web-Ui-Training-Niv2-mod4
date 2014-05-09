require.config({
	paths: {
		"jquery": "jquery",
		"underscore": "lib/underscore",
		"backbone": "lib/backbone"
	}
});

require(['lib/modules/agenda'], function(agenda) {
	// no need to instanciate nothing
});