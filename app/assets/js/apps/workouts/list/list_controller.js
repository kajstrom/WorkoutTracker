WorkoutTracker.module("WorkoutsApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
    List.Controller = {
        listWorkouts: function () {
            var layoutView = new List.Layout();

            WorkoutTracker.mainRegion.show(layoutView);

            var filterView = new List.Filter();
            layoutView.filterRegion.show(filterView);

            //@todo Display loading view...

            var retrievingWorkouts = WorkoutTracker.request("workout:entities");

            retrievingWorkouts.then(function(collection) {
                var tableView = new List.Table({
                    collection: collection
                });

                layoutView.listRegion.show(tableView);
            });
        }
    };
});