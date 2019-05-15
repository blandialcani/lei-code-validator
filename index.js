(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['exports'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
      // CommonJS
      factory(exports);
  } else {
      // Browser globals
      factory(root.IBAN = {});
  }
}(this, function(exports){

  var CHAR_A = ('A').charCodeAt(0),
      CHAR_0 = ('0').charCodeAt(0);

  var FORMAT_ISVALID =/^[0-9A-Z]{18}[0-9]{2}$/g;


  /* Iso7064 */
  function checkIso7064(value) {
    var length = value.length, bufferSize = 10000000, mod = 97;
    var buffer = 0;
    var charCode;
    for (var i = 0; i < length; ++i) {
      charCode = (value.charAt(i)).charCodeAt(0);
      buffer = charCode + (charCode >= CHAR_A ? buffer * 100 - CHAR_A + 10 : buffer * 10 - CHAR_0);
      if (buffer > bufferSize) {
        buffer %= mod;
      }
    }

    return buffer % mod;
  }

  /* Iso17442 */
  exports.isValidLei = function(rawValue){
    if (rawValue == null || !rawValue.match(FORMAT_ISVALID)) {
      return false;
    }

    return checkIso7064(rawValue) === 1;
  };
}));