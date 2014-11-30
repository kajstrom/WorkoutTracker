WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
    Entities.Workout = Backbone.Model.extend({
        urlRoot: "api/workouts",
        idAttribute: "workout_id"
    });

    Entities.WorkoutCollection = Backbone.Collection.extend({
        url: "api/workouts",
        model: Entities.Workout
    });

    var API = {
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

    WorkoutTracker.reqres.setHandler("workout:entities", function(){
        return API.getWorkoutEntities();
    });
});