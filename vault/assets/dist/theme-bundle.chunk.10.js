(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);

  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Cart.prototype;

  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components

    this.bindEvents();
  };

  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1; // Does not quality for min/max quantity

    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;

    if (preVal === void 0) {
      preVal = null;
    }

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry; // Does not quality for min/max quantity

    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: invalidEntry + " is not a valid entry",
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;

    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();

    if (this.$modal === null) {
      this.$modal = $('#modal');
    }

    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
      var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
      $productOptionsContainer.css('height', modalBodyReservedHeight);
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);

      _this4.bindGiftWrappingForm();

      modal.setupFocusableElements(_global_modal__WEBPACK_IMPORTED_MODULE_6__["modalTypes"].CART_CHANGE_PRODUCT);
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};

        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };

  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;

    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages'
      }
    };
    this.$overlay.show(); // Remove last item from cart? Reload

    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);

      _this5.$cartTotals.html(response.totals);

      _this5.$cartMessages.html(response.statusMessages);

      $cartPageTitle.replaceWith(response.pageTitle);

      _this5.bindEvents();

      _this5.$overlay.hide();

      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
    });
  };

  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;

    var debounceTimeout = 400;

    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);

    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);

    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);

    var preVal; // cart update

    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdate($target);
    }); // cart qty manually updates

    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault(); // edit item in cart

      _this6.cartEditOptions(itemId, productId);
    });
  };

  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;

    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault(); // Empty code

      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            html: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;

    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();

      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: $certInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
            html: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_6__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);

        _this9.bindGiftWrappingForm();
      });
    });
  };

  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');

      if (!id) {
        return;
      }

      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();

      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };

  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents(); // initiate shipping estimator module

    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_5__["default"]($('[data-shipping-estimator]'));
  };

  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");







var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }

  var _proto = ShippingEstimator.prototype;

  _proto.initFormValidation = function initFormValidation() {
    var _this = this;

    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit"
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }

      if (_this.shippingValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };

  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: 'The \'Country\' field cannot be blank.'
    }]);
  };

  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;

    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");

        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }

        cb(result);
      },
      errorMessage: 'The \'State/Province\' field cannot be blank.'
    }]);
  }
  /**
   * Toggle between default shipping and ups shipping rates
   */
  ;

  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };

  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;

    var $last; // Requests the states for a country with AJAX

    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }

      var $field = $(field);

      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }

      if ($last) {
        _this3.shippingValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;

        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["Validators"].cleanUpStateValidation(field);
      } // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us


      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };

  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };

    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }

    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };

  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;

    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content); // bind the select button

        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();

      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };

  return ShippingEstimator;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartItemDetails; });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");


