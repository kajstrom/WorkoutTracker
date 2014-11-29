WorkoutTracker.module("ProgramsApp.Edit", function (Edit, WorkoutTracker, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editProgram: function (args) {
            var retrievingExercises = WorkoutTracker.request("exercise:entities");
            var retrievingProgramExercises = WorkoutTracker.request(
                "programExercise:entities",
                args.model.get("program_id")
            );

            $.when(retrievingExercises).done(function (exerciseCollection) {
                $.when(retrievingProgramExercises).done(function (programExerciseCollection) {
                    var form = new WorkoutTracker.ProgramsApp.Common.Views.Form({
                        model: args.model,
                        collection: programExerciseCollection,
                        childView: WorkoutTracker.ProgramsApp.Common.Views.ProgramExercise,
                        childViewContainer: ".program-exercises-container",
                        childViewOptions: {
                            exercises: exerciseCollection
                        }
                    });

                    WorkoutTracker.mainRegion.show(form);
                });
            });
        }
    };
});