WorkoutTracker.module("ProgramsApp.Common.Views", function (Views, WorkoutTracker, Backbone, Marionette, $, _) {
    Views.Form = Marionette.CompositeView.extend({
        template: "#program-edit-form",
        className: "row",
        events: {
            "click .js-add-exercise": "addExerciseClicked",
            "click .js-cancel": "cancelClicked"
        },

        initialize: function () {
            if (this.collection.length === 0) {
                this.collection.add({});
            }
        },

        addExerciseClicked: function (e) {
            e.preventDefault();
            this.collection.add({});
        },

        cancelClicked: function () {
            WorkoutTracker.trigger("programs:list");
        }
    });

    Views.ProgramExercise = Marionette.ItemView.extend({
        template: "#program-edit-exercises",
        className: "row",
        events: {
            "click .js-remove-exercise": "removeExerciseClicked"
        },

        onBeforeRender: function () {
            this.model.set("exercises", this.options.exercises);
        },

        removeExerciseClicked: function () {
            this.model.destroy();
            this.destroy();
        }
    });
});