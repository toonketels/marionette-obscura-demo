define([
	'marionette',
	'tpl!./pager.tpl'
], function(Marionette, tpl) {

	return Marionette.ItemView.extend({
		initialize     : function(options) {
			this.model = new Backbone.Model();
			this.updateState();
		},
		tagName        : 'nav',
		template       : tpl,
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

});