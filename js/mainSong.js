var randomID = 0

var Song = Backbone.Model.extend({
  defaults: {
    genre: "Jazz",
    title: "no title yet",
    listeners: 0
  },
  initialize: function () {
    // console.log(this);
    // console.log(`A new song, ${this.toJSON().title}, has been created`);
    // console.log(`A new song, ${this.attributes.title}, has been created`)
  
  },
  // use song.isValid() to return the validation boolean
  //use song.validationError to get the errors
  validate: function (attrs) {
    if (!attrs.title) {
      return "Title is required";
    }
    if (!attrs.id) {
      return "ID is required"
    }
  },
});

// var song = new Song();

//COLLECTIONS////
var Songs = Backbone.Collection.extend({
  model: Song,
  url: "api/songs",
});



//results in array
// var indieSongs = songs.where({ genre: "Indie" }); //results in array
// var jazzSongs = songs.where({ genre: "Jazz" });
// var indieSongs = songs.findWhere({ genre: "Indie" }); //finds first index

// var topSongs = songs.filter((song) => {
//   return song.get("title").includes("song");
// });

// song.set("title", "Blue in Green");
// song.set({ artist: "Mosh", title: "Farting", publishYear: 1969 });

var SongView = Backbone.View.extend({
  tagName: "li",
  className: "song",
  attributes: {
    "data-genre": "Jazz",
  },

  events: {
    "click .listen": "onClickListen",
    "click .bookmark": "onClickBookmark",
  },

  initialize: function () {
    //backbone models raise a 'change' event whenever the model is changed
    this.model.on("change", this.render, this);
    this.template = _.template($('#songTemplate').html())
  },

  onClickListen: function () {
    this.model.set("listeners", this.model.toJSON().listeners + 1);
  },

  onClickBookmark: function (e) {
    // event below will stop the other function from being called
    e.stopPropagation();
    console.log("Bookmark Clicked");
  },

  render: function () {
    //WITHOUT A TEMPLATE//////
    // this.$el.html(
    //   this.model.get("title") +
    //   " <button class='listen'>Listen</button> <button class= 'bookmark' > Bookmark</button > <p style='display: inline-block;'> Listeners: "
    //   + this.model.get("listeners")
    // );
    // this.$el.attr("id", this.model.id)

    //WITH A TEMPLATE//
    // var template = _.template($("#songTemplate").html());
    // var html = template(this.model.toJSON());
    // this.$el.html(html)
    this.$el.html(this.template(this.model.toJSON()));
      return this;
      },  
});

var SongsView = Backbone.View.extend({
  tagName: "ul",
  //listen to events published by the collection
  initialize: function () {
    this.model.on("add", this.onSongAdded, this),
    this.model.on("remove", this.onSongRemoved, this);
  },

  onSongAdded: function (song) {
    var songView = new SongView({ model: song });
    this.$el.append(songView.render().$el);
  },
  onSongRemoved: function (song) {
    this.$el.find("li#" + song.id).remove();
  },

  render: function () {
    let self = this;
    console.log(this);
    this.model.each(function (song) {
      var songView = new SongView({ model: song });
      console.log('validate', song.isValid());
      console.log(songView);
      self.$el.append(songView.render().$el);
    });
    return this;
  },
});
//telling code that the element is #container
// var songView = new SongView({el: "#container"})

var songs = new Songs([]);

// songs.fetch();  calls a fetch after the collection has been instantiated
songs.add(new Song({ title: "Balls", id: 1, plays: 10 }));
songs.add(new Song({ title: "Shaft", id: 2 , plays: 1001}));
// can also use 'push' to add to the end, but cannot specify
songs.add(new Song({title: "'N", genre: "Indie", downloads: 100, id: 3, plays: 1100}), {at: 1});
var songsView = new SongsView({ el: "#songs", model: songs })


songsView.render();

// $('#container').html(songView.render().$el) //chaining events here with .render().  .render() returns a the instance of the View


