WorkoutTracker.module("ProgramsApp.Common.Views", function (Views, WorkoutTracker, Backbone, Marionette, $, _) {
    Views.Form = Marionette.CompositeView.extend({
        template: "#program-edit-form",
        className: "row",
        events: {
            "click .js-add-exercise": "addExerciseClicked",
            "click .js-cancel": "cancelClicked",
            "click .js-save": "saveClicked"
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
        },

        saveClicked: function () {
            var self = this;
            var formData = Backbone.Syphon.serialize(this);
            this.model.set(formData);

            this.model.save(
                null,
                {
                    success: function (model) {
                        self.collection.each(function (item) {
                            item.set("program_id", model.get("program_id"));
                            item.unset("exercises");
                            item.save();
                        });
                    }
                }
            );

            WorkoutTracker.trigger("programs:list");
        }
    });

    Views.ProgramExercise = Marionette.ItemView.extend({
        template: "#program-edit-exercises",
        className: "row",
        events: {
            "click .js-remove-exercise": "removeExerciseClicked",
            "change select": "setExercise"
        },

        onBeforeRender: function () {
            this.model.set("exercises", this.options.exercises);
        },

        setExercise: function (e) {
            this.model.set("exercise_id", $(e.target).val());
        },

        removeExerciseClicked: function () {
            this.model.destroy();
            this.destroy();
        }
    });
});