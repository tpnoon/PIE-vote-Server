angular.module('app.controllers', [])
  
.controller('manageEventCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	$scope.teamNumber = 1;
	$scope.teamList = [];


	var count = 1;

	$scope.submit = function () {
		var time = document.getElementById("time").value;



		var eventName = document.getElementById("eventName").value;



		var eventDesc = document.getElementById("eventDesc").value;

		for (var i = $scope.teamList.length - 1; i >= 0; i--) {
			microgear.chat("client","team|"+$scope.teamList[i]);
		}
		microgear.chat("client","team|end");

		
        console.log(eventName+ " " + eventDesc + " " + time);
    };

    $scope.addTeam = function () {
    	var teamName = document.getElementById("teamName").value;

    	$scope.teamList.push(count +" "+ teamName);
    	$scope.teamNumber++;
        console.log(teamName);
        count++;
    };

}])
   
.controller('resultCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams) {

	$scope.users = [];

	$scope.updateGraph = function(totalVotes, users) {
		var data = [];
		$scope.users = users;
		for (var team in totalVotes) {
			data.push(["ทีม "+team, totalVotes[team]]);
		};

		// var data = [ ["ทีมที่ 1", 10], ["ทีมที่ 2", 8], ["ทีมที่ 3", 4], ["ทีมที่ 4", 13], ["ทีมที่ 5", 17], ["ทีมที่ 6", 9], ["ทีมที่ 7", 9] ];

		$.plot("#placeholder", [ data ], {
			series: {
				bars: {
					show: true,
					barWidth: 0.6,
					align: "center"
				}
			},
			xaxis: {
				mode: "categories",
				tickLength: 0
			}
		});

		// Add the Flot version string to the footer

		$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
	};

	$scope.random = function(){
		alert($scope.users[Math.floor(Math.random()*$scope.users.length)]);
	}

}])
    