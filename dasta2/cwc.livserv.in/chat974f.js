
// JavaScript Document
var currentpageurl = window.location.href;
var checkmouseonpopup = 0;
var minmaxstate = 0;
var startstopAnimation = 0;

var lpcwc_vc = 0;


var cwcUserAgent;
var webRefferrer;
var cwcUserBrowser;
var cwcUserVersion;
var cwcUserPlatform;

var divTag = document.createElement("div");
divTag.setAttribute('id',"livprop_chatbox");
//divTag.innerHTML = "Div tag created using Javascript DOM dynamically";
//document.body.appendChild(divTag);


//-------Setting Cookie------------
 var cname = "checkmouseonpopup";
 var cminmax = "minmaxstate";
 var cminmaxButton = "minmaxButtonstate";
 var cssAnimation = "startstopAnimation";
 var cvalue = 1;
 var exdays = 1;
 //--------------------------------

//Get id
var lid = '';
var alldivs = [];
var allText = '';
var setvideopos = '';

//Visitor count cookie
var cv_cookie = "lpcwc_vc";
var temp_vc='';


function get_browser_info(){
    var ua = navigator.userAgent,tem,M = ua.match(/(opera|chrome|safari|firefox|msie|trident|edge(?=\/))\/?\s*(\d+)(\.\d+)+/i) || [];
	if (/trident/i.test(M[1])) {
	tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	return { name: 'IE ', version: (tem[1] ||'') };
	}
	if (M[1] === 'Chrome') {
	tem = ua.match(/\bOPR\/(\d+)/);
	if (tem != null) {
	return { name: 'Opera', version: tem[1] };
	}
	tem = ua.match(/\bEdge\/(\d+(.\d+)+)/i);
	if (tem != null) {
	return { name: 'Microsoft Edge', version: tem[1] };
	}
	}
	M = M[2] ? [M[1], M[0].substring(M[0].indexOf('/')+1)] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
	M.splice(1, 1, tem[1]);
	}
	return {
	name: M[0],
	version: M[1]
	};
 }


(function(){ //console.log("------ in Chat.js -------");
	try {
			var myEle = document.getElementById("lp_cwc_xqzyihjdskw");
		    if(myEle){
			 	var src = myEle.src

			 	//alert(" Protocol :: "+window.location.protocol);

			 	//alert(" User Agent :: "+navigator.userAgent+" Refferrer :: "+x);

				var lid=unescape(src).split("lid=")[1].split("&")[0];
				var newsrc = src;
				newsrc = newsrc.replace("chat.js?lid="+lid,"ajax.php?p=builders/getSettings&lid="+lid+"&currentpageurl="+currentpageurl);
			 	readTextFile(newsrc,lid);

			 	console.log("on-id");

			    /*if(lid == '14939' || lid == '19728' || lid == '833' || lid == '3422' || lid == '9042' || lid =='18540' || lid =='11287'){
			    	lpcwc_vc = getVisitorCookie(cv_cookie+lid);

				 	if(lpcwc_vc == 0)
				 	{
				 		var browser=get_browser_info();

				 		 cwcUserAgent = navigator.userAgent;
				 		 webRefferrer = document.referrer;
				 		 cwcUserBrowser = browser.name;
				 		 cwcUserVersion = browser.version;
				 		 cwcUserPlatform = navigator.platform;

				 		var prType = window.location.protocol;
				 		document.cookie = "lpcwc_vc"+lid+"=1; path=/";
				 		$.ajax({
						    //url: 'http://cwc.livserv.in/getCount.php?action=cwc_count&lid='+lid,
						    url: prType+'//cwc.livserv.in/getCount.php?action=cwc_count&lid='+lid+'&siteurl='+currentpageurl+'&webRefferrer='+webRefferrer+'&cwcUserAgent='+cwcUserAgent+'&cwcUserBrowser='+cwcUserBrowser+'&cwcUserVersion='+cwcUserVersion+'&cwcUserPlatform='+cwcUserPlatform,
						    type: 'get',
						    success: function(data){
						        console.log(":: No of Visits :: " + data);
						    }
						  });
				 	}
			    }*/

		    }else{
		    	var myTag=document.getElementsByTagName("script");
				var src= myTag[myTag.length-1].src;

				var lid=unescape(src).split("lid=")[1].split("&")[0];
				var newsrc = src;
				newsrc = newsrc.replace("chat.js?lid="+lid,"ajax.php?p=builders/getSettings&lid="+lid+"&currentpageurl="+currentpageurl);
			 	readTextFile(newsrc,lid);

			 	console.log("on-length");
		    }

 		} catch (e) {
		console.log("cwc is inactive.");
		}
}());

