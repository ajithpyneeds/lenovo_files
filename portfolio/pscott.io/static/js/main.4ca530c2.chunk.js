(this["webpackJsonpnew-pk"]=this["webpackJsonpnew-pk"]||[]).push([[0],{29:function(e,t,a){e.exports=a(46)},34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),i=a(23),r=a.n(i),c=(a(34),a(12)),s=a(4),l=a(10),m=a(7),p=a(6),h=a(8),u=(a(35),window.location.href.includes("localhost")?"http://localhost:3000/#/":"https://pscott.io/#/"),d=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("message",(function(e){"portfolio"!==e.data&&"about"!==e.data||(window.location="".concat(u).concat(e.data))}))}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("iframe",{src:"https://particle-frame.herokuapp.com/"}),o.a.createElement("img",{class:"hidden",src:"images/availabook.png"}),o.a.createElement("img",{class:"hidden",src:"images/carolinaposting.png"}),o.a.createElement("img",{class:"hidden",src:"images/cryptoticker.png"}),o.a.createElement("img",{class:"hidden",src:"images/everest.png"}),o.a.createElement("img",{class:"hidden",src:"images/fatejs.png"}),o.a.createElement("img",{class:"hidden",src:"images/github-colorizer.png"}),o.a.createElement("img",{class:"hidden",src:"images/swa.png"}),o.a.createElement("img",{class:"hidden",src:"images/this-portfolio.png"}),o.a.createElement("img",{class:"hidden",src:"images/v2v.png"}))}}]),t}(o.a.Component),g=a(20),b=a(14),f=a(24);a(36);function v(e){return o.a.createElement("div",{className:"ProjectOverlay"},o.a.createElement("div",{id:"closeProject",title:"Close",onClick:function(){e.setProject(!1)}},o.a.createElement(f.a,null)),o.a.createElement("div",{className:"project"},o.a.createElement("h1",{id:"project-heading"},e.project.name),o.a.createElement("div",{className:"billboard-container"},o.a.createElement("img",{src:"images/"+e.project.img})),o.a.createElement("div",{className:"text-container"},o.a.createElement("h1",null,"about",o.a.createElement("a",{href:e.project.link,target:"_blank"},o.a.createElement("span",{className:"highlight",style:{fontSize:"16px",marginLeft:"10px"}},"view this project"))),o.a.createElement("hr",null),e.project.description.map((function(e){return o.a.createElement("p",null,e)})),o.a.createElement("h1",null,"technology"),o.a.createElement("ul",null,e.project.tech.map((function(e){return o.a.createElement("li",null,e)}))))))}var E=a(27),k=a(15),y=(a(37),[{name:"visas to vikas yoga",link:"http://www.visastovikasokc.com/",img:"v2v.png",description:["This is a website I built for an Upwork client's yoga program based in Oklahoma City, OK. The site was built using Node.js, Express and hosted on Heroku. This site uses the Paypal Express Checkout API to process subscription payments for the yoga program."],tech:["HTML5","CSS3","Node.js","Heroku","Paypal Express Checkout API","jQuery"]},{name:"everest",link:"http://everestjs.com/",img:"everest.png",description:["Everest is a live-trading cryptocurrency bot for the Poloniex exchange. Everest is a command line bot built with Node.js. I wanted to build a live-trading bot from a tutorial I found on Youtube. The only problem was, the bot in the tutorial was written in Python. I thought it would be a good challenge to port it over to Node.js."],tech:["Node.js","Poloniex API","Command Line"]},{name:"github heatmap colorizer",link:"https://github.com/pkellz/github-heatmap-colorizer",img:"colorizer.png",description:["This is a very simple Chrome extension that 'colorizes' your Github contribution heatmap!"],tech:["Chrome API","HTML5","CSS3","Javascript"]},{name:"availabook",link:"http://availabook.herokuapp.com/",img:"availabook.png",description:["Volunteer web application for the Thomas Cooper Library at the University of South Carolina. The application is named Availabook, as it allows students to subscribe to text message notifications when a particular book they are looking for is returned to the library.","I created Availabook because I saw a need. Students could not get reliable notification as to when an important book that they needed was returned, so I decided to pioneer this project in order to fill the void."],tech:["HTML5","CSS3","Node.js","Express","Nexmo API","MongoDB","Javascript","Heroku"]},{name:"scott web agency",link:"http://scottwebagency.com/",img:"swa.png",description:["This is my web development agency website. I develop websites for individuals and small businesses in the Columbia, SC area."],tech:["HTML5","CSS3","Heroku","Node.js","Express"]},{name:"devsage.io",link:"https://devsage.io",img:"devsage.png",description:["This is my brand website for my YouTube channel - DevSage. I market my online courses here."],tech:["Wordpress"]},{name:"inspirational styles by mika",link:"http://inspirationalstylesbymika.com/",img:"mika.png",description:["This is a Wordpress site I built for a friend of mine who styles hair!"],tech:["Wordpress"]},{name:"beer city crossfit",link:"https://beercitycrossfit.com/",img:"bccf.png",description:["I did not build this website. I was hired to do search engine optimization work on it, so I decided to include it in my portfolio."],tech:["Search Engine Optimization","Wordpress"]}]);function w(){var e=Object(n.useState)(!1),t=Object(g.a)(e,2),a=t[0],i=t[1],r=Object(n.useState)({}),c=Object(g.a)(r,2),s=c[0],l=c[1],m=Object(b.b)(a,null,{from:{opacity:0},enter:{opacity:1,position:"absolute"},leave:{opacity:0}});return o.a.createElement("div",{className:"Portfolio"},!a&&o.a.createElement(k.b,{id:"closePortfolio",to:"/",title:"Home"},o.a.createElement(E.a,null),o.a.createElement("span",null,"Home")),o.a.createElement("div",{className:"grid"},y.map((function(e){return o.a.createElement("div",{className:"blocks",onClick:function(e){i(!0),l(y.filter((function(t){return t.name===e.currentTarget.innerText}))[0])}},o.a.createElement("img",{src:"images/"+e.img}),o.a.createElement("div",{className:"overlay"},o.a.createElement("span",null,e.name)))}))),m.map((function(e){var t=e.item,a=e.key,n=e.props;return t&&o.a.createElement(b.a.div,{key:a,style:n},o.a.createElement(v,{setProject:i,project:s})," ")})))}var j=a(28),I=a.n(j);a(43),o.a.Component;function N(e,t){for(var a=new Array(e),n=0;n<a.length;n++)a[n]=new Array(t);return a}function C(e,t,a,n,o){for(var i=0,r=-1;r<2;r++)for(var c=-1;c<2;c++){var s=(a+c+o)%o;i+=e[(t+r+n)%n][s]}return i-=e[t][a]}a(44);var x=window.location.href.includes("localhost")?"http://localhost:3000/#/":"https://pscott.io/#/",S=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"About"},o.a.createElement("div",{className:"text-container"},o.a.createElement("h3",null,"const ",o.a.createElement("span",{className:"highlight"},"patrick "),"="),o.a.createElement("p",null,"I am a ",o.a.createElement("span",{className:"highlight"},"software engineer")," and ",o.a.createElement("span",{className:"highlight"},"full-stack web developer")," based in Columbia, SC. I graduated from the University of South Carolina (May'20) with a Bachelor's degree in computer science. I teach JavaScript-focused programming tutorials on ",o.a.createElement("a",{className:"highlight",target:"_blank",href:"https://www.youtube.com/channel/UCV4AXpDSxschk8I0sCl8JXw"},"Youtube"),"."),o.a.createElement("p",null,"Take a look at my ",o.a.createElement("a",{href:"https://drive.google.com/file/d/1jZLw4_bx_Y5oXGhxb3ZP9cz552tP9rgV/view",target:"_blank"},o.a.createElement("span",{className:"highlight"},"resume"))," and my ",o.a.createElement("a",{href:"https://github.com/pkellz",target:"_blank"},o.a.createElement("span",{className:"highlight"},"Github"))," account. I'm available for freelance work. You can contact me at",o.a.createElement("a",{href:"mailto:patrickscott2013@gmail.com"},o.a.createElement("span",{className:"highlight"}," patrickscott2013@gmail.com")),". If you are a recruiter, I love you, but please don\u2019t call or email me \u2764\ufe0f"),o.a.createElement("h3",{style:{fontSize:"40px"}},";"),o.a.createElement("p",{id:"back-home"},o.a.createElement("a",{href:"".concat(x)},"< back home")))))};a(45);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(k.a,null,o.a.createElement((function(){var e=Object(c.f)();return Object(b.b)(e,(function(e){return e.pathname}),{from:{opacity:0},enter:{opacity:1,position:"absolute"},leave:{opacity:0},config:{duration:2e3}}).map((function(e){var t=e.item,a=e.props,n=e.key;return o.a.createElement(b.a.div,{key:n,style:a},o.a.createElement(c.c,{location:t},o.a.createElement(c.a,{path:"/",exact:!0,component:d}),o.a.createElement(c.a,{path:"/about",component:S}),o.a.createElement(c.a,{path:"/portfolio",component:w})))}))}),null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[29,1,2]]]);
//# sourceMappingURL=main.4ca530c2.chunk.js.map