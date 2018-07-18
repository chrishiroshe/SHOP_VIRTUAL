/*	Table OF Contents
	==========================
	Carousel
	Customs Script
	Custom Parallax 
	Custom Scrollbar
	Custom animated.css effect
	Equal height ( subcategory thumb)
	responsive fix
	*/

$(document).ready(function () {

    var containerCurrentPage = $('main#main-container');
    var currentPage = containerCurrentPage.attr('rel');

    common.init();
    switch (currentPage) {
        case 'home':
            home.init();
            break;
        case 'search':
            busca.init();
            break;
    }

    /*==================================
	Customs Script
	====================================*/
    // collapse according add  active class
    $('.collapseWill').on('click', function (e) {
        $(this).toggleClass("pressed"); //you can list several class names 
        e.preventDefault();
    });

    $('.search-box .btn').on('click', function (e) {
        $('.search-full').addClass("active"); //you can list several class names 
        e.preventDefault();
    });
    $('.search-close').on('click', function (e) {
        $('.search-full').removeClass("active"); //you can list several class names 
        e.preventDefault();
    });

    // Customs tree menu script	
    $(".dropdown-tree-a").click(function () { //use a class, since your ID gets mangled
        $(this).parent('.dropdown-tree').toggleClass("open-tree active"); //add the class to the clicked element
    });

    $('.dropdown-treex').bind('click', function () {
        $(this).find('a:first-child').css('color', 'red');
    });

    // List view and Grid view 
    $('div.change-view .list-view').click(function (e) { //use a class, since your ID gets mangled
        e.preventDefault();
        $('.item').addClass("list-view"); //add the class to the clicked element
    });

    $('div.change-view .grid-view').click(function (e) { //use a class, since your ID gets mangled
        e.preventDefault();
        $('.item').removeClass("list-view"); //add the class to the clicked element
    });

    // product details color switch 
    $(".swatches li").click(function () {
        $(".swatches li.selected").removeClass("selected");
        $(this).addClass('selected');
    });
		
	if( /IEMobile/i.test(navigator.userAgent) ) {
 	// Detect windows phone//..
	 $('.navbar-brand').addClass('windowsphone');
	}

    // top navbar IE & Mobile Device fix
    var isMobile = function () {
        //console.log("Navigator: " + navigator.userAgent);
        return /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
    };	

    if (isMobile()) {
        // For  mobile , ipad, tab
    } else {
        // For All Desktop
        if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
            // alert('IE8'); 
        } else {
            // alert('Non IE8');
			
			// track of last scroll
                $(function () {

                    //Keep track of last scroll
                    var tshopScroll = 0;
                    $(window).scroll(function (event) {
                        //Sets the current scroll position
                        var ts = $(this).scrollTop();
                        //Determines up-or-down scrolling
                        if (ts > tshopScroll) {
                            // downward-scrolling
                            $('.navbar').addClass('stuck');
                            //$('.parallaxOffset').addClass('down');
                            //$('.banner').addClass('down');

                        } else {
                            // upward-scrolling
                            $('.navbar').removeClass('stuck');
                           // $('.parallaxOffset').removeClass('down');
                           // $('.banner').removeClass('down');
                        }
                        //Updates scroll position
                        tshopScroll = ts;
                    });
                });
        }
    } // end Desktop else
    
    /*==================================
	Parallax  
	====================================*/
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		// Detect ios User // 
		$('.parallax-section').addClass('isios');
		$('.navbar-header').addClass('isios');
	}
	
	if (/Android|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		// Detect Android User // 
		 $('.parallax-section').addClass('isandroid');
    }
	
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		// Detect Mobile User // No parallax
		 $('.parallax-section').addClass('ismobile');
		 $('.parallaximg').addClass('ismobile');

    } else {
		// All Desktop 
        $(window).bind('scroll', function (e) {
            parallaxScroll();
        });

        if ($(window).width() < 600) {} else {
            $('.parallax-image-aboutus').parallax("50%", 0, 0.2, true);
        }
    }

    /*==================================
	 Custom Scrollbar for Dropdown Cart 
	====================================*/
    $(".scroll-pane").mCustomScrollbar({
        advanced: {
            updateOnContentResize: true
        },
        scrollButtons: {
            enable: false
        },
        mouseWheelPixels: "200",
        theme: "dark-2"
    });

    $(".smoothscroll").mCustomScrollbar({
        advanced: {
            updateOnContentResize: true
        },
        scrollButtons: {
            enable: false
        },
        mouseWheelPixels: "100",
        theme: "dark-2"
    });


    /*==================================
	Custom  animated.css effect
	====================================*/
    window.onload = (function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 86) {
                // Display something
                $('.parallax-image-aboutus .animated').removeClass('fadeInDown');
                $('.parallax-image-aboutus .animated').addClass('fadeOutUp');
            } else {
                // Display something
                $('.parallax-image-aboutus .animated').addClass('fadeInDown');
                $('.parallax-image-aboutus .animated').removeClass('fadeOutUp');
            }

            if ($(window).scrollTop() > 250) {
                // Display something
            } else {
                // Display something
            }
        })
    })

    /*=======================================================================================
	Code for equal height - // your div will never broken if text get overflow  
	========================================================================================*/
    $(function () {
        $('.thumbnail.equalheight').responsiveEqualHeightGrid(); // add class with selector class equalheight
    });

    /*=======================================================================================
	 Code for tablet device || responsive check
	========================================================================================*/
    if ($(window).width() < 989) {
        $('.collapseWill').trigger('click');
    } else {
        // ('More than 960');
    }

    $(".tbtn").click(function () {
        $(".themeControll").toggleClass("active");
    });

    /*==================================
	Global Plugin
	====================================*/
    // For stylish input check boX 
    $(function () {
        //$("input[type='radio'], input[type='checkbox']").ionCheckRadio();
    });

    // bootstrap tooltip 
    $('.tooltipHere').tooltip();

    // customs select by minimalect
    //$("select").minimalect();

    // cart quantity changer sniper
    $("input[name='quanitySniper']").TouchSpin({
        buttondown_class: "btn btn-link",
        buttonup_class: "btn btn-link"
    });
}); // end Ready

