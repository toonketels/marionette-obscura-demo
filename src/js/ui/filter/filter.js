/**
 * Params:
 *  - collection: projection to filter
 *  - filterFn: to pass a custom filter function
 *  - template: optional other template
 */
define([
	'marionette',
	'tpl!./filter.tpl'
], function(Marionette, tpl) {

	return Marionette.ItemView.extend({
		initialize: function(options) {
			options = options || {};

			options.filter = options.filterFn || this.defaultFilterFn;
			this.filter    = options.filter.bind(this);
		},
		template: tpl,
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

})