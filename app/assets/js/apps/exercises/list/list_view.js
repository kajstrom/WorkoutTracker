WorkoutTracker.module("ExercisesApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
	List.Layout = Marionette.LayoutView.extend({
		template: "#exercise-list-layout",

		regions: {
			filterRegion: ".filterRegion",
			listRegion: ".listRegion"
		}
	});

	List.Filter = Marionette.ItemView.extend({
		className: "row",
		template: "#exercise-list-filter",
		events: {
			"click .js-add": "addExercise"
		},

		addExercise: function () {
			WorkoutTracker.trigger("exercises:new");
		}
	});

	List.TableRow = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#exercise-list-table-row",
		events: {
			"click .js-delete": "deleteClicked",
			"click .js-edit": "editClicked"
		},

		editClicked: function (e) {
			e.preventDefault();
			WorkoutTracker.trigger("exercises:edit", this.model.id);
		},

		deleteClicked: function (e) {
			e.preventDefault();
			e.stopPropagation();
			this.model.destroy();
		}
	});

	List.Table = Marionette.CompositeView.extend({
		template: "#exercise-list-table",
		tagName: "table",
		className: "table table-striped table-bordered",
		childViewContainer: "tbody",
		childView: List.TableRow
	})
});