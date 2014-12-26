(function () {

  // uses animate.css

  angular.module('planningPokerApp.components.flyout', [])
    .directive('flyout', flyoutDirective)
    .directive('flyoutToggle', flyoutToggleDirective)
    .directive('flyoutClose', flyoutCloseDirective);

  var FLYOUT_TOGGLE_EVENT = 'flyouttoggle';

  function flyoutDirective() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      controller: function ($scope, $rootScope, $element, $attrs) {
        var _flyoutId = $attrs.flyoutId;
        $scope.show = false;
        $rootScope.$on(FLYOUT_TOGGLE_EVENT, function toggle(event, flyoutId) {
          if (_flyoutId === flyoutId) {
            $scope.show = !$scope.show;
          }
        });

        this.close = function close(){
          $scope.show = false;
        };
      },
      link: function (scope, element, attrs) {

        var flyoutSide = attrs.flyout || 'right';
        element.addClass(flyoutSide)

      },
      templateUrl: 'components/flyout/flyout.html'
    };
  }

  function flyoutToggleDirective($rootScope) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {

        var flyoutId = attrs.flyoutId;

        element.bind('click', function (event) {
          $rootScope.$emit(FLYOUT_TOGGLE_EVENT, flyoutId);
          $rootScope.$digest();
        });
      }
    };
  }

  function flyoutCloseDirective($rootScope) {
    return {
      require: '^flyout',
      restrict: 'EA',
      link: function (scope, element, attrs, flyoutCtrl) {
        var flyoutId = attrs.flyoutId;
        element.bind('click', function (event) {
          flyoutCtrl.close();
          $rootScope.$digest();
        });
      }
    };
  }
})();