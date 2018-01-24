//Load common code that includes config, then load the app logic for this page.
require(['./config'], function (common) {
    require(['jquery'], function($, popper) {
        require(['bootstrap']);
        require(['lib/controller']);
    });
});