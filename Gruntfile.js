var js_list = [
'source/js/libs/jquery-3.2.0.min.js',
'source/js/sitewide.js'
]

module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		include_file: {
			default_options: {
				cwd: 'source/',
				src: ['index.html'],
				dest: 'build/'
			}
		},
		sass: {
			dist: {
				options: {
					sourcemap: 'none',
					style: 'compressed'
				},
				files: {
					'source/css/sitewide.css': 'source/sass/sitewide.scss',
				}
			}
		},
		sync: {
			main: {
				files: [
				{	cwd: 'source/',
				src: [
				'**/favicon.ico',
				'**/robots.txt',
				'img/**',
				'fonts/**',
				'css/sitewide.css',
				'js/libs/**',
				'js/sitewide.js',
				],
				dest: 'build/'},
				]
			},
			compareUsing: "md5"
		},
		watch: {
			tasks: ['sync', 'include_file'],
			files: {
				files: ['source/*.html', 'source/partials/*.html'],
				tasks: ['include_file'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['source/sass/**'],
				tasks: ['sass', 'sync'],
				options: {
					spawn: false,
				},
			},
			scripts: {
				files: ['source/js/**'],
				tasks: ['sync'],
				options: {
					spawn: false,
				},
			},
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-include-file');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-sync');
	grunt.registerTask('default', ['sass', 'sync', 'include_file']);
	grunt.registerTask('runCopy', ['copy']);
	grunt.registerTask('runUglify', ['uglify']);

	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('smush', ['imagemin']);

};
