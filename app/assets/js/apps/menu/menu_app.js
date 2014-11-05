WorkoutTracker.module("MenuApp", function (Menu, WorkoutTracker, Backbone, Marionette, $, _) {
	var API = {
		showMenu: function () {
			console.log("Displaying menu");
		}
	};

	WorkoutTracker.commands.setHandler("set:active:menu", function (name) {
		console.log("Setting active menu item");
	});

	Menu.on("start", function () {
		API.showMenu();
	});
});