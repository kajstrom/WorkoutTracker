WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
	Entities.WorkoutExercise = Backbone.Model.extend({
		urlRoot: function () {
			return "api/workouts/" + this.get("workout_id") + "/exercises"
		},
		idAttribute: "workout_exercise_id",
		defaults: {
			exercise_id: null,
			instructions: "",
			comment: ""
		},

		validate: function (attrs, options) {
			var validationErrors = [];

			if (_.isNaN(parseInt(attrs.exercise_id, 10))) {
				validationErrors.push("Exercise must be selected");
			}

			if (validationErrors.length > 0) {
				return validationErrors
			}
		}
	});

	Entities.WorkoutExerciseCollection = Backbone.Collection.extend({
		url: function () {
			return "api/workouts/" + this.workoutId + "/exercises"
		},

		model: Entities.WorkoutExercise,

		initialize: function (data, options) {
			this.workoutId = options.workoutId;
		}
	});

	var API = {
		getWorkoutExerciseEntities: function(workoutId){
			var workouts = new Entities.WorkoutExerciseCollection(null, {
				workoutId: workoutId
			});
			var promise = new Promise(
				function (resolve, reject) {
					workouts.fetch({
						success: function(data){
							resolve(data);
						}
					});
				}
			);

			return promise;
		}
	};

	WorkoutTracker.reqres.setHandler("workout:exercise:entities", function(workoutId){
		return API.getWorkoutExerciseEntities(workoutId);
	});
});