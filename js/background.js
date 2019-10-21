var randomnumber=Math.floor(Math.random()*15);
localStorage.setItem('rand',randomnumber)
var presetUrls = ["https://www.epicbrowser.com/privacy/intro.html", "https://www.epicsearch.in"];
var slots;
slots = modifyOldDataToNew() ;
var save_slots = slots;
var erm=99;
function createSlotStructure(title, thumb, url, blocked,loaded) {
    return void 0 == blocked && (blocked = !1), {
        title: title,
        thumb: thumb,
        url: url,
        blocked: blocked,
        loaded: loaded
    }
}

function cache() {
    if (0 != arguments.length) {
        var key = arguments[0];
        if (1 == arguments.length) {
            var value, raw_value = localStorage[key];
            try {
                value = JSON.parse(raw_value)
            } catch (e) {
                value = void 0
            }
            return value
        }
       r_s = arguments[1];
       if(save_slots !=undefined){
        for(i=0;i<save_slots.length;i++){
          if(save_slots[i].loaded==true)
                i==erm ? r_s[i].loaded = false : r_s[i].loaded = true
        }
       }
        //console.log("erm--------->"+erm)
        //console.log(JSON.stringify(r_s))
        2 == arguments.length && (localStorage[key] = JSON.stringify(r_s))
    }
}

function capture(url) {
    chrome.tabs.captureVisibleTab(void 0, {
        format: "png"
    }, function(data_uri) {
        try{
        //alert(data_uri)
        chrome.runtime.lastError || degradeThumbSize(data_uri, function(thumb_uri) {
            //alert("ff "+url)
           chrome.tabs.onHighlightChanged.addListener(function(e){
                    //Window Navigation Changed
                    prev = localStorage.getItem("stack")
                    if(prev != 'undefined' && prev !=8)
                       slots[prev].loaded=!0

                    localStorage.setItem("stack",8) 
                    erm=99
                 })
            $(getSlotsByUrl(url)).each(function(i, slot) {
                //alert(slot.blocked)
                //alert(i + "Prev"+ slot.loaded)
                stack = localStorage.getItem("stack")
                //console.log(slot.id+ "<-->"+slot.loaded)
                if(slot.loaded==true){
                  stack=8

                }
                if(stack!=8 && slot.id ==stack ){
                 slot.blocked || (slot.thumb = thumb_uri, updateThumb(thumb_uri, url))
                }
            }), cache("slots", slots)
        })
    }catch(e){alert(e)}})
}

function presetContain(url) {
	
	
    for (var i = 0; i < presetUrls.length; i++)
        if (sameUrl(url, presetUrls[i])) return !0;
    return !1
}

function needToCreateThumb(url) {
    return $(getSlotsByUrl(url)).length > 0
}

function getSlotsByUrl(url) {
    for (var res_slots = [], i = 0; i < slots.length; i++) {
        var slot = slots[i];
        slot.id = i;
        //alert(slot.url+ ";"+ url)
        // var count_dots = url.split(".")
        // //alert(count_dot)
        // if(count_dots.length>2){
        //     var trimmed_url = url.indexOf(".")
        //     var newurl =  url.substring(trimmed_url+1,url.length)
        //     if(newurl.indexOf("/")>-1)
        //         newurl = (newurl.split("/"))[0]
        //    // alert(newurl)

        //     sameUrl(slot.url, newurl) && res_slots.push(slot)
        // }else{
            //sameUrl(slot.url, url) &&
            res_slots.push(slot)
        //}
    }
    //alert("res_slots"+res_slots)
    return res_slots
}

function degradeThumbSize(data_uri, callback) {
    var canvas = $("<canvas>")[0],
        context = canvas.getContext("2d"),
        img = $("<img>").attr("src", data_uri).on("load", function() {
            var imgWidth = img[0].width,
                imgHeight = img[0].height;
            imgWidth > 600 || imgHeight > 600 ? (canvas.width = canvas.height = 600, imgWidth > imgHeight ? canvas.height = imgHeight / imgWidth * 600 : canvas.width = imgWidth / imgHeight * 600) : (canvas.width = imgWidth, canvas.height = imgHeight), context.drawImage(img[0], 0, 0, canvas.width, canvas.height), callback && callback(canvas.toDataURL("image/png", ""))
        })
}

function updateThumb(thumb_uri, url) {
    chrome.extension.sendMessage({
        isSlotUpdated: !0,
        url: url.toLowerCase(),
        thumb_uri: thumb_uri
    })
}

