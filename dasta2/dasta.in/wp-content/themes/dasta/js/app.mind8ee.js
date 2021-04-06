
window.__DASTA__ = window.__DASTA__ || {};

/*
 *
 * Historical Code
 * In case something goes and you require to know how things worked before.
 *
 */
// In 2015, we started using a rupee symbol designed in SVG as opposed to the Unicode character because for some (actually just one) people (person), he could not see the Unicode rupee symbol.
// curr = $( "html" ).data( "currency" ) ? $( "html" ).data( "currency" ) : "₹";

/*
 *
 * This opens a new page in an iframe and closes it once it has loaded
 *
 */
function openPage ( name ) {

	var url = "http://dasta.in/trac/" + name;

	var $iframe = $( "<iframe>" );
	$iframe.attr( {
		width: 0,
		height: 0,
		title: "Analytics and Tracking",
		src: url,
		style: "display:none;",
		class: "js_iframe_trac"
	} );

	$( "body" ).append( $iframe );

	var domIframe = $iframe.get( 0 );
	domIframe.contentWindow.onload = function ( e ) {
		setTimeout( function () {
			$iframe.remove();
		}, 25000 );
	}

}


window.__DASTA__.logToServer = function ( data ) {

	console.log( data );
	$.ajax( {
		url: "../server/log.php",
		method: "POST",
		data: data
	} );

}

function countToZero ( $el, from ) {
	$( { val: from } ).animate( { val: 0 }, {
		duration: 2500 + 500 * Math.random(),
		progress: function () {
			if ( ! isNaN( this.val ) ) {
				$el.text( parseInt( this.val, 0 ) );
			}
		}
	} );
}

function checkRate(){
	if ( !isUserRate )
	{
		// $('#emi-rate').val(loanAmount > 7500000 ? 9.4 : 9.4);
		var initialValue = $( "#emi-rate" ).data( "initial-value" );
		$( "#emi-rate" ).val( loanAmount > 7500000 ? initialValue : initialValue );
	}
}

