WorkoutTracker.module("ExercisesApp", function (ExercisesApp, WorkoutTracker, Backbone, Marionette, $, _) {
	ExercisesApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"exercises": "listExercises",
			"exercises/new": "newExercise",
			"exercises/edit": "editExercise"
		}
	});

	var API = {
		listExercises: function() {
			ExercisesApp.List.Controller.listExercises();
		},
		newExercise: function () {
			ExercisesApp.New.Controller.newExercise();
		},
		editExercise: function (model) {
			ExercisesApp.Edit.Controller.editExercise(model);
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

	WorkoutTracker.on("exercises:edit", function(attrs) {
		//@todo Change this to support the id too?
		WorkoutTracker.navigate("exercises/edit");
		API.editExercise(attrs.model);
	});

	WorkoutTracker.addInitializer(function () {
		console.log("ExercisesApp running");
		new ExercisesApp.Router({
			controller: API
		});
	});
});