function readTextFile(newsrc,lid)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", newsrc, true);
    rawFile.send(null);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				if(document.getElementById('ls_theLayer'))
				{
				}else{
					allText = rawFile.responseText;
					allText = JSON.parse(allText);

					str = JSON.stringify(allText);
					//console.log("All Text ::"+str);

					if(allText.status==1)
					{
						if(window.location.protocol == 'https:'){
							var siteurl = (allText.url).replace("http","https");
						}else{
							var siteurl = allText.url;
						}
						var templateurl = allText.templateurl;
						var icon_url = allText.icon_url;
						alldivs = allText.divs;

						//console.log("All divs :: "+' 0: '+alldivs[0]+' 1: '+alldivs[1]+' 2: '+alldivs[2]+' 3: '+alldivs[3]+' 4: '+alldivs[4]);

						if(window.innerWidth<550) allText.viewheight = '';

						//include css
						//alert('head :'+document.getElementsByTagName('head')[0]+'link :'+document.createElement('link'));

						if(lid == '20237' || lid == '7980' || lid == '9527'){
							
							var head  = document.getElementsByTagName('head')[0];
							var link  = document.createElement('link');
							link.rel  = 'stylesheet';
							link.type = 'text/css';
							link.href = '#';
							link.media = 'all';
							head.appendChild(link);
						}else{

							var head  = document.getElementsByTagName('head')[0];
							var link  = document.createElement('link');
							link.rel  = 'stylesheet';
							link.type = 'text/css';
							link.href = siteurl+'css/animate.css';
							link.media = 'all';
							head.appendChild(link);
						}


						if(allText.css.length>0)
						{
							for(var i=0; i<allText.css.length; i++)
							{
								var link  = document.createElement('link');
								link.rel  = 'stylesheet';
								link.type = 'text/css';
								link.href = siteurl+templateurl+allText.css[i];
								link.media = 'all';
								head.appendChild(link);
							}

						}

						if(allText.content.length>0)
						{

							divTag.innerHTML = allText.content;
 							document.body.appendChild(divTag);

							if(document.getElementById('chaticon')){

							   document.getElementById('chaticon').src = siteurl+icon_url;

							}

							var popupdiv = alldivs[0];
							// Setting Time Intervel for chat window
							if(allText.from_time != "NULL"){
								//alert("in time...");
								var date = new Date();
						        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
						        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
						        hours = hours < 10 ? "0" + hours : hours;
						        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
						        //var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
						        //time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
						        time = hours + ":" + minutes + " " + am_pm;

						        //alert("Time :: "+time);

						        var fromTime = "11/24/2014 "+allText.from_time+" "+allText.f_time;
						        var toTime = "11/24/2014 "+allText.to_time+" "+allText.t_time;

						        //alert("FT :: "+fromTime+" "+"TT :: "+toTime);
						        //var toTime = "11/24/2014 06:00 PM";
								var currentTime = "11/24/2014 "+time;
								//var currentTime = "11/24/2014 10:01 AM";
								//alert("Now :: "+currentTime);
								//var aDate= new Date(a).getTime();
								//var bDate = new Date(b).getTime();
								var f_Time = new Date(Date.parse(fromTime));
								var t_Time = new Date(Date.parse(toTime));
								var c_Time = new Date(Date.parse(currentTime));

								if(f_Time >= c_Time || t_Time <= c_Time){

									//alert("Window is Dissabled...");
									document.getElementById("livprop_popup1").style.opacity = 0;
									document.getElementById("livprop_popup1").style.visibility = 'hidden';
									document.getElementById("livprop_popup1").style.display = 'none !important';
								}
								else{
									//alert("Window is Enabled...");
								}
							}

							var buttonImage = alldivs[4];
							var modelHeader = alldivs[2];
							var livPop = alldivs[1];

							// Model header settings
							if(allText.mh_pTop)
							{
								document.getElementById(modelHeader).style.paddingTop=allText.mh_pTop; //Need dynamic
								document.getElementById(modelHeader).style.paddingRight=allText.mh_pRight; //Need dynamic
								document.getElementById(modelHeader).style.paddingBottom=allText.mh_pBottom; //Need dynamic
								document.getElementById(modelHeader).style.paddingLeft=allText.mh_pLeft; //Need dynamic
							}
							// Model header border settings
							if(allText.mh_bTopRadius)
							{
								document.getElementById(modelHeader).style.borderTopLeftRadius=allText.mh_bTopRadius; //Need dynamic
								document.getElementById(modelHeader).style.borderTopRightRadius=allText.mh_bTopRadius; //Need dynamic

								document.getElementById(livPop).style.borderRadius=allText.mh_bTopRadius; //Need dynamic
							}


							// Window / Button Position LEFT / RIGHT
							if(allText.wp == "left"){
								document.getElementById(popupdiv).style.left=allText.wps;
								document.getElementById(popupdiv).style.bottom = allText.wbs;

								//Button Settings Left
								document.getElementById(buttonImage).style.left=allText.buttonRL;   //Need dynamic
								document.getElementById(buttonImage).style.marginBottom=allText.buttonMB;  //Need dynamic


							}else{
								document.getElementById(popupdiv).style.right=allText.wps;
								document.getElementById(popupdiv).style.bottom = allText.wbs;


								//Button Settings Right
								document.getElementById(buttonImage).style.right=allText.buttonRL;  //Need dynamic
								document.getElementById(buttonImage).style.marginBottom=allText.buttonMB; //Need dynamic

							}


							// For Window Minimize Desktop
							if(allText.cmd == 'yes'){
								var screenSize = screen.width;
								if(screenSize < 700){
				                  document.getElementById('chat_window').style.display='block';
				                  document.getElementById('livchat_close').innerHTML = '-';
				                }else{
				                  document.getElementById('livchat_close').innerHTML = '-';
				                  document.getElementById('chat_window').style.display='none';
				                }
							}

							// For Window Minimize Mobile
							if(allText.cmm == 'yes'){
								var screenSize = screen.width;
								if(screenSize < 700){
								  document.getElementById('livchat_close').innerHTML = '-';
				                  document.getElementById('chat_window').style.display='none';

				                }else{
				                  document.getElementById('chat_window').style.display='block';
				                  document.getElementById('livchat_close').innerHTML = '-';

				                }
							}

							// For Window Minimize Desktop
							if(allText.cmm == 'yes' && allText.cmd == 'yes'){
								if(window.innerWidth < 700){
				                  document.getElementById('livchat_close').innerHTML = '-';
				                  document.getElementById('chat_window').style.display='none';
				                }else{

				                  document.getElementById('livchat_close').innerHTML = '-';
				                  document.getElementById('chat_window').style.display='none';
				                }
							}

							// Chat Disable on Mobile
							if(allText.dmc == 'yes'){
								var screenSize = screen.width;
								if(screenSize < 700) {
								var popupdiv = alldivs[0];
								//alert(popupdiv);
								document.getElementById(popupdiv).style.opacity = 0;
								document.getElementById(popupdiv).style.visibility = 'hidden';
								document.getElementById(popupdiv).style.display = 'none !important';

								}
							}

							// Stop Animation on Mouseover
							if(allText.stop_animation == 'yes'){
								  var div = alldivs[0];

							 	  document.getElementById(div).onmouseover = function() {stopAnimation()};
								  document.getElementById(div).onmouseout = function() {startAnimation()};
								  //setTimeout(function(){ checkuseractivity(); }, allText.waitingtime);

							}//else{ startAnimation();}



							// Chat Minimize on Click
							if(allText.cmc == 'yes'){

								//check_minmaxstate();
								minmaxstate = getMinMaxCookie(cminmax);
								if(minmaxstate == 1){
									document.getElementById('livchat_close').innerHTML = '+';
									document.getElementById('chat_window').style.display='none';
								}
							}

							// Chat Minimize on click with Button
							if(allText.cmcb == 'yes'){
								minmaxBtnstate = getMinMaxButtonCookie(cminmaxButton);
								if(minmaxBtnstate == 1){
									var imagediv = alldivs[4];
									document.getElementById(imagediv).innerHTML = "<img height='"+imgHeight+"' width='"+imgWidth+"' src='"+siteurl+allText.buttonpath+"'>";
									if(allText.animation!='')
									{
										setTimeout(function(){
										document.getElementById(imagediv).style.display = 'block';
										document.getElementById(imagediv).style.animation = allText.animation+' 3s infinite';
										setTimeout(function(){ removeanimation(); }, 3000);
										}, 3000);
									}
									else document.getElementById(imagediv).style.display = 'block';

									//show button first
									var div = alldivs[0];
									document.getElementById(div).style.opacity = 0;
									document.getElementById(div).style.visibility = 'hidden';
									document.getElementById(div).style.display = 'none';
									document.getElementById(imagediv).addEventListener('click',showchat);
									document.getElementById('livchat_close').addEventListener('click',hidechat);

								}

							}

						}

						// If Logo is enabled
						if(allText.logopath != '')
						{
							document.getElementById('chaticon').style.width=allText.logoWidth; //Need dynamic
							document.getElementById('chaticon').style.height=allText.logoHeight; //Need dynamic
							document.getElementById('chaticon').style.marginRight=allText.logoMR; //Need dynamic
							document.getElementById('chaticon').style.marginLeft=allText.logoML; //Need dynamic
							document.getElementById('chaticon').style.marginTop=allText.logoMT; //Need dynamic

						}

						//include video / audio
						if(allText.av == 'yes')
						{
							if(allText.type=='Video')
							{

								var head  = document.getElementsByTagName('body')[0];
								var script  = document.createElement('script');
								script.type = 'text/javascript';
								script.src = siteurl+'js/html5lightbox.js';
								head.appendChild(script);

								var videodivTag = document.createElement("div");
								videodivTag.setAttribute('id',"livprop_videopopup");
								document.body.appendChild(videodivTag);

								var videohtml = '<a href="'+siteurl+allText.playurl+'" id="livprop_video_trigger" class="html5lightbox" data-autoplayvideo="'+((allText.videoPosition=="")?"true":"false")+'" data-width="'+allText.videoWidth+'" data-height="'+allText.videoHeight+'"></a>';
								videodivTag.innerHTML = videohtml;
								if(allText.videoPosition!='')
								{
									setvideopos = setInterval(function(){
										if(document.getElementById('html5-lightbox-box'))
										{
											clearInterval(setvideopos);
											setvideoPosition();
										}
									},1000);
								}
							}
							else if(allText.type=='Audio')
							{
								//alert("In Audio");
								var audiodivTag = document.createElement("div");
								audiodivTag.setAttribute('id',"livprop_audiopopup");
								document.body.appendChild(audiodivTag);
								var audiohtml = '<audio autoplay loop="loop"><source src="'+siteurl+allText.playurl+'"></audio>';
								audiodivTag.innerHTML = audiohtml;
							}
						}

						//include script
						if(allText.js.length>0)
						{
							var head  = document.getElementsByTagName('body')[0];
							for(var i=0; i<allText.js.length; i++)
							{
								var script  = document.createElement('script');
								script.type = 'text/javascript';
								async: true;
								var scurl = allText.js[i];
								//alert("Hello :: "+siteurl+templateurl+scurl);

								if (scurl.indexOf("http://") == 0 || scurl.indexOf("https://") == 0) script.src = scurl; else script.src = siteurl+templateurl+scurl;
								head.appendChild(script);
							}

						}

						//change header text
						if(allText.headertext!='')
						{
							var textdiv = alldivs[3];
							document.getElementById(textdiv).innerHTML = allText.headertext;

						}

						//change header text font size
						if(allText.headertextfontsize!='')
						{
							var textdiv = alldivs[3];
							document.getElementById(textdiv).style.fontSize = allText.headertextfontsize+'px';
						}

						//change View Width
						if(allText.viewwidth!='' && window.innerWidth>500)
						{
							var popupdiv = alldivs[1];
							document.getElementById(popupdiv).style.width = allText.viewwidth;
						}



						//change View Height
						if(allText.viewheight!='')
						{
							document.getElementById('ls_chatFrameDiv').style.height = allText.viewheight;
						}

						//change header bg color
						if(allText.headerbgcolor!='')
						{
							var headerdiv = alldivs[2];
							document.getElementById(headerdiv).style.backgroundColor = '#'+allText.headerbgcolor;
						}

						//change header text font family
						if(allText.headerfontfamily!='')
						{
							var textdiv = alldivs[3];
							document.getElementById(textdiv).style.fontFamily = allText.headerfontfamily;
						}

						//change colors
						if(allText.bgcolor!='' || allText.headercolor!='')
						{
							if(allText.bgcolor!='')
							{
								var chatdiv = alldivs[1];
								document.getElementById(chatdiv).style.backgroundColor = '#'+allText.bgcolor;
							}
							if(allText.headercolor!='')
							{
								var headdiv = alldivs[3];
								document.getElementById(headdiv).style.color = '#'+allText.headercolor;
							}
						}

						//set button image
						if(allText.buttonpath!='')
						{	//alert("In Button::"+siteurl+allText.buttonpath);
							var screenSize = screen.width;
							var imagediv = alldivs[4];

							if(allText.buttonWidth)
							{
								var imgHeight = allText.buttonWidth;
								var imgWidth = allText.buttonHeight;
							}
							if(allText.headercolor == '' || allText.headercolor == 'null'){
									 	allText.headercolor = "FFFFFF";

									 }

							document.getElementById(imagediv).innerHTML = "<img height='"+imgHeight+"' width='"+imgWidth+"' src='"+siteurl+allText.buttonpath+"'>";

							if(screenSize > 700 && allText.button_on_mobile == 'yes'){

								var div = alldivs[0];
								document.getElementById(div).style.opacity = 1;
								document.getElementById(div).style.visibility = 'visible';
								document.getElementById(div).style.display = 'block';
								document.getElementById(imagediv).addEventListener('click',showchat);
								document.getElementById('livchat_close').addEventListener('click',hidechat);
								document.getElementById('livchat_close').innerHTML = '<font color="'+allText.headercolor+'">X</font>';
							}else{

							if(allText.animation!='')
							{
								setTimeout(function(){
								document.getElementById(imagediv).style.display = 'block';
								document.getElementById(imagediv).style.animation = allText.animation+' 3s infinite';
								setTimeout(function(){ removeanimation(); }, 3000);
								}, 3000);
							}
							else document.getElementById(imagediv).style.display = 'block';
							//show button first
							var div = alldivs[0];
							document.getElementById(div).style.opacity = 0;
							document.getElementById(div).style.visibility = 'hidden';
							document.getElementById(div).style.display = 'none';
							document.getElementById(imagediv).addEventListener('click',showchat);
							document.getElementById('livchat_close').addEventListener('click',hidechat);
							document.getElementById('livchat_close').innerHTML = '<font color="'+allText.headercolor+'">X</font>';
							}

						}
						else
						{  //console.log('NO Button');
							if(allText.headercolor == '' || allText.headercolor == 'null'){
							    allText.headercolor = "FFFFFF";
							}

							if(document.getElementById('chat_window').style.display=='none')
							{

							setTimeout(function(){
								var div = alldivs[0];

								document.getElementById(div).style.visibility = 'visible';
								document.getElementById(div).style.display = 'block';
								document.getElementById('livchat_close').innerHTML = '<font color="'+allText.headercolor+'">+</font>';
								document.getElementById('livchat_close').addEventListener('click',minmaxchat);
								if(allText.av == 'yes')
								{
									if(allText.type=='Video')
									{
										if(allText.videoPosition!='') setvideoPosition();
									}
								}
							 }, 3000);
							}else{

								setTimeout(function(){
								var div = alldivs[0];

								document.getElementById(div).style.visibility = 'visible';
								document.getElementById(div).style.display = 'block';
								document.getElementById('livchat_close').innerHTML = '<font color="'+allText.headercolor+'">-</font>';
								document.getElementById('livchat_close').addEventListener('click',minmaxchat);
								if(allText.av == 'yes')
								{
									if(allText.type=='Video')
									{
										if(allText.videoPosition!='') setvideoPosition();
									}
								}
							 }, 3000);
							}

						}

						if(allText.waitingtime!='' && allText.alertanimation!='' && allText.alertduration!='')
						{
							var div = alldivs[0];
							//alert('waitingtime ::'+div);
							document.getElementById(div).addEventListener('mousemove',checkmouseonpopupfn);
							setTimeout(function(){ checkuseractivity(); }, allText.waitingtime);
						}

					}
				}
            }
        }
    }
}


