WorkoutTracker.module("ProgramsApp.New", function (New, WorkoutTracker, Backbone, Marionette, $, _) {
    New.Controller = {
        newProgram: function () {
            var retrievingExercies = WorkoutTracker.request("exercise:entities");

            $.when(retrievingExercies).done(function(exerciseCollection) {
                var model = new WorkoutTracker.Entities.Program();
                var form = new WorkoutTracker.ProgramsApp.Common.Views.Form({
                    model: model,
                    collection: new WorkoutTracker.Entities.ProgramExerciseCollection(),
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
