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
		},

        getExerciseEntityById: function (exerciseId) {
            var exercise = new Entities.Exercise({exercise_id: exerciseId});

            return new Promise(
                function (resolve, reject) {
                    exercise.fetch({
                        success: function(data){
                            resolve(data);
                        }
                    });
                }
            );
        }
	};

	WorkoutTracker.reqres.setHandler("exercise:entities", function(){
		return API.getExerciseEntities();
	});

    WorkoutTracker.reqres.setHandler("exercise:entity", function(exerciseId){
        return API.getExerciseEntityById(exerciseId);
    });
});