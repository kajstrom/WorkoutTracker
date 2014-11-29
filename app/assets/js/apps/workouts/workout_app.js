WorkoutTracker.module("WorkoutsApp", function (WorkoutsApp, WorkoutTracker, Backbone, Marionette, $, _) {
    WorkoutsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "workouts": "listWorkouts"
        }
    });

    var API = {
        listWorkouts: function () {
            WorkoutsApp.List.Controller.listWorkouts();
        }
    };

    WorkoutTracker.on("workouts:list", function () {
        WorkoutTracker.navigate("workouts");
        WorkoutTracker.execute("sec:active:menu", "workouts");
        API.listWorkouts();
    });

    WorkoutTracker.addInitializer(function () {
        console.log("WorkoutsApp running");
        new WorkoutsApp.Router({
            controller: API
        });
    });
});
