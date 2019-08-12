function setActiveMenu(menus) {
    for (var i = 0; i < menus.length; i++) {
        $("#" + menus[i]).addClass('active');
    }

    // if (menus.length > 1) {
    //     $("#" + menus[0] + "_list").show();
    //     $("#" + menus[0] + "_add").hide();
    //     $("#" + menus[0] + "_remove").show();
    // }
}

function init() {
    initBuns();
}

function initBuns() {
    var elements = $(".bun"),
        formattedNumber = 0;

    for (var i = 0; i < elements.length; i++) {
        formattedNumber = numeral($(elements[i]).html()).format("0, 0");
        $(elements[i]).addClass("label").addClass("label-info");
        $(elements[i]).html(formattedNumber + " BUNs");
    }
}

$(document).ready(
    function() {
        init();
    });


function displayInfoMessage(infoMsg) {
    var infoElement = "<div class='alert alert-info'>";
    infoElement += infoMsg;
    infoElement += "</div>";

    return infoElement;
}

function formatDateLabel() {
    var elements = $(".date-label"),
        initialValue = "",
        formattedDate = "";

    for (var i = 0; i < elements.length; i++) {
        initialValue = $(elements[i]).html();
        formattedDate = moment(parseInt(initialValue)).format("DD/MM/YYYY HH:mm");

        $(elements[i]).html(formattedDate);
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function formatBidDates() {
    var dateElements = $(".format-date"),
        formattedDate = "",
        dateItem = "";

    for (var i = 0; i < dateElements.length; i++) {
        dateItem = parseFloat($(dateElements[i]).html()) / 1000;
        formattedDate = moment.unix(dateItem).format("DD/MM/YYYY HH:mm");

        $(dateElements[i]).html(formattedDate);
    }
}

jQuery(document).ready(function($) {
    initGoogleLogin();
    initFacebookLogin();

    function initGoogleLogin() {
        var googleUser = {},
            params = {},
            auth2 = null;

        var startApp = function() {
            try {
                gapi.load('auth2', function() {
                    // Retrieve the singleton for the GoogleAuth library and set up the client.
                    auth2 = gapi.auth2.init({
                        client_id: '18774070907-55ags2bm4p28oqeubsuc1pd0g98095v7.apps.googleusercontent.com',
                        cookiepolicy: 'single_host_origin',
                        // Request scopes in addition to 'profile' and 'email'
                        //scope: 'additional_scope'
                    });

                    attachSignin(document.getElementById("google_login_button"));
                });
            } catch (e) {
                console.log("home.page.js (Line: 402) : google api not loaded"); //debug
            }
        };

        function attachSignin(element) {
            auth2.attachClickHandler(element, {},
                function(googleUser) {
                    var profile = googleUser.getBasicProfile();
                    var idToken = googleUser.getAuthResponse().id_token;

                    var successCallback = function(response) {
                        googleButtonSigninLoad(false, ".google-button");

                        swal({
                            title: response.success_message,
                            // text: response.success_message,
                            icon: "success",
                            // button: locale.common.proceed,
                            closeOnClickOutside: false
                        });

                        setTimeout(function() {
                            window.location.href = "/";
                        }, 2000);
                    };

                    var errorCallback = function(response) {
                        if (element.id == "google_login_button_login_modal") {
                            googleButtonSigninLoad(false, ".google-button");
                        } else {
                            googleButtonSignupLoad(false, ".google-button");
                        }

                        $("#register_action_con").removeClass("hide").html(displayErrorFromArray(response.error));
                    }

                    var params = {
                        url: "/login/google",
                        show_success_message: false,
                        success_callback_function: successCallback,
                        data: {
                            google_user_id: profile.getId(),
                            first_name: profile.getGivenName(),
                            last_name: profile.getFamilyName(),
                            email: profile.getEmail(),
                            id_token: idToken
                        }
                    };

                    params.show_error_message = false;
                    params.error_callback_function = errorCallback;

                    ajaxLoad(params);
                },
                function(error) {
                    console.log(error); //debug
                });
        }

        startApp();

        $(".google-button").click(function() {
            googleButtonSignupLoad(true, ".google-button");
        });
    }





    function initFacebookLogin() {
        $("#facebook_login_button").click(function() {
            FB.login(function(response) {
                facebookSuccessfulLogin(false, "facebook_login_button");
            }, {
                scope: 'public_profile,email'
            });
        });

        window.fbAsyncInit = function() {
            FB.init({
                appId: '338424913719787',
                cookie: true, // enable cookies to allow the server to access the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.8' // use graph api version 2.8
            });

            FB.getLoginStatus(function(response) {
                if (response.status == "connected") {}
            });

        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));




        var facebookSuccessfulLogin = function(redirectToBuy, element) {
            FB.api('/me?fields=id,first_name,last_name,email', function(response) {
                var successCallback = function(response) {
                    facebookButtonSigninLoad(false, ".facebook-button");

                    swal({
                        title: locale.login.facebook_login_title,
                        text: response.success_message,
                        icon: "success",
                        button: locale.common.proceed,
                        closeOnClickOutside: false
                    });

                    setTimeout(function() {
                        window.location.href = "/";
                    }, 2000);
                };

                var errorCallback = function(response) {
                    facebookButtonSigninLoad(false, ".facebook-button");

                    $("#register_action_con").removeClass("hide").html(displayErrorFromArray(response.error));
                }

                var params = {
                    url: "/login/facebook",
                    show_success_message: false,
                    success_callback_function: successCallback,
                    error_callback_function: errorCallback,
                    data: {
                        facebook_user_id: response.id,
                        first_name: response.first_name,
                        last_name: response.last_name,
                        email: response.email
                    }
                };

                ajaxLoad(params);
            });
        }

        $(".facebook-button").click(function() {
            facebookButtonSignupLoad(true, ".facebook-button");
        });
    }






    function googleButtonSignupLoad(loading, elementSelector) {
        if (loading) {
            $(elementSelector).find("span").html("Loading...");
        } else {
            $(elementSelector).find("span").html("Sign up with Google");
        }
    }

    function googleButtonSigninLoad(loading, elementSelector) {
        if (loading) {
            $(elementSelector).find("span").html("Loading...");
        } else {
            $(elementSelector).find("span").html("Sign in with Google");
        }
    }

    function facebookButtonSignupLoad(loading, elementSelector) {
        if (loading) {
            $(elementSelector).find("span").html("Loading...");
        } else {
            $(elementSelector).find("span").html("Sign up with Facebook");
        }
    }

    function facebookButtonSigninLoad(loading, elementSelector) {
        if (loading) {
            $(elementSelector).find("span").html("Loading...");
        } else {
            $(elementSelector).find("span").html("Sign in with Facebook");
        }
    }
});