WorkoutTracker.module("ProgramsApp", function (ProgramsApp, WorkoutTracker, Backbone, Marionette, $, _) {
    ProgramsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "programs": "listPrograms",
            "programs/new": "newProgram"
        }
    });

    var API = {
        listPrograms: function () {
            ProgramsApp.List.Controller.listPrograms();
        },

        newProgram: function () {
            ProgramsApp.New.Controller.newProgram();
        }
    };

    WorkoutTracker.on("programs:list", function () {
        WorkoutTracker.navigate("programs");
		WorkoutTracker.execute("sec:active:menu", "programs");
        API.listPrograms();
    });

    WorkoutTracker.on("programs:new", function () {
        WorkoutTracker.navigate("programs/new");
        API.newProgram();
    });

    WorkoutTracker.addInitializer(function () {
        console.log("ProgramsApp running");
        new ProgramsApp.Router({
            controller: API
        });
    });
});
