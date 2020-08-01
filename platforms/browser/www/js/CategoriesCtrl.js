angular.module('conference.CategoriesCtrl', [])
        .controller('CategoriesCtrl', function ($scope, $ionicLoading) {
            $scope.showDelete = false;

            $scope.categories = [];
            $scope.category1 = {
                filter_name: 'Category1',
                loan_amount_min: '10,00,000 INR',
                salary_min: '80,000 INR',
                average_monthly_balance_min: '25,000 INR',
                successive_salary_credits_count: 6,
                emi_or_check_bounces_count: 1,
                  isEdit:false,
                collapsed:false
            };
            $scope.category2 = {
                filter_name: 'Category2',
                loan_amount_min: '2,00,000 INR',
                salary_min: '50,000 INR',
                average_monthly_balance_min: '10,000 INR',
                successive_salary_credits_count: 4,
                emi_or_check_bounces_count: 1,
                  isEdit:false,
                collapsed:false
            };
            $scope.category3 = {
                filter_name: 'Category3',
                loan_amount_min: '50,000 INR',
                salary_min: '10,000 INR',
                average_monthly_balance_min: '2,000 INR',
                successive_salary_credits_count: 2,
                emi_or_check_bounces_count: 1,
                collapsed:false,
                  isEdit:false,
            };

            $scope.categories.push($scope.category1);
            $scope.categories.push($scope.category2);
            $scope.categories.push($scope.category3);



            $scope.showBtn = function () {
                if ($scope.showDelete === false)
                    $scope.showDelete = true
                else
                    ($scope.showDelete = false)
            }



            function showToast(message) {
                if (window.plugins && window.plugins.toast) {
                    window.plugins.toast.showShortCenter(message);
                } else
                    $ionicLoading.show({template: message, noBackdrop: true, duration: 2000});
            }
        })
