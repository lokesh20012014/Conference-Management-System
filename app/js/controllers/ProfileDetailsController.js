/**
 * Created by Lokesh on 08-06-2016.
 */
angular.module('cms')
  .controller('ProfileDetailsController', function($stateParams,$scope, $http, $timeout,$window){

    $scope.user=$stateParams.user;

    $scope.loadProfileDetails= function () {
      var req = {
        method: 'get',
        url: "/api/user/user-details",
        params: {username: $window.localStorage.username}
      };
      $http(req).then(function (result) {
        $scope.user = result.data;
      },function (error) {
        console.error('Error: ' + error);
      })
    };

    $scope.update = function (profile) {
      delete profile._id;
      var req = {
        method:'post',
        url:"/api/user/user-details",
        data: profile
      };
      $http(req).then(function (result) {
        console.log(result);
        $scope.success=true;
        $timeout(function () { $scope.success = false; }, 2000);
      }, function(error){
        console.error('Error: '+ error);
      })
    };

  })

  .controller('DialogCtrl', function($scope, $mdDialog) {

    $scope.showTabDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'tabDialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
        .then(function(change) {
          console.log('Dialog confirmed');
        }, function() {
          console.log('Dialog closed');
        });
    };
  });

function DialogController($scope, $mdDialog, md5, $http, $timeout) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(password) {

    //$mdDialog.hide(answer);
  };

  $scope.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Success!')
        .textContent('Your password has been changed!')
        .ok('OK')
    );
  };

  $scope.change = function(password){
    $scope.changePass.pass1=md5.createHash($scope.changePass.pass1);
    $scope.changePass.pass2=md5.createHash($scope.changePass.pass2);
    $scope.changePass.pass3=md5.createHash($scope.changePass.pass3);

    var req1 = {
      method:'post',
      url:"api/user/privacy",
      data: password
    };
    console.log(password);
    $http(req1).then(function (result){
      console.log(result);
      $scope.showAlert();
      $mdDialog.hide();
    }, function(error){
      console.error('Error: '+error);
    })
  };
}