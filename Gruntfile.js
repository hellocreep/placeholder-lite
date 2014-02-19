module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify:{
			options:{},
			build: {
				src: 'js/placeholder.jquery.js',
				dest: 'js/placeholder.jquery.min.js'
			}
		},
		watch:{

		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
}