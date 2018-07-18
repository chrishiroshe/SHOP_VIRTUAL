var SV = {
    
    initSite: function(){       
        SV.resolution.init();
        SV.resolution.responsiveActions();
        $(window).on('resize', function () {
            SV.resolution.init();            
        });
    },

    resolution: {
        init: function () {
            var tablet = 768,
                colMd = 992,
                colLg = 1200;
            if (window.innerWidth < tablet) {
                SV.resolution.lowerTablet();
            } else if (window.innerWidth >= tablet) {
                SV.resolution.greaterTablet();
            }
        },
        //Se maior que Tablet(768)
        greaterTablet: function () {
            SV.header.search();
            SV.ui.tooltipOn();
            SV.ui.selectStyle();
            SV.search.filters();            
        },
        //Se menor que Tablet(768)
        lowerTablet: function () {
            SV.search.listOff();
        },
        //Todas Resoluções
        responsiveActions: function () {
            SV.header.btnCollapse();
            //SV.ui.rangePrice();
            SV.comparador.init();
            SV.productDetail.init();
            SV.ui.autocomplete.init();
        }

    },

    header: {
        //Exibe ou Oculta Btn Busca
        search: function(){
            var btnSearch = $('#btnSearch'),
                inputSearch = $('#txtSearch');

            if (inputSearch.val().length === 0) {
                btnSearch.css({ display: 'none' });
            };

            inputSearch.on({
                focus: function () {
                    btnSearch.fadeIn(400);
                },
                blur: function () {
                    if (inputSearch.val().length === 0) {
                        btnSearch.fadeOut(200);
                    }
                }                
            });
        },
        //Cor no clique do btn de mostrar a busca (no responsivo)
        btnCollapse: function () {
            $('.navbar-toggle').on('click', function () {
                if (!$('.search-collapse').hasClass('in')) {
                    $(this).css('background', 'rgba(0, 0, 0, 0.3)');
                } else {
                    $(this).css('background', 'rgba(0, 0, 0, 0.2)');
                }
            });
        }
    },

    search: {
        filters: function () {
            $('.close-filter').on('mouseenter', function () {
                $(this).parent().addClass('label-danger');
            });
            $('.close-filter').on('mouseleave', function () {
                $(this).parent().removeClass('label-danger');
            });
        },
        listOff: function () {
            $('.container-results-products').find('.item').removeClass('list-view');
        }
    },

    productDetail: {
        init: function () {
            SV.productDetail.avalie();
            SV.productDetail.avaliacoes();
        },
        avalie: function () {
            $('.btn-avalie-tb').on('click', function (e) {
                e.preventDefault();
                $('#wrapper-avaliacoes').slideUp();
                $('#wrapper-avalie-forms').slideDown();
            });
        },
        avaliacoes: function () {
            $('.btn-avalicoes-feitas').on('click', function (e) {
                e.preventDefault();
                $('#wrapper-avaliacoes').slideDown();
                $('#wrapper-avalie-forms').slideUp();
            });
        }
    },

    ui: {
        tooltipOn: function () {
            $('.tooltipOn').tooltip();
        },
        //rangePrice: function () { 
        //    $('.title-filter-preco').on('click',function(){
        //        $("#slider").editRangeSlider({
        //            bounds: { min: 1, max: 15000 },
        //            defaultValues: { min: 3000, max: 12000 }
        //        },
        //        { step: 100 });
        //    });           
        //},
        selectStyle: function () {
            // Doc do plugin utilizado: lcdsantos.github.io/jQuery-Selectric/
            $('.selectric').selectric({
                responsive: true,
                disableOnMobile: true,
                expandToItemText: true
            });
        },
        autocomplete: {
            init: function () {
                SV.ui.autocomplete.keyDown();                
            },
            loadProduct: function (key) {
                $.ajax({
                    method: "POST",
                    url: "/autocomplete/",
                    data: { query: key }
                })
                .done(function (data) {
                    $.each(data, function (n) {
                        SV.ui.autocomplete.addItem(data[n].name, data[n].image_url, data[n].site_url);
                    });
                });
                /*
                var product = 
                    [{"name": "Samsung Galaxy", 
                    "img": "http://prdresources1.fastshop.com.br/wcsstore/FastShopCAS/imagens/_VD_Video/LGCJ65LA_GREY1/LGCJ65LA_GREY1_PRD_160_1.jpg"}
                    ,
                    {"name": "Televisão Samsung", 
                    "img": "http://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=27108978"}];

                $.each(product, function(n){
                    SV.ui.autocomplete.addItem(product[n].name +' '+ key, product[n].img);
                });
                */
            },
            keyDown: function () {
                var inputSearch = $('#txtSearch');                
                inputSearch.on('keyup', function (key) {
                    if (inputSearch.val().length >= 2)
                    {
                        $('#autocomplete-wrapper ul').html('');
                        SV.ui.autocomplete.openList(inputSearch);
                        SV.ui.autocomplete.loadProduct(inputSearch.val());
                        if ($(this).val().length <= 1 ) {
                            SV.ui.autocomplete.closeList(inputSearch);
                        };
                    }
                });
                SV.ui.autocomplete.actions();
            },
            openList: function (inputSearch) {
                scrollPosition = $(window).scrollTop();
                if (window.innerWidth > 768) scrollPosition = scrollPosition + 40;

                $('#autocomplete-wrapper').removeClass("hide").addClass("show").css('top', scrollPosition);

                SV.ui.autocomplete.fixPosition();
            },
            closeList: function (inputSearch) {
                inputSearch.parent().find('#autocomplete-wrapper').removeClass("show").addClass("hide")
                .find('a').remove();
            },
            addItem: function (name, img, url) {
                $('#autocomplete-wrapper ul').append("<a href=/produto/" + url + "><li><img class='autocomplete-img' src='" + img + "'>" + name + "</li></a>");
            },
            actions: function () {
                $('html, body').on('click', function () {
                    SV.ui.autocomplete.closeList($('#txtSearch'));
                })
            },
            fixPosition: function () {
                $(window).scroll(function () {
                    var bottomNavbar = $('.navbar').height() + $('.navbar').offset().top;
                    if ($('#autocomplete-wrapper').offset().top > bottomNavbar) {
                        $('#autocomplete-wrapper').css('top', bottomNavbar);
                    };
                });
            }
        }
    },

    comparador: {
        init: function () {            
            $('.btn-compare').on('click', function (){
                SV.comparador.exibir();
                SV.comparador.identifyProduct($(this));
                $('.comparador-min-max-wrapper').addClass('comparador-minimizar');
            });
            $('.comparador-min-max-wrapper').on('click', function () {
                if($(this).hasClass('comparador-minimizar')){
                    SV.comparador.minimizar();
                    $(this).removeClass('comparador-minimizar');
                }else{
                    SV.comparador.exibir();
                    $(this).addClass('comparador-minimizar');
                };
            });            
        },
        identifyProduct: function (btnCompare) {
            var dataCompare = btnCompare.attr('data-compare'),
                productSelected = btnCompare.parents('.product'),
                imgSelectedUrl = productSelected.find('.image img').attr('src'),
                titleSelected = productSelected.find('.title a').html(),
                wrapperItens = $('.comparar-products'),
                wrapperItensRow = wrapperItens.children('.row'),
                newItem = '<article class="item col-xs-3 col-sm-2"><div class="product box-model"><figure class="image"><span class="glyphicon glyphicon-remove comparador-remove-product" data-compared="' + dataCompare + '"></span><a href="product-details.html"><img src="' + imgSelectedUrl + '" class="img-responsive" alt="' + titleSelected + '" title="' + titleSelected + '"></a></figure><div class="description comparador-description"><h3 class="title"><a href="product-details.html">' + titleSelected + '</a></h3></div></div></article>';
            SV.comparador.addProduct(wrapperItensRow, newItem, btnCompare);
        },
        exibir: function () {
            $('.comparador-wrapper').slideDown();
            $('.comparador-container').slideDown();
            $('.comparador-min-max').children('.text-action').html('Minimizar')
                .end().children('.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        },
        minimizar: function () {
            $('.comparador-container').slideUp();
            $('.comparador-container').slideUp();
            $('.comparador-min-max').children('.text-action').html('Exibir comparador')
                .end().children('.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        },
        addProduct: function (wrapperItensRow, newItem, btnCompare) {
            if (wrapperItensRow.find('.item').not('.no-item').length >= 2) {
                wrapperItensRow.find('.no-item').remove();
                SV.comparador.enableBtn();
            };
            if (wrapperItensRow.find('.item').not('.no-item').length < 4) {
                wrapperItensRow.prepend(newItem);
            } else if (wrapperItensRow.find('.item').not('.no-item').length == 4) {
                wrapperItensRow.prepend(newItem);                
            };
            SV.comparador.productOff(btnCompare);
            SV.comparador.removeProduct(wrapperItensRow);
        },
        removeProduct: function (wrapperItensRow) {            
            $('.comparador-remove-product').on('click', function () {
                var idProductRemoved = $(this).attr('data-compared');
                $(this).parents('.item').fadeOut(200).remove();
                if (wrapperItensRow.find('.item').not('.no-item').length <= 2) {
                    SV.comparador.disableBtn();
                };                
                $('.btn-compare').each(function (n) {
                    if ($('.btn-compare').eq(n).attr('data-compare') === idProductRemoved) {
                        SV.comparador.enableAddCompare(n);
                    };                    
                });

                if (wrapperItensRow.find('.item').find('.image').length <= 1 && wrapperItensRow.find('.no-item-selecione').length == 0) {
                    wrapperItensRow.append('<article class="item no-item no-item-selecione col-xs-3 col-sm-2"><div class="product box-model"><div class="description comparador-description"><h3 class="title"><a href="#">Selecione outro produto para comparar</a></h3></div></div></article>');
                };
            });
        },
        enableBtn: function () {
            $('.btn-comparador').removeAttr('disabled');
        },
        disableBtn: function () {
            $('.btn-comparador').attr('disabled', true);
        },
        disableAddCompare: function () {
            $('.btn-compare').html('Max. 4 produtos para comparar').attr('data-original-title','Retire um item da lista para comparar este produto');
        },
        enableAddCompare: function (n) {
            $('.btn-compare').eq(n).html('Compare com Detalhes').attr('data-original-title','Clique para adicionar a lista de comparação').removeAttr('disabled');
        },
        productOff: function (btnCompare) {
            btnCompare.html("Comparando produto").attr({ 'disabled': 'true', 'data-clicked': 'yes' });
        },
        pageTables: function () {
            alert();
            var qntdItens = $('.container-results-products').find('.item').length;
        }
    }

};

SV.initSite();
