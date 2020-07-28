/**
 * Created by hollyschinsky on 10/30/14.
 */
angular.module('conference.HomeCtrl', ['conference.services'])
        .controller('HomeCtrl', function ($scope, SessionService, $ionicPopover) {

            // Get all the sessions
            $scope.sessions = SessionService.query();
            
            
            //make dummy data; get this list in real life from api call
            $scope.items = [];
            var tradeRequest1={
                customerId:'8939257386',
                loanAmount:'1,50,000 INR',
                collapsed: true
            };
            var tradeRequest2={
                customerId:'8939258986',
                loanAmount:'13,00,000 INR',
                collapsed: true
            };
            var tradeRequest3={
                customerId:'9090058986',
                loanAmount:'90,000 INR',
                collapsed: true
            };
            $scope.items.push(tradeRequest1);
            $scope.items.push(tradeRequest2);
            $scope.items.push(tradeRequest3);

            $scope.addItem = function () {
                $scope.items.unshift(nextItem++);
            }


            // Filter sessions by entering text in field and selecting from drop-down
            $scope.setFilter = function () {
                var search = $scope.searchTxt;
                var field = this.field;

                if (field === 'title')
                    $scope.search = {title: search};
                else if (field === 'speaker')
                    $scope.search = {speaker: search};
                else if (field === 'description')
                    $scope.search = {description: search};
                else
                    $scope.search = {$: search}; // ALL cases
            }

            $scope.clear = function () {
                $scope.searchTxt = ""
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
