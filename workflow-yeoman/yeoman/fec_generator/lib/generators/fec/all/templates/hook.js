/*global require:true*/
(function () {
    "use strict";

    require.config(window.moduleConfig);
    require(['core/mediator', 'core/annotationsLoader', 'core/currpage', 'tracking/Dispatcher'],
            function(mediator, annotationsLoader, currpage, Dispatcher, trackingConfig) {
            currpage.set(chip_currpage_json);

            new Dispatcher("tracking/trackingConfig");
            mediator.publish("init.core");
            annotationsLoader.init("body");

        });

    })();