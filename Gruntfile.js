module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        precision: 6,
        outputStyle: 'compressed',
      },
      dist: {
        options: {
          includePaths: ['node_modules/bootstrap/scss'],
        },
        files: {
          'dist/static/css/main.css': 'src/static/css/main.scss',
        },
      },
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: [
              'Firefox >= 38',
              'Chrome >= 35',
              'Edge >= 12',
              'Explorer >= 9',
              'iOS >= 8',
              'Safari >= 8',
              'Android 2.3',
              'Android >= 4',
            ]
          })
        ]
      },
      dist: {
        src: 'dist/static/css/main.css'
      },
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        advanced: false
      },
      dist: {
        files: {
          'dist/static/css/main.css': 'dist/static/css/main.css',
        }
      },
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: 'templates/**',
            dest: 'dist/'
          },
        ]
      },
    },

    watch: {
      css: {
        files: ['src/static/css/main.scss'],
        tasks: ['css'],
      },
      html: {
        files: ['src/templates/*.html'],
        tasks: ['copy'],
      },
    },

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('css', ['sass', 'postcss', 'cssmin']);
  grunt.registerTask('default', ['css', 'copy']);

};
