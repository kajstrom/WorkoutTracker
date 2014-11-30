WorkoutTracker.module("WorkoutsApp.New", function (New, WorkoutTracker, Backbone, Marionette, $, _) {
    New.Controller = {
        newWorkout: function () {
            var model = new WorkoutTracker.Entities.Workout();
            var form = new WorkoutTracker.WorkoutsApp.Common.Views.Form({
                model: model
            });

            WorkoutTracker.mainRegion.show(form);
        }
    };
});