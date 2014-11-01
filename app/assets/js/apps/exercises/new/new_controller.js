WorkoutTracker.module("ExercisesApp.New", function (New, WorkoutTracker, Backbone, Marionette, $, _) {
	New.Controller = {
		newExercise: function () {
			var exerciseModel = new WorkoutTracker.Entities.Exercise();
			var exerciseForm = new WorkoutTracker.ExercisesApp.Common.Views.Form({
				model: exerciseModel
			});

			WorkoutTracker.mainRegion.show(exerciseForm);
		}
	};
});