module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false,
				sourceMap: true,
				compress: true
            },
            my_target: {
                files: {
                    'dist/js/app.min.js': ['app/assets/js/**/*.js']
                    /*'dist/js/vendor.min.js': [
						"bower_components/jquery/dist/jquery.js",
						"bower_components/underscore/underscore.js",
						"bower_components/backbone.babysitter/lib/backbone.babysitter.js",
						"bower_components/backbone.wreqr/lib/backbone.wreqr.js",
						"bower_components/marionette/lib/core/backbone.marionette.js",
						"bower_components/backbone.syphon/lib/backbone.syphon.js"
					]*/
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['uglify']);
};