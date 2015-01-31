WorkoutTracker.module("ProgramsApp.Edit", function (Edit, WorkoutTracker, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editProgram: function (programId) {
            var retrievingProgram = WorkoutTracker.request("program:entity", programId);
			var retrievingExercises = WorkoutTracker.request("exercise:entities");
            var retrievingProgramExercises = WorkoutTracker.request(
                "programExercise:entities",
				programId
            );

			var promises = [retrievingProgram, retrievingExercises, retrievingProgramExercises];

			Promise.all(promises).then(function (data) {
				var programModel = data[0];
				var exerciseCollection = data[1];
				var programExerciseCollection = data[2];

				var form = new WorkoutTracker.ProgramsApp.Common.Views.Form({
					model: programModel,
					collection: programExerciseCollection,
					childView: WorkoutTracker.ProgramsApp.Common.Views.ProgramExercise,
					childViewContainer: ".program-exercises-container",
					childViewOptions: {
						exercises: exerciseCollection
					}
				});

				WorkoutTracker.mainRegion.show(form);
			});
        }
    };
});