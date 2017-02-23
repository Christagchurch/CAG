var CagApp = angular.module("CagApp", ['ngRoute']);

CagApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                    when('/Home', {
                        templateUrl: 'Views/Home.html',
                        controller: 'HomeController'
                    }).
                    when('/Events', {
                        templateUrl: 'Views/Events.html',
                        controller: 'EventsController'
                    }).
                    when('/Services', {
                        templateUrl: 'Views/Services.html',
                        controller: 'ServicesController',
                    }).
                    when('/Ministries', {
                        templateUrl: 'Views/Ministries.html',
                        controller: 'MinistriesController'
                    }).
                 
                    when('/Contact', {
                        templateUrl: 'Views/Contact.html',
                        controller: 'ContactController'
                    }).
                    when('/Leadership', {
                        templateUrl: 'Views/Leadership.html',
                        controller: 'LeadershipController'
                    }).
                    when('/Register', {
                        templateUrl: 'Views/Register.html',
                        controller: 'RegisterController'
                       
                    }).
                    when('/Login', {
                        templateUrl: 'Views/Login.html',
                        controller: 'LoginController'
                    }).
                    when('/createEvent', {
                        templateUrl: 'Views/Create-event.html',
                        controller: 'CreateEventController'
                    }).
                     when('/sampleTest', {
                         templateUrl: 'Views/sampleTest.html',
                         controller: 'CreateEventController'
                     }).

        otherwise({
            redirectTo: '/Home'
        });
    }]);


CagApp.controller("HomeController", function ($scope) {
    $scope.message = "In Home View";

    $('.carousel').carousel(
     {
         interval : 2000

     });

    $('.carousel-control').click(function (e) {
        e.preventDefault();
        $('#myCarousel').carousel($(this).data());
    });


});

