requirejs.config({
    baseUrl: "js",
    paths: {
        lib: "lib",
        jquery: "../node_modules/jquery/dist/jquery",
        requirejs: "../node_modules/requirejs/require",
        bootstrap: "../node_modules/bootstrap/dist/js/bootstrap"
    },
    shim: {
        "bootstrap": ["jquery"]
    },
    packages: [

    ]
});

