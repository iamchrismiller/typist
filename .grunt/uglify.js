module.exports = {

  build : {
    options : {
      banner       : '/*! <%= package.name %> - v<%= package.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      compress: {
        drop_console: true
      }
    },
    files   : {
      'build/typist.min.js' : ['src/typist.js']
    }
  }

};