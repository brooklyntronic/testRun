angular.module("directives/mediaPlayer/pureHtml5Player.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/mediaPlayer/pureHtml5Player.tpl.html",
    "<div class=\"pureHTML5Player\">\n" +
    "   <video autoplay>\n" +
    "     <source type=\"video/mp4\" ng-src=\"{{trustSrc(videoConfig.playlist[0], '.mp4')}}\">\n" +
    "     <source type=\"video/ogg\" ng-src=\"{{trustSrc(videoConfig.playlist[0], '.ogv')}}\">\n" +
    "   </video>\n" +
    "</div>");
}]);
