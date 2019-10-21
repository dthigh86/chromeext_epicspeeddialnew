var xmlDoc;
if(typeof window.DOMParser != "undefined") {
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",xmlFile,false);
    if (xmlhttp.overrideMimeType){
        xmlhttp.overrideMimeType('text/xml');
    }
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
}
else{
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.load(xmlFile);
}

function display1(){
	//var tagObj=xmlDoc.getElementsByTagName("VPNDetails");
	var tagObj=document.getElementById("VPN_Details");
	var VPNid = tagObj.getElementsByTagName("VPNid")[0].firstchild[0].data;
	var Description = tagObj.getElementsByTagName("description")[0].firstchild[0].data;
	var Url = tagObj.getElementsByTagName("url")[0].firstchild[0].data;
	var LinkUrl = tagObj.getElementsByTagName("linkUrl")[0].firstchild[0].data;
	var Title = tagObj.getElementsByTagName("title")[0].firstchild[0].data;

	alert("VPN Details: \n\n"+VPNid+ "\n" +Description+ "\n" + Url + "\n" + LinkUrl + "\n" + Title);
}
}