WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
	Entities.Exercise = Backbone.Model.extend({
		urlRoot: "api/exercises",
		idAttribute: "exercise_id"
	});

	Entities.ExerciseCollection = Backbone.Collection.extend({
		url: "api/exercises",
		model: Entities.Exercise
	});

	var API = {
		getExerciseEntities: function(){
			var exercises = new Entities.ExerciseCollection();
			var promise = new Promise(
				function (resolve, reject) {
					exercises.fetch({
						success: function(data){
							resolve(data);
						}
					});
				}
			);

			return promise;
		}
	};

	WorkoutTracker.reqres.setHandler("exercise:entities", function(){
		return API.getExerciseEntities();
	});
});