function stopAnimation() {

	//alert("Stop") ;
	document.cookie = "startstopAnimation=1; path=/";
	/*setTimeout(function(){

		document.getElementById('livprop_popup1').style.animation = '';

		}, 3000);*/
}
function startAnimation() {
	 //alert("Start") ;
	document.cookie = "startstopAnimation=0; path=/";
	/*setTimeout(function(){

	document.getElementById('livprop_popup1').style.animation = allText.animation+' 3s infinite';

	}, 3000);*/
}

function ls_chatstarted()
{

	document.cookie = "checkmouseonpopup=1; path=/";
	removealert();
}

function checkmouseonpopupfn()
{
	removealert();
}

// To get Animation cookie
function getStartStopAnimation(startstopAnimation) {
    var name3 = startstopAnimation + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name3) == 0) {
            return c.substring(name3.length, c.length);
        }
    }
    return "";
}


// To get Animation cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// To Stop Animation cookie
function getMinMaxCookie(minmaxstate) {
    var name1 = minmaxstate + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name1) == 0) {
            return c.substring(name1.length, c.length);
        }
    }
    return "";
}


function getMinMaxButtonCookie(minmaxButtonstate) {
    var name2 = minmaxButtonstate + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name2) == 0) {
            return c.substring(name2.length, c.length);
        }
    }
    return "";
}

