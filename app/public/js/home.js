var myApp = angular.module('myApp', []);



myApp.controller('MainCtrl', function($scope,$rootScope) {
    $scope.faqs = [];
    $scope.displayfaq = function () {
        var dataStr = document.getElementById('faqdata').value;
        var dataArr = [];
        dataArr = JSON.parse(dataStr);
        $scope.faqs = dataArr;
        getConfirmation();
    };

    function getConfirmation() {

        if (document.getElementById('delval').value) {
            alert(document.getElementById('delval').value + "   Deleted");
            return true;
        }
    }
});
