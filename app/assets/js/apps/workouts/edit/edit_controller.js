WorkoutTracker.module("WorkoutsApp.Edit", function (Edit, WorkoutTracker, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editWorkout: function (workoutId) {
			var retrievingWorkout = WorkoutTracker.request("workout:entity", workoutId);
			var retrievingExercises = WorkoutTracker.request("exercise:entities");
			var retrievingWorkoutExercises = WorkoutTracker.request("workout:exercise:entities", workoutId);
			var retrievingWorkoutExerciseSets = WorkoutTracker.request("workout:sets:entities", workoutId);

			var promises = [
				retrievingWorkout,
				retrievingExercises,
				retrievingWorkoutExercises,
				retrievingWorkoutExerciseSets
			];

			Promise.all(promises).then(function (promiseResults) {
				var workoutModel = promiseResults[0];
				var exerciseCollection = promiseResults[1];
				var workoutExerciseCollection = promiseResults[2];
				var workoutSetCollection = promiseResults[3];

				var formLayout = new WorkoutTracker.WorkoutsApp.Common.Views.Layout();
				var form = new WorkoutTracker.WorkoutsApp.Common.Views.Form({
					model: workoutModel
				});

				var workoutExercisesView = new WorkoutTracker.WorkoutsApp.Common.Views.Exercises({
					collection: workoutExerciseCollection,
					exerciseCollection: exerciseCollection,
					exerciseSetsCollection: workoutSetCollection,
					model: workoutModel
				});

				formLayout.on("show", function () {
					this.formRegion.show(form);
					this.exercisesRegion.show(workoutExercisesView);
				});

				WorkoutTracker.mainRegion.show(formLayout);
			});

        }
    };
});