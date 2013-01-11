(function(window){

	window.document.addEventListener('click',function(e){

		var node = e.target;
		if( node.className === 'begin' ) {
			node.setAttribute('class','end');
		} else {
			node.setAttribute('class','begin');
		}

	}, false);

}(this));