var _svfb = {
    initfbscripts: function () {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/pt_BR/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },
    initsdk: function (appid, scope, myaccount) {
        window.fbAsyncInit = function () {
            FB.init({
                appId: appid,
                cookie: true,
                xfbml: true,
                version: 'v2.0'
            });
            if (!myaccount)
                _svfb.auth.login.init(scope);
            else
                _svfb.auth.login.myaccountretrieve();
        };
    },
    auth: {
        login: {
            init: function (scope) {
                $('.fb-logar').on('click', function () {
                    _svfb.auth.login.checkloginstate(scope, true);
                });

                $('.fb-cadastrar').on('click', function () {
                    _svfb.auth.login.checkloginstate(scope, false);
                });
                /*
                <img src="https://graph.facebook.com/10202827863237168/picture?type=small" style="
                            height: 33px;
                            width: 33px;
                            ">
                $('.btn-vincular-conta').on('click', function () {
                    var email = $('#fb-email').val();
                    var senha = $('#fb-senha').val();
                    var fbid = $('#fb-id').val();
                    if (email != "" && senha != "")
                        _svfb.auth.login.ajax.bindbebefaceuser(email, senha, fbid);
                    else
                        $('.fb-errors .empty-fields').show();
                });

                $('#fb-senha').on('keypress', function (event) {
                    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
                    if (keyCode == 13) {
                        event.preventDefault();
                        $('.btn-vincular-conta').trigger('click');
                    }
                });

                $('.btn-vincular-conta-first').on('click', function () {
                    var email = $('#fb-email-first').val();
                    var senha = $('#fb-senha-first').val();
                    var fbid = $('#fb-id-first').val();
                    if (email != "" && senha != "")
                        _svfb.auth.login.ajax.bindbebefaceuser(email, senha, fbid);
                    else
                        $('.fb-errors .empty-fields').show();
                });

                $('#fb-senha-first').on('keypress', function (event) {
                    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
                    if (keyCode == 13) {
                        event.preventDefault();
                        $('.btn-vincular-conta-first').trigger('click');
                    }
                });
                */
            },
            checkloginstate: function (scope, login) {
                FB.getLoginStatus(function (response) {
                    _svfb.auth.login.statuschangecallback(response, scope, login);
                });
            },
            statuschangecallback: function (response, scope, login) {
                if (response.status === 'connected') {
                    if (login)
                        _svfb.auth.login.checkusersv();
                    else
                        _svfb.auth.login.newusersv();
                }
                else {
                    FB.login(function (response) {
                        if (response.authResponse != null) {
                            if (login)
                                _svfb.auth.login.checkusersv();
                            else
                                _svfb.auth.login.newusersv();
                        }
                    }, { scope: scope });
                }
            },
            checkusersv: function (response) {
                FB.api('/me', function (response) {
                    _svfb.auth.login.ajax.checkuser(response);
                });
            },
            newusersv: function () {
                FB.api('/me', function (response) {
                    _svfb.auth.login.ajax.checknewuser(response);
                });
            },
            myaccountretrieve: function () {
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        FB.api('/me', function (response) {
                            $('.nome-email-fb').html(response.first_name + ' ' + response.last_name + ' <br> ' + response.email);
                            
                            $('.btn-desvincular-conta').on('click', function () {
                                var email = $('#fb-des-email').val();
                                var senha = $('#fb-des-senha').val();
                                if (email != "" && senha != "") {
                                    _svfb.auth.login.ajax.unbindfaceuser(email, senha);
                                } else {
                                    $('.fb-errors .empty-fields').show();
                                }
                            });

                            $('#fb-des-senha').on('keypress', function (event) {
                                var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
                                if (keyCode == 13) {
                                    event.preventDefault();
                                    $('.btn-desvincular-conta').trigger('click');
                                }
                            });


                            $('.conta-face').slideDown(300, '', function () {
                                $('.conta-bebe-face-vinculo').fadeIn();
                            });
                        });
                    } else {
                    }
                });
            },
            ajax: {
                checknewuser: function (response) {
                    $.ajax({
                        url: "/ajax/createsocialcustomer",
                        cache: false,
                        type: "POST",
                        data: { token: response.id, social_type: 1, email: response.email, name: response.first_name + ' ' + response.last_name },
                        dataType: "json",
                        beforeSend: function () { },
                        error: function (txt, data) { }
                    })
                   .done(function (data) {
                       if (data.Success == true) {
                           topContent();
                       }
                       else {
                           $("#spanerror").html(data.ErrorMessage);
                           $("#spanerror").show();
                       }
                       //if (data.exists) {
                       //    alert('Sua conta do Facebook já está vinculado a uma conta existente.', 'Cadastro de Usuário');
                       //} else {
                       //    $("#reg-fid").val(response.id);
                       //    $("#reg-name").val(response.first_name + ' ' + response.last_name);
                       //    $("#reg-email").val(response.email);
                       //}
                   })
                   .fail(function (txt, data) {

                   });
                },
                checkuser: function (response) {
                    $.ajax({
                        url: "/ajax/checksocialcustomer",
                        cache: false,
                        type: "POST",
                        data: { token: response.id, social_type: 1, email: response.email },
                        dataType: "json",
                        beforeSend: function () { },
                        error: function (txt, data) { }
                    })
                    .done(function (data)
                    {
                        if (data.Success == true)
                        {
                            topContent();
                        }
                        else
                        {
                            $("#spanerror").html(data.ErrorMessage);
                            $("#spanerror").show();
                        }
                    })
                    .fail(function (txt, data) {
                    });
                },
             
                bindfaceuser: function (email, senha, fbid) {
                    $.ajax({
                        url: "/ajax/vinculafbid",
                        cache: false,
                        type: "POST",
                        data: { email: email, senha: senha, fbid: fbid },
                        dataType: "json",
                        beforeSend: function () {
                        }
                    })
                    .done(function (data) {
                        if (data != null) {
                            if (data.sucesso) {
                                logarUsuario(email, senha);
                            } else {
                                if (data.erro != null) {
                                    $('.fb-errors .wrong-fields').html(data.erro);
                                }
                                $('.fb-errors .wrong-fields').show();
                            }
                        }
                    })
                    .fail(function (data) {
                    });
                },
                unbindfaceuser: function (email) {
                    $.ajax({
                        url: "/ajax/desvinculafbid",
                        cache: false,
                        type: "POST",
                        data: { email: email },
                        dataType: "json",
                        beforeSend: function () {
                        }
                    })
                    .done(function (data) {
                        if (data.sucesso) {
                            jInfo('Conta do Facebook desvinculada');
                            $('.conta-bebe-face-vinculo, .conta-face').slideUp();
                        }
                        else {
                            $('.fb-errors .wrong-fields').show();
                        }
                    })
                    .fail(function (data) {
                    });
                }
            }
        },
        logout: function () {
            FB.logout(function (response) {
            });
        }
    }
};
var common = (function () {
    var commonInit = {};

    commonInit.init = function () {
        window.addEventListener('load', function () {
            FastClick.attach(document.body);
        }, false);

        $('#btnSearch').on('click', function (event) {
            event.preventDefault();
            var input = $('#txtSearch');
            var str = input.val() == '' ? '' : input.val();
            sendSearch(str);
        });

        $('#txtSearch').keydown(function (ev) {
            var e = window.event || ev;
            var key = e.which || e.keyCode;
            if (key == 13) {
                var str = $('#txtSearch').val() == '' ? '' : $('#txtSearch').val();
                sendSearch(str);
            }
        });

     
        $(document).on("click", '#createuser', function (event) {
           
            $.ajax({
                type: "GET",
                url: 'ajax/usuario/criar',
                datatype:'html',
         
                success: function (data) {
                    $("#ModalSignup").html(data);
                    $(document).on('click', '#btnLogin', function (event) {
                   // $('#btnLogin').on('click', function (event) {
                        RenderSignUp();
                        topContent();
                    });
                    //$('.fb-cadastrar').on('click', function () {
                    //    _svfb.auth.login.checkloginstate('public_profile, email, publish_actions', false);
                    //});
                
                }
            });
          
        });
        
        $(document).on("click", ".fb-cadastrar", function () {
            _svfb.auth.login.checkloginstate('public_profile, email, publish_actions', false);
        });
    
        $(document).on('click', '#loginuser', function (event) {
            Login();
        });

        $(document).on('click', '#btnInscrevaNews', function (event) {
            var email = $('#txtNewsEmail').val();
            $.ajax({
                url: "/ajax/registernewsletter",
                cache: false,
                type: "POST",
                data: { email: email },
                dataType: "json",
                beforeSend: function () { },
                error: function (txt, data) { }
            })
                   .done(function (data) {
                       if (data.Success == true) {
                           $("#spanerrornews").html(data.Message);
                           $("#spanerrornews").removeClass('field-validation-error label-danger');
                           $("#spanerrornews").addClass('field-validation-success label-success');
                           $("#spanerrornews").show();
                       }
                       else {
                           $("#spanerrornews").html(data.ErrorMessage);
                           $("#spanerrornews").removeClass('field-validation-success label-success');
                           $("#spanerrornews").addClass('field-validation-error label-danger');
                           $("#spanerrornews").show();
                       }
                   })
                   .fail(function (txt, data) {
                   });
        });

        $(document).on('click', '#btnLoginExists', function (event) {
            RenderLogin();
        });

        $(document).on('click', '.fb-logar', function () {
            _svfb.auth.login.checkloginstate('public_profile, email, publish_actions', true);
        });

        function Login()
        {
            $.ajax({
                type: "GET",
                url: 'ajax/usuario/entrar',
                datatype: 'html',
                success: function (data) {
                    if (data.Success == "OK") {
                        topContent();
                    }
                    else {
                        $("#ModalLogin").html(data);
                      
                    }
                }
            });
        }

        function RenderSignUp()
        {
           
            var url = $('#frmRegister').attr('action');
            $.ajax({
                type: "POST",
                url: url,
                data: $("#frmRegister").serialize(),

                success: function (data) {
                        $("#ModalSignup").html(data);
                        $('#btnLogin').on('click', function (event) {
                             RenderSignUp();
                        });
                },
            });
        }

        function RenderLogin() {

            var url = $('#frmLogin').attr('action');
            $.ajax({
                type: "POST",
                url: url,
                data: $("#frmLogin").serialize(),

                success: function (data) {
                    if (data.Success == "OK")
                    {
                        topContent();
                    }
                    else
                    {
                        $("#ModalLogin").html(data);
                    }
                }
            });
        }

     
       
        $(document).on('click', '#logoutuser', function (event) {
            $.cookie("svu", null, { path: '/', domain: '.shoppingvirtual.com.br' });
            //topContent();
            $('.userMenu').show();
            $('.userMenuAuth').html();
            $('.userMenuAuth').hide();
        });

        topContent();
    };

    _svfb.initsdk('828083890557595', 'public_profile, email, publish_actions', false);
    _svfb.initfbscripts();

    return commonInit;
})();

