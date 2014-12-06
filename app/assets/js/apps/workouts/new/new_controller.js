WorkoutTracker.module("WorkoutsApp.New", function (New, WorkoutTracker, Backbone, Marionette, $, _) {
    New.Controller = {
        newWorkout: function () {
            var model = new WorkoutTracker.Entities.Workout();
			var formLayout = new WorkoutTracker.WorkoutsApp.Common.Views.Layout();
            var form = new WorkoutTracker.WorkoutsApp.Common.Views.Form({
                model: model
            });

			var initialSavePromise = new Promise(
				function (resolve, reject) {
					model.save(null, {
						success: function (data) {
							resolve(data);
						}
					})
				}
			);

			var retrievingExercises = WorkoutTracker.request("exercise:entities");

			var promises = [retrievingExercises, initialSavePromise];


			Promise.all(promises).then(function (data) {
				var exerciseCollection = data[0];

				var workoutExerciseCollection = new WorkoutTracker.Entities.WorkoutExerciseCollection();
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