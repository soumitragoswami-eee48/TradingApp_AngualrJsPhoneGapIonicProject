angular.module('conference.HomeCtrl', [])
        .controller('HomeCtrl', function ($scope,superCache, $ionicModal,$http, $ionicPopover) {

            $scope.tradeRequest = {mobileNumber: $scope.loginData.phoneNumber};
              $scope.meta={index:0}; 
            $scope.tradeRequestMsg = "";
            $scope.tradeRequest_result = false;

            //make dummy data; get this list in real life from api call
            $scope.pendingItemsOrig = [];
            $scope.approvedItemsOrig = [];
            $scope.approvedItems = [];
            $scope.pendingItems = [];
            $scope.counter = 0;
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
            var tradeRequest2 = {
                customerId: '9839257236',
                city: 'Chennai',
                username: 'Mathivanan Paulsamy',
                loanAmount: '1,00,000 INR',
                loanType: 'Unsecured Business Loan',
                collapsed: true,
                approve:false,
                category: 'category2'
            };
            var tradeRequest3 = {
                customerId: '9090043986',
                username: 'Michael Jackson',
                city: "Los Angeles",
                loanAmount: '90,000 INR',
                loanType: 'Unsecured Personal Loan',
                collapsed: true,
                approve:false,
                category: 'category2'
            };
            var tradeRequest4 = {
                customerId: '89392533486',
                username: 'Green Laminates',
                city: "Durgapur",
                loanAmount: '13,00,000 INR',
                loanType: 'Unsecured Business Loan',
                collapsed: true,
                approve:false,
                category: 'category1'
            };
            var tradeRequest5 = {
                customerId: '8939567986',
                username: 'Jack Ripper',
                city: "Delhi",
                loanAmount: '19,00,000 INR',
                loanType: 'Unsecured Business Loan',
                collapsed: true,
                approve:false,
                category: 'category1'
            };
            $scope.loadInitialData = function () {
                if ($scope.counter == 0) {//firs time load
                    $scope.pendingItems.push(tradeRequest1);
                    $scope.pendingItems.push(tradeRequest2);
                    $scope.pendingItems.push(tradeRequest3);
                    $scope.pendingItems.push(tradeRequest4);
                    $scope.pendingItems.push(tradeRequest5);
                    $scope.pendingItemsOrig = $scope.pendingItems;
                    $scope.counter++;
                } else
                    $scope.pendingItems = $scope.pendingItemsOrig;

            };
            $scope.loadInitialData();

            $scope.searchPending = function (categ) {
                $scope.pendingItems = [];

                var tmp_pendingItems = [];
                for (var i = 0; i < $scope.pendingItemsOrig.length; i++) {
                    if ($scope.pendingItemsOrig[i].category === categ)
                        tmp_pendingItems.push($scope.pendingItemsOrig[i]);
                }
                $scope.pendingItems = tmp_pendingItems;
            }
            $scope.searchPendingReset = function () {
                $scope.pendingItems = $scope.pendingItemsOrig;

            }


            $scope.searchApproved = function (categ) {
                $scope.approvedItems = $scope.approvedItemsOrig;
                var tmp_approvedItems = [];
                for (var i = 0; i < $scope.approvedItemsOrig.length; i++) {
                    if ($scope.approvedItemsOrig[i].category === categ)
                        tmp_approvedItems.push($scope.approvedItemsOrig[i]);
                }
                $scope.approvedItems = tmp_approvedItems;
            }
            $scope.searchResetApproved = function () {
                $scope.approvedItems = $scope.approvedItemsOrig;
            };


            $scope.approve = function (index) {
                $scope.pendingItemsOrig[index].approve=true;
                $scope.pendingItemsOrig[index].collapsed=true;
                var approvalObj={
                    orgName:$scope.loginData.orgName,
                    payBackDuration:$scope.approved.duration,
                    paybackTenure:$scope.approved.payback,
                    rateOfInterest:$scope.approved.roi,
                    tradeRequest: $scope.pendingItemsOrig[index]
                    
                };
                $scope.approvedList.push(approvalObj);
                superCache.put('myKey', $scope.approvedList);
                
               
                $scope.approvedItemsOrig.push($scope.pendingItemsOrig[index]);
                $scope.pendingItemsOrig.splice(index, 1);
                $scope.approvedItems = $scope.approvedItemsOrig;
                $scope.pendingItems=$scope.pendingItemsOrig;
                
                
                $scope.closeApprove();
                               
            };


         
            
            $ionicModal.fromTemplateUrl('templates/lender-approve.html', {
                scope: $scope
            }).then(function (modal) {
                        $scope.approvemodal = modal;                    
                    });
            // Open the approve modal
            $scope.showApprove = function (index) {
                $scope.approveData = {};
                $scope.meta.index=index;
               
                if ($scope.approvemodal != undefined) {
                    $scope.approvemodal.backdropClickToClose = false;
                    $scope.approvemodal.hardwareBackButtonClose = false;
                    $scope.approvemodal.show();
                }
            };
            $scope.closeApprove = function () {
                $scope.approvemodal.hide();
            };

            $scope.requestTrade = function () {
                if ($scope.tradeRequest.loanAmount != undefined && $scope.tradeRequest.period != undefined &&
                        $scope.tradeRequest.loanType !== undefined && $scope.tradeRequest.duration != undefined) {

                    var auth = btoa($scope.loginData.phoneNumber + ":" + $scope.loginData.password);
                    var body = {
                        loanAmount: $scope.tradeRequest.loanAmount,
                        tenure: $scope.tradeRequest.period,
                        loanType: $scope.tradeRequest.loanType,
                        mobileNumber: $scope.loginData.phoneNumber
                    }

                       var theUrl = "http://192.168.43.202:8080/customer/requestLoan";
                   // var theUrl = "http://localhost:8080/customer/requestLoan";

                    var req = {
                        method: 'POST',
                        url: theUrl,
                        headers: {
                            'Authorization': "Basic " + auth
                        },
                        data: body
                    };


                    $http(req)
                            .then(getrequestTradeComplete, getrequestTradeFailed);

                    function getrequestTradeComplete(response) {
                        console.log('ufbeiwfie successs huwaa');

                        $scope.tradeRequestMsg = "Trade Request Successful!";
                        $scope.tradeRequest_result = true;
                        showToast("You have registered successfully! Please log in and link AA to place loan requests");

                        //$scope.closeLogin();
                    }
                    ;
                    function getrequestTradeFailed(response) {
                        console.log("got an error in initial processing");
                        if (response.status === 409) {
                            $scope.tradeRequestMsg = "Trade Already Exists.";
                        } else {
                            $scope.tradeRequestMsg = "Exception In placing trade request: " + response.status + "-" + response.data.toString();
                        }
                        $scope.tradeRequest_result = false;
                    }
                    ;
                } else {
                    $scope.tradeRequestMsg = "All fields are mandatory fields.";
                    $scope.tradeRequest_result = false;
                }
            };


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
