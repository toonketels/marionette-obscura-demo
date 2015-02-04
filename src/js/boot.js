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
	'tpl!./ui/tpl/filterView.tpl',
	'tpl!./ui/tpl/selectItemView.tpl',


	'bootstrap'
],function(
	Marionette,
	Projection,

	config,
	UsersCollection,

	usersItemViewTpl,
	paginationViewTpl,
	filterViewTpl,
	selectItemViewTpl

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



	// Default user view, no longer used

	var UserItemView = Marionette.ItemView.extend({
		tagName : 'li',
		template: usersItemViewTpl
	});



	// SelectView

	var SelectItemView = Marionette.ItemView.extend({
		initialize: function(options) {
			options = options || {};

			if (!options.selectAttribute) { throw new Error('SelectItemView expects a selectAttribute passed'); }

			this.selectAttribute = options.selectAttribute;
		},
		tagName : 'li',
		template: selectItemViewTpl,
		events: {
			'click': 'select',
		},
		select: function() {
			this.model.set(this.selectAttribute, !this.model.get(this.selectAttribute));
		},
		templateHelpers: function() {
			return {
				selected: this.model.get(this.selectAttribute)
			}
		},
		modelEvents: {
			'change': 'render'
		}
	});




	var usersView = new Marionette.CollectionView({tagName         : 'ul',
		                                           collection      : usersProjection,
		                                           childView       : SelectItemView,
		                                           childViewOptions: {selectAttribute: 'selectedinusers'} });



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
			'paginated:change:numPages': 'updateState',
			'paginated:change:page'    : 'updateState'
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


	
	// Filter view, can filter any projection

	/**
	 * Params:
	 *  - collection: projection to filter
	 *  - filterFn: to pass a custom filter function
	 *  - template: optional other template
	 */
	var FilterView = Marionette.ItemView.extend({
		initialize: function(options) {
			options = options || {};

			options.filter = options.filterFn || this.defaultFilterFn;
			this.filter    = options.filter.bind(this);
		},
		template: filterViewTpl,
		events: {
			'keyup .search': 'doFilter'
		},
		doFilter: function() {
			this.updateSearchPhrase();

			if (this.collection.hasFilter('username')) {
				this.collection.refilter();
			} else {
				this.collection.filterBy('username', this.filter);
			}
		},
		updateSearchPhrase: function() {
			this.searchPhrase = $('.search').val();
		},
		defaultFilterFn: function(model) {
			return !!model.get('username').match(this.searchPhrase);
		}
	});


	//




	// Render the views

	regions.header.show(new FilterView({collection: usersProjection}));
	regions.main.show(usersView);
	regions.footer.show(new PagerView({collection: usersProjection}));









	window.x = {
		users          : users,
		usersProjection: usersProjection
	}

});