CagApp.controller("EventsController", function ($scope, $http, $filter, ApiCall) {
        $scope.message = "In Events View";
        var localEvents;
        var result = ApiCall.GetEvents().success(function (data) {
            var eventsData = (data);
            convertDateStringsToDates(eventsData);
            $scope.events = eventsData;
        });

        function convertDateStringsToDates(events) {
            for (var eachEvent in events) {
                var startDt = events[eachEvent].StartDate;
                var endDt = events[eachEvent].EndDate;
                events[eachEvent].StartDate = new Date(startDt);
                events[eachEvent].EndDate = new Date(endDt);
            }
        }
});



    CagApp.controller("ServicesController", function ($scope) {
        $scope.message = "In Services View";

    });

    CagApp.controller("MinistriesController", function ($scope) {
        $scope.message = "In Ministries View";
    });

   

    CagApp.controller("ContactController", function ($scope) {
        $scope.message = "In Contact View";
    });

    CagApp.controller("LeadershipController", function ($scope) {
        $scope.message = "In Leadership View";

      

    });

    CagApp.controller("RegisterController", function ($scope,ApiCall) {
        $scope.message = "In Register View";
              // create angular controller
            $scope.phoneNumberPattern = /\d{3}[- ]?\d{3}[- ]?\d{4}$/;
            $scope.birthDatePattern = /\d{2}[/ -]?\d{2}[/ -]?\d{4}$/;
            $scope.emailPattern = /\d{1-25}[@ ]?\d{5-10}[. ]?\d{3}$/;
            $scope.user = 
            {
                firstName : "",
                lastName : "",     
                birthDate : "",
                userGender : "",
                email : "",
                password : "",
                confirmPassword : "",
                contactNumber : ""
            };

            // function to submit the form after all validation has occurred            
            $scope.submitForm = function() {
                // $scope.ram = angular.copy($scope.user);

                // check to make sure the form is completely valid
                if ($scope.userForm.$valid) {
                    alert('Thank-you for registering! /n now you can login into your account');
                    ApiCall.RegisterUser($scope.user)
                 
                }

            };
            //$scope.submitForm();

        });

      
 
    

    CagApp.controller("LoginController", function ($scope, AuthenticationService) {
        $scope.message = "In Login View";
           $scope.user = 
            {
                email : "",
                password : ""
       
            };

            // function to submit the form after all validation has occurred            
            $scope.submitForm = function() {
                //   $scope.ram = angular.copy($scope.user);

                // check to make sure the form is completely valid
                if ($scope.userForm.$valid) {
                    // alert('Thank-you for registering!');
                    alert('welcome to your page');
                    AuthenticationService.Login($scope.user.email, $scope.user.password, function (result) {
                        if (result === true) {
                            $location.path('/');
                        } else {
                            $scope.userForm.error= 'Username or password is incorrect';
                        }
                    });
                }

            };
            //$scope.submitForm();

    });

    CagApp.controller("forgotpwdController", function ($scope) {
        $scope.message = "hooray i forgot password";
    });


    CagApp.controller("CreateEventController", function ($scope,$http, $filter,ApiCall) {
        $scope.message = "In Crea Event View";
        $scope.StartTime = {
            hours: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],  
            minutes: ["00", "15", "30", "45"],
            meridian: ["AM", "PM"]
        };

        $scope.EndTime = {
            hours: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], 
            minutes: ["00", "15", "30", "45"],
            meridian: ["AM", "PM"]
        };

        $scope.currentDate = new Date();

        $scope.user = {
            Id: 0,
            Title: "",
            StartDate: "",
            EndDate: "",
            StartTime: {
                hours: "10",
                minutes: "",
                meridian: ""
            },
            EndTime: {
                hours: "",
                minutes: "",
                meridian: ""
            },
            Image: "",
            Location: "",
            Description: "",
            AdditionalTopic1: "",
            AdditionalDescription1: "",
            AdditionalTopic2: "",
            AdditionalDescription2: "",
            ShowBothDates : false
        };

        // function to submit the form after all validation has occurred
        $scope.submitForm = function () {
            //$scope.ram = angular.copy($scope.user);

            //CreateEvent

            // check to make sure the form is completely valid
            if ($scope.createEvent.$valid) {
                alert('Thank-you for creating event');
                $scope.user.StartDate = $filter('date')($scope.user.StartDate, "MM/dd/yyyy");
                $scope.user.EndDate = $filter('date')($scope.user.EndDate, "MM/dd/yyyy");
                var result = ApiCall.CreateEvent($scope.user).success(function (data) {
                    var newEvent = (data);
                    alert(newEvent);
                    $scope.user = {};
                });

            }

        };
    });
  
    
   
    CagApp.service('ApiCall', ['$http', '$filter', function ($http) {
        var result; 
        alert('inside the service')

        this.GetEvents = function () {
            //            alert(methodName);
            result = $http.get("http://localhost:54750/cagApi/events").success(function (data,status) {
                alert('webapi call success');
                result = (data);
               // alert(result);
            }).error(function(){
                alert('webapi call failed')
            });
         return result;
        };
        
        this.CreateEvent = function (createdEvent) {
            
            createdEvent.StartTime = createdEvent.StartTime.hours + ":" + createdEvent.StartTime.minutes + " " + createdEvent.StartTime.meridian;
            createdEvent.EndTime = createdEvent.EndTime.hours + ":" + createdEvent.EndTime.minutes + " " + createdEvent.EndTime.meridian;
            $http({
                url: 'http://localhost:54750/cagApi/createEvent',
                method: 'GET',
                params: { newEvent: angular.toJson(createdEvent, false) }
            })
            .success(function (returnData) {
                    alert('webapi call success: return value is: ' + returnData);
                    result = (returnData);
                }).error(function () {
                    alert('webapi call failed');
                });
            
            return result;
        };


        this.RegisterUser = function (newUser) {
            
            $http({
                url: 'http://localhost:54750/cagApi/registerUser',
                method: 'GET',
                params: { newEvent: angular.toJson(newUser, false) }
            })
            .success(function (returnData) {
                alert('webapi call to register user is  successful: return value is: ' + returnData);
                result = (returnData);
            }).error(function () {
                alert('webapi call to register user failed');
            });
            
            return result;
        };
    }]);

    //app.filter('startFrom', function () {
    //    return function (input, start) {
    //        start = +start; //parse to int
    //        return input.slice(start);
    //    }
//});

 

