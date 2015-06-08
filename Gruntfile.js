module.exports = function(grunt) {
    'use strict';

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
        // concat: {
        //     dist: {
        //         src: [
        //             'src/js/libs/*.js',
        //             'src/js/global.js'
        //         ],
        //         dest: 'dist/js/production.js',
        //     }
        // },
        // uglify: {
        //     build: {
        //         src: 'dist/js/production.js',
        //         dest: 'dist/js/production.min.js'
        //     }
        // },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // destination file and source file
                    'dist/styles/styles.css': 'src/styles/styles.less'
                }
            }
        },
        watch: {
            handlebars: {
                files: ['**/*.hbs'],
                tasks: ['assemble']
            },
            // scripts: {
            //     files: ['js/*.js'],
            //     tasks: ['concat', 'uglify']
            // },
            styles: {
                files: ['**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('assemble');

    grunt.registerTask('default', ['assemble', 'less', 'watch']);
    // grunt.registerTask('default', ['assemble', 'less', 'concat', 'uglify', 'watch']);
};
