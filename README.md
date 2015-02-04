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