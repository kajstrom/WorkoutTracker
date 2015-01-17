WorkoutTracker.module("ProgramsApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
    List.Controller = {
        listPrograms: function () {
            var layoutView = new List.Layout();

            WorkoutTracker.mainRegion.show(layoutView);

            var filterView = new List.Filter();
            layoutView.filterRegion.show(filterView);

            //@todo Display loading view...

            var retrievingPrograms = WorkoutTracker.request("program:entities");

            retrievingPrograms.then(function (collection) {
                var gridView = new List.Grid({
                    collection: collection
                });

                layoutView.listRegion.show(gridView);
            });
        }
    };
});