function modifyOldDataToNew(){

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

// ***** For Epic: User Agent, Version: Creating a cookie. *****
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// **************************************************************

function fetchNewTabAd(){

    var xhr = new XMLHttpRequest();
    xhr.open ("GET", "http://updates.epicbrowser.com/extensions/newtab/newTabAd.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
               var parser = new DOMParser();
               var xmlDoc = parser.parseFromString(xhr.responseText,"text/xml");
               var version= (xmlDoc.getElementsByTagName("version")[0]).childNodes[0].nodeValue;
               var url = (xmlDoc.getElementsByTagName("url")[0]).childNodes[0].nodeValue;
               var sVer = localStorage.getItem("version");
               if(!sVer || sVer && (parseFloat(sVer) < parseFloat(version))) {
                    //Read the html file and store it localstorage
                    //Update the version number sVer
                    //Update UI
                    var hml =  new XMLHttpRequest();
                    hml.open("GET", url, true);

                    hml.onreadystatechange = function(){
                        if(hml.readyState == 4){
                             resString = hml.responseText;
                             localStorage.setItem("resString",resString);
                             localStorage.setItem("version",version);
                             // if(resString)
                             //    document.getElementById("newTabAd").innerHTML = resString;
                             //Update the UI
                        }
                    }
                    hml.send();
                    // alert(version);
                    setCookie('AlokShilad'+version, version, 30); // ***** For Epic: User Agent, Version: Modifiy this function. *****
               }
        }
    }
    xhr.send();
    //Calling recuersively at 7 days interval, if the browser is not closed or newtab handler is not closed.
    setTimeout(function(){
      fetchNewTabAd()
      },1000*60*24*7);
}


function cleanOldData(){
var old_slots = []
var old_slots = JSON.parse(localStorage.getItem('slots'));
   for(i =0; i<old_slots.length ; i++){
    old_slot = old_slots[i]
     if(old_slot){
        check_old = "emptyThumbnail_"+encodeURIComponent(old_slot.url)
        var old_pattern =  localStorage.getItem(check_old);
        localStorage.removeItem(check_old);
        localStorage.removeItem(encodeURIComponent(old_slot.url))
      }
    }
      //localStorage.clear('emptyPreview');
}

localStorage.setItem('newCCount',0);//Ad & Cookie values are set to 0 initial
localStorage.setItem('newACount',0);

//console.log(slots);
void 0 == cache("slots") ? (slots = [], slots.push(createSlotStructure("Epic Private Browser", "img/how-epic-work-thumbnail.png", presetUrls[0], !0)), slots.push(createSlotStructure("EpicSearch.in - Private Search", "img/epic-search-thumbnail.png", presetUrls[1], !0)), slots.push(createSlotStructure()), slots.push(createSlotStructure()), slots.push(createSlotStructure()), slots.push(createSlotStructure()), slots.push(createSlotStructure()), slots.push(createSlotStructure()), cache("slots", slots)) : slots = cache("slots"), 
window.__defineGetter__("api", function() {
    return {
        getSlots: function() {
            return slots
        },
        saveSlots: function(newSlots,index) {
            //alert(newSlots[2].title)
            save_slots = slots,
            erm = index,
            slots = newSlots, cache("slots", slots)
        },
        presetUrls: function() {
            return presetUrls
        }
    }
});
var queueActiveTabInfo;
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        queueActiveTabInfo = {
            tab: tab
        }, tab.url && "complete" == tab.status && (queueActiveTabInfo = void 0, capture(tab.url))
    })
}), chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    (changeInfo.url || "complete" == changeInfo.status) && tab && tab.url && needToCreateThumb(tab.url) && capture(tab.url)
});

var newACount=0, newCCount=0;

// receiving the connections here
var trackers_val;
var ccount_val;

//+++++
// below is received from the new adblock 
 chrome.extension.onMessageExternal.addListener(function(request, sender, sendResponse) {
   /*if(request.use == "checking"){
   console.log("in speedial extention msg heppen");
   }*/
   alert(request.use)
   localStorage.setItem('newACount',request.use);
   //alert("ads " +request.use)
   chrome.privacy.services.epicBrowserCookieCount.get({},function(a){ccount=a.value})
   alert(ccount);
   //alert("third party "+ccount)
   localStorage.setItem('newCCount', ccount);
   //console.log(request.use);
   });

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    //checkEmptyPreview();
    var port = chrome.extension.connect('ojmkmloghldahkpgloknaapbpembjija');
    port.postMessage({
    query: 'getCount'
    })
    port.onMessage.addListener(function (msg) {
      var str=msg.answer;
      var n=str.indexOf(",");
      newACount = parseInt(str.substring(0,n));
      newCCount = parseInt(str.substring(n+1));
      localStorage.setItem('newCCount',newCCount);
      localStorage.setItem('newACount',newACount);
    });
});
fetchNewTabAd();//For netTabAd 
cleanOldData();