var home = (function () {
    var homeInit = {};

    homeInit.init = function () {
        /*
        // NEW ARRIVALS Carousel
        $("#productslider").owlCarousel({
            navigation: true,
            items: 4,
            itemsTablet: [768, 2]
        });

        // BRAND  carousel
        var owl = $(".brand-carousel");
        owl.owlCarousel({
            //navigation : true, // Show next and prev buttons
            navigation: false,
            pagination: false,
            items: 8,
            itemsTablet: [768, 4],
            itemsMobile: [400, 2]
        });

        // Custom Navigation Events
        $("#nextBrand").click(function () {
            owl.trigger('owl.next');
        })
        $("#prevBrand").click(function () {
            owl.trigger('owl.prev');
        })

        // YOU MAY ALSO LIKE  carousel
        $("#SimilarProductSlider").owlCarousel({
            navigation: true
        });*/
    };

    return homeInit;
})();

var busca = (function () {
    var buscaInit = {};

    buscaInit.init = function () {
        //$('.priceFilterBody input[type="radio"]').change(function () {
        //    var objSelected = $('.priceFilterBody input[type="radio"]:checked');
        //    var price_from = objSelected.attr('price_from');
        //    var price_to = objSelected.attr('price_to');
        //    window.location = getPathFromUrl(window.location.href) + "?preco_de=" + price_from + "&preco_ate=" + price_to;
        //});
        $("span.close-filter").on("click", function () {
            window.location.href = $(this).attr("data-bind");
        });
     
        $("#slider").bind("userValuesChanged", function(e, data){
            var url = window.location.href;
            url = UpdateQueryString("preco_de", data.values.min, url);
            url = UpdateQueryString("preco_ate", data.values.max, url);
            window.document.location.href = url;
        });

        $('#selOrder').on('change',
           function () {
               var url = window.location.href;
               url = UpdateQueryString("sort", $('option:selected').val(), url);
               window.document.location.href = url;
           }
        );
    };

    return buscaInit;
})();

