'use strict';

app.directive("stepBuy", function () {
    return {
        restrict: 'E',
        replace:true,
        templateUrl: "html/modules/stepBuy/stepBuy.html",
        link: function (scope, element, attrs) {
            /*var _options = angular.fromJson(attrs.options);
            scope.mainStepName = _options.stepList[_options.stepStart];

            //当前步骤
            scope.stepIndex = _options.stepStart;
            
            scope.setStepIndex = function () {
                
            };

            //获取当前步骤名称
            var getStepName = function () {
                if(scope.stepIndex === 0){
                    return "选择<br>靓号";
                }else if(scope.stepIndex === 1) {
                    return "选择<br>卡类型";
                }else if(scope.stepIndex === 2){
                    return "收货<br>地址";
                }
            };
            scope.mainStepName = getStepName();
            */

            /*(function(){
                var bar = new ProgressBar.Circle(stepBuy, {
                    color: '#fff',
                    // This has to be the same size as the maximum width to
                    // prevent clipping
                    strokeWidth: 1,
                    trailWidth: 1,
                    easing: 'easeInOut',
                    duration: 1400,
                    text: {
                        autoStyleContainer: false
                    },
                    from: { color: '#fff', width: 1 },
                    to: { color: '#039103', width: 1 },
                    // Set default step function for all animate calls
                    step: function(state, circle) {
                        circle.path.setAttribute('stroke', state.color);
                        circle.path.setAttribute('stroke-width', state.width);

                        var value = Math.round(circle.value() * 100);
                        if (value === 0) {
                            circle.setText('');
                        } else {
                            circle.setText(scope.mainStepName);
                        }

                    }
                });
                //bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                bar.text.style.fontSize = '1.7rem';

                bar.animate(1.0);  // Number from 0.0 to 1.0
            })();*/
        }
    };
});