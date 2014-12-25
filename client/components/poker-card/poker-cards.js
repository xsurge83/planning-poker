(function(){

  angular.module('planningPokerApp.components.pokerCard', [])
    .directive('pokerCards', PokerCardsDirective);

  function PokerCardsDirective(){
    return {
      restrict: 'EA',
      scope: {
        cards: '='
      },
      controller : PokerCardsController,
      controllerAs : 'pokerCardsCtrl',
      templateUrl: 'components/poker-card/poker-cards.html'
    };
  }

  function PokerCardsController($scope){
    this.cards = $scope.cards;
    this.selectedCard = null;
  }

  PokerCardsController.prototype.selectCard = function select(card) {
    if (card != this.selectedCard) {
      if(!this.selectedCard){
        this.selectedCard = card ;
      } else {
        this.selectedCard.selected = false;
        this.selectedCard = card;
      }
      this.selectedCard.selected = true;
    }
  }
})();