function getPathFromUrl(url) {
    return url.split("?")[0];
}

function sendSearch(query) {
    if (query.toString().trim().length >= 2 && query != 'Digite o produto, marca ou modelo') {
        window.location.href = '/busca/' + formatUrl(query);
    } else {
        alert('Por favor, informe o que você gostaria de pesquisar.');
    }
};

function formatUrl(url) {
    return url.replace(/\s+/g, '-');
}

function parallaxScroll() {
    var scrolledY = $(window).scrollTop();
    $('.parallaximg').css('marginTop', '' + ((scrolledY * 0.3)) + 'px');
}

function topContent() {
    var content;
    var area_usr;
    var bpc = Math.random().toString(36).substring(7);

    $.ajax({
        type: 'GET',
        url: "/ajax/topcontent?bpc=" + bpc,
        contentType: "application/json",
        processData: true,
        async: false,
        beforeSend: function () {
            $('.userMenu').hide();
        },
        success: function (res) {
            content = res;
            var str;
            if (content.name == null || content.name == undefined || content.name == '') {
                $('.userMenu').show();
                $('.userMenuAuth').hide();
            } else {
                str = "Ol\xE1 " + content.name;
                if (content.fid != null && content.fid != "") {
                    var imgUrl = "https://graph.facebook.com/" + content.fid + "/picture?type=square&bpc=" + bpc;
                    $('#user-avatar').css("background-image", "url('" + imgUrl + "')");

                    //$('#user-avatar img').attr('src', 'https://graph.facebook.com/' + content.fid + '/picture?type=square&bpc=' + bpc);
                    $('#user-avatar').show();
                    //$('.faca-login .img-usuario .ico').hide();
                    //$('.faca-login .img-usuario .fb img').attr('src', 'https://graph.facebook.com/' + content.fid + '/picture?type=square&bpc=' + bpc);
                    //$('.faca-login .img-usuario .fb').show();
                    //$('.faca-login .img-usuario .fb').css('background-image', 'none');
                }
                
                $("#ModalLogin").modal('hide');
                $("#ModalSignup").modal('hide');
                $('#user-name').html(str);
                $('.userMenuAuth').show();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('.userMenu').show();
            $('.userMenuAuth').hide();
        }
    });
}

function userLogon(user, password, code, code_type) {
    var progress = true;
    var regmail = /^[\w!#$%&amp;'*+\/=?^`{|}~-]+(\.[\w!#$%&amp;'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
    
    if ($.trim(user).length == 0) {
        //jInfo('Primeiro preencha seu email', 'Identifica&ccedil;&atilde;o do cliente');
        $('#usr-login').addClass('error');
        setTimeout(function () { kill(); $('#usr-login').focus(); }, 3000);
        progress = false;
    }

    if (!regmail.test(user)) {
        //jInfo('E-mail inv&aacute;lido, verifique por favor.', 'Identifica&ccedil;&atilde;o do cliente');
        $('#usr-login').addClass('error');
        setTimeout(function () { kill(); $('#usr-login').focus(); }, 3000);
        progress = false;
    }

    if (progress) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/ajax/usuario/entrar',
            cache: false,
            data: { user: user, password: password, code: code, code_type: code_type },
            beforeSend: function () {
                //_ui.loader(1, 1);
            },
            success: function (ret) {
                if (ret.ok) {
                    setTimeout(function () {
                        topContent();
                    }, 1500);
                } else {
                    jAlert(ret.message, 'Login');
                    setTimeout(function () { kill(); $('#usr-pass').focus(); }, 3000);
                    //_ui.loader(0, 1);
                }
            },
            error: function (txt, data) {
                error(txt.responseText);
                setTimeout(kill, 3000);
            }
        });
    }
};

function UpdateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}
function qs(key) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[key];
}

