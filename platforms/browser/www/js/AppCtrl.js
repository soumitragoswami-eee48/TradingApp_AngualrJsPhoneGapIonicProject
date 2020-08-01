angular.module('conference.AppCtrl', [])
        .controller('AppCtrl', function ($scope, $http, $ionicModal, $ionicLoading, $timeout) {
            console.log("App ctrl initialize");

            // Init the login modal
            $scope.loginData = {};
            $scope.approved={};
            
            $scope.approvedList=$scope.approvedList?$scope.approvedList:[];
            
            $scope.registerData = {};
            $scope.register_result = true;
            $scope.registerMsg = "";
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

                    var auth = btoa($scope.loginData.phoneNumber + ":" + $scope.loginData.password);
                    var body = {mobileNumber: $scope.loginData.phoneNumber}
//                    var theUrl = "http://urjanettradingapplicationforhackatho-env.eba-3ks8cupq.us-east-1.elasticbeanstalk.com/login";
                    var theUrl="http://192.168.43.202:8080/login";
                    //var theUrl="http://localhost:8080/login";
                    var req = {
                        method: 'POST',
                        url: theUrl,
                        headers: {
                            'Authorization': "Basic " + auth
                        },
                        data: body
                    };


                    $http(req)
                            .then(getLoginComplete, loginFailed);

                    function getLoginComplete(response) {
                        console.log('ufbeiwfie successs huwaa');                      
                        $scope.loginMsg = "Login successful!";
                        $scope.login.result = true;
                        $scope.loginData.orgName=response.data.orgname;
                        $scope.loginData.role=response.data.role;
                        $scope.loginData.givenConsent=response.data.givenConsent;
                        $scope.closeLogin();
                    };
                    
                    function loginFailed(response) {
                        console.log("got an error in initial processing" + response.status);
                        $scope.loginMsg = "Please enter a valid username and password.";
                        $scope.login.result = false;
                    };


                } else {
                    $scope.loginMsg = "Please enter a valid username and password.";
                    $scope.login.result = false;
                }
            };

            $scope.doRegister = function () {
                if ($scope.registerData.phoneNumber != undefined && $scope.registerData.password != undefined &&
                        $scope.registerData.username != undefined && $scope.registerData.userType != undefined &&
                        $scope.registerData.confirmPassword != undefined) {

                    if ($scope.registerData.password !== $scope.registerData.confirmPassword) {
                        $scope.registerMsg = "Please ensure password and confirm password are same.";
                        $scope.register_result = false;
                    } else {


                        // var auth = btoa($scope.registerData.phoneNumber + ":" + $scope.registerData.password);
                        var body = {
                            userName: $scope.registerData.phoneNumber,
                            password: $scope.registerData.password,
                            orgName: $scope.registerData.username,
                            role: $scope.registerData.userType === 'Customer' ? 'ROLE_CUSTOMER' : 'ROLE_LENDER'
                        }

                        var theUrl = "http://192.168.43.202:8080/registration";
                        //var theUrl = "http://localhost:8080/registration";

                        var req = {
                            method: 'POST',
                            url: theUrl,
                            data: body
                        };


                        $http(req)
                                .then(getRegistrationComplete, registrationFailed);

                        function getRegistrationComplete(response) {
                            console.log('ufbeiwfie successs huwaa');

                            $scope.registerMsg = "Register successful!";
                            $scope.register_result = true;
                            showToast("You have registered successfully! Please log in and link AA to place deals");

                            //$scope.closeLogin();
                        }
                        ;
                        function registrationFailed(response) {
                            console.log("got an error in initial processing");
                            if (response.status === 409) {
                                $scope.registerMsg = "User Already Exists.";
                            } else {
                                $scope.registerMsg = "Error Ocurred In registration:  "+response.status+"-"+response.data.toString();
                            }
                            $scope.register_result = false;
                        }
                        ;


                    }
                } else {
                    $scope.registerMsg = "All fields are mandatory fields.";
                    $scope.register_result = false;
                }
            };

            $scope.logout = function () {
                showToast("You have logged out successfully!");
                $scope.loginData = {};
                $scope.loginMsg = "";
                $scope.registerMsg = "";
                $scope.register_result = false;
                $scope.registerData = {};
                if ($scope.modal != undefined) {
                    $scope.modal.backdropClickToClose = false;
                    $scope.modal.hardwareBackButtonClose = false;
                    $scope.modal.show();
                }

            }

            function showToast(message) {
                if (window.plugins && window.plugins.toast) {
                    window.plugins.toast.showShortCenter(message);
                } else
                    $ionicLoading.show({template: message, noBackdrop: true, duration: 2000});
            }
        })