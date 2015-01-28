
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

var Vehicles = Backbone.Collection.extend({
    model: Vehicle
});

var hondas = new Vehicles([
    new Vehicle({ registrationNumber: "XLI887", color: "Blue"}),
    new Vehicle({ registrationNumber: "ZNP123", color: "Blue"}),
    new Vehicle({ registrationNumber: "XUV456", color: "Gray"})
]);

var blueHondas = hondas.where({ color: "Blue"});

var myHonda = hondas.where({ registrationNumber: "XLI887"});

console.log("Blue Hondas", blueHondas);

console.log("My Honda", myHonda);

console.log(hondas);

hondas.remove(myHonda);

hondas.each(function(honda){
    console.log(honda);
});



