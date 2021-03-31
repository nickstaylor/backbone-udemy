var Animal = Backbone.Model.extend({
  walk: function () {
    console.log("I'm an animal walking");
  },
});

var Dog = Animal.extend({
  walk: function () {
    //this will override the walk here for the parent class walk
    Animal.prototype.walk.apply(this);
    console.log("dog Walking...");
  },
});

var dog = new Dog();
dog.walk();
