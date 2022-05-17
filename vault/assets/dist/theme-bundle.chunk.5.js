(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var forms = {
  email: function email(value) {
    var re = /^.+@.+\..+/;
    return re.test(value);
  },

  /**
   * Validates a password field
   * @param value
   * @returns {boolean}
   */
  password: function password(value) {
    return this.notEmpty(value);
  },

  /**
   * validates if a field is empty
   * @param value
   * @returns {boolean}
   *
   */
  notEmpty: function notEmpty(value) {
    return value.length > 0;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./assets/js/theme/common/utils/form-utils.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/common/utils/form-utils.js ***!
  \****************************************************/
/*! exports provided: createPasswordValidationErrorTextObject, classifyForm, Validators, insertStateHiddenField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPasswordValidationErrorTextObject", function() { return createPasswordValidationErrorTextObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classifyForm", function() { return classifyForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStateHiddenField", function() { return insertStateHiddenField; });
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/forms */ "./assets/js/theme/common/models/forms.js");





var inputTagNames = ['input', 'select', 'textarea'];
/**
 * Set up Object with Error Messages on Password Validation. Please use messages in mentioned order
 * @param {string} empty defines error text for empty field
 * @param {string} confirm defines error text for empty confirmation field
 * @param {string} mismatch defines error text if confirm passford mismatches passford field
 * @param {string} invalid defines error text for invalid password charaters sequence
 * @return {object} messages or default texts if nothing is providing
 */

var createPasswordValidationErrorTextObject = function createPasswordValidationErrorTextObject(empty, confirm, mismatch, invalid) {
  return {
    onEmptyPasswordErrorText: empty,
    onConfirmPasswordErrorText: confirm,
    onMismatchPasswordErrorText: mismatch,
    onNotValidPasswordErrorText: invalid
  };
};
/**
 * Apply class name to an input element on its type
 * @param {object} input
 * @param {string} formFieldClass
 * @return {object} Element itself
 */

function classifyInput(input, formFieldClass) {
  var $input = $(input);
  var $formField = $input.parent("." + formFieldClass);
  var tagName = $input.prop('tagName').toLowerCase();
  var className = formFieldClass + "--" + tagName;
  var specificClassName; // Input can be text/checkbox/radio etc...

  if (tagName === 'input') {
    var inputType = $input.prop('type');

    if (lodash_includes__WEBPACK_IMPORTED_MODULE_2___default()(['radio', 'checkbox', 'submit'], inputType)) {
      // ie: .form-field--checkbox, .form-field--radio
      className = formFieldClass + "--" + lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default()(inputType);
    } else {
      // ie: .form-field--input .form-field--inputText
      specificClassName = "" + className + lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default()(inputType);
    }
  } // Apply class modifier


  return $formField.addClass(className).addClass(specificClassName);
}
/**
 * Apply class name to each input element in a form based on its type
 * @example
 * // Before
 * <form id="form">
 *     <div class="form-field">
 *         <input type="text">
 *     </div>
 *     <div class="form-field">
 *         <select>...</select>
 *     </div>
 * </form>
 *
 * classifyForm('#form', { formFieldClass: 'form-field' });
 *
 * // After
 * <div class="form-field form-field--input form-field--inputText">...</div>
 * <div class="form-field form-field--select">...</div>
 *
 * @param {string|object} formSelector - selector or element
 * @param {object} options
 * @return {jQuery} Element itself
 */


function classifyForm(formSelector, options) {
  if (options === void 0) {
    options = {};
  }

  var $form = $(formSelector);
  var $inputs = $form.find(inputTagNames.join(', ')); // Obtain options

  var _options = options,
      _options$formFieldCla = _options.formFieldClass,
      formFieldClass = _options$formFieldCla === void 0 ? 'form-field' : _options$formFieldCla; // Classify each input in a form

  $inputs.each(function (__, input) {
    classifyInput(input, formFieldClass);
  });
  return $form;
}
/**
 * Get id from given field
 * @param {object} $field JQuery field object
 * @return {string}
 */

function getFieldId($field) {
  var fieldId = $field.prop('name').match(/(\[.*\])/);

  if (fieldId && fieldId.length !== 0) {
    return fieldId[0];
  }

  return '';
}
/**
 * Insert hidden field after State/Province field
 * @param {object} $stateField JQuery field object
 */


function insertStateHiddenField($stateField) {
  var fieldId = getFieldId($stateField);
  var stateFieldAttrs = {
    type: 'hidden',
    name: "FormFieldIsText" + fieldId,
    value: '1'
  };
  $stateField.after($('<input />', stateFieldAttrs));
}

var Validators = {
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   * @param {string} errorText describes errorMassage on email validation
   */
  setEmailValidation: function setEmailValidation(validator, field, errorText) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = _models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email(val);
          cb(result);
        },
        errorMessage: errorText
      });
    }
  },

  /**
   * Validate password fields
   * @param validator
   * @param passwordSelector
   * @param password2Selector
   * @param requirements
   * @param {object} errorTextsObject
   * @param isOptional
   */
  setPasswordValidation: function setPasswordValidation(validator, passwordSelector, password2Selector, requirements, _ref, isOptional) {
    var onEmptyPasswordErrorText = _ref.onEmptyPasswordErrorText,
        onConfirmPasswordErrorText = _ref.onConfirmPasswordErrorText,
        onMismatchPasswordErrorText = _ref.onMismatchPasswordErrorText,
        onNotValidPasswordErrorText = _ref.onNotValidPasswordErrorText;
    var $password = $(passwordSelector);
    var passwordValidations = [{
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.length;

        if (isOptional) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: onEmptyPasswordErrorText
    }, {
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.match(new RegExp(requirements.alpha)) && val.match(new RegExp(requirements.numeric)) && val.length >= requirements.minlength; // If optional and nothing entered, it is valid

        if (isOptional && val.length === 0) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: onNotValidPasswordErrorText
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val.length;

        if (isOptional) {
          return cb(true);
        }

        cb(result);
      },
      errorMessage: onConfirmPasswordErrorText
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val === $password.val();
        cb(result);
      },
      errorMessage: onMismatchPasswordErrorText
    }];
    validator.add(passwordValidations);
  },

  /**
   * Validate password fields
   * @param {Nod} validator
   * @param {Object} selectors
   * @param {string} selectors.errorSelector
   * @param {string} selectors.fieldsetSelector
   * @param {string} selectors.formSelector
   * @param {string} selectors.maxPriceSelector
   * @param {string} selectors.minPriceSelector
   */
  setMinMaxPriceValidation: function setMinMaxPriceValidation(validator, selectors, priceValidationErrorTexts) {
    if (priceValidationErrorTexts === void 0) {
      priceValidationErrorTexts = {};
    }

    var errorSelector = selectors.errorSelector,
        fieldsetSelector = selectors.fieldsetSelector,
        formSelector = selectors.formSelector,
        maxPriceSelector = selectors.maxPriceSelector,
        minPriceSelector = selectors.minPriceSelector; // eslint-disable-next-line object-curly-newline

    var _priceValidationError = priceValidationErrorTexts,
        onMinPriceError = _priceValidationError.onMinPriceError,
        onMaxPriceError = _priceValidationError.onMaxPriceError,
        minPriceNotEntered = _priceValidationError.minPriceNotEntered,
        maxPriceNotEntered = _priceValidationError.maxPriceNotEntered,
        onInvalidPrice = _priceValidationError.onInvalidPrice;
    validator.configure({
      form: formSelector,
      preventSubmit: true,
      successClass: '_' // KLUDGE: Don't apply success class

    });
    validator.add({
      errorMessage: onMinPriceError,
      selector: minPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: onMaxPriceError,
      selector: maxPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: maxPriceNotEntered,
      selector: maxPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: minPriceNotEntered,
      selector: minPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: onInvalidPrice,
      selector: [minPriceSelector, maxPriceSelector],
      validate: 'min-number:0'
    });
    validator.setMessageOptions({
      selector: [minPriceSelector, maxPriceSelector],
      parent: fieldsetSelector,
      errorSpan: errorSelector
    });
  },

  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   */
  setStateCountryValidation: function setStateCountryValidation(validator, field, errorText) {
    if (field) {
      validator.add({
        selector: field,
        validate: 'presence',
        errorMessage: errorText
      });
    }
  },

  /**
   * Removes classes from dirty form if previously checked
   * @param field
   */
  cleanUpStateValidation: function cleanUpStateValidation(field) {
    var $fieldClassElement = $("[data-type=\"" + field.data('fieldType') + "\"]");
    Object.keys(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes).forEach(function (value) {
      if ($fieldClassElement.hasClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value])) {
        $fieldClassElement.removeClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value]);
      }
    });
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/safe-string.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/utils/safe-string.js ***!
  \*****************************************************/
