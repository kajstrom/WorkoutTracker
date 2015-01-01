WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
	Entities.WorkoutExerciseSet = Backbone.Model.extend({
		urlRoot: function () {
			return "api/workoutexercise/" + this.get("workout_exercise_id") + "/sets"
		},
		idAttribute: "workout_exercise_set_id",
		defaults: {
			set_number: 0,
			repetitions: 0,
			load: 0,
			load_type_id: 1
		}
	});

	Entities.WorkoutExerciseSetCollection = Backbone.Collection.extend({
		url: function () {
			return  "api/workoutexercise/" + this.workoutExerciseId + "/sets";
		},

		model: Entities.WorkoutExerciseSet,

		initialize: function (data, options) {
			this.workoutExerciseId = options.workoutExerciseId;
		}
	});

	Entities.WorkoutSetsCollection = Backbone.Collection.extend({
		url: function () {
			return "api/workout/" + this.workoutId + "/exercise/sets";
		},
		model: Entities.WorkoutExerciseSet,

		initialize: function (data, options) {
			this.workoutId = options.workoutId;
		}
	});

	var API = {
		getWorkoutExerciseSetEntities: function(workoutExerciseId){
			var workoutExerciseSets = new Entities.WorkoutExerciseSetCollection(null, {
				workoutExerciseId: workoutExerciseId
			});
			var promise = new Promise(
				function (resolve, reject) {
					workoutExerciseSets.fetch({
						success: function(data){
							resolve(data);
						}
					});
				}
			);

			return promise;
		},

		getWorkoutSetEntities: function(workoutId){
			var workoutSets = new Entities.WorkoutSetsCollection(null, {
				workoutId: workoutId
			});
			var promise = new Promise(
				function (resolve, reject) {
					workoutSets.fetch({
						success: function(data){
							resolve(data);
						}
					});
				}
			);

			return promise;
		}
	};

	WorkoutTracker.reqres.setHandler("workout:exercise:sets:entities", function(workoutExerciseId){
		return API.getWorkoutExerciseSetEntities(workoutExerciseId);
	});

	WorkoutTracker.reqres.setHandler("workout:sets:entities", function (workoutId) {
		return API.getWorkoutSetEntities(workoutId);
	});
});