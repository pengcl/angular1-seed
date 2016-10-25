/**
* 规格的选择
*/
function sele_spec(obj){
	if (obj != '') {
	    //默认不执行
	    $(obj).addClass("selected").siblings().removeClass("selected");  
	}
	if(checkSpecSelected())
	{
	    var specArray = [];
	    $('[name="specCols"]').each(function(){
	        specArray.push($(this).find('.selected').attr('value'));
	    });
	    //alert("specArray:"+specArray);
	    var count=specArray.length;
	    //var goodsId = checkoffernum(count,specArray);
	    var goodsId = checkGoodsTofferid(count,specArray);
	    //var specJSON = '['+specArray.join(",")+']';
	    //alert(specJSON);
	    //此方法计算是否存在对应商品
	    if(goodsId != null && goodsId != '')
	    {
	    	 openBuy();
//	    	 var url=action+"/product/countOfferPrice/"+goodsId;
//			 $.ajax({
//			    	url:url,  
//				    type:"post",
//				    success:function(data){
//				          var freeDutyCash = data.freeDutyCash;
//				          $(".freeDutyCash").text("¥"+freeDutyCash);
//				          var pressCash = data.pressCash;
//				          $(".pressCash").text("¥"+pressCash);
//				          var totalmonprice = data.totalmonprice;
//				          $(".monprice").text("¥"+totalmonprice);
//				          var totalCash = data.totalCash;
//				          $(".totalCash").text("¥"+totalCash);
//				          
//				          $('#foregift_price').val(data.pressCash);
//						  $('#free_price').val(data.freeDutyCash);
//						  $('#rent_price').val(data.monprice);
//						  $('#goods_id').val(data.goodsId);
//						  openBuy();
//				    },
//				    error : function(msg) {
//				        console.info(msg);
//				    }
//				});
	    	$.each(prodetail.goods, function(m, offer) {
	            var offerId = offer.ID;
	            if(goodsId == offerId){
	            	$('#goods_id').val(goodsId);
	            	var PRODUCT_TAILNAME = offer.PRODUCT_TAILNAME;
	            	$(".prodcapacity").text(PRODUCT_TAILNAME);
	            }
	    	 });
	    }else{
	    	 //alert("当前商品无货！");
	    	 //$.lezu.Alert("小乐提示","当前商品无货 ，请选择其它商品！");
			 $.lezu.Alert("小乐提示","当前商品无货,请选择其它商品!");
	    	 closeBuy();
	    }
	}
}


//IE8 不支持indexOf 重新先定义indexOf
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(elt){var len=this.length>>>0;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0)from+=len;for(;from<len;from++){if(from in this&&this[from]===elt)return from}return-1}}


function checkGoodsTofferid(count,spec){
	var flag='';
	$.each(prodetail.goods, function(m, offer) {
        var offerId = offer.ID;
        var strs='';
        $.each(offer.SPE_VALUEJSON, function(n, detail) {
            var detailId=detail.id;
            strs+=detailId+",";
            var n=n+1;
            if(n%count==0)
            {
               var num=0;
	           var str=strs.substring(0, strs.length-1);
	           var paras=str.split(",");
	           for(var k=0;k<paras.length;k++)
	           {
	        	   var para=paras[k];
	        	   if(spec.indexOf(para)>-1)
	        	   {
	        		   num++;
	        	   }
	           }
	           //判断当前选择的型号对应的商品是否存在
	           if(count == num)
	           {
	        	   flag=offerId;
	           	   return flag;
	           }
	           //alert("count:"+count+" num:"+num);
	           //alert("str:"+str+" spec:"+spec);
            }
        });
	 });
	return flag;
}

function closeBuy()
{
	if($('#buyNowButton').length > 0)
	{
		$('#buyNowButton').attr('disabled','disabled');
		$('#buyNowButton').addClass('disabled');
	}
}

function openBuy()
{
	if($('#buyNowButton').length > 0)
	{
		$('#buyNowButton').removeAttr('disabled');
		$('#buyNowButton').removeClass('disabled');
	}
}

//暂时作废
//function checkoffernum(count,spec){
//	var flag='';
//	$.each(prodetail.goods, function(m, offer) {
//        var offerId = offer.ID;
//        var freeDutyCash = offer.FREE_DUTY_CASH;//免赔金
//        var strs='';
//        $.each(offer.SPE_VALUEJSON, function(n, detail) {
//            var detailId=detail.id;
//            strs+=detailId+",";
//            var n=n+1;
//            if(n%count==0)
//            {
//	           	 var str=strs.substring(0, strs.length-1);
//	           	 if(spec == str){
//	           		flag=offerId;
//	           		return flag;
//	           	 }
//            }
//        });
//	 });
//	return flag;
//}

/*租机时间选择框*/
function selecttime(){
	$(".select_ul").slideDown(200);
	$(".select_ul").find("li").click(function(){
		var time = $(this).attr('ata-val');
		$('#duration').val(time);
		
		var rent_price = $('#rent_price').val();
		var months  = $("#duration").val();
		var month_rent_price = rent_price * months;
		$(".monprice").text("¥"+month_rent_price);
		
		var lihtml=$(this).html();
		$(".sele_input").html(lihtml);
		$(".select_ul").hide();
	})
}

$(document).ready(function() {
	  //产品图片切换
	  $("#owl-product").owlCarousel({
		  slideSpeed : 300,
		  paginationSpeed : 400,
		  singleItem:true,
		  autoPlay:true,
		  stopOnHover:true,
		  lazyLoad:true,
	  });  
});
