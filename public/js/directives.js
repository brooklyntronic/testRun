'use strict';
angular.module('mean').directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + newVal);
           }
        });
    }
  };
})
.directive('videoPlayer', ['$sce', '$compile', '$templateCache', '$timeout', function($sce, $compile, $templateCache, $timeout) {
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