function setValues(){tmpDown="undefined"!=typeof downPayment?downPayment:Math.round(.2*totalPrice),"loan"===lastSet?($emiLoan.is(":focus")||$emiLoan.val(formatNumberToIndianRupee(loanAmount,{symbol:false})),tmpDown=totalPrice-loanAmount,$emiDown.val(formatNumberToIndianRupee(tmpDown,{symbol:false})),$("#emi-down-perc").html(Math.round(tmpDown/totalPrice*100)+"%")):($emiDown.is(":focus")||$emiDown.val(formatNumberToIndianRupee(tmpDown,{symbol:false})),$("#emi-down-perc").html(Math.round(tmpDown/totalPrice*100)+"%"),loanAmount=totalPrice-tmpDown,$emiLoan.val(formatNumberToIndianRupee(loanAmount,{symbol:false}))),months=parseInt($("#emi-tenure").val()),checkRate(),rate=parseFloat($("#emi-rate").val())/1200,emi=Math.round(loanAmount*rate*Math.pow(1+rate,months)/(Math.pow(1+rate,months)-1)),$("#total-emi").html(isNaN(emi)?"<em>error</em>":formatNumberToIndianRupee(emi)),$("#emi-total").html(formatNumberToIndianRupee(emi*months)),$("#emi-principal").html(formatNumberToIndianRupee(loanAmount)),$("#emi-interest").html(formatNumberToIndianRupee(emi*months-loanAmount))}
function changePrice(e){totalPrice=e,countToNumber($("#total-price"),totalPrice,{INR:true,round:true}),setValues(),$(".contact-form button").slideDown(),$(".contact-status").html(""),$("#pricing-list *[data-custom-rate]").length>0?parseInt($("#pricing-list *[data-custom-rate]").data("custom-rate"))>0?$("#discount").closest("tr").hide():($("#discount").closest("tr").show(),$(".contact-form h1>span").hide(),$(".contact-form .discount-title").show()):($(".contact-form h1>span").hide(),$(".contact-form .contact-title").show())}
function toTarget(e){var t;"undefined"!=typeof e?(t=e.offset().top-$("header").outerHeight(),$("html, body").animate({scrollTop:t},800,"easeInOutCirc")):"undefined"!=typeof section&&$("a[name="+section+"]").length>0&&(t=$("a[name="+section+"]").offset().top-$("header").outerHeight(),$("html, body").animate({scrollTop:t},1600,"easeInOutCirc"))}
function checkClearing(){$(".nflb-contentbox-inner img").length>0&&(spinDiv.style.display="none",spinner.stop(),clearInterval(interval),0===$(".clearing-close").length&&$(".nflb-blockout-background").append('<a href="#" class="clearing-close">×</a>'),$(".clearing-close").css("display","block").click(function(e){e.preventDefault()}))}
function setupKeyplan(){switch(currentFloor){case 0:prefix="g";break;case 1:prefix="f";break;case 14:prefix="p";break;default:prefix="t"}$("#floorplan-map .base img").attr("src",flBase+"floorplan-base-"+prefix+(isSmall?"-mobile":"")+".png"),$("g.available").attr("class",function(e,t){return t.replace("available","")}),$("#flat-chooser a[data-flat]").each(function(){var e=parseInt($(this).data("flat"))-100*currentFloor;$("#"+prefix+"0"+e).attr("class",function(e,t){return t+" available"})}),14===currentFloor?$("#floorplan-map .numbers").addClass("penthouse"):$("#floorplan-map .numbers").removeClass("penthouse"),$("#floorplan-map .numbers h6[data-door]").each(function(){$(this).html(currentFloor+"0"+$(this).data("door"))}),2>currentFloor&&$("#floorplan-map .numbers h6[data-door=9]").html(""),$("#floorplan-map").find("#floorplan-"+prefix+", .numbers").fadeIn();var e=$("#flat-chooser h1").html();$("#floorplan-map h1").html(e).css("text-transform","none"),$("#flat-chooser h1").html('<img src="' + rootURL + '/wp-content/themes/dasta/images/icons/step3.png" height="40" width="40" border="0">Select an apartment'),$("#floorplan-map .base").slideDown();var t=.195*$("#floorplan-map .base").width()*(isSmall?.85:1);$("#floorplan-map .numbers").height(t+"px"),$("#floorplan-map .numbers>div").height(t/2+"px")}
function setFloorString(){currentFloor=parseInt($("input[name=chooser-floor]:checked").val()),currentType=$("input[name=chooser-type]:checked").val(),$("#floorplan-map").find("svg,.numbers").fadeOut(),$("#floorplan-map h1").html("Loading…"),$("#flat-chooser").html("<h1>Checking availability…</h1>").load(rootURL+"/available-apartments/?type="+currentType+"&floor="+currentFloor,function(){setupKeyplan()}).slideDown()}
function showDastaWater(){if($("#dasta-water").show().fadeTo(0,1),$("#conventional-water").hide(),$("#dasta-water-title").addClass("white"),$("#standard-water-title").removeClass("white"),$("#water-component .note").fadeTo(200,1),dastaAnimate){dastaAnimate=!1,delays=[31,86,137,155,155,155,159,162,166,222,241,261,316,386];var e=$("#dasta-water>img"),t=e.attr("src");e.attr("src",""),i=0,$("#dasta-water .water-icon").each(function(){$(this).removeClass("showing"),setTimeout(function(e){e.removeClass("showing"),e.addClass("showing")},70*delays[i],$(this)),i++}),e.attr("src",t)}else $("#dasta-water .water-icon").addClass("showing")}
function showConventionalWater(){if($("#conventional-water").show(),$("#dasta-water").hide(),$("#dasta-water-title").removeClass("white"),$("#standard-water-title").addClass("white"),$("#water-component .note").fadeTo(200,0),standardAnimate){toTarget($("#water-component .sources")),setTimeout(function(){toTarget($("#water-component #conventional-water .point-b"))},7770),standardAnimate=!1,delays=[31,91,150,150,150,150,158,161,166,218,241,272,331];var e=$("#conventional-water>img"),t=e.attr("src");e.attr("src",""),e.attr("src",t),i=0,$("#conventional-water .water-icon").each(function(){$(this).removeClass("showing"),setTimeout(function(e){e.removeClass("showing"),e.addClass("showing")},70*delays[i],$(this)),i++})}else $("#conventional-water .water-icon").addClass("showing")}

