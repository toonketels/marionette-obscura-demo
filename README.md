0.1

- Plain collection and itemView

+ auto rerender on paging/sorting/filtering...



0.2

- Added pagerView

+ pagerView acts on same projection, views dont know from one another
+ modelEvents/collectionEvents very descriptive/succint
+ obscura acts just like a collection, can be passed to any view



0.3

- Added filterView

+ filterView acts on collection, views dont know from one another
+ configure with custom filterfn, projection (and default marionette
  configs like template...)
+ filtering will update the pager (and list)
+ all reusable components



0.4

- Swapped itemView for SelectItemView

+ select state is just kept on the model (should be clientside attr)
+ existing collectionView did not have to change for that view to be made `selectable`
+ attr to set on model is configurable (as well as template...)
+ a new reusable component
+ can be initialized in correct state (just point it to an existing attribute)



0.5

- Views in sync via shared collections/projections

+ new projection based on attr set by other view on same collection
+ reused the same views to display a new one
+ marionette CollectionView's EmptyView to auto display "empty" message
+ new views also uses SelectItemView, thereby updating the main view
+ added new region to display the new view



@TODO: emptyCollectionView demo