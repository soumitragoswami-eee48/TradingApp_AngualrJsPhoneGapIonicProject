// Uses the Favorites Service to filter the list that we've marked...
angular.module('conference.AcceptedProposalController', [])
    .controller('AcceptedProposalController', function ($scope,superCache, $ionicModal,$http, $ionicPopover) {


            //make dummy data; get this list in real life from api call

            $scope.proposalItems = [];
           // $scope.pendingItems = [];
            $scope.counter = 0;
            $scope.accepted=false;
           $scope.approvedList=superCache.get('myKey')?superCache.get('myKey'):[];
            

            var tradeRequest1 = {
                customerId: '8787876781',
                city: 'Chennai',
                username: 'Soumitra Goswami',
                loanAmount: '20,000 INR',
                loanType: 'Unsecured Personal Loan',
                collapsed: true,
                approve:false,
                category: 'category3'
            };
            $scope.proposalItems.push(tradeRequest1);
           
           


        
            $scope.acceptProposal = function () {
                
            };
//
//             $ionicModal.fromTemplateUrl('templates/contact-bank.html', {
//                scope: $scope
//            }).then(function (modal) {
//                        $scope.acceptmodal = modal;                    
//                    });
//            // Open the approve modal
            $scope.showAccept = function (index) {
                    $scope.accepted=true;
            };
            $scope.closeAccept= function () {
                $scope.acceptmodal.hide();
            };


            // About version popover handling
            $ionicPopover.fromTemplateUrl('templates/about-popover.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
            });

            $scope.showFilterPopover = function ($event) {
                $scope.popover.show($event);
            };

            $scope.closePopover = function () {
                $scope.popover.hide();
            };

            // Cleanup the popover upon destroy event
            $scope.$on('$destroy', function () {
                $scope.popover.remove();
            });
        })
