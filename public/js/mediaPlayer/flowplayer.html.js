angular.module("directives/mediaPlayer/flowplayer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/mediaPlayer/flowplayer.tpl.html",
    "<div class=\"flowplayer\">\n" +
    "   <video>\n" +
    "      <source type=\"video/mp4\" src=\"http://stream.flowplayer.org/download/640x240.mp4\">\n" +
    "      <source type=\"video/webm\" src=\"http://stream.flowplayer.org/download/640x240.webm\">\n" +
    "      <source type=\"video/ogg\" src=\"http://stream.flowplayer.org/download/640x240.ogv\">\n" +
    "   </video>\n" +
    "   \n" +
    "   <div class=\"fp-playlist\">\n" +
    "      <a class=\"is-advert\" href=\"http://stream.flowplayer.org/download/640x240.mp4\"></a>\n" +
    "      <a ng-repeat=\"video in videoConfig.playlist\" href=\"{{video}}.mp4\">Video {{$index + 1}}</a>\n" +
    "   </div>\n" +
    "   \n" +
    "   <div class=\"preroll-cover\">pre-roll</div>\n" +
    "</div>");
}]);
