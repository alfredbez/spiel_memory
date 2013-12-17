module.exports = function(grunt) {
  /*
    Run following commands in console

    # Setup grunt in this folder
    npm install
    # Install plug-ins in this folder
    npm install grunt --save-dev

    # run default tasks
    grunt
    # run build tasks
    grunt build
    # run imagemin tasks
    grunt imagemin
  */

  // loadNpmTasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    settings: {
      js_files: [
        /* own scripts  */
        'js/script.js'
      ],
      css_files: [
        'css/font/font.css',
        'css/style.css',
      ],
      less_files: [
        'css/style.less',
      ]
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: '<%= settings.js_files %>',
        dest: 'js/script.concat.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'js/script.min.js': ['js/script.concat.js']
        }
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 1 version', '> 1%', 'ie 8', 'ie 7']
        },
        files: {
          'css/prefixed.css': '<%= settings.css_files %>'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'css/style.min.css': ['css/prefixed.css']
        }
      }
    },
    csslint: {
      strict: {
        src: ['css/style.css']
      }
    },
    less: {
      development: {
        files: {
          "css/style.css": "css/style.less"
        }
      }
    },
    imagemin: {
      dynamic: {
        options: {
          progressive:  true,
          interlaced:   true,
          pngquant:     true
        },
        files: [{
          expand: true,
          cwd: 'img/',                  // Quellordner
          src: ['**/*.{png,jpg,gif}'],  // Pattern
          dest: 'img/'                  // Zierlordner
        }]
      }
    },
    watch: {
      js: {
        files: '<%= settings.js_files %>',
        tasks: ['jshint', 'uglify'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: '<%= settings.css_files %>',
        tasks: ['autoprefixer', 'cssmin'],
        options: {
          livereload: true,
        },
      },
      less: {
        files: '<%= settings.less_files %>',
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: 'index.html',
        options: {
          livereload: true,
        },
      }
    },
    jshint: {
      all: ['js/script.js']
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [{
          expand: true,
          src: ['js/script.min.js'],
          ext: '.min.js.gz'
        }, {
          expand: true,
          src: ['css/style.min.css'],
          ext: '.min.css.gz'
        }, ]
      }
    }
  });

  // tasks
  grunt.registerTask('default', ['less', 'concat', 'uglify', 'autoprefixer', 'cssmin', 'newer:jshint', 'newer:compress', 'watch']);
  grunt.registerTask('build', ['less', 'concat', 'uglify', 'autoprefixer', 'cssmin', 'newer:jshint', 'newer:compress']);
  grunt.registerTask('img', ['newer:imagemin']);
  grunt.registerTask('imgAll', ['imagemin']);

};