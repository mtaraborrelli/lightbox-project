(function(){

	var myNode = document.querySelector('ul');

	myNode.addEventListener('click', function(e) {
		
		if ( e.target.tagName === "IMG" ) {
			
			var myOverlay = document.createElement('div');
			myOverlay.id = 'overlay';
			document.body.appendChild(myOverlay);

			myOverlay.style.position = 'absolute';
			myOverlay.style.top = 0;
			myOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
			myOverlay.style.cursor = 'pointer';

			myOverlay.style.width = window.innerWidth + 'px';
			myOverlay.style.height = window.innerHeight + 'px';
			myOverlay.style.top = window.pageYOffset + 'px';
			myOverlay.style.left = window.pageXOffset + 'px';

			var imageSrc = e.target.src,
				largeImage = document.createElement('img'),
				imgName = imageSrc.substring(77,imageSrc.length-7);
				
			largeImage.id = 'largeImage';
			largeImage.src = imageSrc.substr(0,67) + "LG_images/" + imgName + "_LG.jpg";
			largeImage.style.display = 'block';
			largeImage.style.position = 'absolute';

			largeImage.addEventListener('load', function() {

				if (this.height > window.innerHeight){
					this.ratio = window.innerHeight / this.height;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}

				if (this.width > window.innerWidth){
					this.ratio = window.innerWidth / this.width;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}

				centerImage(this);
				myOverlay.appendChild(largeImage);

			});

			largeImage.addEventListener('click', function(){
				if (myOverlay) {
					window.removeEventListener('resize', window, false);
					window.removeEventListener('scroll', window, false);
					myOverlay.parentNode.removeChild(myOverlay);
				}


			}, false);

			window.addEventListener('scroll', function() {
				if (myOverlay) {
					myOverlay.style.top = window.pageYOffset + 'px';
					myOverlay.style.left = window.pageXOffset + 'px';
				}
			}, false)

			window.addEventListener('resize', function() {
				if (myOverlay) {
					myOverlay.style.width = window.innerWidth + 'px';
					myOverlay.style.height = window.innerHeight + 'px';
					myOverlay.style.top = window.pageYOffset + 'px';
					myOverlay.style.left = window.pageXOffset + 'px';

					centerImage(largeImage);
				}
			}, false);

		}

	}, false);

	function centerImage(theImage) {
		var myDifX = (window.innerWidth - theImage.width)/2;
		var myDifY = (window.innerHeight - theImage.height)/2;

	theImage.style.top = myDifY + 'px';
	theImage.style.left = myDifX + 'px';

	return theImage;

	}

})();