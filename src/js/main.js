require.config({
    urlArgs    : 'bust=' + (new Date()).getTime(),
    deps       : ['boot'],
    paths      : {
    	'bootstrap'          : '../vendor/bootstrap/dist/js/bootstrap',
    	'jquery'             : '../vendor/jquery/dist/jquery',
    	'underscore'         : '../vendor/underscore/underscore',
    	'backbone'           : '../vendor/backbone/backbone',
    	'backbone.wreqr'     : '../vendor/backbone.wreqr/lib/backbone.wreqr',
    	'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
    	'marionette'         : '../vendor/marionette/lib/core/backbone.marionette',
        'projection'         : '../vendor/backbone.obscura/backbone.obscura',
        'text'               : '../vendor/requirejs-text/text',
        'json'               : '../vendor/requirejs-plugins/src/json',
        'tpl'                : '../vendor/requirejs-tpl-jfparadis/tpl',
        'config'             : '../config'
    },
    shim       : {
    	'bootstrap'          : { 'deps' :['jquery'] }
    },
    stubModules: ['json', 'text']
});