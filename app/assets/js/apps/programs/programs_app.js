WorkoutTracker.module("ProgramsApp", function (ProgramsApp, WorkoutTracker, Backbone, Marionette, $, _) {
    ProgramsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "programs": "listPrograms"
        }
    });

    var API = {
        listPrograms: function () {
            ProgramsApp.List.Controller.listPrograms();
        }
    };

    WorkoutTracker.on("programs:list", function () {
        WorkoutTracker.navigate("programs");
        API.listPrograms();
    });

    WorkoutTracker.addInitializer(function () {
        console.log("ProgramsApp running");
        new ProgramsApp.Router({
            controller: API
        });
    });
});
