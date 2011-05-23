var lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis risus a urna feugiat mollis in vel elit. Vivamus nibh ipsum, ultrices in tristique vitae, bibendum id orci. Praesent mollis mollis auctor. Nam sapien purus, placerat in aliquam lacinia, scelerisque at diam. Morbi nec enim non metus porttitor adipiscing nec nec urna. Nunc malesuada lectus dui, eget convallis diam. Nulla hendrerit imperdiet magna nec feugiat. Quisque malesuada vehicula facilisis. Morbi nibh erat, vehicula eget pulvinar non, aliquam vel magna. Donec faucibus viverra urna, ac mollis risus tempor ut. Praesent erat quam, gravida at tristique a, tempus vel leo. Nulla neque elit, ultrices pretium varius ut, egestas vel arcu. Vivamus eros ligula, rhoncus in interdum sit amet, mattis at urna. Duis at risus metus, vel varius ligula. Pellentesque non risus nec urna eleifend mollis ac at eros. Nunc pellentesque lobortis nisi id varius. ";
lorem_ipsum += lorem_ipsum + lorem_ipsum;

var sample_list = "";
for (var i=0; i<6; i++) {
  sample_list += "<li>Item "+i+"</li>";
}

var LayoutModel = Backbone.Model.extend({
});

var layouts = {
    'simple': _.template([
      "<header><h1></h1></header>",
      "<section>",
        "<div class='column'>",
          "<p></p>",
        "</div>",
      "</section>",
      "<footer><p></p></footer>"
    ].join('')),
 
    'two_column': _.template([
      "<header><h1></h1></header>",
      "<section>",
        "<div class='column'>",
          "<p></p>",
        "</div>",
        "<div class='column'>",
          "<p></p>",
        "</div>",
      "</section>",
      "<footer><p></p></footer>"
    ].join('')),   
 
    'three_column': _.template([
      "<header><h1></h1></header>",
      "<section>",
        "<div class='column'>",
          "<p></p>",
        "</div>",
        "<div class='column'>",
          "<p></p>",
        "</div>",
        "<div class='column'>",
          "<p></p>",
        "</div>",
      "</section>",
      "<footer><p></p></footer>"
    ].join('')),   

    'menu_left': _.template([
      "<header><h1></h1></header>",
      "<section>",
        "<div class='column'>",
          "<h3></h3>",
          "<ul></ul>",
        "</div>",
        "<div class='column'>",
          "<h2></h2>",
          "<p></p>",
        "</div>",
      "</section>",
      "<footer><p></p></footer>"
    ].join('')),  
  
    'menu_right': _.template([
      "<header><h1></h1></header>",
      "<section>",
        "<div class='column'>",
          "<p></p>",
        "</div>",
        "<div class='column'>",
          "<h3></h3>",
          "<ul></ul>",
        "</div>",
      "</section>",
      "<footer><p></p></footer>"
    ].join('')),     
  }

var LayoutView = Backbone.View.extend({
  initialize: function(layout){    
    this.layout = layout;

    if (!this.layout)
      this.layout = 'simple';

    $(this.el).addClass(this.layout);
  },

  render: function(){
    $(this.el).html(layouts[this.layout]);
    this.fillContent();
    
    return this.el;
  },

  fillContent: function(){
    $(this.el).find('p').html(lorem_ipsum);
    $(this.el).find('ul').html(sample_list);
    $(this.el).find('h1').html("Sample Header H1");
    $(this.el).find('h2').html("Sample Header H2");
    $(this.el).find('h3').html("Sample Header H3");
  }
});

var AppView = Backbone.View.extend({
  el: $("#font-preview"),

  template: _.template([
    "<div class='panel'><div class='layout masked select_layout'></div></div>",
    "<div class='layout'></div>"
  ].join('')),
  
  initialize: function(){
    var self = this;
    $(this.el).html(this.template());
    
    this.renderLayout();

    var percent = 100*150.0/this.$('>.layout').width();

    _.each(layouts, function(value, key){
      var layout = new LayoutView(key).render();      
      this.$('.panel .select_layout').append(layout)
        .css({ 'font-size': percent+'%' });

      $(layout).bind('click', function(){
        self.renderLayout(this.className);
      });     

    });
  },

  renderLayout: function(layout){
    var el = new LayoutView(layout).render();
    this.$('>.layout').html(el);
  }
});

new AppView();