$(document).foundation(),$.fn.reverse=[].reverse;

var isMobile=!1,rootURL="",section=section||location.hash.replace("#",""),emi,totalPrice,tmpDown,downPayment,months,rate,isUserRate=!1,loanAmount,lastSet,$emiDown=$("#emi-down"),$emiLoan=$("#emi-loan");$emiDown.keyup(function(){downPayment!==parseInt($(this).val().replace(/,/g,""))&&(downPayment=parseInt($(this).val().replace(/,/g,"")),lastSet="down",setValues())}).blur(function(){setValues()}),$emiLoan.keyup(function(){loanAmount!==parseInt($(this).val().replace(/,/g,""))&&(loanAmount=parseInt($(this).val().replace(/,/g,"")),lastSet="loan",setValues())}).blur(function(){setValues()}),$("#emi-tenure").keyup(function(){setValues()}),$("#emi-rate").keyup(function(){parseFloat($("#emi-rate").val())/1200!==rate&&(isUserRate=!0,setValues())});

var $nav = $("nav"), $header= $("header"), isSmall;
$( function () {
	$('img.ratio').each(function () {
		$(this).attr('data-ratio', $(this).attr('height') / $(this).attr('width'));
	});

	var z = $('.wrap').children('.clipper, section').length;
	$('.wrap').children('.clipper, section').each(function () {
		$(this).css('z-index', z--);
	});

	$('.day-switch').css('margin-left', $('.day-switch').width() / -2 + 'px').css('margin-top', $('.day-switch').outerHeight() * -0.5 + 'px').find('span').first().addClass('on');

	var $backs = $('*[data-src]');
	$backs.each(function() {
		file = $(this).attr('data-src');
		$(this).attr('data-px', file.replace('.jpg', '-px.jpg'));
	});

	if ($(window).width() <= 640)
	{
		isMobile = true;
		var file;
		$backs.each(function () {
			file = $(this).attr('data-src');
			file = file.replace('.jpg', '-mobile.jpg');
			$(this).attr('data-src', file);
		});
		// There aren't any elements that match "img[data-img]", so.....
		// $('img[data-img]').each(function () {
		// 	file = $(this).attr('data-img');
		// 	file = file.replace('.jpg', '-mobile.jpg');
		// 	file = file.replace('.png', '-mobile.png');
		// 	$(this).attr('data-img', file);
		// });
	}
	/*
    $backs.imageloader({
		background: true,
		callback: function(elem){
			//console.log($(elem).css('background-image'));
			//$(elem).css('background-image', $(elem).css('background-image')+', url('+$(elem).attr('data-px')+')');
		}
	});
	*/
	$backs.each(function(){
		$(this).css('background-image', 'url('+$(this).data('src')+')'+', url('+$(this).data('px')+')');
		$(this).removeAttr('data-src').removeAttr('data-px');
	});

    $('*[data-img]').imageloader({
		dataattr: 'img'
	});

	$(window).resize();

	setTimeout(function(){ $('a[name]').show(); toTarget(); }, 1000);
});

/*
 *
 * A document ready handler was here.
 * 	It's now in `app.basics.js`
 *
 */

$("a[href*=#]:not([href=#])").click(function(){return location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname?(toTarget($("a[name="+this.hash.replace("#","")+"]")),!1):void 0});

/*
 *
 * A scroll event handler was here.
 * 	It's now in `app.basics.js`
 *
 */

