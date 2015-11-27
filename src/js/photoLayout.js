// vanilla JS
var grid = document.querySelector('.photo-layout');
imagesLoaded(grid, function(){
  var m = new Masonry( grid, {
    // options...
    itemSelector: '.photo'
  });
});
