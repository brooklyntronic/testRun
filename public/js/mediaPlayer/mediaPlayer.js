angular.module('AngularBlackBelt.mediaPlayer', ['directives/mediaPlayer/flowplayer.tpl.html','directives/mediaPlayer/flowplayerSlideshow.tpl.html', 'directives/mediaPlayer/pureHtml5Player.tpl.html'])
.directive('bbMediaPlayer', ['$sce', '$compile', '$templateCache', '$timeout', function($sce, $compile, $templateCache, $timeout) {
    return {
        restrict: 'A',
        scope: {
            videoConfig: '='
        },
        compile: function(tElem,tAttrs){

            if (!tAttrs.templateUrl){
                 throw new Error('Must Give bb-media-player a templateUrl to look for.');
            }
            
            return function(scope, element, attrs) {
                
                if (typeof scope.videoConfig !== 'object'){
                     throw new Error('videoConfig must be an object');
                }

                var newElement,
                    mediaPlayer;

                function getConfigurations(){
                    scope.videoConfig.templateUrl = attrs.templateUrl;
                    return scope.videoConfig;
                }

                scope.trustSrc = function(filePath,ext) {
                    return $sce.trustAsResourceUrl(filePath + ext);
                };
                
                function init(){
                    newElement = $compile($templateCache.get(attrs.templateUrl).trim())(scope);
                    element.html('').append(newElement);
                    $timeout(function(){
                      if(attrs.mediaType && attrs.mediaType !== ''){
                        mediaPlayer = newElement[attrs.mediaType](scope.videoConfig.options);
                      }
                    });
                }

                scope.$watch(getConfigurations, function(newV,oldV) {
                    init();
                },true);

                scope.$on('$destroy', function(node){
                  if(mediaPlayer.remove){
                    mediaPlayer.remove();
                  }
                  mediaPlayer = null;
                  element.html('');
                });

            };
        }
    };
}]);
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
angular.module("directives/mediaPlayer/pureHtml5Player.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/mediaPlayer/pureHtml5Player.tpl.html",
    "<div class=\"pureHTML5Player\">\n" +
    "   <video autoplay>\n" +
    "     <source type=\"video/mp4\" ng-src=\"{{trustSrc(videoConfig.playlist[0], '.mp4')}}\">\n" +
    "     <source type=\"video/ogg\" ng-src=\"{{trustSrc(videoConfig.playlist[0], '.ogv')}}\">\n" +
    "   </video>\n" +
    "</div>");
}]);

