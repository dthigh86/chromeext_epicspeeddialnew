function API() {
    return chrome.extension.getBackgroundPage().api
}



var newResString="<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<style>\n\t\t\t.amazonDonates\n\t\t\t{\n\t\t\t\tfont-size: 12px;\n\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: -webkit-calc(21% + 21px);\n\t\t\t\tright: 10px;\n\n\t\t\t\twidth: 255px;\n\t\t\t\tpadding: 5px;\n\t\t\t\tborder: 0.15em double #CCCCCC;\n\t\t\t\t\n\t\t\t\tline-height: 1.3em;\n\t\t\t\tcolor: grey;\n\t\t\t\t\n\t\t\t\tbackground: rgb(255, 255, 255);\n\t\t\t\tvertical-align: middle;\n\t\t\t}\n\n\t\t\t.amazonDonates > a\n\t\t\t{\n\t\t\t\ttext-decoration: none;\n\n\t\t\t\tcolor: rgb(56, 200, 240);\n\n\t\t\t}\n\t\t</style>\n\n\t</head>\t\n\t<body>\n\t\t\n\t\t<div class=\"amazonDonates\">\n\t\t\t<h3 style=\"display:inline;\">Epic protects your privacy more than ever</h3>\n\t\t\t<hr class=\"hrborder\"/> \n\t\t\t<span style=\"padding-top:5px;\">Incognito and other private browsing modes don't protect you. Your browsing history is still stored on your computer and tracked by Google, your ISP, your government, and hundreds of data collectors.<br /></span>\n\t\t\t<hr class=\"hrborder\"/> \n\t\t\t<span style=\"padding-top:5px;\">Integrated Video Downloading is now built into Epic :-)<br /></span>\n\t\t\t<hr class=\"hrborder\"/>\n\t\t\t<hr class=\"hrborder\"/>  \n\t\t\t<h3 style=\"display:inline;\">Support Epic</h3>\n\t\t\t<hr class=\"hrborder\"/> \n\t\t\t<span style=\"padding-top:5px;\">Just a cup of coffee keeps us going :-) <br /></span>\n\t\t\t<a href=\"https://www.epicbrowser.com/donate.html\">Donate here</a><br />\n\t\t</div>\n\n\t</body>\n</html>\n<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<style>\n\t\t\t.amazonDonates\n\t\t\t{\n\t\t\t\tfont-size: 12px;\n\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: -webkit-calc(21% + 21px);\n\t\t\t\tright: 10px;\n\n\t\t\t\twidth: 255px;\n\t\t\t\tpadding: 5px;\n\t\t\t\tborder: 0.15em double #CCCCCC;\n\t\t\t\t\n\t\t\t\tline-height: 1.3em;\n\t\t\t\tcolor: grey;\n\t\t\t\t\n\t\t\t\tbackground: rgb(255, 255, 255);\n\t\t\t\tvertical-align: middle;\n\t\t\t}\n\n\t\t\t.amazonDonates > a\n\t\t\t{\n\t\t\t\ttext-decoration: none;\n\n\t\t\t\tcolor: rgb(56, 200, 240);\n\n\t\t\t}\n\t\t</style>\n\n\t</head>\t\n\t<body>\n\t\t\n\t\t<div class=\"amazonDonates\">\n\t\t\t<h3 style=\"display:inline;\">Epic protects your privacy more than ever</h3>\n\t\t\t<hr class=\"hrborder\"/> \n\t\t\t<span style=\"padding-top:5px;\">Incognito and other private browsing modes don't protect you. Your browsing history is still stored on your computer and tracked by Google, your ISP, your government, and hundreds of data collectors.<br /></span>\n\t\t\t<hr class=\"hrborder\"/> \n\t\t\t<span style=\"padding-top:5px;\">Integrated Video Downloading is now built into Epic :-)<br /></span>\n\t\t\t<hr class=\"hrborder\"/>\n\t\t\t<hr class=\"hrborder\"/>  \n\t\t\t<h3 style=\"display:inline;\">Support Epic</h3>\n\t\t\t<hr class=\"hrborder\"/> \n\t\t\t<span style=\"padding-top:5px;\">Just a cup of coffee keeps us going :-) <br /></span>\n\t\t\t<a href=\"https://www.epicbrowser.com/donate.html\">Donate here</a><br />\n\t\t</div>\n\n\t</body>\n</html>\n"


