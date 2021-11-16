/* eslint-disable */
"use strict";

import { KTUtil } from "./../../components/util.js";
import KTOffcanvas from "./../../components/offcanvas.js";

var KTLayoutAsideOffCanvas = (function() {
  // Private properties
  var _element;
  var _elementEvent;
  var _offcanvasObject;

  // Private functions
  // Initialize
  var _init = function() {
    // Initialize mobile aside offcanvas
    _offcanvasObject = new KTOffcanvas(_element, {
      overlay: true,
      baseClass: "offcanvas-mobile",
      //closeBy: 'kt_user_profile_aside_close',
      toggleBy: {
        target: _elementEvent,
        state: "mobile-toggle-actives",
      },
    });
  };

  var _reset = function() {
    var offcanvasLink = document.querySelectorAll(".offcanvas-link a");
    for (var i = 0; i < offcanvasLink.length; i++) {
      offcanvasLink[i].addEventListener("click", function(event) {
        if (KTUtil.isBreakpointDown("lg")) {
          // Tablet and mobile mode
          _offcanvasObject.hide(); // Hide offcanvas after general link click
          _init();
        }
      });
    }
  };

  // Public methods
  return {
    init: function(element, elementEvent) {
      _element = element;
      _elementEvent = elementEvent;

      if (!_element && !_elementEvent) {
        return;
      }

      // Initialize
      _init();
      _reset();
    },
  };
})();

// Webpack support
if (typeof module !== "undefined") {
  // module.exports = KTLayoutAside;
}

export default KTLayoutAsideOffCanvas;
