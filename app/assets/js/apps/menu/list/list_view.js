WorkoutTracker.module("MenuApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
	List.MenuItem = Marionette.ItemView.extend({
		tagName: "li",
		template: "#menu-item",

		onRender: function () {
			if (this.model.get("is_active")) {
				this.$el.addClass("active");
			} else {
				this.$el.removeClass("active");
			}
		}
	});

	List.Menu = Marionette.CollectionView.extend({
		className: "nav nav-pills nav-stacked",
		tagName: "ul",
		childView: List.MenuItem
	});
});