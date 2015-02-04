/**
 * Loads and wires the application.
 */
define([
	'marionette',
	'projection',

	'json!config/config.json',
	'domain/users',

	'tpl!./ui/tpl/usersItemView.tpl',
	'tpl!./ui/tpl/paginationView.tpl',



	'bootstrap'
],function(
	Marionette,
	Projection,

	config,
	UsersCollection,

	usersItemViewTpl,
	paginationViewTpl

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
	var usersProjection = new Projection(users).setPerPage(5);



	// Create views

	var userItemView = Marionette.ItemView.extend({
		tagName : 'li',
		template: usersItemViewTpl
	});

	var usersView = new Marionette.CollectionView({tagName: 'ul', collection: usersProjection, childView: userItemView });



	// Pagination view, can paginate any projection

	var PagerView = Marionette.ItemView.extend({
		initialize     : function(options) {
			this.model = new Backbone.Model();
			this.updateState();
		},
		tagName        : 'nav',
		template       : paginationViewTpl,
		updateState    : function() {
			this.model.set('isFirst', !this.collection.hasPrevPage());
			this.model.set('isLast', !this.collection.hasNextPage());
		},
		templateHelpers: function() {
			return {
				prev: function() {
					return this.isFirst ? 'disabled' : '';
				},
				next: function() {
					return this.isLast ? 'disabled' : '';
				},
			};
		},
		modelEvents: {
			'change': 'render'
		},
		collectionEvents: {
			'paginated:change:page': 'updateState'
		},
		events: {
			'click .prev': 'previous',
			'click .nxt' : 'next'
		},
		previous: function() {
			this.collection.prevPage();
		},
		next    : function() {
			this.collection.nextPage();
		}
	});



	// Render the views

	regions.main.show(usersView);
	regions.footer.show(new PagerView({collection: usersProjection}));









	window.x = {
		users          : users,
		usersProjection: usersProjection
	}

});