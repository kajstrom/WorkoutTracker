WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
	Entities.MenuItem = Backbone.Model.extend({
		defaults: {
			name: "",
			url: "",
			is_active: false
		}
	});

	Entities.MenuCollection = Backbone.Collection.extend({
		model: Entities.MenuItem
	});

	var API = {
		getMenuItems: function(){
			var menu = new Entities.MenuCollection();

			menu.add([
				{
					name: "Programs",
					url: "programs",
					navigationTrigger: "programs:list",
					is_active: false
				},
				{
					name: "Exercises",
					url: "exercises",
					navigationTrigger: "exercises:list",
					is_active: false
				}
			]);

			return menu;
		}
	};

	WorkoutTracker.reqres.setHandler("menu:items", function(){
		return API.getMenuItems();
	});
});