angular.module('conference.ProfileCtrl', [])
        .controller('ProfileCtrl', function ($scope, $http, $ionicPopover) {


            $scope.consentObj = {};
            $scope.consentMsg = "";
            $scope.consent_result = false;

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

            $scope.requestConsent = function () {

                var auth = btoa($scope.loginData.phoneNumber + ":" + $scope.loginData.password);
                var body = {customerMobileNumber: $scope.loginData.phoneNumber}
                var theUrl = "http://192.168.43.202:8080/customer/requestConsent";
               //var theUrl = "http://localhost:8080/customer/requestConsent";

                var req = {
                    method: 'POST',
                    url: theUrl,
                    headers: {
                        'Authorization': "Basic " + auth
                    },
                    data: body
                };


                $http(req)
                        .then(getConsentComplete, consentFailed);

                function getConsentComplete(response) {
                    $scope.consentObj = {};
                    $scope.consentMsg = "Consent Request Sent Successfully!, Please log into the AA app and approve the consent, to start placing trade requests";
                    $scope.consent_result = true;
                    $scope.loginData.givenConsent=true;
                   
                }
                ;
                function consentFailed(response) {
                    console.log("got an error in initial processing" + response.status);
                    $scope.loginMsg = "Could not raise consent, please make sure you have signed up with the respective AA and linked all FIPs.";
                    $scope.login.result = false;
                }
                ;
                console.log("requesting consent");
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

