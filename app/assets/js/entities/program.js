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

    WorkoutTracker.reqres.setHandler("program:entities", function(){
        return API.getProgramEntities();
    });
});