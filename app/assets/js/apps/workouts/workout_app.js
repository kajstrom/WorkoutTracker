WorkoutTracker.module("WorkoutsApp", function (WorkoutsApp, WorkoutTracker, Backbone, Marionette, $, _) {
    WorkoutsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "workouts": "listWorkouts",
            "workouts/new": "newWorkout"
        }
    });

    var API = {
        listWorkouts: function () {
            WorkoutsApp.List.Controller.listWorkouts();
        },

        newWorkout: function () {
            WorkoutsApp.New.Controller.newWorkout();
        },

        editWorkout: function (args) {
            WorkoutsApp.Edit.Controller.editWorkout(args);
        }
    };

    WorkoutTracker.on("workouts:list", function () {
        WorkoutTracker.navigate("workouts");
        WorkoutTracker.execute("sec:active:menu", "workouts");
        API.listWorkouts();
    });

    WorkoutTracker.on("workouts:new", function () {
        WorkoutTracker.navigate("workouts/new");
        API.newWorkout();
    });

    WorkoutTracker.on("workouts:edit", function (args) {
        WorkoutTracker.navigate("workouts/edit");
        API.editWorkout(args);
    });

    WorkoutTracker.addInitializer(function () {
        console.log("WorkoutsApp running");
        new WorkoutsApp.Router({
            controller: API
        });
    });
});
