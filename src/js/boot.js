/**
 * Loads and wires the application.
 */
define([
	'marionette',
	'projection',

	'json!config/config.json',
	'domain/users',

	'tpl!./ui/tpl/usersItemView.tpl',



	'bootstrap'
],function(
	Marionette,
	Projection,

	config,
	UsersCollection,

	usersItemViewTpl

) {

	'use strict';

	
	var regions = new Marionette.LayoutView({
		el: 'body',
		regions: {
			header: '.header',
			main  : '.main',
			footer: '.footer'
		}
	});


	// Create collections
	
	var users = new UsersCollection(config.users);
	var usersProjection = new Projection(users).setPerPage(25);



	// Create views

	var userItemView = Marionette.ItemView.extend({
		tagName : 'li',
		template: usersItemViewTpl
	});

	var usersView = new Marionette.CollectionView({tagName: 'ul', collection: usersProjection, childView: userItemView });


	// Render the views

	regions.main.show(usersView);










	window.x = {
		users          : users,
		usersProjection: usersProjection
	}

});