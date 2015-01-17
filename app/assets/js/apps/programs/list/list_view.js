WorkoutTracker.module("ProgramsApp.List", function (List, WorkoutTracker, Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
        template: "#program-list-layout",

        regions: {
            filterRegion: ".filterRegion",
            listRegion: ".listRegion"
        }
    });

    List.Filter = Marionette.ItemView.extend({
        className: "row",
        template: "#program-list-filter",
        events: {
            "click .js-add": "addProgram"
        },

        addProgram: function () {
            WorkoutTracker.trigger("programs:new");
        }
    });

    List.GridItemLayout = Marionette.LayoutView.extend({
        template: "#program-list-item-layout",

        regions: {
            programRegion: ".programRegion",
            exercisesRegion: ".exercisesRegion"
        },

        events: {
            "click .js-show-exercises": "showExercisesClicked"
        },

        showExercisesClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (!this.exercisesRegion.hasView()) {
                var self = this;
                var retrievingExercises = WorkoutTracker.request("exercise:entities");
                var retrievingProgramExercises = WorkoutTracker.request(
                    "programExercise:entities",
                    this.model.get("program_id")
                );

                var promises = [retrievingExercises, retrievingProgramExercises];

                Promise.all(promises).then(function (data) {
                    var exerciseCollection = data[0];
                    var programExerciseCollection = data[1];
                    var exercisesView = new List.Exercises({
                        collection: programExerciseCollection,
                        childViewOptions: {
                            exercises: exerciseCollection
                        }
                    });

                    self.exercisesRegion.show(exercisesView);
                });
            } else {
                this.exercisesRegion.reset();
            }
        },

        onRender: function () {
            this.programRegion.show(new List.GridItem({
                model: this.model
            }));
        }
    });

    List.GridItem = Marionette.ItemView.extend({
        template: "#program-list-item",

        events: {
            "click .js-edit": "editClicked",
            "click .js-delete": "deleteClicked"
        },

        editClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            WorkoutTracker.trigger("programs:edit", {model: this.model});
        },

        deleteClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.model.destroy();
        }
    });

    List.Grid = Marionette.CompositeView.extend({
        template: "#program-list-container",
        className: 'program-grid',
        childViewContainer: '.items',
        childView: List.GridItemLayout
    });

    List.Exercise = Marionette.ItemView.extend({
        template: "#program-list-exercise",

        /**
         * Add child view options to serialized data
         * @returns {*}
         */
        serializeData: function () {
            var data = Backbone.Marionette.ItemView.prototype.serializeData.apply(this, arguments);
            data.exercises = this.options.exercises;

            return data;
        },

        templateHelpers: function () {
            return {
                getExerciseName: function () {
                    var exercise = this.exercises.findWhere({exercise_id: this.exercise_id});
                    return exercise.get("name");
                }
            };
        }
    });

    List.Exercises = Marionette.CollectionView.extend({
        childView: List.Exercise
    });
});
