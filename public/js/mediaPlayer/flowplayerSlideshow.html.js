angular.module("directives/mediaPlayer/flowplayerSlideshow.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/mediaPlayer/flowplayerSlideshow.tpl.html",
    "<div id=\"dots\" class=\"player\">\n" +
    "   <video preload=\"auto\">\n" +
    "     <source type=\"video/mp4\" ng-src=\"{{trustSrc(videoConfig.playlist[0], '.mp4')}}\">\n" +
    "     <source type=\"video/ogg\" ng-src=\"{{trustSrc(videoConfig.playlist[0], '.ogv')}}\">\n" +
    "   </video>\n" +
    "\n" +
    "   <div class=\"fp-playlist\">\n" +
    "      <a ng-repeat=\"video in videoConfig.playlist\" href=\"{{video}}.mp4\" id=\"dot{{$index}}\"></a>\n" +
    "   </div>\n" +
    "\n" +
    "</div>");
}]);
