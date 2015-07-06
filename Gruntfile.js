module.exports = function(grunt) {
    'use strict';

    // tod do: jslint and accessibility audit

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                // layout: 'src/templates/layouts/',
                layoutdir: 'src/templates/layouts',
                partials: 'src/templates/partials/*.hbs',
                assets: 'dist/assets'
            },
            index: {
                // options: {layout: 'index.hbs'},
                files: {'dist/index': ['src/pages/index.hbs' ]}
            },
            projects: {
                options: {layout: 'project.hbs'},
                expand: true,
                cwd: 'src/pages/projects/',
                dest: 'dist/projects/',
                src: '**/*.hbs'
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
                'dist/js/bundled.min.js': ['dist/js/bundled.js']
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
                    // compress: true,
                    // yuicompress: true,
                    // optimization: 2
                },
                files: {
                    // destination file and source file
                    'dist/styles/styles.css': 'src/styles/styles.less'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            main: {
                expand: true,
                flatten: true,
                files: {
                    'dist/styles/styles_prefixed.css': 'dist/styles/styles.css'
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
                tasks: ['concat', 'uglify']
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

    grunt.registerTask('default', ['assemble', 'svg_cleaner', 'less', 'concat', 'uglify', 'autoprefixer', 'watch']);
};