function slotshelper(){
	
	

var old_slots = []
var new_slots = []
//console.log(localStorage.getItem('slots'));

var old_slots = JSON.parse(localStorage.getItem('slots'));


if(old_slots){
       for(i =0; i<old_slots.length ; i++){
        old_slot = old_slots[i]
         if(old_slot){
            check_old = "emptyThumbnail_"+encodeURIComponent(old_slot.url)
            var old_pattern =  localStorage.getItem(check_old); 
               if(old_pattern)
                  old_slot.thumb = localStorage.getItem(encodeURIComponent(old_slot.url))

              //for epic browser urls
									 if(sameUrl(old_slot.url, presetUrls[0])){
										 
										old_slot.thumb = "img/how-epic-work-thumbnail.png"
										old_slot.blocked = true
									 }
									 if(sameUrl(old_slot.url,presetUrls[1])){
										 console.log('here11')
										old_slot.thumb = "img/epic-search-thumbnail.png";
										old_slot.blocked = true
									 } 
           // localStorage.clear(check_old);
             //localStorage.clear(old_slot.url);
          }
          //localStorage.clear('emptyPreview');
          new_slots.push(old_slot);
        }
        new_slots =JSON.stringify(new_slots)
        localStorage.setItem("slots", new_slots);


    return new_slots;
    }
return [];

}
 	
   
var app = angular.module("NewTabApp", ['ngRetina']);
app.config(["$compileProvider", function($compileProvider) {
    var whiteList = /^\s*(https?|ftp|file|blob|chrome-extension):|data:image\//;
    $compileProvider.imgSrcSanitizationWhitelist(whiteList), $compileProvider.aHrefSanitizationWhitelist(whiteList)
}]), app.factory("SlotsProvider", ["$rootScope", function() {
    var SlotProviderClass = function() {
		
        var self = this;
        self.slots = [];
        for (var i = 0; 15 > i; i++) {
            var slot = {
                title: void 0,
                url: void 0,
                thumb: void 0,
                index: i,
                blocked: !1,
                id:i
            };
            slot.__defineGetter__("$title", function() {
                var title = void 0;
                return this.title ? title = this.title : this.url && (title = clearUrl(this.url)), title
            }), self.slots.push(slot)
        }
        self.slot = function(index) {
            return self.slots[index]
        }, self.empty = function(index) {
            var slot = self.slot(index);
            slot.url = void 0, slot.thumb = void 0, slot.title = void 0, slot.blocked = void 0, self.flush(index)
        }, self.flush = function(index) {
            var newSlots = [];
            return $(self.slots).each(function(index, item) {
                var slot = {};
                console.log(item)
				
                slot.title = item.title, slot.url = item.url, slot.thumb = item.thumb, slot.blocked = item.blocked, newSlots.push(slot)
            }), API().saveSlots(newSlots,index), newSlots
        }
    };
    return new SlotProviderClass
}]), app.directive("ngRightClick", function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind("contextmenu", function(event) {
            scope.$apply(function() {
                event.preventDefault(), fn(scope, {
                    $event: event
                })
            })
        })
    }
}), app.controller("EntryPointCtrl", ["$rootScope", "$scope", "SlotsProvider", function($rootScope, $scope, SlotsProvider) {
    try{
    
    $(API().getSlots()).each(function(index, item) {
        var slot = SlotsProvider.slot(index);
        if(item){
        slot.title = item.title, slot.url = item.url, slot.thumb = item.thumb, slot.blocked = item.blocked}
    });
    
    }catch(e){
        
         slots = JSON.parse(localStorage.getItem('slots'))
		 
         if(slots){

                for(var i =0 ; i < slots.length; i++){
                      var slot = SlotsProvider.slot(i);
                      slot.title = slots[i].title, 
                      slot.url = slots[i].url, 
                      slot.thumb = slots[i].thumb, 
                      slot.blocked = slots[i].blocked;      
                }
        }
  
    }
    

  $scope.mainURL = localStorage.getItem('rand')+".png";
    
    var hideButton = $(".trackersInfoSeeNow .hide"),
        showButton = $(".trackersInfoSeeNowShowArrow"),
       toggleFunc = function() {
            
            $(".trackersInfoSeeNow .hide").parent().css('visibility','hidden'), showButton.css('visibility','visible'),localStorage.setItem("hide",1)
        };
        toggleFunc1 = function(){
         
            $(".trackersInfoSeeNow .hide").parent().css('visibility','visible'), showButton.css('visibility','hidden'),localStorage.setItem("hide",0)        
        };
    hideButton.click(toggleFunc), showButton.click(toggleFunc1), chrome.extension.onMessage.addListener(function(message, sender) {
        console.log(sender, message), message.isSlotUpdated && ($(SlotsProvider.slots).each(function(i, slot) {
            console.log(i, slot), !slot.blocked && sameUrl(slot.url, message.url) && (slot.thumb = message.thumb_uri)
        }), $rootScope.$digest())
    }), $("#cookiesCounter").flipCounter({
        number: parseInt(localStorage.getItem('newCCount'))  ? parseInt(localStorage.getItem('newCCount')) : 0
    }), $("#trackersCounter").flipCounter({
        number: parseInt(localStorage.getItem('newACount')) && parseInt(localStorage.getItem('newCCount')) ? (parseInt(localStorage.getItem('newACount')) + parseInt(localStorage.getItem('newCCount')) )  : 0
    }), $(document.body).css("display", "block")
}]), 
app.controller("SlotsCtrl", ["$rootScope", "$scope", "SlotsProvider", function($rootScope, $scope, SlotsProvider) {
    
    function onResize() {
        var scrWidth = window.innerWidth,
            scrHeight = window.innerHeight;
        scrWidth -= 240, scrHeight -= 150;
        var newSlotWidth = (scrWidth - 125) / 5.80;    //For to resize the thumbnail window box, increase / decrease the value of denominator.
        newSlotWidth = Math.max(newSlotWidth, 90);
        var newSlotHeight = newSlotWidth / 1.4;
		
		//alert(scrWidth)
		
        $scope.slotStyle = {
            content: {
                "margin-top": newSlotHeight / 10 + "px"
            },
            slot: {
                width: newSlotWidth + "px",
                height: newSlotHeight + "px"
            },   
            thumb: {
                "line-height": newSlotHeight + "px",
                width: newSlotWidth + "px",
                height: newSlotHeight + "px"
            },
            img: {},
            plus: {
                "line-height": newSlotHeight + "px",
                width: newSlotWidth + "px",
                height: newSlotHeight + "px"
				
				
            }
        }
    }
	
    var model = {
        slots: SlotsProvider.slots
    };
	
    $scope.model = model, $scope.edit = function(slot) {
        $rootScope.$broadcast("edit", slot.index)
    }, $scope.openURL = function(slot) {
        window.location.href = slot.url
        localStorage.setItem("stack",slot.id)
    }, $(window).resize(function() {
        onResize(), $scope.$digest()
		
    }), onResize(), $scope.openContext = function($event, slot) {
		
		
        if (!slot.blocked) {
            var menu = [{
                title: "Edit",
                action: function() {
                    $rootScope.$broadcast("edit", slot.index)
                }
            }, {
                separator: !0
            }, {
                title: "Delete",
                action: function() {
                    SlotsProvider.empty(slot.index)
                }
            }];
            $rootScope.$broadcast("open-context", {
                index: slot.index,
                clientX: $event.clientX,
                clientY: $event.clientY,
                menu: menu
				
            })
        }// By Ali s
    }
}]), app.controller("EditPopupCtrl", ["$rootScope", "$scope", "SlotsProvider", function($rootScope, $scope, SlotsProvider) {
	
    function close() {
        $scope.showPopup = !1, $rootScope.$broadcast("overlay", !1)
    }
    $scope.showPopup = !1, $scope.$on("edit", function($event, index) {
        $scope.showPopup = !0, $rootScope.$broadcast("overlay", !0), setTimeout(function() {
            $(".popup input").focus()
        }, 100);
        var slot = SlotsProvider.slot(index);
		
        $scope.editUrl = slot.url, $scope.save = function() {
            var url = $scope.editUrl || "";
            urlCheck(url) ? (slot.url = fixURL(url), slot.title=clearUrl(url) ,SlotsProvider.flush(index), close()) : alert("Please enter a valid URL")
        }, $scope.cancel = function() {
            close()
        }
    })
}]), app.controller("OverlayCtrl", ["$rootScope", "$scope", "SlotsProvider", function($rootScope, $scope) {
	
    $scope.showOverlay = !1, $scope.$on("overlay", function($event, show) {
        $scope.showOverlay = show
    })
}]), app.controller("SlotContextMenuCtrl", ["$scope", "SlotsProvider", function($scope) {
    $scope.visibleContext = !1, $scope.style = {
        top: 0,
        left: 0
    }, $scope.$on("open-context", function($event, data) {
        $scope.visibleContext = !0, $scope.style.left = data.clientX + "px", $scope.style.top = data.clientY + "px", $scope.menu = data.menu, $(document).on("click", function() {
            $(document).unbind("click"), $scope.visibleContext = !1, $scope.$digest()
        })
    })
}]), app.controller("FooterCtrl", ["$scope", "SlotsProvider", function($scope) {
    $scope.showTrick = !1;
	
    var menu = [{
        header: "../img/tipandtrick/logo-header.png",
        text: "../img/tipandtrick/logo-text.png"
    }, {
        header: "../img/tipandtrick/cookies-header.png",
        text: "../img/tipandtrick/cookies-text.png"
    }, {
        header: "../img/tipandtrick/trackers-header.png",
       /* text: "../img/tipandtrick/trackers-text.png"*/
    }];
    $scope.show = function(index) {
		
        $scope.index == index ? $scope.close() : ($scope.index = index, $scope.showTrick = !0, $scope.headerImg = menu[index].header, $scope.contentImg = menu[index].text)
    }, $scope.close = function() {
        $scope.showTrick = !1, $scope.index = void 0
    },
    $(document).ready(function(){ 
        getAdFromBackground();
        he = localStorage.getItem("hide"), 

        (he !=null && he==true) ? ($(".trackersInfoSeeNowShowArrow").css('visibility','visible'), $(".trackersInfoSeeNow .hide").parent().css('visibility','hidden')):

            ($(".trackersInfoSeeNowShowArrow").css('visibility','hidden'),
                $(".trackersInfoSeeNow .hide").parent().css('visibility','visible')
              )
        }
        
    );
     chrome.tabs.onUpdated.addListener(function (tid,c,t) {
        setTimeout(function(){
            
            
            $("#cookiesCounter").flipCounter({number:parseInt(localStorage.getItem('newCCount'))}); 
            $("#trackersCounter").flipCounter({number:parseInt(localStorage.getItem('newACount'))});               
      },200);
   });
     scope=null;
}]);


