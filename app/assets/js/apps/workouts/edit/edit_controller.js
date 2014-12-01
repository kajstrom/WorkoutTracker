WorkoutTracker.module("WorkoutsApp.Edit", function (Edit, WorkoutTracker, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editWorkout: function (args) {
            var form = new WorkoutTracker.WorkoutsApp.Common.Views.Form({
                model: args.model
            });

            WorkoutTracker.mainRegion.show(form);
        }
    };
});