/*! exports provided: safeString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeString", function() { return safeString; });
/**
 * This function parses HTML entities in strings
 * @param str: String
 * @returns String
*/
var safeString = function safeString(str) {
  var d = new DOMParser();
  return d.parseFromString(str, 'text/html').body.textContent;
};

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/*
 Import all product specific js
 */







var WRITE_REVIEW = _global_modal__WEBPACK_IMPORTED_MODULE_6__["modalTypes"].WRITE_REVIEW;

var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);

  function Product(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    return _this;
  }

  var _proto = Product.prototype;

  _proto.onReady = function onReady() {
    var _this2 = this;

    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    $(document).keyup(function (event) {
      if (event.key == "Enter" && $("section.productView-details label").is(":focus")) {
        var selectedLabel = $(document.activeElement).attr('data-product-attribute-value');
        var selectedInput = $("section.productView-details").find("[value='" + selectedLabel + "']");
        $(selectedInput).trigger("click");
      }
    });
    var validator; // Init collapsible

    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]($reviewForm);
    $(document).on('opened.fndtn.reveal', '#modal-review-form', function () {
      return _this2.reviewModal.setupFocusableElements(WRITE_REVIEW);
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);

      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }

      return false;
    });
    this.productReviewHandler();
  };

  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };

  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };

  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };

  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/safe-string */ "./assets/js/theme/common/utils/safe-string.js");





