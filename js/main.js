function MainCtrl($scope){
	io.configure(function () { 
	  io.set("transports", ["xhr-polling"]); 
	  io.set("polling duration", 10); 
	});
	$scope.socket=io.connect()//Used for transferring information efficiently
	$scope.location=location//The current url
	$scope.responded=true//Whether or not the person has responded, assume they have until otherwise
	$scope.respond=function(){//Sends the data off to the server
		this.responded=true
		this.socket.emit('responding',this.response)//Send your response to the server
	}
	$scope.socket.on('reply',function(entry){//When the server replies with the assignment entry in the db
		$scope.$apply(function(){
			if(entry===false){//No such assignment. Sorry.
				$scope.responded=false
				$scope.response=''
				//$scope.location.hash=''
			}
			else{
				$scope.location.hash=entry._id
				$scope.response=entry.response
			}
		})
	})
	//Check to see if they are getting a previous one by hash
	$scope.init=function(){
		if($scope.location.hash.length){
			$scope.responded=true
			$scope.socket.emit('init',$scope.location.hash.slice(1))
		}
		else{
			$scope.responded=false
		}
	}
	$scope.init()
	window.addEventListener('hashchange',$scope.init)
}
