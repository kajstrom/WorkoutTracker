WorkoutTracker.module("MenuApp", function (Menu, WorkoutTracker, Backbone, Marionette, $, _) {
	var API = {
		showMenu: function () {
			Menu.List.Controller.showMenu();
		}
	};

	WorkoutTracker.commands.setHandler("set:active:menu", function (name) {
		WorkoutTracker.MenuApp.List.Controller.setActive(name);
	});

	Menu.on("start", function () {
		API.showMenu();
	});
});