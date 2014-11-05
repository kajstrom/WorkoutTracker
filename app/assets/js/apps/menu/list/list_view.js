WorkoutTracker.module("MenuApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
	List.MenuItem = Marionette.ItemView.extend({
		tagName: "li",
		template: "#menu-item"
	});

	List.Menu = Marionette.CollectionView.extend({
		className: "nav nav-pills nav-stacked",
		tagName: "ul"
	});
});