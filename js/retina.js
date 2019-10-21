// retina.js, a high-resolution image swapper (http://retinajs.com), v0.0.2
try{
(function () {
    function t(e) {
        this.path = e;
        //console.log(this.path);
        
        var t = this.path.split("."),
            n = t.slice(0, t.length - 1).join("."),
            r = t[t.length - 1];
        this.at_2x_path = n + "@2x." + r
    
    }

    function n(e) {
        //console.log("as")
        //console.log(e);
        this.el = e, this.path = new t(this.el.getAttribute("src"));
        var n = this;
        this.path.check_2x_variant(function (e) {
            e && n.swap()
        })
    }
    var e = typeof exports == "undefined" ? window : exports;
    //console.log(e.RetinaImagePath);
    e.RetinaImagePath = t, t.confirmed_paths = [], t.prototype.is_external = function () {
        return !!this.path.match(/^https?\:/i) && !this.path.match("//" + document.domain)
    }, t.prototype.check_2x_variant = function (e) {
        var n, r = this;
        
        if (this.is_external()) return e(!1);
        if (this.at_2x_path in t.confirmed_paths) return e(!0);
        n = new XMLHttpRequest, n.open("HEAD", this.at_2x_path), n.onreadystatechange = function () {
            return n.readyState != 4 ? e(!1) : n.status >= 200 && n.status <= 399 ? (t.confirmed_paths.push(r.at_2x_path), e(!0)) : e(!1)
        }, n.send()
    }, e.RetinaImage = n, n.prototype.swap = function (e) {
        function n() {
            
            if(t.el.offsetWidth==0 || t.el.offsetHeight==0){
              //t.el.complete ? (t.el.setAttribute("width", "800"), t.el.setAttribute("height", "74"), t.el.setAttribute("src", e)) : setTimeout(n, 5) 
              //t.el.complete ? (t.el.removeAttribute("width"), t.el.removeAttribute("height"), t.el.setAttribute("src", e)) : setTimeout(n, 5)  
              var newImg = new Image()
              newImg.onload = function(){
                  h = newImg.height;
                  w = newImg.width;
                  
              }
              newImg.src = e;
            }
            else    
                 
            t.el.complete ? (t.el.setAttribute("width", t.el.offsetWidth), t.el.setAttribute("height", t.el.offsetHeight), t.el.setAttribute("src", e)) : setTimeout(n, 5)
        }
        //alert(this.path.at_2x_path)
        typeof e == "undefined" && (e = this.path.at_2x_path);
        var t = this;
        n()
    }, e.devicePixelRatio > 1 && (window.onload = function () {
        var e = document.getElementsByTagName("img"),
            t = [],
            r, i;
        for (r = 0; r < e.length; r++) i = e[r], t.push(new n(i))
    })
})();

}catch(e){alert(e)}
