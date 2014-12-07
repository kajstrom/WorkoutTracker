WorkoutTracker.module("ExercisesApp", function (ExercisesApp, WorkoutTracker, Backbone, Marionette, $, _) {
	ExercisesApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"exercises": "listExercises",
			"exercises/new": "newExercise",
			"exercises/edit/:id": "editExercise"
		}
	});

	var API = {
		listExercises: function() {
			ExercisesApp.List.Controller.listExercises();
		},
		newExercise: function () {
			ExercisesApp.New.Controller.newExercise();
		},
		editExercise: function (exerciseId) {
			ExercisesApp.Edit.Controller.editExercise(exerciseId);
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

	WorkoutTracker.on("exercises:edit", function(exerciseId) {
		WorkoutTracker.navigate("exercises/edit/" + exerciseId);
		API.editExercise(exerciseId);
	});

	WorkoutTracker.addInitializer(function () {
		console.log("ExercisesApp running");
		new ExercisesApp.Router({
			controller: API
		});
	});
});