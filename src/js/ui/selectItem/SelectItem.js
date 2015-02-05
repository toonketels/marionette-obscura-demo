define([
	'marionette',
		'tpl!./selectItem.tpl',
], function(Marionette, tpl) {

	'use strict';

	return Marionette.ItemView.extend({
		initialize: function(options) {
			options = options || {};

			if (!options.selectAttribute) { throw new Error('SelectItemView expects a selectAttribute passed'); }

			this.selectAttribute = options.selectAttribute;
		},
		tagName : 'li',
		template: tpl,
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

})