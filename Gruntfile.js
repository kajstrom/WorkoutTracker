module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            vendor: {
                src: [
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/underscore/underscore.js",
                    "bower_components/backbone.babysitter/lib/backbone.babysitter.js",
                    "bower_components/backbone.wreqr/lib/backbone.wreqr.js",
                    "bower_components/marionette/lib/core/backbone.marionette.js",
                    "bower_components/backbone.syphon/lib/backbone.syphon.js"
                ],
                dest: 'dist/js/vendor.js'
            },
            app: {
                src: ['app/assets/js/**/*.js'],
                dest: 'dist/js/app.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/js/app.min.js': ['dist/js/app.js'],
                    'dist/js/vendor.min.js': ['dist/js/vendor.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['concat', 'uglify']);
};