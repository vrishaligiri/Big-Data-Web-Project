 var productInfo;
			$( document ).ready(function() {
				console.log( "Product Description ready!" );
				//	alert('start');
				// var graphData = '#{graphData}'
			  productInfo = $("#productInfo").html(); 

				if(productInfo == '&lt;%= productInfo %&gt;' || productInfo == undefined ){
					//alert('blank');
					productInfo='';
				}
				else{
		

				var productInfoJSON = JSON.parse(productInfo);
				$("#productImgTD").html('<img class="fluid-img" src="'+productInfoJSON.brand.img.src+'">'); 
				$("#idBrand").html(productInfoJSON.brand.name);
				$("#idName").html(productInfoJSON.name);
				$("#idPrice").html(productInfoJSON.price.regular_price);
				$("#idDesc").html(productInfoJSON.desc);
				$("#idModel").html(productInfoJSON.manufacture_details.model_number);
				$("#idRating").html(productInfoJSON.rating);


				}
			});
