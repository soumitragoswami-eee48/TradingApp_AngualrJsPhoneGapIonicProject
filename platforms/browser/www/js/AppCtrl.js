angular.module('conference.AppCtrl', ['conference.services'])
        .controller('AppCtrl', function ($scope, $ionicModal, $ionicLoading, $timeout) {
            console.log("App ctrl initialize");

            // Init the login modal
            $scope.loginData = {};
            $scope.loginMsg = "";

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            })
                    .then(function (modal) {
                        $scope.modal = modal;
                        // Now that modal is ready, let's have them login first
                        $scope.login();
                    });

            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.loginData = {};
                $scope.loginMsg = "";
                if ($scope.modal != undefined) {
                    $scope.modal.backdropClickToClose = false;
                    $scope.modal.hardwareBackButtonClose = false;
                    $scope.modal.show();
                }
            };

            // Basic Login Handling - invoke a check for userid and pw being valued but nothing beyond a message
            $scope.doLogin = function () {
                if ($scope.loginData.phoneNumber != undefined && $scope.loginData.password != undefined) {
                    // Simulate authentication check - roll your own here instead of success timeout :)
                    $timeout(function () {
                        $scope.closeLogin();
                    }, 1000);
                    $scope.loginMsg = "Login successful!";

                    $scope.login.result = true;
                } else {
                    $scope.loginMsg = "Please enter a valid username and password.";
                    $scope.login.result = false;
                }
            };

            $scope.logout = function () {
                showToast($scope.msg);

            }

            function showToast(message) {
                if (window.plugins && window.plugins.toast) {
                    window.plugins.toast.showShortCenter(message);
                } else
                    $ionicLoading.show({template: message, noBackdrop: true, duration: 2000});
            }
        })