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

	Views.ExerciseView = Marionette.LayoutView.extend({
		className: "row",
		template: "#workout-exercise-view",
		events: {
			"change .exercise-select": "saveModel",
			"blur textarea": "saveModel",
			"click .js-delete": "deleteExercise"
		},

		regions: {
			sets: ".exercise-sets"
		},

		serializeData: function () {
			var modelAttributes = this.model.toJSON();
			modelAttributes.exercises = this.options.exerciseCollection;

			return modelAttributes;
		},

		onRender: function () {
			Backbone.Syphon.deserialize(this, this.model.toJSON());

			if (!this.model.isNew()) {
				this.showSets();
			}
		},

		saveModel: function () {
			var self = this;
			var formAttrs = Backbone.Syphon.serialize(this);
			this.model.set(formAttrs);

			if (this.model.isValid()) {
				this.model.save(null, {
					success: function () {
						self.showSets();
					}
				});
			}
		},

		showSets: function () {
			var exerciseSetsView = new Views.ExerciseSetsView({
				collection: this.options.exerciseSetsCollection,
				model: this.model
			});

			this.sets.show(exerciseSetsView);
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
		childViewOptions: function (model, index) {
			var options = {
				exerciseCollection: this.options.exerciseCollection
			};

			if (model !== undefined) {
				options.exerciseSetsCollection = new WorkoutTracker.Entities.WorkoutExerciseSetCollection(
					this.options.exerciseSetsCollection.where({workout_exercise_id: model.get("workout_exercise_id")}),
					{
						workoutExerciseId: model.get("workout_exercise_id")
					}
				);
			} else {
				options.exerciseSetsCollection = new WorkoutTracker.Entities.WorkoutExerciseSetCollection([], {
					workoutExerciseId: this.model.get("workout_exercise_id")
				})
			}

			return options;
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

	Views.ExerciseSetsView = Marionette.ItemView.extend({
		template: "#workout-exercise-set",
		events: {
			"blur input": "save",
			"click .js-delete": "delete"
		},

		save: function () {
			var formData = Backbone.Syphon.serialize(this);
			this.model.set(formData);
			this.model.save();
		},

		delete: function (e) {
			e.stopPropagation();
			e.preventDefault();

			this.model.destroy();
		}
	});

	Views.NoExerciseSetsView = Marionette.ItemView.extend({
		template: "#workout-exercise-nosets"
	});

	Views.ExerciseSetsView = Marionette.CompositeView.extend({
		template: "#workout-exercise-sets",
		childView: Views.ExerciseSetsView,
		childViewContainer: ".set-container",
		emptyView: Views.NoExerciseSetsView,
		events: {
			"click .js-add-set": "addSet"
		},

		addSet: function (e) {
			e.preventDefault();

			var newSet = new WorkoutTracker.Entities.WorkoutExerciseSet({
				set_number: this.collection.length + 1,
				workout_exercise_id: this.model.get("workout_exercise_id")
			});

			newSet.save();

			this.collection.add(newSet);
		}
	});
});