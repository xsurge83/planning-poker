(function (angular) {
  "use strict";

  angular.module('planningPokerApp.components.inputfields', [])
    .directive('harukiInputField', harukiInputFieldDirective)

  function harukiInputFieldDirective(){
    var INPUT_FILLED_CLS = 'input--filled';
    return {
      restrict: 'EA',
      replace: true,
      scope : {
        inputValue : '=',
        labelValue : '='
      },
      link: function (scope, element) {

        scope.onInputFocus = onInputFocus;
        scope.onInputBlur = onInputBlur;

        function onInputFocus() {
          element.addClass(INPUT_FILLED_CLS)
        }

        function onInputBlur( ) {
          if(!scope.inputValue){
            element.removeClass(INPUT_FILLED_CLS)
          }
        }
      },
      templateUrl: 'components/input-fields/haruki-input-field.html'
    };
  }

})(angular);