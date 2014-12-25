'use strict';

(function () {

  var CARDS;
  angular.module('planningPokerApp')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($http) {
    this.selectedCard;
    this.cards = CARDS;
  }

  MainCtrl.prototype.selectCard = function select(card) {
    debugger;
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

  CARDS = [
    {
      value: '?'
    },
    {
      value: '0'
    },
    {
      value: '1/2'
    },
    {
      value: '1'
    },
    { value: '2'},
    { value: '3'},
    { value: '5'},
    { value: '8'},
    { value: '13'},
    { value: '20'},
    { value: '40'},
    { value: '100'},
    { value: '~'}
  ];

})();



