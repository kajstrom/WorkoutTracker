WorkoutTracker.module("ExercisesApp", function (ExercisesApp, WorkoutTracker, Backbone, Marionette, $, _) {
	ExercisesApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"exercises": "listExercises"
		}
	});

	var API = {
		listExercises: function() {
			ExercisesApp.List.Controller.listExercises();
		}
	};

	WorkoutTracker.addInitializer(function () {
		console.log("ExercisesApp running");
		new ExercisesApp.Router({
			controller: API
		});
	});
});