//Get Visitor Cookie
function getVisitorCookie(cv_cookie) {
    var name3 = cv_cookie + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name3) == 0) {
            return c.substring(name3.length, c.length);
        }
    }
    return "";
}


function checkuseractivity()
{
	startstopAnimation = getStartStopAnimation(cssAnimation);

	checkmouseonpopup = getCookie(cname);

	if(checkmouseonpopup==0 && startstopAnimation==0)
	{
		//checkmouseonpopup = 1;
		var div = alldivs[0];
		if(allText.buttonpath!='')
		{
			if(document.getElementById(div).style.display=='block') document.getElementById(div).style.animation = allText.alertanimation+' 3s infinite';
			else
			{ //alert("Animation :: "+allText.animation);
				var imagediv = alldivs[4];
				if(allText.animation!='') document.getElementById(imagediv).style.animation = allText.animation+' 3s infinite';
				else document.getElementById(imagediv).style.animation = allText.alertanimation+' 3s infinite';
			}
		}else
		if(startstopAnimation == 1){
			//document.getElementById(div).style.animation = '';
			setTimeout(function(){ removealert(); }, allText.alertduration);
		}
		else
		{
			document.getElementById(div).style.animation = allText.alertanimation+' 3s infinite';
			//document.getElementById(div).style.animation = '';
		}
		setTimeout(function(){ removealert(); }, allText.alertduration);
	}
	else setTimeout(function(){ checkuseractivity(); }, allText.waitingtime);
}

