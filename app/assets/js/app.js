var WorkoutTracker = new Marionette.Application();

WorkoutTracker.addRegions({
	mainRegion: "#main-region"
});

WorkoutTracker.navigate = function(route,  options){
	options || (options = {});
	Backbone.history.navigate(route, options);
};

WorkoutTracker.getCurrentRoute = function(){
	return Backbone.history.fragment
};

WorkoutTracker.on("start", function(){
	if(Backbone.history){
		Backbone.history.start();

		if(this.getCurrentRoute() === ""){
			//Trigger default route.
		}
	}
});