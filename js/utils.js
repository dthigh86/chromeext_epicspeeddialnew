function sameUrl(url1, url2) {
    return url1 && url2 ? (url1 = clearUrl(url1), url2 = clearUrl(url2), url1 == url2) : !1
}

function clearUrl(url) {
    var cleared = url.replace(/(https|http)/g, "").replace(/(\:\/\/)?/g, "").replace(/(www)/g, "").replace(/^[\.]?/, "").toLowerCase();
    return "/" == cleared.charAt(cleared.length - 1) && (cleared = cleared.substr(0, cleared.length - 1)), cleared
}

function getProportion() {
    var proportion = .72,
        size = [window.screen.width, window.screen.height].join("x"),
        proportions = {
            "800x600": 6,
            "1024x768": .72,
            "1024x640": .72,
            "1152x864": .75,
            "1280x720": .53,
            "1280x768": .6,
            "1280x800": .6,
            "1280x960": .45,
            "1280x1024": .45,
            "1366x768": .45,
            "1440x900": .6,
            "1600x900": .45,
            "1680x1050": .45,
            "1920x1080": .45,
            "1920x1200": .45,
            "2560x1440": .8,
            "2560x1600": .8,
            "2880x1600": .8,
            "2880x1800": .8
        };
    return proportion = proportions[size], proportion ? proportion : (window.screen.height - 179) / window.screen.width
}

function fixURL(e) {
    var t = e.toLowerCase();
    return 0 != t.indexOf("http://") && 0 != t.indexOf("https://") && 0 != t.indexOf("smtp://") && 0 != t.indexOf("ftp://") && 0 != t.indexOf("rtp://") && 0 != t.indexOf("irc://") && 0 != t.indexOf("snmp://") && (e = "http://" + e), e
}

function urlCheck(e) {
    e = fixURL(e).toLowerCase();
    var t = new RegExp("(https|http|ftp|smtp|ftp|rtp|irc|snmp)$");
    if (t.test(e)) return 0;
    //var n = new RegExp("^(https|http|ftp|smtp|ftp|rtp|irc|snmp)://([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$");
     var n = new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")
    return n.test(e)
}