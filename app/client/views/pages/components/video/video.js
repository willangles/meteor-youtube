if (Meteor.isClient) {
  Template.video.helpers({
    videoId: function() {
      var dbId = Session.get("currentId");
      var data = TmpSearch._collection.findOne(dbId);
      return data.id.videoId;
    }
  })
  Template.video.events({
    'click .blkblnkt' : function(event) {
        event.preventDefault();
        var view = event.target;
        var queryString = view.remove({});
        console.log('clicked blkblnkt');
        return false;
    },
    'click .close-container' : function(event, t) {
      event.preventDefault();
      var view = event.target.parentNode;
      var queryString = view.remove();
      return false;
    }
  });

  Template.video.rendered = function() {
    if(!this._rendered) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
      
      Meteor.setTimeout(function(){
        console.log('timeout');
        Template.video.onYouTubeIframeAPIReady();
      }, 500);
    }
  }

  Template.video.onYouTubeIframeAPIReady = function() {
    var view = this;
    var videoId = $('#player').data('videoid');
    console.log('player ready');
    view.player = new YT.Player('player', {
      // autoplay: 0,
      height: '390',
      width: '640',
      videoId: videoId,
      events: {
        'onReady' : view.onPlayerReady
      }
    });
  }

  Template.video.onPlayerReady = function(event) {
    //event.target.playVideo();
  }

}