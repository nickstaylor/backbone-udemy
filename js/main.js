
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({
    urlRoot: "/api/vehicles",
    validate: function(attrs){
        if (!attrs.registrationNumber)
            return "Registration number is required."
    },
    start: function(){
        console.log("Vehicle started.");
    }
});

var Car = Vehicle.extend({
    start: function(){
        console.log("Car with registration number " + this.get("registrationNumber") + " started");
    }
});

var honda = new Car({registrationNumber: "XLI887", color: "Blue"});

if (!honda.isValid()){
    console.log("Your car needs to be registered.");
} else {
    console.log("Your car is registered.");
}

