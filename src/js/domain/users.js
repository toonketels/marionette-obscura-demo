define([
	'backbone',
	'./user'
], function(Backbone, User) {
	'use strict';

	return Backbone.Collection.extend({

		model: User,

		url: '/users'

	});

});