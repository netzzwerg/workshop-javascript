/*
 * IDEA: data-module-group collects all elements of one widget and load that widget module only once giving it those elements
 */
define(['vendor/jQuery/custom'], function ($){

	var exports = {},
  		module = 'module',
  		css = module+'-css',
  		parameters = module+'-parameters';

  exports.init = function (context) {

    $("[data-"+module+"]", context).each(function () {
    	
      var elem = this,
          $item = $(elem),
          mod = $item.data(module),
          cssOffset = $item.data(css),
          params = $item.data(parameters) || '';
      
      require([mod], function (mod) {
    	  
    	  if ("string" === typeof mod) {
    		  $item.html(mod);
    		  exports.init(elem);
    	  } else {
    		  	mod.init.apply(mod, [elem].concat( params.split(',') ) );
  			}
      });
      
      if (cssOffset) {
      	require(['requireCSS!'+req.toUrl('css/'+cssOffset+'.css')]);    	  
      }
    });
  };

  return exports;
});