function getAdFromBackground(){
	

    resString = localStorage.getItem("resString");
	
      if(resString)
            document.getElementById("newTabAd").innerHTML = resString;
        else
            document.getElementById("newTabAd").innerHTML = newResString;
   
}


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



 $(document).on('click', '.close', function () {
       setCookie('ist_message', 1, 30);
	   $('.istmessageclass').hide();
    });
	
	 $(document).on('click', '.btn-success', function () {
         setCookie('second_message', 1, 30);
		  document.getElementById("seccondcookie").style.display = "none";
		  document.getElementById("messageboxv").style.display = "none";
    });
	
function setCookie(cname, cvalue, exdays) {
	  var d = new Date();
	  d.setTime(d.getTime() + (exdays*24*60*60*1000));
	  var expires = "expires="+ d.toUTCString();
	  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(document).on('click', '.chnage_search_epic', function () {
	
	setCookie('epic_search', 1, 30);
		
    $('.search-form').attr('action', 'https://www.epicsearch.in/search');
	$('#searchinpout').attr('name', 'q'); // change the name of first input
	$('.linkdiv').html('<a href="javascript:void(0)" class="chnage_search_yahoo">click here to set the above search box to Yahoo Search</a>'); // change the name of first input
	
});

$(document).on('click', '.chnage_search_yahoo', function () {	
    
    document.cookie = "epic_search=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    var countrycookie  = getCookie('country');
	if(countrycookie=='us'){
		countrycookie ='';
		$('.search-form').attr('action', "https://search.yahoo.com/yhs/search?");
	}else{
		$('.search-form').attr('action', "https://"+countrycookie+".search.yahoo.com/yhs/search?");
	}
   
	$('#searchinpout').attr('name', 'p'); // change the name of first input
	$('.linkdiv').html('<a href="javascript:void(0)" class="chnage_search_epic">click here to set the above search box to EpicSearch.in</a>'); // change
});

$('body').on('click', '.search_options', function() {
   $('#search_option_dialogue').show();
   
});



$(document).on('click', '.search_options', function() {
   $('#search_option_dialogue').show();
   $(".amazonDonates").css("top", "-webkit-calc(32% + 21px)");
   $(".slotsContainer").css("margin-top", "100px");
   
});


$(document).on('click', '.close', function() {
	

	$(".slotsContainer").css('margin-top',12.3276);
   $('#search_option_dialogue').hide();
   $(".amazonDonates").css("top", "-webkit-calc(19% + 21px)");
   
});


$(document).on('click', '.browser', function() {

   $('.browsershow').show();
    $('.trackershow').hide();
   
});

$(document).on('click', '.tracker', function() {
	 $('.trackershow').show();
     $('.browsershow').hide();
});

//document.cookie = "ist_message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//document.cookie = "second_message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


$( document ).ready(function() {
	
    var istcookie      = getCookie('ist_message');
	var seccondcookie  = getCookie('second_message');
	
	if(istcookie==1){
		 $('#istmessageclass').hide();
	}else{
	     $('#istmessageclass').show();	
	}
	if(seccondcookie==1){
		 $('#seccondcookie').hide();
		 $('#messageboxv').hide();
	}else{
		 $('.messagebox').show();
		 $('#messageboxv').show();
		 $('#seccondcookie').show();
         $('#myModal').show();
	}
});

$( document ).ready(function() {
	
	var epic_search = getCookie('epic_search');
	
	
	if(epic_search==1){
		 $('.search-form').attr('action', 'https://www.epicsearch.in/search');
	     $('#searchinpout').attr('name', 'q'); // change the name of first input
	     $('.linkdiv').html('<a href="javascript:void(0)" class="chnage_search_yahoo">click here to set the above search box to Yahoo Search</a>'); 
	}else{
	
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://update.epicbrowser.com/?country",
					"method": "GET",
					"headers": {
					  "content-type": "application/json",
					  "x-api-key": "kTpOzP4m4S4rJlCa18Kv1CXdZifnNTL4",
					  "cache-control": "no-cache"
					}
				}
				var countrycookie  = getCookie('country');
				
				if(countrycookie==''){
							$.ajax(settings).done(function (response) {
								setCookie('country', response, 1);
								if(response=='us'){
									response ='';
								}else{
									$('.search-form').attr('action', "https://"+response+".search.yahoo.com/yhs/search?");
									$('.show_other_hidden').show();
								}
							});
				}else{
				
					if(countrycookie=='us'){
						countrycookie ='';
					}else{
						$('.search-form').attr('action', "https://"+countrycookie+".search.yahoo.com/yhs/search?");
						$('.show_other_hidden').show();
					}
				}
	}
});
	
	
		