$(window).resize(function(){isSmall=$(window).width()<=1024,$("img.ratio").each(function(){$(this).css("height",$(this).width()*parseFloat($(this).attr("data-ratio"))+"px")}),$(".icon-list li").each(function(){$(this).children("span").css("margin-top",($(this).height()-$(this).children("span").height())/2+"px")}),isSmall?($nav.slideUp(),$("body").css("margin-top",$(".pre-header").height())):($nav.css("display", "table-cell"),$("body").css("margin-top",0)),$(window).scroll()}),$(".nav-button").click(function(e){e.preventDefault(),$nav.slideToggle()}),$(".day-switch").click(function(e){e.preventDefault(),$(this).find("span").first().hasClass("on")?($("#"+$(this).attr("data-id")).fadeOut(1400),$(this).find("span").first().removeClass("on"),$(this).find("span").last().addClass("on"),$(this).attr("data-also")&&$("#"+$(this).attr("data-also")).removeClass("dark")):($("#"+$(this).attr("data-id")).fadeIn(1400),$(this).find("span").last().removeClass("on"),$(this).find("span").first().addClass("on"),$(this).attr("data-also")&&$("#"+$(this).attr("data-also")).addClass("dark"))}),$("body").on("click",".show-button",function(e){if($(this).is("a")&&e.preventDefault(),$(this).attr("data-group")){var t=$(this).attr("data-group");$(this).closest(".choice-list").find(".show-button").removeClass("current-item"),$(this).addClass("current-item"),$("."+t).first().parent().append($("#"+$(this).attr("data-id"))),$("#"+$(this).attr("data-id")).fadeOut(0).fadeIn()}$(this).attr("data-hider")&&($("#"+$(this).attr("data-hider")+">*:not(h1)").fadeOut(0),$("#"+$(this).attr("data-show")).fadeIn())}),$("input[name=compare-switch]").change(function(){var e=0;1===parseInt($(this).val())?$(this).closest(".compare").find(".image-set img:nth-child(n+2)").each(function(){$(this).delay(e).fadeIn(),e+=300}):$(this).closest(".compare").find(".image-set img:nth-child(n+2)").reverse().each(function(){$(this).delay(e).fadeOut(),e+=300})});var swap=!0;$("input[name=swap-switch]+label").click(function(){var e=0;swap?($(this).closest("div").find(".image-set img:nth-child(n+2)").each(function(){$(this).delay(e).fadeIn(),e+=300}),swap=!swap):($(this).closest("div").find(".image-set img:nth-child(n+2)").reverse().each(function(){$(this).delay(e).fadeOut(),e+=300}),swap=!swap)});var opts={lines:13,length:10,width:3,radius:15,corners:1,rotate:0,direction:1,color:"#fff",speed:1,trail:60,shadow:!1,hwaccel:!1,className:"spinner",zIndex:2e9,top:"50%",left:"50%"},spinner=new Spinner(opts),spinDiv=document.getElementById("spinner"),interval;$(".unit-plan a").click(function(e){e.preventDefault(),$("ul[data-id="+$(this).attr("id")+"] a").first().click(),spinDiv.style.display="block",spinner.spin(spinDiv),interval=setInterval(function(){checkClearing()},250)}),$(".grid-controls input[name=grid-size]").change(function(){$("#unified-features img").hide(),$("#unified-features img."+$(this).val()).show()});var currentFloor,currentType,prefix,flBase;$("#floorplan-map .base img").length>0&&(flBase=$("#floorplan-map .base img").attr("src").replace("floorplan-base.png","")),$("#flat-chooser").slideUp(0),$("#floorplan-map .base").slideUp(0),$(".chooser-floor select").change(function(){$(this).closest(".chooser-floor").find(".select-display").html($(this).find("option:selected").data("html")).show(),$("#"+$(this).find("option:selected").data("id")).prop("checked",!0),setFloorString()}),$(".chooser-floor input[type=radio]").change(function(){$(this).closest(".chooser-floor").find("option[data-id="+$(this).attr("id")+"]").prop("selected",!0),$(this).closest(".chooser-floor").find("select").change(),setFloorString()}),$("#floor-hider .chooser-floor").hide(),$(".chooser-type input:radio").change(function(){$(".type-string").html($(this).data("string"));var e=$(".chooser-type label[for="+$(this).attr("id")+"]");$("#"+e.data("show")).find("select").change()}),$(".pricing-sheet .collapse").hide(),$("#flat-chooser").on("click",".detail-button",function(e){e.preventDefault(),$(".detail-button.current").removeClass("current"),$(this).addClass("current"),$("g.selected").attr("class",function(e,t){return t.replace("selected","")}),$("#"+prefix+"0"+(parseInt($(this).data("flat"))-100*currentFloor)).attr("class",function(e,t){return t+" selected"})}),$("#floorplan-map").on("click","g.available",function(){var e=parseInt($(this).attr("id").substr(1)),t=e+100*currentFloor;100>t&&(t="00"+t),$(".detail-button[data-flat="+t+"]").click()}),$("#flat-chooser").on("click",".detail-button button",function(){var e=parseInt($(this).closest(".detail-button").find("[data-value]").data("value"));$("#pricing-list").html('<div class="content"><h1>Loading apartment details…</h1><hr class="half"></div>').load(rootURL+"/pricing-details/?flat="+$(this).closest(".detail-button").data("flat"),function(){changePrice(e),$("#pricing-list .mod-selected").hide(),$("#pricing-list label[for=unit-switch-3d]").click(),$("#pricing-list").slideUp(0).slideDown()}),$(".flat-num").html($(this).closest(".detail-button").data("flat")),$(".contact-form .pre-select").hide(),$("#pricing-list").show(),toTarget($("#pricing-list")),$(".emi-switch").slideDown("slow"),$(".total-price").slideDown("slow"),$(".contact-form").slideDown("slow"),$(".contact-form .price-list").fadeTo(.4,1).find("input,select,button").removeAttr("disabled")}),$("#pricing-list").on("change",".mod-options",function(){"store"===$(this).val()||"pooja"===$(this).val()||$(this).is(":checked")?($(this).closest("tr").find(".mod-selected").show(),$(this).closest("tr").find(".mod-not-selected").hide()):($(this).closest("tr").find(".mod-selected").hide(),$(this).closest("tr").find(".mod-not-selected").show());var e=$("#pricing-list input, #pricing-list select").serialize();e+="&price=1",$.get(rootURL+"/pricing-details/",e,function(e){countToNumber($("#gst"),e.gst,{INR:true,round:true}),changePrice(e.grand),$(".unit-plan img").first().attr("src",e["3D"])},"json")});var aptNumBorder=$("h2").css("color");$("#pricing-list").on("keyup","#apt-num",function(){var e=$(this).val(),t=parseInt(e),n=Math.floor(t/100),i=t-100*n;e.length<3||n>14||i>9||2>n&&i>8||isNaN(t)?$(this).css("border-color","red"):($(".chooser-flat .detail-button").removeClass("current"),$(".flat-num").html(e),$(".contact-form .pre-select").hide(),$(".detail-button[data-flat="+e+"]").length>0&&$(".detail-button[data-flat="+e+"]").addClass("current"),$(this).css("border-color",aptNumBorder),$(this).closest("#pricing-list").find(".content").first().html('<div class="content"><h1>Loading apartment details…</h1><hr class="half"></div>').load(rootURL+"/pricing-details/?flat="+$(this).val()+" .content",function(){$("#pricing-list .mod-selected").hide(),changePrice(parseInt($("#pricing-list [data-price]").last().data("price")))}))});var $labels=$(".emi-calculator .input .label, .contact-form .input .label");$labels.css("width",$labels.height()+"px"),$(".emi-calculator").slideUp(0),$(".emi-switch").click(function(){$(".emi-calculator").slideToggle("slow",function(){$(".emi-calculator").is(":hidden")?$(".emi-switch td:last-child").find("h1").html("+"):$(".emi-switch td:last-child").find("h1").html("-")})}),$(".contact-form .price-list").fadeTo(0,.4).find("input,select,button").attr("disabled","disabled"),$("#dont-call").change(function(){$(this).is(":checked")?($(this).closest("td").find(".input").fadeTo("fast",.4).find("input").attr("disabled",!0).removeAttr("required"),$(this).closest("form").find("button[type=submit]").html("Email me").addClass("email"),$(this).closest("form").find("h1>span").hide(),$(this).closest("form").find(".contact-title").show()):($(this).closest("td").find(".input").fadeTo("fast",1).find("input").removeAttr("disabled").attr("required",!0),$(this).closest("form").find("button[type=submit]").html("Call me").removeClass("email"),$(this).closest("form").find("h1>span").hide(),$(this).closest("form").find(".contact-title").show()),$(".contact-form").valid()});var isEmailValid=!1;$.validator.messages.required="required",$(".contact-form").validate({errorElement:"span",ignore:"#contact-email",submitHandler:function(e) {
		if(isEmailValid) {

			/* -----
			 * LOG TO SERVER
			 ----- */
			var $form = $( e );
			var $fields = $( ".pricing-sheet" ).find( "input, select" );

			var data = { };
			data.name = $fields.filter( "#contact-name" ).val();
			data.email = $fields.filter( "#contact-email" ).val();
			data.apartment = $fields.filter( "#apt-num" ).val();

			data.modifications = [ ];
			if ( $fields.filter( "#mod-carpark" ).is( ":checked" ) ) {
				data.modifications.push( "car park: yes" );
			}
			else {
				data.modifications.push( "car park: no" );
			}
			data.modifications = data.modifications.join( ", " )

			if ( ! $form.hasClass( "js_mode_executive" ) ) {
				data.form = "User Pricing Sheet Request";
				data.phoneNumber = $fields.filter( "#contact-phone" ).val();
				data.discoverySource = $fields.filter( "#how-did-you-find-us" ).val();
			}
			else {
				data.form = "Executive Quote Request";
				data.ratePerSqftDiscount = $fields.filter( "#discount" ).val();
				data.superPremium = $fields.filter( "#super-premium" ).val();
			}

			$.ajax( {
				url: "../wp-content/themes/dasta/server/log.php",
				method: "POST",
				data: data
			} );

			/* -----
			 * REQUEST PRICING SHEET
			 ----- */
			var t=$(".pricing-sheet input, .pricing-sheet select").serialize();
			$(e).find("button").slideUp("slow");
			$(e).find(".contact-status").html("Sending…");
			$.get($(e).attr("action"),t,function( response ){
				try {
					response = JSON.parse( response );
				} catch ( e ) {
					response = null;
				}
				if ( response && response.status == "error" ) {
					// alert( response.message );
					$( e ).find( ".contact-status" ).html( "Whoops!<br><small>" + response.message + "</small>" );
				}
				else {
					$( e ).find( ".contact-status" ).html( "Thank you!<br><small>Please check your spam folder as well</small>" );
				}

			window._fbq.push(["track","6019561259903",{value:"0.00",currency:"INR"}]),window.google_trackConversion({google_conversion_id:965572058,google_conversion_language:"en",google_conversion_format:2,google_conversion_color:"ffffff",google_conversion_label:"SZMlCNa6r1gQ2uu1zAM",google_remarketing_only:!1}),window.ga("send","event","Lead","Premium","Form Fill")})}else $("#contact-email").siblings("span").remove(),$("#contact-email").addClass("error").parent().append('<span class="error">Invaild Email</span>')},invalidHandler:function(){isEmailValid||($("#contact-email").siblings("span").remove(),$("#contact-email").addClass("error").parent().append('<span class="error">Invaild Email</span>'))}}),$("#contact-email").change(function(){$.get(rootURL + "/wp-content/themes/dasta/validate-email.php?email="+encodeURIComponent($("#contact-email").val()),function(e){isEmailValid="false"!==e,$("#contact-email").siblings("span").remove(),isEmailValid||$("#contact-email").addClass("error").parent().append('<span class="error">Invaild Email</span>')})}),jQuery.easing.def="easeInOutQuad";var delays,dastaAnimate=!0,standardAnimate=!0,i=0;if($("#water-component").length>0){$("#conventional-water").hide(),$("#dasta-water").fadeTo(0,0);var t,l;$("#water-component #illustration .water-icon").each(function(){t=parseInt($(this).css("top")),$(this).css("top",t/920*100+"%"),l=parseInt($(this).css("left")),$(this).css("left",l/944*100+"%")}),$(".water-switch").click(function(e){e.preventDefault(),$(this).toggleClass("on"),$(this).hasClass("on")?showDastaWater():showConventionalWater()}),$("#dasta-water-title").click(function(){$(".water-switch").addClass("on"),showDastaWater()}),$("#standard-water-title").click(function(){$(".water-switch").removeClass("on"),showConventionalWater()}),$(".replay-switch").click(function(e){e.preventDefault(),$(".water-switch").hasClass("on")?(dastaAnimate=!0,showDastaWater()):(standardAnimate=!0,showConventionalWater())})}
