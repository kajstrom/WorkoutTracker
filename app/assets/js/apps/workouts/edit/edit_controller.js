WorkoutTracker.module("WorkoutsApp.Edit", function (Edit, WorkoutTracker, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editWorkout: function (args) {
			var model = args.model;

			var formLayout = new WorkoutTracker.WorkoutsApp.Common.Views.Layout();
            var form = new WorkoutTracker.WorkoutsApp.Common.Views.Form({
                model: model
            });

			var retrievingExercises = WorkoutTracker.request("exercise:entities");
			var retrievingWorkoutExercises = WorkoutTracker.request("workout:exercise:entities", model.get("workout_id"));

			var promises = [retrievingExercises, retrievingWorkoutExercises];

			Promise.all(promises).then(function (promiseResults) {
				var exerciseCollection = promiseResults[0];
				var workoutExerciseCollection = promiseResults[1];

				var workoutExercisesView = new WorkoutTracker.WorkoutsApp.Common.Views.Exercises({
					collection: workoutExerciseCollection,
					exerciseCollection: exerciseCollection,
					model: model
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