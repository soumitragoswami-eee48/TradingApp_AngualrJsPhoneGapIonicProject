var app = angular.module('conference', ['ionic', 'conference.AppCtrl', 'conference.HomeCtrl',
    'conference.CategoriesCtrl', 'conference.ProfileCtrl', 'conference.AcceptedProposalController'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // *** Do specific plugin related things here now on platform ready
                console.log("Platform ready");

                // Override the default HTML alert with native dialog - requires the cordova dialogs plugin
                if (navigator.notification) {
                    window.alert = function (message) {
                        navigator.notification.alert(
                                message, // message
                                null, // callback
                                "Urjanet Trading Platform", // title
                                'OK'        // buttonName
                                );
                    };
                }

                // In Ionic the accessory bar is hidden by default. Do not hide the keyboard accessory bar for this app
                // so the drop-down form input can be used properly.
//            if(window.cordova && window.cordova.plugins.Keyboard) {
//                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
//            }
                if (window.cordova && window.Keyboard) {
                    window.Keyboard.hideKeyboardAccessoryBar(true);
                }

                if (window.StatusBar) {
                    StatusBar.styleLightContent(); //status bar will have white text and icons
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                    .state('app.profile', {
                        url: "/profile",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/profile.html",
                                controller: "ProfileCtrl"
                            }
                        }
                    })


                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
                    })

                    .state('app.search', {
                        url: "/search",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/search.html"
                            }
                        }
                    })

                    .state('app.categories', {
                        url: "/categories",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/categories.html",
                                controller: "CategoriesCtrl"
                            }
                        }
                    })

                    .state('app.home', {
                        url: "/home",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/home.html",
                                controller: 'HomeCtrl'
                            }
                        }
                    })

                    .state('app.twitter', {
                        url: "/twitter",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/twitter.html",
                                controller: 'TwitterController'
                            }
                        }
                    })
                    .state('app.accepted-proposals', {
                        url: "/accepted-proposals",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/accepted-proposals.html",
                                controller: 'AcceptedProposalController'
                            }
                        }
                    })

                    .state('app.session', {
                        url: "/sessions/:sessionId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/session.html",
                                controller: 'SessionCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
        }).factory('superCache', ['$cacheFactory', function ($cacheFactory) {
        return $cacheFactory('super-cache');
    }]).filter('customerId', function() {
    return function(input) {
        var out = [];
        for (var i = 0; i < input.length; i++) {
            if(input[i].tradeRequest.customerId == 8787876781){
                out.push(input[i]);
            }
        }
        return out;
    }
});;

