WorkoutTracker.module("WorkoutsApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
        template: "#workout-list-layout",

        regions: {
            filterRegion: ".filterRegion",
            listRegion: ".listRegion"
        }
    });

    List.Filter = Marionette.ItemView.extend({
        className: "row",
        template: "#workout-list-filter"
    });

    List.TableRow = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#workout-list-table-row",

        templateHelpers: function () {
            return {
                getDuration: function(){
                    var start = moment(this.start_time, "YYYY-DD-MM HH:mm");
                    var end = moment(this.end_time, "YYYY-DD-MM HH:mm");

                    return moment.utc(end.diff(start)).format("HH:mm");
                }
            };
        }
    });

    List.Table = Marionette.CompositeView.extend({
        template: "#workout-list-table",
        tagName: "table",
        className: "table table-striped table-bordered",
        childViewContainer: "tbody",
        childView: List.TableRow
    });
});