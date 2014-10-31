WorkoutTracker.module("ExercisesApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
	List.Controller = {
		listExercises: function () {
			var layoutView = new List.Layout();

			WorkoutTracker.mainRegion.show(layoutView);

			var filterView = new List.Filter();
			layoutView.filterRegion.show(filterView);

			//@todo Display loading view...

			var retrievingExercies = WorkoutTracker.request("exercise:entities");

			$.when(retrievingExercies).done(function(collection) {
				var tableView = new List.Table({
					collection: collection
				});

				layoutView.listRegion.show(tableView);
			});
		}
	};
});