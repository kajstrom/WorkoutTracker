WorkoutTracker.module("WorkoutsApp.Common.Views", function (Views, WorkoutTracker, Backbone, Marionette, $, _) {
	Views.Layout = Marionette.LayoutView.extend({
		template: "#workout-form-layout",
		regions: {
			formRegion: ".form",
			exercisesRegion: ".exercises"
		}
	});

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

	Views.ExerciseView = Marionette.ItemView.extend({
		className: "row",
		template: "#workout-exercise-view",
		events: {
			"change .exercise-select": "saveModel",
			"blur textarea": "saveModel",
			"click .js-delete": "deleteExercise"
		},

		serializeData: function () {
			var modelAttributes = this.model.toJSON();
			modelAttributes.exercises = this.options.exerciseCollection;

			return modelAttributes;
		},

		onRender: function () {
			Backbone.Syphon.deserialize(this, this.model.toJSON());
		},

		saveModel: function () {
			var formAttrs = Backbone.Syphon.serialize(this);
			this.model.set(formAttrs);

			if (this.model.isValid()) {
				this.model.save();
			}
		},

		deleteExercise: function (e) {
			e.preventDefault();
			this.model.destroy();
		}
	});

	Views.NoExercisesView = Marionette.ItemView.extend({
		template: "#workout-noexercises"
	});

	Views.Exercises = Marionette.CompositeView.extend({
		template: "#workout-exercises",
		childView: Views.ExerciseView,
		childViewContainer: ".exercise-container",
		childViewOptions: function () {
			return {
				exerciseCollection: this.options.exerciseCollection
			}
		},
		emptyView: Views.NoExercisesView,
		events: {
			"click .js-add-exercise": "addExercise"
		},

		addExercise: function () {
			var workoutExercise = new WorkoutTracker.Entities.WorkoutExercise({
				workout_id: this.model.get("workout_id"),
				order_number: this.collection.length + 1
			});

			this.collection.add(workoutExercise);
		}
	});
});