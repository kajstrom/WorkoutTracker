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
        },

        editProgram: function (args) {
            ProgramsApp.Edit.Controller.editProgram(args);
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

    WorkoutTracker.on("programs:edit", function (args) {
        WorkoutTracker.navigate("programs/edit");
        API.editProgram(args);
    });

    WorkoutTracker.addInitializer(function () {
        console.log("ProgramsApp running");
        new ProgramsApp.Router({
            controller: API
        });
    });
});
