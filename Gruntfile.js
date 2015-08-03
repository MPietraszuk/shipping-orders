'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    wiredep: {
      client: {
        src: ['client/index.html'],
        ignorePath: /\.\.\//
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'client',
          dest: 'public',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'views/{,*/}*.html'
          ]
        }]
      },
      assets: {
        expand: true,
        cwd: 'client/assets',
        dest: 'public/assets/',
        src: '{,*/}*.css'
      }
    },

    useminPrepare: {
      html: 'client/index.html',
      options: {
        dest: 'public',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    filerev: {
      dist: {
        src: [
          'public/scripts/{,*/}*.js',
          'public/assets/{,*/}*.css'
        ]
      }
    },

    usemin: {
      html: ['public/{,*/}*.html'],
      css: ['public/assets/{,*/}*.css'],
      options: {
        assetsDirs: [
          'public',
          'public/assets'
        ]
      }
    },

    cssmin: {
      dist: {
        files: [{
          'public/assets/app.css': [
            'client/assets/app.css'
          ]
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'client/assets/svg',
          src: '{,*/}*.svg',
          dest: 'public/assets/svg'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'public',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: 'public'
        }]
      }
    },

    clean: {
      tmp: {
        files: [{
          dot: true,
          src: [
            '.tmp'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'public/{,*/}*',
            '!public/.git{,*/}*'
          ]
        }]
      }
    },

    shell: {
      dev: {
        command: 'node server/app'
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'svgmin',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'clean:tmp'
  ]);

  grunt.registerTask('start', [
    'shell:dev'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};