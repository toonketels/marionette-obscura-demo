/**
 * Loads and wires the application.
 */
define([
    'marionette',
    'projection',

    'ui/selectItem/SelectItem',
    'ui/pager/Pager',
    'ui/filter/Filter',

    'json!config/config.json',
    'domain/users',

    'tpl!./ui/tpl/usersItemView.tpl',
    'tpl!./ui/tpl/emptyView.tpl',


    'bootstrap'
],function(
    Marionette,
    Projection,

    SelectItemView,
    PagerView,
    FilterView,

    config,
    UsersCollection,

    usersItemViewTpl,
    emptyViewTpl

) {

    'use strict';


    // Create basic layout
    
    var regions = new Marionette.LayoutView({
        el: 'body',
        regions: {
            header : '.header',
            main   : '.main',
            sidebar: '.sidebar',
            footer : '.footer'
        }
    });


    // Create collections 
    
    var users              = new UsersCollection(config.users);


    // Create projections

    var usersProjection    = new Projection(users).setPerPage(5);
    var selectedProjection = new Projection(users).filterBy('selected', { 'selectedinusers': true} );



    // Default user View, no longer used

    var UserItemView       = Marionette.ItemView.extend({
        tagName : 'li',
        template: usersItemViewTpl
    });


    // View instances

    var usersView          = new Marionette.CollectionView({tagName         : 'ul',
                                                            collection      : usersProjection,
                                                            childView       : SelectItemView,
                                                            childViewOptions: {selectAttribute: 'selectedinusers'} });

    var selectedUsersView  = new Marionette.CollectionView({tagName         : 'ul',
                                                            collection      : selectedProjection,
                                                            childView       : SelectItemView,
                                                            childViewOptions: {selectAttribute: 'selectedinusers'},
                                                            emptyViewOptions: {template: emptyViewTpl},
                                                            emptyView       : Marionette.ItemView });

    var pagerView          = new PagerView({collection: usersProjection})

    var filterView         = new FilterView({collection: usersProjection});


    // Render the views

    regions.header.show(filterView);
    regions.main.show(usersView);
    regions.sidebar.show(selectedUsersView);
    regions.footer.show(pagerView);


    // Debug collections and projections

    window.x = {
        users             : users,
        usersProjection   : usersProjection,
        selectedProjection: selectedProjection
    }

});