function removealert()
{
	//checkmouseonpopup = 0;
	var div = alldivs[0];
	if(allText.buttonpath!='')
	{
		if(document.getElementById(div).style.display=='block') document.getElementById(div).style.animation = '';
		else
		{
			var imagediv = alldivs[4];
			if(allText.animation!='') document.getElementById(imagediv).style.animation = '';
			else document.getElementById(imagediv).style.animation = '';
		}
	}
	else
	{
		document.getElementById(div).style.animation = '';
	}
	if(checkmouseonpopup==0)setTimeout(function(){ checkuseractivity(); }, allText.waitingtime);
}

function showchat()
{
	//alert("In showchat()");
	//console.log("In showchat()");
	document.cookie = "minmaxButtonstate=0; path=/";


	var div = alldivs[0];
	document.getElementById(div).style.opacity = 1;
	document.getElementById(div).style.visibility = 'visible';
	document.getElementById(div).style.display = 'block';
	document.getElementById(div).style.animation = 'slideInUp 3s infinite';
	var imagediv = alldivs[4];
	document.getElementById(imagediv).style.display = 'none';
}

function hidechat()
{
	//alert("In hidechat()");
	//console.log("In hidechat()");
	document.cookie = "minmaxButtonstate=1; path=/";


	var div = alldivs[0];
	document.getElementById(div).style.opacity = 0;
	document.getElementById(div).style.visibility = 'hidden';
	document.getElementById(div).style.display = 'none';
	document.getElementById(div).style.animation = 'slideOutDown 3s infinite';

	var imagediv = alldivs[4];
	document.getElementById(imagediv).style.display = 'block';
	document.getElementById(imagediv).style.animation = allText.animation+' 3s infinite';
	setTimeout(function(){ removeanimation(); }, 3000);
}


