(function () {
  'use strict';
  angular.module('planningPokerApp.components.timer', [])
    .directive('timer', timerDirective);

  function timerDirective($timeout) {
    return {
      restrict: 'EA',
      scope: {
        seconds: '=',
        start : '='
      },
      templateUrl: 'components/timer/timer.html',
      link: function (scope, element) {
        var totalTime = scope.seconds || 0,
          currentTime = totalTime,
          percentTime,
          timePromise = null,
          timerText = element.find('.text')[0],
          timerCircle = element.find('.circle')[0];

        reset();

        scope.$watch('start', function(newValue, oldValue){
          if(newValue){
            reset();
            timer();
          } else {
            timerCircle.style.strokeDashoffset = 0
          }
        });

        function reset(){
          currentTime = totalTime;
          percentTime = null;
          timerCircle.style.strokeDashoffset = 0;
          timerText.textContent = currentTime;
          currentTime -= 1;
          if(timePromise)
            $timeout.cancel([timePromise]);
        }

        function timer(){
          if (currentTime === -1) {
            scope.start = false;
            scope.$apply();
            return;
          }
          timerText.textContent = currentTime+1;
          percentTime = Math.round((currentTime / totalTime) * 100);
          timerCircle.style.strokeDashoffset = percentTime - 100;

          $timeout(function(){
            timerText.textContent = currentTime;
            currentTime -= 1;
            requestAnimationFrame(timer);
          }, 1000);
        }

      }
    }
  }

})();
