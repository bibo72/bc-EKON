import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import checkout from './custom/checkout';

export default class Global extends PageManager {
    onReady() {
        const {
            channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage, showAdminBar,
        } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel();
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        if (showAdminBar) {
            adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        }
        loadingProgressBar();
        svgInjector();
        checkout();

        /* BundleB2B */
        $('body').append('<script src="https://cdn.bundleb2b.net/bundleb2b.3.3.0.js"></script>');

        window.b3themeConfig = window.b3themeConfig || {};

        window.b3themeConfig.useText = {
            'global.required.label': '*',
        };

        window.b3themeConfig.useContainers = {
            'tpa.button.container--s': '.navPages .sticky-navpages',
            'quickOrderPad.button.container--s': '.navPages .sticky-navpages',
            'dashboard.endMasquerade.container': '.logo-user-section.container',
            'orders.container': 'main.account',
            'buyAgain.container': '.container .page .page-content',
        };

        window.b3themeConfig.useJavaScript = {
            login: {
                callback(instance) {
                    $('.body').show();
                    const { B3RoleId } = instance.utils.B3Storage;
                    const roleId = B3RoleId.value;

                    const hideWishList = () => {
                        $('[href^="/wishlist.php"]').remove();
                        $('[action^="/wishlist.php"]').remove();
                        $('head').append(`<style>
                      [href^="/wishlist.php"], [action^="/wishlist.php"] {
                        display: none!important;
                      }
                    </style>`);
                    };

                    const renderMobileNavs = () => {
                        if (!instance.isMobile) return;
                        $('.navPages .sticky-navpages .b3-mobile-nav').remove();

                        const $navs = $('.navBar--account .navBar-section').eq(0).children('.navBar-item');
                        $navs
                            .removeClass('navBar-item')
                            .addClass('navPages-item')
                            .addClass('b3-mobile-nav')
                            .children('a')
                            .removeClass('navBar-action')
                            .addClass('navPages-action');

                        $('.navPages .sticky-navpages').append($navs);

                        instance.renderB3Navs({
                            containerSelector: '.navPages .sticky-navpages',
                            navItemClassName: 'navPages-item b3-mobile-nav',
                            insertType: 'beforeEnd',
                        });

                        hideWishList();
                    };

                    const hideJuniorSaw = () => {
                        const isJunior = roleId === '2';
                        if (isJunior) {
                            // pdp
                            $('#form-action-addToCart').parent().remove();
                        }
                    };

                    const renderDropDownMenu = () => {
                        $('#account-dropdown-signout-list .b3-dropdown-menu').remove();
                        instance.renderB3Navs({
                            containerSelector: '#account-dropdown-signout-list .navBar-section',
                            navItemClassName: 'navBar-item signout-list b3-dropdown-menu',
                            insertType: 'afterbegin',
                        });

                        // is show invoice in dropdown menu
                        if (instance.canShowB2BNav && instance.haveIPPermission) {
                            const invoiceEl = `<li class="navBar-item signout-list b3-dropdown-menu">
                                                <a class="navBar-action" href="/invoices/">Invoices</a>
                                          </li>`;
                            $('#account-dropdown-signout-list li:first-child').before(invoiceEl);
                        }
                    };

                    const bindMasqueradAction = () => {
                        ((selectors) => {
                            selectors.forEach(selector => {
                                $('body').on('click', selector, async () => {
                                    await instance.getIsShowAddressBook();
                                    renderDropDownMenu();
                                    renderMobileNavs();
                                    const { B3CompanyId } = instance.B3Storage;
                                    const prevCompanyId = B3CompanyId.value;
                                    const timer = setInterval(() => {
                                        const { B3CompanyId } = instance.B3Storage;
                                        const currCompanyId = B3CompanyId.value;
                                        if (prevCompanyId !== currCompanyId) {
                                            clearInterval(timer);
                                            renderDropDownMenu();
                                            renderMobileNavs();
                                        }
                                    });
                                });
                            });
                        })(['[action-begin-masquerade]', '[end-masquerade]']);
                    };

                    if (roleId) {
                        renderDropDownMenu();
                        renderMobileNavs();
                        bindMasqueradAction();
                        hideJuniorSaw();
                    }
                },
            },
        };
        /* BundleB2B */
    }
}
