WorkoutTracker.module("WorkoutsApp", function (WorkoutsApp, WorkoutTracker, Backbone, Marionette, $, _) {
    WorkoutsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "workouts": "listWorkouts",
            "workouts/new": "newWorkout",
            "workouts/edit/:id": "editWorkout"
        }
    });

    var API = {
        listWorkouts: function () {
            WorkoutsApp.List.Controller.listWorkouts();
        },

        newWorkout: function () {
            WorkoutsApp.New.Controller.newWorkout();
        },

        editWorkout: function (workoutId) {
            WorkoutsApp.Edit.Controller.editWorkout(workoutId);
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

    WorkoutTracker.on("workouts:edit", function (workoutId) {
        WorkoutTracker.navigate("workouts/edit/" + workoutId);
        API.editWorkout(workoutId);
    });

    WorkoutTracker.addInitializer(function () {
        console.log("WorkoutsApp running");
        new WorkoutsApp.Router({
            controller: API
        });
    });
});
