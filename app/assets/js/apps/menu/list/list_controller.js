WorkoutTracker.module("MenuApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
	List.Controller = {
		showMenu: function () {
			var menuItems = WorkoutTracker.request("menu:items");
			var menuView = new List.Menu({
				collection: menuItems
			});

			WorkoutTracker.menuRegion.show(menuView);
		},

		setActive: function(menuUrl) {
			var menuItems = WorkoutTracker.request("menu:items");
			var selectedMenuItem = menuItems.find(function (menuItem) {
				return menuItem.get("url") === menuUrl;
			});
			selectedMenuItem.set("is_active", true);
			menuItems.trigger("reset");
		}
	};
});