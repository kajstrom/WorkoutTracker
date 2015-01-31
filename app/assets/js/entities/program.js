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
        getProgramEntity: function (programId) {
            var exercise = new Entities.Program({program_id: programId});
            var promise = new Promise(
                function (resolve, reject) {
                    exercise.fetch({
                        success: function(data){
                            resolve(data);
                        }
                    });
                }
            );

            return promise;
        },
        getProgramEntities: function(){
            var exercises = new Entities.ProgramCollection();
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

    WorkoutTracker.reqres.setHandler("program:entity", function (programId) {
        return API.getProgramEntity(programId);
    });

    WorkoutTracker.reqres.setHandler("program:entities", function(){
        return API.getProgramEntities();
    });
});