var _default = /*#__PURE__*/function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_0__["default"])({
      submit: $reviewForm.find('input[type="submit"]')
    });
    this.$reviewsContent = $('#product-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }
  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */


  var _proto = _default.prototype;

  _proto.initLinkBind = function initLinkBind() {
    var _this = this;

    var $content = $('#productReviews-content', this.$reviewsContent);
    $('#productReview_link').on('click', function () {
      $('.productView-reviewTabLink').trigger('click');

      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
      }
    });
  };

  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
      return;
    } // force collapse on page load


    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
  }
  /**
   * Inject ID into the pagination link
   */
  ;

  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);

    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #product-reviews");
    }

    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #product-reviews");
    }
  };

  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewRating)
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewSubject)
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewComment)
    }, {
      selector: '.writeReview-form [name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };

  _proto.validate = function validate() {
    return this.validator.performCheck();
  };

  return _default;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }

  var _proto = VideoGallery.prototype;

  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };

  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };

  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };

  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };

  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;

    if (isInitialized) {
      return;
    }

    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL21vZGVscy9mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy9zYWZlLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC9yZXZpZXdzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3ZpZGVvLWdhbGxlcnkuanMiXSwibmFtZXMiOlsiZm9ybXMiLCJlbWFpbCIsInZhbHVlIiwicmUiLCJ0ZXN0IiwicGFzc3dvcmQiLCJub3RFbXB0eSIsImxlbmd0aCIsImlucHV0VGFnTmFtZXMiLCJjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QiLCJlbXB0eSIsImNvbmZpcm0iLCJtaXNtYXRjaCIsImludmFsaWQiLCJvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQiLCJvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCIsIm9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dCIsIm9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCIsImNsYXNzaWZ5SW5wdXQiLCJpbnB1dCIsImZvcm1GaWVsZENsYXNzIiwiJGlucHV0IiwiJCIsIiRmb3JtRmllbGQiLCJwYXJlbnQiLCJ0YWdOYW1lIiwicHJvcCIsInRvTG93ZXJDYXNlIiwiY2xhc3NOYW1lIiwic3BlY2lmaWNDbGFzc05hbWUiLCJpbnB1dFR5cGUiLCJhZGRDbGFzcyIsImNsYXNzaWZ5Rm9ybSIsImZvcm1TZWxlY3RvciIsIm9wdGlvbnMiLCIkZm9ybSIsIiRpbnB1dHMiLCJmaW5kIiwiam9pbiIsImVhY2giLCJfXyIsImdldEZpZWxkSWQiLCIkZmllbGQiLCJmaWVsZElkIiwibWF0Y2giLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwiJHN0YXRlRmllbGQiLCJzdGF0ZUZpZWxkQXR0cnMiLCJ0eXBlIiwibmFtZSIsImFmdGVyIiwiVmFsaWRhdG9ycyIsInNldEVtYWlsVmFsaWRhdGlvbiIsInZhbGlkYXRvciIsImZpZWxkIiwiZXJyb3JUZXh0IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwicmVzdWx0IiwiZXJyb3JNZXNzYWdlIiwic2V0UGFzc3dvcmRWYWxpZGF0aW9uIiwicGFzc3dvcmRTZWxlY3RvciIsInBhc3N3b3JkMlNlbGVjdG9yIiwicmVxdWlyZW1lbnRzIiwiaXNPcHRpb25hbCIsIiRwYXNzd29yZCIsInBhc3N3b3JkVmFsaWRhdGlvbnMiLCJSZWdFeHAiLCJhbHBoYSIsIm51bWVyaWMiLCJtaW5sZW5ndGgiLCJzZXRNaW5NYXhQcmljZVZhbGlkYXRpb24iLCJzZWxlY3RvcnMiLCJwcmljZVZhbGlkYXRpb25FcnJvclRleHRzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsIm9uTWluUHJpY2VFcnJvciIsIm9uTWF4UHJpY2VFcnJvciIsIm1pblByaWNlTm90RW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwiY29uZmlndXJlIiwiZm9ybSIsInByZXZlbnRTdWJtaXQiLCJzdWNjZXNzQ2xhc3MiLCJzZXRNZXNzYWdlT3B0aW9ucyIsImVycm9yU3BhbiIsInNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24iLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwiJGZpZWxkQ2xhc3NFbGVtZW50IiwiZGF0YSIsIk9iamVjdCIsImtleXMiLCJub2QiLCJjbGFzc2VzIiwiZm9yRWFjaCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzYWZlU3RyaW5nIiwic3RyIiwiZCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImJvZHkiLCJ0ZXh0Q29udGVudCIsIldSSVRFX1JFVklFVyIsIm1vZGFsVHlwZXMiLCJQcm9kdWN0IiwiY29udGV4dCIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIiRyZXZpZXdMaW5rIiwiJGJ1bGtQcmljaW5nTGluayIsInJldmlld01vZGFsIiwibW9kYWxGYWN0b3J5Iiwib25SZWFkeSIsImRvY3VtZW50Iiwib24iLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJrZXl1cCIsImV2ZW50Iiwia2V5IiwiaXMiLCJzZWxlY3RlZExhYmVsIiwiYWN0aXZlRWxlbWVudCIsImF0dHIiLCJzZWxlY3RlZElucHV0IiwidHJpZ2dlciIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInByb2R1Y3REZXRhaWxzIiwiUHJvZHVjdERldGFpbHMiLCJCQ0RhdGEiLCJwcm9kdWN0X2F0dHJpYnV0ZXMiLCJzZXRQcm9kdWN0VmFyaWFudCIsInZpZGVvR2FsbGVyeSIsImJ1bGtQcmljaW5nSGFuZGxlciIsIiRyZXZpZXdGb3JtIiwicmV2aWV3IiwiUmV2aWV3Iiwic2V0dXBGb2N1c2FibGVFbGVtZW50cyIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImFyaWFEZXNjcmliZVJldmlld0lucHV0cyIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByb2R1Y3RSZXZpZXdIYW5kbGVyIiwiXyIsIm1zZ1NwYW5JZCIsInNpYmxpbmdzIiwiUGFnZU1hbmFnZXIiLCJzdWJtaXQiLCIkcmV2aWV3c0NvbnRlbnQiLCIkY29sbGFwc2libGUiLCJpbml0TGlua0JpbmQiLCJpbmplY3RQYWdpbmF0aW9uTGluayIsImNvbGxhcHNlUmV2aWV3cyIsIiRjb250ZW50IiwiQ29sbGFwc2libGVFdmVudHMiLCJjbGljayIsImhhc2giLCIkbmV4dExpbmsiLCIkcHJldkxpbmsiLCJyZXZpZXdSYXRpbmciLCJyZXZpZXdTdWJqZWN0IiwicmV2aWV3Q29tbWVudCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCIkc2VsZWN0ZWRUaHVtYiIsInNldE1haW5WaWRlbyIsInNldEFjdGl2ZVRodW1iIiwiYmluZCIsInBsdWdpbktleSIsIiR2aWRlb0dhbGxlcnkiLCJpbmRleCIsImVsZW1lbnQiLCIkZWwiLCJpc0luaXRpYWxpemVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQSxJQUFNQSxLQUFLLEdBQUc7RUFDVkMsS0FEVSxpQkFDSkMsS0FESSxFQUNHO0lBQ1QsSUFBTUMsRUFBRSxHQUFHLFlBQVg7SUFDQSxPQUFPQSxFQUFFLENBQUNDLElBQUgsQ0FBUUYsS0FBUixDQUFQO0VBQ0gsQ0FKUzs7RUFNVjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0lHLFFBWFUsb0JBV0RILEtBWEMsRUFXTTtJQUNaLE9BQU8sS0FBS0ksUUFBTCxDQUFjSixLQUFkLENBQVA7RUFDSCxDQWJTOztFQWVWO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJSSxRQXJCVSxvQkFxQkRKLEtBckJDLEVBcUJNO0lBQ1osT0FBT0EsS0FBSyxDQUFDSyxNQUFOLEdBQWUsQ0FBdEI7RUFDSDtBQXZCUyxDQUFkO0FBMEJlUCxvRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFFQSxJQUFNUSxhQUFhLEdBQUcsQ0FDbEIsT0FEa0IsRUFFbEIsUUFGa0IsRUFHbEIsVUFIa0IsQ0FBdEI7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNPLElBQU1DLHVDQUF1QyxHQUFHLFNBQTFDQSx1Q0FBMEMsQ0FBQ0MsS0FBRCxFQUFRQyxPQUFSLEVBQWlCQyxRQUFqQixFQUEyQkMsT0FBM0I7RUFBQSxPQUF3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QUwsQ0FBYXZELEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsS0FBSzBELGNBQUwsQ0FBb0JTLElBQXBCLENBQXlCLElBQXpCLENBQXpCO0VBQ0gsQ0FqQ0w7O0VBQUE7QUFBQTtBQW9DZSxTQUFTOUMsWUFBVCxHQUF3QjtFQUNuQyxJQUFNK0MsU0FBUyxHQUFHLGVBQWxCO0VBQ0EsSUFBTUMsYUFBYSxHQUFHM0ssQ0FBQyxZQUFVMEssU0FBVixPQUF2QjtFQUVBQyxhQUFhLENBQUMxSixJQUFkLENBQW1CLFVBQUMySixLQUFELEVBQVFDLE9BQVIsRUFBb0I7SUFDbkMsSUFBTUMsR0FBRyxHQUFHOUssQ0FBQyxDQUFDNkssT0FBRCxDQUFiO0lBQ0EsSUFBTUUsYUFBYSxHQUFHRCxHQUFHLENBQUNyRyxJQUFKLENBQVNpRyxTQUFULGFBQStCaEIsWUFBckQ7O0lBRUEsSUFBSXFCLGFBQUosRUFBbUI7TUFDZjtJQUNIOztJQUVERCxHQUFHLENBQUNyRyxJQUFKLENBQVNpRyxTQUFULEVBQW9CLElBQUloQixZQUFKLENBQWlCb0IsR0FBakIsQ0FBcEI7RUFDSCxDQVREO0FBVUgsQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvcm1zID0ge1xuICAgIGVtYWlsKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlID0gL14uK0AuK1xcLi4rLztcbiAgICAgICAgcmV0dXJuIHJlLnRlc3QodmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBwYXNzd29yZCBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHBhc3N3b3JkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdEVtcHR5KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGVzIGlmIGEgZmllbGQgaXMgZW1wdHlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKlxuICAgICAqL1xuICAgIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtcztcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbm9kIGZyb20gJy4uL25vZCc7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi4vbW9kZWxzL2Zvcm1zJztcblxuY29uc3QgaW5wdXRUYWdOYW1lcyA9IFtcbiAgICAnaW5wdXQnLFxuICAgICdzZWxlY3QnLFxuICAgICd0ZXh0YXJlYScsXG5dO1xuLyoqXG4gKiBTZXQgdXAgT2JqZWN0IHdpdGggRXJyb3IgTWVzc2FnZXMgb24gUGFzc3dvcmQgVmFsaWRhdGlvbi4gUGxlYXNlIHVzZSBtZXNzYWdlcyBpbiBtZW50aW9uZWQgb3JkZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbXB0eSBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGVtcHR5IGZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZmlybSBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGVtcHR5IGNvbmZpcm1hdGlvbiBmaWVsZFxuICogQHBhcmFtIHtzdHJpbmd9IG1pc21hdGNoIGRlZmluZXMgZXJyb3IgdGV4dCBpZiBjb25maXJtIHBhc3Nmb3JkIG1pc21hdGNoZXMgcGFzc2ZvcmQgZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnZhbGlkIGRlZmluZXMgZXJyb3IgdGV4dCBmb3IgaW52YWxpZCBwYXNzd29yZCBjaGFyYXRlcnMgc2VxdWVuY2VcbiAqIEByZXR1cm4ge29iamVjdH0gbWVzc2FnZXMgb3IgZGVmYXVsdCB0ZXh0cyBpZiBub3RoaW5nIGlzIHByb3ZpZGluZ1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0ID0gKGVtcHR5LCBjb25maXJtLCBtaXNtYXRjaCwgaW52YWxpZCkgPT4gKHtcbiAgICBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQ6IGVtcHR5LFxuICAgIG9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0OiBjb25maXJtLFxuICAgIG9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dDogbWlzbWF0Y2gsXG4gICAgb25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0OiBpbnZhbGlkLFxufSk7XG5cblxuLyoqXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGFuIGlucHV0IGVsZW1lbnQgb24gaXRzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZENsYXNzXG4gKiBAcmV0dXJuIHtvYmplY3R9IEVsZW1lbnQgaXRzZWxmXG4gKi9cbmZ1bmN0aW9uIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgY29uc3QgJGZvcm1GaWVsZCA9ICRpbnB1dC5wYXJlbnQoYC4ke2Zvcm1GaWVsZENsYXNzfWApO1xuICAgIGNvbnN0IHRhZ05hbWUgPSAkaW5wdXQucHJvcCgndGFnTmFtZScpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsZXQgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke3RhZ05hbWV9YDtcbiAgICBsZXQgc3BlY2lmaWNDbGFzc05hbWU7XG5cbiAgICAvLyBJbnB1dCBjYW4gYmUgdGV4dC9jaGVja2JveC9yYWRpbyBldGMuLi5cbiAgICBpZiAodGFnTmFtZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dFR5cGUgPSAkaW5wdXQucHJvcCgndHlwZScpO1xuXG4gICAgICAgIGlmIChfLmluY2x1ZGVzKFsncmFkaW8nLCAnY2hlY2tib3gnLCAnc3VibWl0J10sIGlucHV0VHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0tY2hlY2tib3gsIC5mb3JtLWZpZWxkLS1yYWRpb1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke18uY2FtZWxDYXNlKGlucHV0VHlwZSl9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0taW5wdXQgLmZvcm0tZmllbGQtLWlucHV0VGV4dFxuICAgICAgICAgICAgc3BlY2lmaWNDbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9JHtfLmNhcGl0YWxpemUoaW5wdXRUeXBlKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgY2xhc3MgbW9kaWZpZXJcbiAgICByZXR1cm4gJGZvcm1GaWVsZFxuICAgICAgICAuYWRkQ2xhc3MoY2xhc3NOYW1lKVxuICAgICAgICAuYWRkQ2xhc3Moc3BlY2lmaWNDbGFzc05hbWUpO1xufVxuXG4vKipcbiAqIEFwcGx5IGNsYXNzIG5hbWUgdG8gZWFjaCBpbnB1dCBlbGVtZW50IGluIGEgZm9ybSBiYXNlZCBvbiBpdHMgdHlwZVxuICogQGV4YW1wbGVcbiAqIC8vIEJlZm9yZVxuICogPGZvcm0gaWQ9XCJmb3JtXCI+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG4gKiAgICAgPC9kaXY+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPHNlbGVjdD4uLi48L3NlbGVjdD5cbiAqICAgICA8L2Rpdj5cbiAqIDwvZm9ybT5cbiAqXG4gKiBjbGFzc2lmeUZvcm0oJyNmb3JtJywgeyBmb3JtRmllbGRDbGFzczogJ2Zvcm0tZmllbGQnIH0pO1xuICpcbiAqIC8vIEFmdGVyXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1pbnB1dCBmb3JtLWZpZWxkLS1pbnB1dFRleHRcIj4uLi48L2Rpdj5cbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLXNlbGVjdFwiPi4uLjwvZGl2PlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gZm9ybVNlbGVjdG9yIC0gc2VsZWN0b3Igb3IgZWxlbWVudFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge2pRdWVyeX0gRWxlbWVudCBpdHNlbGZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzaWZ5Rm9ybShmb3JtU2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0ICRmb3JtID0gJChmb3JtU2VsZWN0b3IpO1xuICAgIGNvbnN0ICRpbnB1dHMgPSAkZm9ybS5maW5kKGlucHV0VGFnTmFtZXMuam9pbignLCAnKSk7XG5cbiAgICAvLyBPYnRhaW4gb3B0aW9uc1xuICAgIGNvbnN0IHsgZm9ybUZpZWxkQ2xhc3MgPSAnZm9ybS1maWVsZCcgfSA9IG9wdGlvbnM7XG5cbiAgICAvLyBDbGFzc2lmeSBlYWNoIGlucHV0IGluIGEgZm9ybVxuICAgICRpbnB1dHMuZWFjaCgoX18sIGlucHV0KSA9PiB7XG4gICAgICAgIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAkZm9ybTtcbn1cblxuLyoqXG4gKiBHZXQgaWQgZnJvbSBnaXZlbiBmaWVsZFxuICogQHBhcmFtIHtvYmplY3R9ICRmaWVsZCBKUXVlcnkgZmllbGQgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEZpZWxkSWQoJGZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9ICRmaWVsZC5wcm9wKCduYW1lJykubWF0Y2goLyhcXFsuKlxcXSkvKTtcblxuICAgIGlmIChmaWVsZElkICYmIGZpZWxkSWQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmaWVsZElkWzBdO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBJbnNlcnQgaGlkZGVuIGZpZWxkIGFmdGVyIFN0YXRlL1Byb3ZpbmNlIGZpZWxkXG4gKiBAcGFyYW0ge29iamVjdH0gJHN0YXRlRmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxuICovXG5mdW5jdGlvbiBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRzdGF0ZUZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IGdldEZpZWxkSWQoJHN0YXRlRmllbGQpO1xuICAgIGNvbnN0IHN0YXRlRmllbGRBdHRycyA9IHtcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgIG5hbWU6IGBGb3JtRmllbGRJc1RleHQke2ZpZWxkSWR9YCxcbiAgICAgICAgdmFsdWU6ICcxJyxcbiAgICB9O1xuXG4gICAgJHN0YXRlRmllbGQuYWZ0ZXIoJCgnPGlucHV0IC8+Jywgc3RhdGVGaWVsZEF0dHJzKSk7XG59XG5cbmNvbnN0IFZhbGlkYXRvcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIG5ldyB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgZGlydHlcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yVGV4dCBkZXNjcmliZXMgZXJyb3JNYXNzYWdlIG9uIGVtYWlsIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBzZXRFbWFpbFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvclRleHQpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JUZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBwYXNzd29yZFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHBhc3N3b3JkMlNlbGVjdG9yXG4gICAgICogQHBhcmFtIHJlcXVpcmVtZW50c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvclRleHRzT2JqZWN0XG4gICAgICogQHBhcmFtIGlzT3B0aW9uYWxcbiAgICAgKi9cbiAgICBzZXRQYXNzd29yZFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIHBhc3N3b3JkU2VsZWN0b3IsIHBhc3N3b3JkMlNlbGVjdG9yLCByZXF1aXJlbWVudHMsIHtcbiAgICAgICAgb25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0LCBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCwgb25NaXNtYXRjaFBhc3N3b3JkRXJyb3JUZXh0LCBvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQsXG4gICAgfSwgaXNPcHRpb25hbCkgPT4ge1xuICAgICAgICBjb25zdCAkcGFzc3dvcmQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBwYXNzd29yZFZhbGlkYXRpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMuYWxwaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLm1hdGNoKG5ldyBSZWdFeHAocmVxdWlyZW1lbnRzLm51bWVyaWMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLmxlbmd0aCA+PSByZXF1aXJlbWVudHMubWlubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG9wdGlvbmFsIGFuZCBub3RoaW5nIGVudGVyZWQsIGl0IGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsICYmIHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwgPT09ICRwYXNzd29yZC52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQocGFzc3dvcmRWYWxpZGF0aW9ucyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHBhc3N3b3JkIGZpZWxkc1xuICAgICAqIEBwYXJhbSB7Tm9kfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0b3JzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5lcnJvclNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5maWVsZHNldFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5mb3JtU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1heFByaWNlU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1pblByaWNlU2VsZWN0b3JcbiAgICAgKi9cbiAgICBzZXRNaW5NYXhQcmljZVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIHNlbGVjdG9ycywgcHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cyA9IHt9KSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3IsXG4gICAgICAgICAgICBmaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yLFxuICAgICAgICAgICAgbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH0gPSBzZWxlY3RvcnM7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgICAgIGNvbnN0IHsgb25NaW5QcmljZUVycm9yLCBvbk1heFByaWNlRXJyb3IsIG1pblByaWNlTm90RW50ZXJlZCwgbWF4UHJpY2VOb3RFbnRlcmVkLCBvbkludmFsaWRQcmljZSB9ID0gcHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cztcblxuICAgICAgICB2YWxpZGF0b3IuY29uZmlndXJlKHtcbiAgICAgICAgICAgIGZvcm06IGZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIHByZXZlbnRTdWJtaXQ6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzQ2xhc3M6ICdfJywgLy8gS0xVREdFOiBEb24ndCBhcHBseSBzdWNjZXNzIGNsYXNzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogYG1pbi1tYXg6JHttaW5QcmljZVNlbGVjdG9yfToke21heFByaWNlU2VsZWN0b3J9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICBzZWxlY3RvcjogW21pblByaWNlU2VsZWN0b3IsIG1heFByaWNlU2VsZWN0b3JdLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdtaW4tbnVtYmVyOjAnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3Iuc2V0TWVzc2FnZU9wdGlvbnMoe1xuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcbiAgICAgICAgICAgIHBhcmVudDogZmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGVycm9yU3BhbjogZXJyb3JTZWxlY3RvcixcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldFN0YXRlQ291bnRyeVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvclRleHQpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNsYXNzZXMgZnJvbSBkaXJ0eSBmb3JtIGlmIHByZXZpb3VzbHkgY2hlY2tlZFxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIGNsZWFuVXBTdGF0ZVZhbGlkYXRpb246IChmaWVsZCkgPT4ge1xuICAgICAgICBjb25zdCAkZmllbGRDbGFzc0VsZW1lbnQgPSAkKChgW2RhdGEtdHlwZT1cIiR7ZmllbGQuZGF0YSgnZmllbGRUeXBlJyl9XCJdYCkpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKG5vZC5jbGFzc2VzKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCRmaWVsZENsYXNzRWxlbWVudC5oYXNDbGFzcyhub2QuY2xhc3Nlc1t2YWx1ZV0pKSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkQ2xhc3NFbGVtZW50LnJlbW92ZUNsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuXG5leHBvcnQgeyBWYWxpZGF0b3JzLCBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH07XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gcGFyc2VzIEhUTUwgZW50aXRpZXMgaW4gc3RyaW5nc1xuICogQHBhcmFtIHN0cjogU3RyaW5nXG4gKiBAcmV0dXJucyBTdHJpbmdcbiovXG5leHBvcnQgY29uc3Qgc2FmZVN0cmluZyA9IChzdHIpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERPTVBhcnNlcigpO1xuICAgIHJldHVybiBkLnBhcnNlRnJvbVN0cmluZyhzdHIsICd0ZXh0L2h0bWwnKS5ib2R5LnRleHRDb250ZW50O1xufTtcbiIsIi8qXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSwgeyBtb2RhbFR5cGVzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuXG5jb25zdCB7IFdSSVRFX1JFVklFVyB9ID0gbW9kYWxUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB0aGlzLiRyZXZpZXdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nKTtcbiAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtYnVsay1wcmljaW5nXCJdJyk7XG4gICAgICAgIHRoaXMucmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoJyNtb2RhbC1yZXZpZXctZm9ybScpWzBdO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgZm91bmRhdGlvbiBtb2RhbCBjbG9zZSBldmVudHMgdG8gc2FuaXRpemUgVVJMIGFmdGVyIHJldmlldy5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Nsb3NlLmZuZHRuLnJldmVhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PSBcIkVudGVyXCIgJiYgJChcInNlY3Rpb24ucHJvZHVjdFZpZXctZGV0YWlscyBsYWJlbFwiKS5pcyhcIjpmb2N1c1wiKSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZExhYmVsID0gJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5hdHRyKCdkYXRhLXByb2R1Y3QtYXR0cmlidXRlLXZhbHVlJyk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkSW5wdXQgPSAkKFwic2VjdGlvbi5wcm9kdWN0Vmlldy1kZXRhaWxzXCIpLmZpbmQoXCJbdmFsdWU9J1wiICsgc2VsZWN0ZWRMYWJlbCArIFwiJ11cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkKHNlbGVjdGVkSW5wdXQpLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHZhbGlkYXRvcjtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJCgnLnByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XG5cbiAgICAgICAgdGhpcy5idWxrUHJpY2luZ0hhbmRsZXIoKTtcblxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcblxuICAgICAgICBpZiAoJHJldmlld0Zvcm0ubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldygkcmV2aWV3Rm9ybSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ29wZW5lZC5mbmR0bi5yZXZlYWwnLCAnI21vZGFsLXJldmlldy1mb3JtJywgKCkgPT4gdGhpcy5yZXZpZXdNb2RhbC5zZXR1cEZvY3VzYWJsZUVsZW1lbnRzKFdSSVRFX1JFVklFVykpO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyZXZpZXdGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcbiAgICAgICAgJGZvcm0uZmluZCgnW2RhdGEtaW5wdXRdJykuZWFjaCgoXywgaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgbXNnU3BhbklkID0gYCR7JGlucHV0LmF0dHIoJ25hbWUnKX0tbXNnYDtcblxuICAgICAgICAgICAgJGlucHV0LnNpYmxpbmdzKCdzcGFuJykuYXR0cignaWQnLCBtc2dTcGFuSWQpO1xuICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBtc2dTcGFuSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9kdWN0UmV2aWV3SGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyNidWxrX3ByaWNpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB7IENvbGxhcHNpYmxlRXZlbnRzIH0gZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBmb3JtcyBmcm9tICcuLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcbmltcG9ydCB7IHNhZmVTdHJpbmcgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvc2FmZS1zdHJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoJHJldmlld0Zvcm0pIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkcmV2aWV3Rm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJldmlld3NDb250ZW50ID0gJCgnI3Byb2R1Y3QtcmV2aWV3cycpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZSA9ICQoJ1tkYXRhLWNvbGxhcHNpYmxlXScsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICB0aGlzLmluaXRMaW5rQmluZCgpO1xuICAgICAgICB0aGlzLmluamVjdFBhZ2luYXRpb25MaW5rKCk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VSZXZpZXdzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdGlhbCBwYWdlIGxvYWQsIHRoZSB1c2VyIGNsaWNrcyBvbiBcIigxMiBSZXZpZXdzKVwiIGxpbmtcbiAgICAgKiBUaGUgYnJvd3NlciBqdW1wcyB0byB0aGUgcmV2aWV3IHBhZ2UgYW5kIHNob3VsZCBleHBhbmQgdGhlIHJldmlld3Mgc2VjdGlvblxuICAgICAqL1xuICAgIGluaXRMaW5rQmluZCgpIHtcbiAgICAgICAgY29uc3QgJGNvbnRlbnQgPSAkKCcjcHJvZHVjdFJldmlld3MtY29udGVudCcsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICAkKCcjcHJvZHVjdFJldmlld19saW5rJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXJldmlld1RhYkxpbmsnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgaWYgKCEkY29udGVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbGxhcHNlUmV2aWV3cygpIHtcbiAgICAgICAgLy8gV2UncmUgaW4gcGFnaW5hdGluZyBzdGF0ZSwgZG8gbm90IGNvbGxhcHNlXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5pbmRleE9mKCcjcHJvZHVjdC1yZXZpZXdzJykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvcmNlIGNvbGxhcHNlIG9uIHBhZ2UgbG9hZFxuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmplY3QgSUQgaW50byB0aGUgcGFnaW5hdGlvbiBsaW5rXG4gICAgICovXG4gICAgaW5qZWN0UGFnaW5hdGlvbkxpbmsoKSB7XG4gICAgICAgIGNvbnN0ICRuZXh0TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLW5leHQgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcbiAgICAgICAgY29uc3QgJHByZXZMaW5rID0gJCgnLnBhZ2luYXRpb24taXRlbS0tcHJldmlvdXMgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICBpZiAoJG5leHRMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5leHRMaW5rLmF0dHIoJ2hyZWYnLCBgJHskbmV4dExpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHByZXZMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJHByZXZMaW5rLmF0dHIoJ2hyZWYnLCBgJHskcHJldkxpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3RlclZhbGlkYXRpb24oY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnZhbGlkYXRvci5hZGQoW3tcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZyYXRpbmdcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHNhZmVTdHJpbmcodGhpcy5jb250ZXh0LnJldmlld1JhdGluZyksXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0aXRsZVwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogc2FmZVN0cmluZyh0aGlzLmNvbnRleHQucmV2aWV3U3ViamVjdCksXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0ZXh0XCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBzYWZlU3RyaW5nKHRoaXMuY29udGV4dC5yZXZpZXdDb21tZW50KSxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICcud3JpdGVSZXZpZXctZm9ybSBbbmFtZT1cImVtYWlsXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG4gICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdFbWFpbCxcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBWaWRlb0dhbGxlcnkge1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHBsYXllciA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLXBsYXllcl0nKTtcbiAgICAgICAgdGhpcy4kdmlkZW9zID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8taXRlbV0nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7fTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0TmV3VmlkZW8oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHtcbiAgICAgICAgICAgIGlkOiAkdGFyZ2V0LmRhdGEoJ3ZpZGVvSWQnKSxcbiAgICAgICAgICAgICRzZWxlY3RlZFRodW1iOiAkdGFyZ2V0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0TWFpblZpZGVvKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGh1bWIoKTtcbiAgICB9XG5cbiAgICBzZXRNYWluVmlkZW8oKSB7XG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBgLy93d3cueW91dHViZS5jb20vZW1iZWQvJHt0aGlzLmN1cnJlbnRWaWRlby5pZH1gKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVUaHVtYigpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8uJHNlbGVjdGVkVGh1bWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld1ZpZGVvLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmlkZW9HYWxsZXJ5KCkge1xuICAgIGNvbnN0IHBsdWdpbktleSA9ICd2aWRlby1nYWxsZXJ5JztcbiAgICBjb25zdCAkdmlkZW9HYWxsZXJ5ID0gJChgW2RhdGEtJHtwbHVnaW5LZXl9XWApO1xuXG4gICAgJHZpZGVvR2FsbGVyeS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCAkZWwgPSAkKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpc0luaXRpYWxpemVkID0gJGVsLmRhdGEocGx1Z2luS2V5KSBpbnN0YW5jZW9mIFZpZGVvR2FsbGVyeTtcblxuICAgICAgICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsLmRhdGEocGx1Z2luS2V5LCBuZXcgVmlkZW9HYWxsZXJ5KCRlbCkpO1xuICAgIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==