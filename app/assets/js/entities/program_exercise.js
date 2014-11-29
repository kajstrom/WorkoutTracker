WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
    Entities.ProgramExercise = Backbone.Model.extend({
        idAttribute: "program_exercise_id",

        urlRoot: function () {
            return "api/programs/" + this.get("program_id") + "/exercises";
        },

        defaults: {
            program_id: 0
        }
    });

    Entities.ProgramExerciseCollection = Backbone.Collection.extend({
        model: Entities.ProgramExercise,

        url: function () {
            return "api/programs/" + this.at(0).get("program_id") + "/exercises";
        }
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