function minmaxchat()
{

	 if(allText.cmc == 'yes'){
	 	if(minmaxstate == 0){
			document.cookie = "minmaxstate=1; path=/";
		//document.cookie = name+"="+value+expires+"; path=/; domain="+domain;
		}else{
			document.cookie = "minmaxstate=0; path=/";
		}
	 }

	if(document.getElementById('chat_window').style.display=='none')
	{
		document.getElementById('chat_window').style.display='block';
		document.getElementById('livchat_close').innerHTML = '<font color="'+allText.headercolor+'">-</font>';
	}
	else
	{
		document.getElementById('livchat_close').innerHTML = '<font color="'+allText.headercolor+'">+</font>';
		document.getElementById('chat_window').style.display='none';
	}
	if(allText.av == 'yes')
	{
		if(allText.type=='Video')
		{
			if(allText.videoPosition!='') setvideoPosition();
		}
	}
}

function removeanimation()
{
	var imagediv = alldivs[4];
	document.getElementById(imagediv).style.animation = '';
}

function setvideoPosition()
{
	if(allText.videoPosition!='' && window.innerWidth>500)
	{
		document.getElementById('html5-lightbox-box').style.margin = '10px';
		var cssstyle = '.topleft{left:0 !important; top:0 !important;}.topright{right:0 !important; top:0 !important;}.bottomleft{left:0 !important; bottom:0 !important;}.bottomright{right:0 !important; bottom:0 !important;}.center{left:35% !important; top:25% !important;}#html5box-html5-lightbox{width:'+(parseInt(allText.videoWidth)+50)+'px;height:'+(parseInt(allText.videoHeight)+30)+'px;}.abovechat{right:0 !important; bottom:'+document.getElementById('livprop_popup1').clientHeight+'px !important;}';
		if(document.getElementById('livprop_video_pos')) document.getElementById('livprop_video_pos').remove();
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'livprop_video_pos';
		if (style.styleSheet){
		  style.styleSheet.cssText = cssstyle;
		} else {
		  style.appendChild(document.createTextNode(cssstyle));
		}
		document.body.appendChild(style);
		var cssid = document.getElementById('html5box-html5-lightbox');
		cssid.style.left = '';
		switch(allText.videoPosition)
		{
			case 'topleft':
				cssid.className = 'topleft';
				break;
			case 'topright':
				cssid.className = 'topright';
				break;
			case 'bottomleft':
				cssid.className = 'bottomleft';
				break;
			case 'bottomright':
				cssid.className = 'bottomright';
				break;
			case 'center':
				cssid.className = 'center';
				break;
			case 'abovechat':
				cssid.className = 'abovechat';
				break;
		}
	}
	else if(window.innerWidth<=500)
	{
		document.getElementById('html5-lightbox-box').style.margin = '10px';
		var cssstyle = '.center{left:5% !important; top:20% !important;}';
		if(document.getElementById('livprop_video_pos')) document.getElementById('livprop_video_pos').remove();
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'livprop_video_pos';
		if (style.styleSheet){
		  style.styleSheet.cssText = cssstyle;
		} else {
		  style.appendChild(document.createTextNode(cssstyle));
		}
		document.body.appendChild(style);
		var cssid = document.getElementById('html5box-html5-lightbox');
		cssid.style.left = '';
		switch('center')
		{
			case 'center':
				cssid.className = 'center';
				break;
		}
	}
}



