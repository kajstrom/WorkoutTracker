WorkoutTracker.module("WorkoutsApp.Common.Views", function (Views, WorkoutTracker, Backbone, Marionette, $, _) {
    Views.Form = Marionette.ItemView.extend({
        template: "#workout-edit-form",
        events: {
            "click .js-save": "saveClicked",
            "click .js-cancel": "cancelClicked"
        },

        onRender: function () {
            Backbone.Syphon.deserialize(this, this.model.toJSON());
        },

        saveClicked: function () {
            var formData = Backbone.Syphon.serialize(this);
            this.model.set(formData);

            this.listenTo(this.model, "sync", function () {
                WorkoutTracker.trigger("workouts:list");
            });

            this.model.save();
        },

        cancelClicked: function () {
            WorkoutTracker.trigger("workouts:list");
        }
    });
});