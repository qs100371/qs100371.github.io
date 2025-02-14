if (window.console) {
    Function.prototype.makeMulti = function () {
      let l = new String(this);
      l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"));
      return l;
    };
    let string = function () {
      /*
    .oooooo.       .oooooo..o 
 d8P'  `Y8b     d8P'    `Y8 
888      888    Y88bo.      
888      888     `"Y8888o.  
888      888         `"Y88b 
`88b    d88b    oo     .d8P 
 `Y8bood8P'Ybd' 8""88888P'  
                            
                            
                            
      */
    };
    console.log(string.makeMulti());
    console.log("欢迎访问the Blog of qs");
  }