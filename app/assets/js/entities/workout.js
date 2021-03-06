WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
    Entities.Workout = Backbone.Model.extend({
        urlRoot: "api/workouts",
        idAttribute: "workout_id",
        defaults: {
            date: moment().format("YYYY-MM-DD"),
            comments: "",
            start_time: "",
            end_time: "",
            user_weight: 0,
            user_rhr: 0,
			program_id: null
        }
    });

    Entities.WorkoutCollection = Backbone.Collection.extend({
        url: "api/workouts",
        model: Entities.Workout
    });

    var API = {
        getWorkoutEntity: function (workoutId) {
            var workout = new Entities.Workout({ workout_id: workoutId });
            var promise = new Promise(
                function (resolve, reject) {
                    workout.fetch({
                        success: function (data) {
                            resolve(data);
                        }
                    });
                }
            );

            return promise;
        },

        getWorkoutEntities: function(){
            var workouts = new Entities.WorkoutCollection();
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

    WorkoutTracker.reqres.setHandler("workout:entity", function (workoutId) {
        return API.getWorkoutEntity(workoutId);
    });

    WorkoutTracker.reqres.setHandler("workout:entities", function(){
        return API.getWorkoutEntities();
    });
});