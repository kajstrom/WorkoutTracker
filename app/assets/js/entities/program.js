WorkoutTracker.module("Entities", function (Entities, WorkoutTracker, Backbone, Marionette, $, _) {
    Entities.Program = Backbone.Model.extend({
        urlRoot: "api/programs",
        idAttribute: "program_id"
    });

    Entities.ProgramCollection = Backbone.Collection.extend({
        url: "api/programs",
        model: Entities.Program
    });

    var API = {
        getProgramEntities: function(){
            var exercises = new Entities.ProgramCollection();
            var defer = $.Deferred();
            exercises.fetch({
                success: function(data){
                    defer.resolve(data);
                }
            });

            return defer.promise();
        }
    };

    WorkoutTracker.reqres.setHandler("program:entities", function(){
        return API.getProgramEntities();
    });
});