module.exports = {

  options : {
    breakOnErrors   : true,
    jsLintXML       : 'reports/report.xml',
    checkstyleXML   : 'reports/checkstyle.xml',
    errorsOnly      : false,
    cyclomatic      : [4, 7, 12],
    halstead        : [14, 17, 20],
    maintainability : 97
  },

  generic : {
    src : ['src/**/*.js']
  }

};