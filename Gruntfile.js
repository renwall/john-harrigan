module.exports = function(grunt) {
    'use strict';

    // format is destination file: source file

    // to do: jslint and accessibility audit

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                layoutdir: 'src/templates/layouts',
                partials: 'src/templates/partials/*.hbs',
                assets: 'dist/assets'
            },
            index: {
                files: {'dist/index': 'src/pages/index.hbs'}
            },
            projects: {
                options: {layout: 'project.hbs'},
                expand: true,
                cwd: 'src/pages/projects/',
                dest: 'dist/',
                src: '**/*.hbs'
            }
        },
        prettify: {
            options: {
                indent: 4,
                brace_style: 'expand'
            },
            all: {
                expand: true,
                cwd: 'dist/',
                ext: '.html',
                src: ['*.html'],
                dest: 'dist/'
            }
        },
        jshint: {
            files: 'src/js/global.js',
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'src/js/libs/*.js',
                    'src/js/global.js'
                ],
                dest: 'dist/js/bundled.js'
            }
        },
        uglify: {
            my_target: {
              files: {
                'dist/js/bundled.min.js': 'dist/js/bundled.js'
              }
            }
        },
        svg_cleaner: {
            minifySvgs: {
                files: {
                    'dist/assets/': 'src/svg/icon-spritemap.svg'
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'dist/styles/styles.css': 'src/styles/styles.less'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            main: {
                flatten: true,
                files: {
                    'dist/styles/styles.css': 'dist/styles/styles.css'
                }
            }
        },
        watch: {
            handlebars: {
                files: ['**/*.hbs'],
                tasks: ['assemble']
            },
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint', 'concat', 'uglify']
            },
            styles: {
                files: ['**/*.less'],
                tasks: ['less']
            },
            autoprefix: {
                files: ['dist/styles/styles.css'],
                tasks: ['autoprefixer']
            },
            svg: {
                files: ['src/svg/icon-spritemap.svg'],
                tasks: ['svg_cleaner']
            }
        }
    });

    grunt.loadNpmTasks('assemble');

    grunt.registerTask('default', ['assemble', 'prettify', 'svg_cleaner', 'less', 'jshint', 'concat', 'uglify', 'autoprefixer', 'watch']);
};
