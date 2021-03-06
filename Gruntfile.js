module.exports = function( grunt ) {

  "use strict"

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //watch and compile all files
    watch: {

      html: {
        files: 'prod/*.html',
      },

      css: {
        files: 'prod/assets/styles/*.css',
      },

      jd: {
        files: ['dev/*.jade','dev/**/*.jade'],
        tasks: ['jade:compile'],
      },

      styl: {
        files: ['dev/assets/styles/*.styl','dev/assets/**/*.styl'],
        tasks: ['stylus:compile'],
      },

      javascript: {
        files: 'dev/assets/scripts/*.js',
        tasks: ['uglify'],
      },

      options: {
        livereload: true
      }

    },

    // The jade compile task
    jade: {
      //compile for production
      compile: {
        files: {
          "prod/index.html": ["dev/index.jade"]
        },
        options: {
          data: grunt.file.readJSON("projects.json")
        }
      }
    },

    //The stylus compile task
    stylus: {
      //compile for production
      compile: {
        files: {
          'prod/assets/styles/style.min.css':'dev/assets/styles/style.styl' // 1:1 compile
        }
      }
    },

    //concat all JS
    concat: {
			dist: {
		      src: 'dev/assets/scripts/*.js',
		      dest: 'prod/assets/scripts/scripts.js'
		    }
		},

    //compress all js
    uglify: {
      my_target: {
        files: {
        'prod/assets/scripts/scripts.min.js': ['dev/assets/scripts/*.js']
        }
      }
    },
    //Deploy the production files for gh-pages
    'gh-pages': {
      options: {
        base: 'prod/'
      },
      src: ['**']
    },

    //Starts the static server
    connect: {
      server: {
        options: {
          port: 9000,
          base: "./",
          hostname: "localhost",
          livereload: true,
          open: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('dev', ['connect','watch']);
  grunt.registerTask('deploy', ['gh-pages']);
};
