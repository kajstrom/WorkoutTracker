WorkoutTracker.module("ProgramsApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
        template: "#program-list-layout",

        regions: {
            filterRegion: ".filterRegion",
            listRegion: ".listRegion"
        }
    });

    List.Filter = Marionette.ItemView.extend({
        className: "row",
        template: "#program-list-filter",
        events: {
            "click .js-add": "addProgram"
        },

        addProgram: function () {
            WorkoutTracker.trigger("programs:new");
        }

    });

    List.TableRow = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#program-list-table-row",
        events: {
            "click .js-delete": "deleteClicked"
        },

        deleteClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.model.destroy();
        }
    });

    List.Table = Marionette.CompositeView.extend({
        template: "#program-list-table",
        tagName: "table",
        className: "table table-striped table-bordered",
        childViewContainer: "tbody",
        childView: List.TableRow
    });
});
