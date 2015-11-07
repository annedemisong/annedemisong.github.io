var Photograph = React.createClass({
  displayName: 'Photograph',
  render: function() {
    return (
      <div class="photograph">
        <img src="{this.props.imgSrc}">
      </div>
    );
  }
});

module.exports = Photograph;