function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);

  function CartItemDetails($scope, context, productAttributesData) {
    var _this;

    if (productAttributesData === void 0) {
      productAttributesData = {};
    }

    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__["optionChangeDecorator"].call(_assertThisInitialized(_this), hasDefaultOptions); // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view

    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }

    return _this;
  }

  var _proto = CartItemDetails.prototype;

  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');

      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });

        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;

        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');

        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = Object(_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["convertIntoArray"])(value.children);

            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };

            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };

          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;

            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }

          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__["isBrowserIE"] ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];

            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }

          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }

          return;
        }

        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');

    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;

      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }
  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */
  ;

  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);

    this.$scope.find('.modal-content').removeClass('hide-content');
  };

  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string') {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbIkNhcnQiLCJvblJlYWR5IiwiJG1vZGFsIiwiJGNhcnRDb250ZW50IiwiJCIsIiRjYXJ0TWVzc2FnZXMiLCIkY2FydFRvdGFscyIsIiRvdmVybGF5IiwiaGlkZSIsImJpbmRFdmVudHMiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzd2FsIiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsInV0aWxzIiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiY2FydFJlbW92ZUl0ZW0iLCJpdGVtUmVtb3ZlIiwiY2FydEVkaXRPcHRpb25zIiwicHJvZHVjdElkIiwiY29udGV4dCIsInByb2R1Y3RGb3JDaGFuZ2VJZCIsIm1vZGFsIiwiZGVmYXVsdE1vZGFsIiwib3B0aW9ucyIsInRlbXBsYXRlIiwib3BlbiIsImZpbmQiLCJhZGRDbGFzcyIsInByb2R1Y3RBdHRyaWJ1dGVzIiwiY29uZmlndXJlSW5DYXJ0IiwidXBkYXRlQ29udGVudCIsImNvbnRlbnQiLCIkcHJvZHVjdE9wdGlvbnNDb250YWluZXIiLCJtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCIsIm91dGVySGVpZ2h0IiwiY3NzIiwicHJvZHVjdERldGFpbHMiLCJDYXJ0SXRlbURldGFpbHMiLCJiaW5kR2lmdFdyYXBwaW5nRm9ybSIsInNldHVwRm9jdXNhYmxlRWxlbWVudHMiLCJtb2RhbFR5cGVzIiwiQ0FSVF9DSEFOR0VfUFJPRFVDVCIsImhvb2tzIiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCIkZm9ybSIsIiRzdWJtaXQiLCIkbWVzc2FnZUJveCIsIm9wdGlvbkNoYW5nZSIsInNlcmlhbGl6ZSIsInJlc3VsdCIsInB1cmNoYXNpbmdfbWVzc2FnZSIsInByb3AiLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCIkY2FydEl0ZW1zUm93cyIsIiRjYXJ0UGFnZVRpdGxlIiwidG90YWxzIiwicGFnZVRpdGxlIiwic3RhdHVzTWVzc2FnZXMiLCJsZW5ndGgiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImdldENvbnRlbnQiLCJodG1sIiwicmVwbGFjZVdpdGgiLCJxdWFudGl0eSIsInRyaWdnZXIiLCJiaW5kQ2FydEV2ZW50cyIsImRlYm91bmNlVGltZW91dCIsInByZXZlbnREZWZhdWx0Iiwib25RdHlGb2N1cyIsInZhbHVlIiwiY2hhbmdlIiwic3RyaW5nIiwic2hvd0NhbmNlbEJ1dHRvbiIsInRoZW4iLCJiaW5kUHJvbW9Db2RlRXZlbnRzIiwiJGNvdXBvbkNvbnRhaW5lciIsIiRjb3Vwb25Gb3JtIiwiJGNvZGVJbnB1dCIsImNvZGUiLCJhcHBseUNvZGUiLCJiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzIiwiJGNlcnRDb250YWluZXIiLCIkY2VydEZvcm0iLCIkY2VydElucHV0IiwidG9nZ2xlIiwiZ2lmdENlcnRDaGVjayIsImFwcGx5R2lmdENlcnRpZmljYXRlIiwicmVzcCIsImJpbmRHaWZ0V3JhcHBpbmdFdmVudHMiLCJnZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyIsIiRzZWxlY3QiLCJpZCIsImluZGV4IiwiYWxsb3dNZXNzYWdlIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJzaGlwcGluZ0VzdGltYXRvciIsIlNoaXBwaW5nRXN0aW1hdG9yIiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJiaW5kVmFsaWRhdGlvbiIsImJpbmRTdGF0ZVZhbGlkYXRpb24iLCJiaW5kVVBTUmF0ZXMiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJjb3VudHJ5SWQiLCJpc05hTiIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwidXNlSWRGb3JTdGF0ZXMiLCJmaWVsZCIsIkVycm9yIiwiJGZpZWxkIiwiZ2V0U3RhdHVzIiwiaXMiLCJhdHRyIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiJHNjb3BlIiwicHJvZHVjdEF0dHJpYnV0ZXNEYXRhIiwiJHByb2R1Y3RPcHRpb25zRWxlbWVudCIsImhhc09wdGlvbnMiLCJ0cmltIiwiaGFzRGVmYXVsdE9wdGlvbnMiLCJzZXRQcm9kdWN0VmFyaWFudCIsIm9wdGlvbkNoYW5nZUNhbGxiYWNrIiwib3B0aW9uQ2hhbmdlRGVjb3JhdG9yIiwiY2FsbCIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyIsImVhY2giLCJvcHRpb25MYWJlbCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Iiwib3B0aW9uVGl0bGUiLCJzcGxpdCIsInJlcXVpcmVkIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImlzU2F0aXNmaWVkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5Iiwic2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImRhdGVTdHJpbmciLCJtYXAiLCJ4IiwiY2hlY2tlZCIsImdldFNlbGVjdGVkT3B0aW9uTGFiZWwiLCJwcm9kdWN0VmFyaWFudHNsaXN0IiwiY29udmVydEludG9BcnJheSIsIm1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQiLCJpbnB0IiwiZGF0YXNldCIsInByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSIsImZpbHRlciIsImxhYmVsIiwiaXNCcm93c2VySUUiLCJsYWJlbHMiLCJ0aXRsZSIsInByb2R1Y3RWYXJpYW50Iiwic29ydCIsInZpZXciLCJwcm9kdWN0TmFtZSIsIm1hdGNoIiwiY2FyZCIsIlByb2R1Y3REZXRhaWxzQmFzZSIsImNlcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVx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QyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHsgYmluZCwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGdpZnRDZXJ0Q2hlY2sgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBTaGlwcGluZ0VzdGltYXRvciBmcm9tICcuL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yJztcbmltcG9ydCB7IGRlZmF1bHRNb2RhbCwgbW9kYWxUeXBlcyB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBzd2FsIGZyb20gJy4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcbmltcG9ydCBDYXJ0SXRlbURldGFpbHMgZnJvbSAnLi9jb21tb24vY2FydC1pdGVtLWRldGFpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuJG1vZGFsID0gbnVsbDtcbiAgICAgICAgdGhpcy4kY2FydENvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0LWNvbnRlbnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcyA9ICQoJ1tkYXRhLWNhcnQtc3RhdHVzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0VG90YWxzID0gJCgnW2RhdGEtY2FydC10b3RhbHNdJyk7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxuICAgICAgICAgICAgLmhpZGUoKTsgLy8gVE9ETzogdGVtcG9yYXJ5IHVudGlsIHJvcGVyIHB1bGxzIGluIGhpcyBjYXJ0IGNvbXBvbmVudHNcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKSA9PT0gJ2luYycgPyBvbGRRdHkgKyAxIDogb2xkUXR5IC0gMTtcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHByZVZhbCAhPT0gbnVsbCA/IHByZVZhbCA6IG1pblF0eTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9IHBhcnNlSW50KE51bWJlcigkZWwudmFsKCkpLCAxMCk7XG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XG5cbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAoIW5ld1F0eSkge1xuICAgICAgICAgICAgaW52YWxpZEVudHJ5ID0gJGVsLnZhbCgpO1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogYCR7aW52YWxpZEVudHJ5fSBpcyBub3QgYSB2YWxpZCBlbnRyeWAsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWluRXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0geyBwcm9kdWN0Rm9yQ2hhbmdlSWQ6IHByb2R1Y3RJZCwgLi4udGhpcy5jb250ZXh0IH07XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuJG1vZGFsID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRtb2RhbCA9ICQoJyNtb2RhbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvY29uZmlndXJlLXByb2R1Y3QnLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcbiAgICAgICAgdGhpcy4kbW9kYWwuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5hZGRDbGFzcygnaGlkZS1jb250ZW50Jyk7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLmNvbmZpZ3VyZUluQ2FydChpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgdGhpcy4kbW9kYWwpO1xuICAgICAgICAgICAgY29uc3QgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQgPSAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5jc3MoJ2hlaWdodCcsIG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0KTtcblxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBDYXJ0SXRlbURldGFpbHModGhpcy4kbW9kYWwsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG5cbiAgICAgICAgICAgIG1vZGFsLnNldHVwRm9jdXNhYmxlRWxlbWVudHMobW9kYWxUeXBlcy5DQVJUX0NIQU5HRV9QUk9EVUNUKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbHMuaG9va3Mub24oJ3Byb2R1Y3Qtb3B0aW9uLWNoYW5nZScsIChldmVudCwgY3VycmVudFRhcmdldCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGZvcm0gPSAkKGN1cnJlbnRUYXJnZXQpLmZpbmQoJ2Zvcm0nKTtcbiAgICAgICAgICAgIGNvbnN0ICRzdWJtaXQgPSAkKCdpbnB1dC5idXR0b24nLCAkZm9ybSk7XG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZUJveCA9ICQoJy5hbGVydE1lc3NhZ2VCb3gnKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzdWx0LmRhdGEgfHwge307XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCdwLmFsZXJ0Qm94LW1lc3NhZ2UnLCAkbWVzc2FnZUJveCkudGV4dChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaENvbnRlbnQocmVtb3ZlKSB7XG4gICAgICAgIGNvbnN0ICRjYXJ0SXRlbXNSb3dzID0gJCgnW2RhdGEtaXRlbS1yb3ddJywgdGhpcy4kY2FydENvbnRlbnQpO1xuICAgICAgICBjb25zdCAkY2FydFBhZ2VUaXRsZSA9ICQoJ1tkYXRhLWNhcnQtcGFnZS10aXRsZV0nKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogJ2NhcnQvY29udGVudCcsXG4gICAgICAgICAgICAgICAgdG90YWxzOiAnY2FydC90b3RhbHMnLFxuICAgICAgICAgICAgICAgIHBhZ2VUaXRsZTogJ2NhcnQvcGFnZS10aXRsZScsXG4gICAgICAgICAgICAgICAgc3RhdHVzTWVzc2FnZXM6ICdjYXJ0L3N0YXR1cy1tZXNzYWdlcycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBsYXN0IGl0ZW0gZnJvbSBjYXJ0PyBSZWxvYWRcbiAgICAgICAgaWYgKHJlbW92ZSAmJiAkY2FydEl0ZW1zUm93cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0Q29udGVudC5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy4kY2FydFRvdGFscy5odG1sKHJlc3BvbnNlLnRvdGFscyk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMuaHRtbChyZXNwb25zZS5zdGF0dXNNZXNzYWdlcyk7XG5cbiAgICAgICAgICAgICRjYXJ0UGFnZVRpdGxlLnJlcGxhY2VXaXRoKHJlc3BvbnNlLnBhZ2VUaXRsZSk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJywgdGhpcy4kY2FydENvbnRlbnQpLmRhdGEoJ2NhcnRRdWFudGl0eScpIHx8IDA7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xuICAgICAgICAgICAgcHJlVmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSkuY2hhbmdlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LXJlbW92ZScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xuICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY2FydFxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1FZGl0Jyk7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3Byb2R1Y3RJZCcpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIGVkaXQgaXRlbSBpbiBjYXJ0XG4gICAgICAgICAgICB0aGlzLmNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Db250YWluZXIgPSAkKCcuY291cG9uLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNvdXBvbkZvcm0gPSAkKCcuY291cG9uLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5zaG93KCk7XG4gICAgICAgICAgICAkY29kZUlucHV0LnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNlcnRDb250YWluZXIgPSAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY2VydEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIWdpZnRDZXJ0Q2hlY2soY29kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJGNlcnRJbnB1dC5kYXRhKCdlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHJlc3AuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuLi9jb21tb24vc3RhdGUtY291bnRyeSc7XG5pbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4uL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgc3dhbCBmcm9tICcuLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwcGluZ0VzdGltYXRvciB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJywgdGhpcy4kZWxlbWVudCk7XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5pdEZvcm1WYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpO1xuICAgICAgICB0aGlzLmJpbmRFc3RpbWF0b3JFdmVudHMoKTtcbiAgICB9XG5cbiAgICBpbml0Rm9ybVZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSAnZm9ybVtkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nO1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdGAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXQnLCB0aGlzLiRlbGVtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAvLyBXaGVuIHN3aXRjaGluZyBiZXR3ZWVuIGNvdW50cmllcywgdGhlIHN0YXRlL3JlZ2lvbiBpcyBkeW5hbWljXG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gYSBjaGVjayBmb3IgYWxsIGZpZWxkcyB3aGVuIGNvdW50cnkgaGFzIGEgdmFsdWVcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhcmVBbGwoJ3ZhbGlkJykgd2lsbCBjaGVjayBjb3VudHJ5IGZvciB2YWxpZGl0eVxuICAgICAgICAgICAgaWYgKCQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCkudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFVQU1JhdGVzKCk7XG4gICAgfVxuXG4gICAgYmluZFZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnRyeUlkID0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50cnlJZCAhPT0gMCAmJiAhTnVtYmVyLmlzTmFOKGNvdW50cnlJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1RoZSBcXCdDb3VudHJ5XFwnIGZpZWxkIGNhbm5vdCBiZSBibGFuay4nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZSA9ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZWxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlVmFsID0gJGVsZS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZWxlVmFsICYmIGVsZVZhbC5sZW5ndGggJiYgZWxlVmFsICE9PSAnU3RhdGUvcHJvdmluY2UnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1RoZSBcXCdTdGF0ZS9Qcm92aW5jZVxcJyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xuICAgICAqL1xuICAgIGJpbmRVUFNSYXRlcygpIHtcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsIFVQU1JhdGVUb2dnbGUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1EZWZhdWx0ID0gJCgnLmVzdGltYXRvci1mb3JtLS1kZWZhdWx0Jyk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtVXBzLnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpIHtcbiAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgc3RhdGVDb3VudHJ5KHRoaXMuJHN0YXRlLCB0aGlzLmNvbnRleHQsIHsgdXNlSWRGb3JTdGF0ZXM6IHRydWUgfSwgKGVyciwgZmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmdldFN0YXR1cyh0aGlzLiRzdGF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ1N0YXRlL3Byb3ZpbmNlJyk7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVtb3ZlIHRoaXMgY2xhc3Mgd2hlbiB3ZSBzd2FwIHNpbmNlIG5vZCB2YWxpZGF0aW9uIGRvZXNuJ3QgY2xlYW51cCBmb3IgdXNcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUodG9nZ2xlQnV0dG9uLCBidXR0b25TZWxlY3RvciwgJHRvZ2dsZUNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUgPSAoc2VsZWN0b3JUb0FjdGl2YXRlKSA9PiB7XG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcbiAgICAgICAgICAgICQoYnV0dG9uU2VsZWN0b3IpLnRleHQoJChgIyR7c2VsZWN0b3JUb0FjdGl2YXRlfWApLnRleHQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItY2xvc2UnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1hZGQnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSAhdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQ7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICB6aXBfY29kZTogJCgnW25hbWU9XCJzaGlwcGluZy16aXBcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRTaGlwcGluZ1F1b3RlcyhwYXJhbXMsICdjYXJ0L3NoaXBwaW5nLXF1b3RlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNoaXBwaW5nLXF1b3RlcycpLmh0bWwocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRoZSBzZWxlY3QgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCgnLnNlbGVjdC1zaGlwcGluZy1xdW90ZScpLm9uKCdjbGljaycsIGNsaWNrRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuc3VibWl0U2hpcHBpbmdRdW90ZShxdW90ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcuc2hpcHBpbmctZXN0aW1hdGUtc2hvd19fYnRuLW5hbWUnLCAkZXN0aW1hdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGlzQnJvd3NlcklFLCBjb252ZXJ0SW50b0FycmF5IH0gZnJvbSAnLi91dGlscy9pZS1oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydEl0ZW1EZXRhaWxzIGV4dGVuZHMgUHJvZHVjdERldGFpbHNCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGNvbnRleHQsIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCcjQ2FydEVkaXRQcm9kdWN0RmllbGRzRm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcbiAgICAgICAgY29uc3QgaGFzT3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaHRtbCgpLnRyaW0oKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGhhc0RlZmF1bHRPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdbZGF0YS1kZWZhdWx0XScpLmxlbmd0aDtcblxuICAgICAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb2R1Y3RWYXJpYW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUNhbGxiYWNrID0gb3B0aW9uQ2hhbmdlRGVjb3JhdG9yLmNhbGwodGhpcywgaGFzRGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwcm9kdWN0IGF0dHJpYnV0ZXMuIEFsc28gdXBkYXRlIHRoZSBpbml0aWFsIHZpZXcgaW4gY2FzZSBpdGVtcyBhcmUgb29zXG4gICAgICAgIC8vIG9yIGhhdmUgZGVmYXVsdCB2YXJpYW50IHByb3BlcnRpZXMgdGhhdCBjaGFuZ2UgdGhlIHZpZXdcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHRoaXMuY29udGV4dC5wcm9kdWN0Rm9yQ2hhbmdlSWQ7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcbiAgICAgICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICAgICAgJC5lYWNoKCQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhbHVlLmNoaWxkcmVuWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdmFsdWUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZSA9PT0gJ2lucHV0LWZpbGUnIHx8IHR5cGUgPT09ICdpbnB1dC10ZXh0JyB8fCB0eXBlID09PSAnaW5wdXQtbnVtYmVyJykgJiYgdmFsdWUucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJyAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLmV2ZXJ5KChzZWxlY3QpID0+IHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkubWFwKCh4KSA9PiB4LnZhbHVlKS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7c2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0fWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHNsaXN0ID0gY29udmVydEludG9BcnJheSh2YWx1ZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0ID0gaW5wdCA9PiBpbnB0LmRhdGFzZXQucHJvZHVjdEF0dHJpYnV0ZVZhbHVlID09PSBjaGVja2VkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuY2hpbGRyZW5bMF0gOiBjaGVja2VkLmxhYmVsc1swXS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Olllc2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XG4gICAgICAgIGNvbnN0IHZpZXcgPSAkKCcubW9kYWwtaGVhZGVyLXRpdGxlJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XG4gICAgICAgICAgICBwcm9kdWN0VmFyaWFudCA9IHByb2R1Y3RWYXJpYW50ID09PSAndW5zYXRpc2ZpZWQnID8gJycgOiBwcm9kdWN0VmFyaWFudDtcbiAgICAgICAgICAgIGlmICh2aWV3LmF0dHIoJ2RhdGEtZXZlbnQtdHlwZScpKSB7XG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSB2aWV3Lmh0bWwoKS5tYXRjaCgvJyguKj8pJy8pWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcbiAgICAgICAgICAgICAgICBjYXJkLmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaGlkZS1jb250ZW50Jyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==