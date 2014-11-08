WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
    Entities.ProgramExercise = Backbone.Model.extend({
        idAttribute: "program_exercise_id"
    });

    Entities.ProgramExerciseCollection = Backbone.Collection.extend({
        model: Entities.ProgramExercise
    });

    var API = {
        getProgramExerciseEntities: function(){
            var exercises = new Entities.ProgramExerciseCollection();
            var defer = $.Deferred();
            exercises.fetch({
                success: function(data){
                    defer.resolve(data);
                }
            });

            return defer.promise();
        }
    };

    WorkoutTracker.reqres.setHandler("programExercise:entities", function(){
        return API.getProgramExerciseEntities();
    });
});