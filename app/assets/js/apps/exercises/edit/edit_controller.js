WorkoutTracker.module("ExercisesApp.Edit", function (Edit, WorkoutTracker, Backbone, Marionette, $, _) {
	Edit.Controller = {
		editExercise: function (exerciseId) {
            var retrievingExercise = WorkoutTracker.request("exercise:entity", exerciseId);

            retrievingExercise.then(function(model) {
                var formView = new WorkoutTracker.ExercisesApp.Common.Views.Form({
                    model: model
                });

                WorkoutTracker.mainRegion.show(formView);
            });
		}
	};
});