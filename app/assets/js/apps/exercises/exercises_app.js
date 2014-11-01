WorkoutTracker.module("ExercisesApp", function (ExercisesApp, WorkoutTracker, Backbone, Marionette, $, _) {
	ExercisesApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"exercises": "listExercises",
			"exercises/new": "newExercise"
		}
	});

	var API = {
		listExercises: function() {
			ExercisesApp.List.Controller.listExercises();
		},
		newExercise: function () {
			ExercisesApp.New.Controller.newExercise();
		}
	};

	WorkoutTracker.on("exercises:list", function () {
		WorkoutTracker.navigate("exercises");
		API.listExercises();
	});

	WorkoutTracker.on("exercises:new", function () {
		WorkoutTracker.navigate("exercises/new");
		API.newExercise();
	});

	WorkoutTracker.addInitializer(function () {
		console.log("ExercisesApp running");
		new ExercisesApp.Router({
			controller: API
		});
	});
});