
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({
    validate: function(attrs){
        if (!attrs.registrationNumber)
            return "Registration number is required."
    },
    start: function(){
        console.log("Vehicle started.");
    }
});

var Vehicles = Backbone.Collection.extend({
    model: Vehicle
});

var VehicleView = Backbone.View.extend({
    tagName: "li",
    className: "vehicle",

    events: {
        "click .deleteVehicle": "onDeleteVehicle"
    },

    initialize: function(){
        this.model.on("remove", this.onDeleteVehicle, this);
    },

    onDeleteVehicle: function(vehicle){
        var id = this.$el.attr("id");
        hondas.remove(hondas.get({id: id}));
        this.$el.remove();
    },

    render: function(){
        this.$el.html(this.model.get("vehicleModel") + " " + this.model.get("registrationNumber") + " <button class='deleteVehicle'>Delete</button>");
        this.$el.attr("id", this.model.id);

        return this;
    }
});

var VehiclesView = Backbone.View.extend({
    tagName: "ul",

    initialize: function(){
        this.model.on("add", this.onAddVehicle, this);
    },

    onAddVehicle: function(vehicle){
        var vehicleView = new VehicleView({ model: vehicle });

        this.$el.append(vehicleView.render().$el);
    },

    render: function(){
        var self = this;

        this.model.each(function(vehicle){
            var vehicleView = new VehicleView({ model: vehicle });
            self.$el.append(vehicleView.render().$el);
        });
    }
});

var hondas = new Vehicles([
    new Vehicle({ id: 1, vehicleMake: "Honda", vehicleModel: "Accord", registrationNumber: "XLI887", color: "Blue"}),
    new Vehicle({ id: 2, vehicleMake: "Honda", vehicleModel: "Civic", registrationNumber: "ZNP123", color: "Blue"}),
    new Vehicle({ id: 3, vehicleMake: "Honda", vehicleModel: "CRV", registrationNumber: "XUV456", color: "Gray"})
]);

var vehiclesView = new VehiclesView({ el: "#vehicleTemplate", model: hondas });
vehiclesView.render();




