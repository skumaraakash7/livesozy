jQuery(function($) {
  
  $(document).ready(function() {
    
  });
  
  
  
  $(window).on( 'load', function () {
    conformHeight();
  });
  
  
  
  $(window).on( 'resize', function () {
    conformHeight();
  });
  
  
  
  
  
  /*--------------------------------------------------
  Conformity
  For equal height elements based on row rather than set.
  https://github.com/codekipple/conformity
  ---------------------------------------------------*/	
  function conformHeight() {
    
    // Used by various "Product" image grids
    $('.single-article').conformity();
    
  }// conformHeight
  
  
  
  
});










$(document).ready(function(){
  var productPage = window.location.pathname.indexOf('/products/') !== -1;
      
  $("#product-description .tabs .tab").each(function(){
    $(this).find(".tab-title").click(function(){
      if($(this).find("h2").hasClass("collapsed") == false){
      	$(".tabs").find("h2").addClass("collapsed");
        $(".tabs").find(".tab-content").slideUp();
      }else{
        $(".tabs").find("h2").addClass("collapsed");
        $(this).find("h2").removeClass("collapsed");
        $(".tabs").find(".tab-content").slideUp();
        $(this).parent().find(".tab-content").slideDown();
      }
    });
  });
  
  // Product page - Thumbnail active
  $('.clicker-thumb').on('click', function(e) {
    $('#thumbnail-gallery .slide').removeClass('active');
    $(e.target).closest('.slide').addClass('active');
  });
  
  
  
  //Product page Thumbnail Slider
  var slick_conf = {
    infinite: true,
    arrows: true,
    prevArrow: '<div class="arrow-angle up-arrow-angle"> <img src="https://cdn.shopify.com/s/files/1/3012/3948/files/arrow_up.svg" /> </div>',
    nextArrow:'<div class="arrow-angle down-arrow-angle"> <img src="https://cdn.shopify.com/s/files/1/3012/3948/files/arrow_up.svg" /> </div>',
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true
  }

  $('.thumbnail-slider').slick(slick_conf)

  $(".slide:first-of-type").addClass("active");   

  $(".swatch-element").on("click",function(){
    $('.thumbnail-slider').slick("destroy");
    $('.thumbnail-slider').slick(slick_conf)
  })
  
  /* general read more function */
  $("[read-more-link]").on("click",function(e){
  	e.preventDefault();
    $this = $(this);
    $this.toggleClass("expanded");
    if($this.hasClass("expanded")){
      $this.html("Read less");
    }else{
      $this.html("Read more");
    }
  })
});

$(window).load(function() {
  var productPage = window.location.pathname.indexOf('/products/') !== -1;
 
  if (productPage) {
    setTimeout(function() {
      Flickity.data('.module-trust-icons-items').select(2, true, true);
    }, 500);
  }  
});

/* SV 21.Sep.19 */
(function($) {
  function preloadCarouselImages() {
    if (typeof _productImages == 'undefined') return;
    
    _.each(_productImages, function(color) {
      color.imagesDom = [];
      _.each(color.images, function(img) {
        var image = new Image;
        image.src = img;
        color.imagesDom.push(image);
      });
    });
  }
  
  function mobileProductImagesCarousel() {
    var $mobileCarousel = $('.mobile-carousel');
    $mobileCarousel.flickity({
      "cellAlign": "center", 
      "contain": true, 
      "prevNextButtons": true, 
      "adaptiveHeight": true, 
      "dragThreshold": 25, 
      "imagesLoaded": true
    });
  }
  
  function sizeSwatchAvailability(_product, selectedColor) {
  
     
    //console.log({_product, selectedColor});
    if (typeof _product == 'undefined') return;
    var selectedColorVariants = _.filter(_product.variants, function(variant) {
      return variant.option1 == selectedColor;
    });
    
    _.each(selectedColorVariants, function(variant) {
      var $sizeSwatch = $('.product-form-' + _product.id + ' .swatch-element[data-value="' + variant.option2 + '"]');
      $sizeSwatch[variant.available ? 'addClass' : 'removeClass']('available');
      $sizeSwatch[!variant.available ? 'addClass' : 'removeClass']('soldout');
      
       //Transparent image when it's not available/soldout
      if(!variant.available){
        $sizeSwatch.find("img").attr("src", "https://cdn.shopify.com/s/files/1/3012/3948/files/sold-out_ee26bad8-9eea-4eda-a8d0-9fd3ce6c46ea.png");
         
      }
      
    });
  }
  
  function initProduct() {
    var $colorSwatch = $('.swatch-element.color');
    var $mobileCarousel = $('.mobile-carousel');
    
    preloadCarouselImages();
    
    // Lazy Load images
    (function() {
      var count = 0;
      const observer = lozad('.lozad', {
        loaded: function(el) {
          el.classList.add('loaded');
          count++;
          
          var allImagesLoaded = count == $('.lozad').length - 1;
          if (allImagesLoaded) {
            $(document).trigger('mobile-carousel-images-loaded');
          }
        }
      });
      observer.observe();      
    })();
    
    // Init carousel
    mobileProductImagesCarousel();
    
    // On lazy load complete, resize flickity
    $(document).on('mobile-carousel-images-loaded', function() {
      $mobileCarousel.flickity('resize');
    });
    
    // sizeSwatchAvailability on page load
    var selectedColor = $('input[name="option-0"]:checked').val();
    sizeSwatchAvailability(_product, selectedColor);
    
    $colorSwatch.find('label').on('click', function(e) {
      setTimeout(function() {
        var selectedColor = $colorSwatch.find('input[type="radio"]:checked').val();

        var colorImages = _.filter(_productImages, function(images) {
          return images.color == selectedColor;
        })[0].imagesDom;
        
        if (colorImages !== undefined) {
          $mobileCarousel.flickity('destroy');
          $mobileCarousel.html('');
          
          _.each(colorImages, function(image) {
            //$mobileCarousel.append('<div class="carousel-cell"><img src="' + image + '" /></div>');
            $mobileCarousel.append(image);
          });
          
          mobileProductImagesCarousel();
        }
        
        // sizeSwatchAvailability
        sizeSwatchAvailability(_product, selectedColor);
      }, 100);
    });
  }
  
  function initProductsHover() {
     
    var isMobile = window.matchMedia("(max-width: 980px)").matches;
    
    $('#product-loop .product, .collection-carousel .product').each(function(i, item) {
      var $product = $(item);
      var product_id = parseInt($product.attr('id').replace('prod-', ''));
      var $hoverCarousel = $(item).find('.hover-carousel');
      
      var product = _.filter(_products, function(product) {
        return product.id == product_id;
      })[0].json;
      
      if (product !== undefined) {
        var images = _.filter(product.images, function(image) {
          return image.alt.indexOf('swatch') == -1;
        });
        //console.log(images);

        if (images !== undefined) {
          images.forEach(function(image) {
            $hoverCarousel.append(
              '<div class="cell" data-alt="' + image.alt + '"><img class="lozad" data-src="' + image.src + '" /></div>'
            );
          });

          const observeLozad = lozad();
          observeLozad.observe();

          const carouselImages = document.querySelectorAll('.hover-carousel .lozad');
          carouselImages.forEach(function(image) {
            observeLozad.triggerLoad(image);
          });

          var hoverIndex = $hoverCarousel.data('hover-index') >= images.length ? (images.length-1) : $hoverCarousel.data('hover-index') ;
          //if (product.id == 817487904804) debugger;
          
          $hoverCarousel.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            //initialSlide: isMobile ? 0 : 1,
            initialSlide: isMobile ? hoverIndex - 1 : hoverIndex,
            arrows: true,
            fade: isMobile ? false : true,
            prevArrow: '<button class="flickity-button flickity-prev-next-button previous" type="button" aria-label="Previous"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg></button>',
            nextArrow: '<button class="flickity-button flickity-prev-next-button next" type="button" aria-label="Next"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>'
          }); 
          //$product.addClass("hover-carousel-init");
          $hoverCarousel.on('afterChange', function(event, slick, direction) {
            var product_id = slick.$slider.data('product-id');
            var $form = $('.product-form-' + product_id);
            var color = slick.$slider.find('.slick-active').data('alt');
            var selectedColor = $form.find('.swatch[data-option-index="0"] input:checked').val();
            
            if (color !== selectedColor) {
              $form.find('.swatch[data-option-index="0"] input').prop("checked", false);
              $form.find('.swatch-element[data-value="' + color + '"] input').prop("checked", true);
              $form.find('.swatch-element[data-value="' + color + '"]').trigger('click', ['swatchColorChange']);
            }
          });          
        }
      }
      
      // Update Size availability for selected color variant
      var selectedColor = $product.find('.swatch[data-option-index="0"] input:checked').val();
      sizeSwatchAvailability(product, selectedColor);
    });
    
    // On collection page load, update size availability for each product
    _.each(_products, function(product) {
      var $form = $('.product-form-' + product.id);
      
      var selectedColor = $form.find('input[name="option-0"]:checked').val();
      sizeSwatchAvailability(product, selectedColor);
    });
    
    function updateVariant($form) {
      
      var selectedColor = $form.find('.swatch[data-option-index="0"] input:checked').val();
      var selectedSize = $form.find('.swatch[data-option-index="1"] input:checked').val();
      var product_id = $form.data('product-id');
      
      var product = _.filter(_products, function(product) {
        return product.id == product_id;
      })[0].json;
      
      var variant = _.filter(product.variants, function(variant) {
        return variant.option1 == selectedColor && variant.option2 == selectedSize;
      })[0];
      
      // Switch to variant image
      if (variant !== undefined) {
        var $hoverCarousel = $form.closest('.ci').find('.hover-carousel');
        var images = _.filter(product.images, function(image) {
          return image.alt.indexOf('swatch') == -1;
        });
        var imagePosition = _.map(images, function(image) {
          return image.alt;
        }).indexOf(selectedColor);
        
        $hoverCarousel.slick('slickGoTo', imagePosition);
      }
      
      // Update selected variant
      if (variant !== undefined) {
        var $select = $form.find('select[name="id"]');
        $select.val(variant.id).trigger('change');
        
        var $quickForm = $('form#form--quick-atc-' + product.id);
        var $quickFormVariant = $quickForm.find('input[name="id"]');
        $quickFormVariant.val(variant.id);
        
        var $atc = $quickForm.find('.btn');
        /* SV 29.01 */ 
        var isPreorder = product.tags.indexOf('Pre-order') !== -1;
        if (isPreorder) {
          $atc.prop('disabled', !variant.available).val(variant.available ? 'PRE ORDER' : 'Sold out!');
          if(!variant.available){
            $atc.addClass("cta-soldout-style");
          }else{
             $atc.removeClass("cta-soldout-style");
          }
        }
        else {
          $atc.prop('disabled', !variant.available).val(variant.available ? 'Add to cart' : 'Sold out!');
          if(!variant.available){
            $atc.addClass("cta-soldout-style");
          }else{
             $atc.removeClass("cta-soldout-style");
          }
        }
        
        // Update link url
        var $link = $form.closest('.product-link');
        $link.attr('href', product.url + '?variant=' + variant.id);
      }
      
    }
    
   // Swatch events
    var $swatch = $('.swatch-element');
    $swatch.on('click', function(e) {
      if(typeof e.originalEvent != "undefined"){
       var $swatchContainer = $(e.currentTarget).closest('.swatch');
      $swatchContainer.find('input[type="radio"]').prop('checked', false);
      $(e.currentTarget).find('input[type="radio"]').prop('checked', true);
      
      // Update Variant Selected for ATC      
      var $form = $(e.currentTarget).closest('.product_form');
      updateVariant($form);
      }
      
      
    });
    
    // Swatch events
    var $colorSwatch = $('.swatch-element.color');
    $colorSwatch.on('click', function(e,attribution) {
       if(typeof e.originalEvent != "undefined" || typeof attribution != "undefined"){
      var $form = $(e.currentTarget).closest('.product_form');
      var selectedColor = $form.find('.swatch[data-option-index="0"] input:checked').val();
      var selectedSize = $form.find('.swatch[data-option-index="1"] input:checked').val();
      var product_id = $form.data('product-id');
      var product = _.filter(_products, function(product) {
        return product.id == product_id;
      })[0].json;
      
      // Make all sizes unavailable for selection, below codes will evaluate each size based on availability
      $('.product-form-' + product_id + ' [data-option-name="Size"] .swatch-element').addClass('soldout');
      
      // On color selection, update size availability
      sizeSwatchAvailability(product, selectedColor);
      updateVariant($form);
       }
    });
    
    // On hyperlink click, take them to product page
    
    $(".slick-slide .lozad").on("click",function(){
      let url = $(this).parents(".slick-initialized").attr("data-href");
      location.href = url;
    });
    
    //     var $link = $('.product-link');
    //     $link.on('click', function(e) {    
    //       if (e.target.nodeName == 'IMG') {
    //         //window.location.href = $(e.currentTarget).attr('href');         
    //       }
    //     });
  }
  

  function initRelatedItemCarousel(){
    var $swatch = $('.swatch-element-related');

    $swatch.on('click', function(e) {
      e.preventDefault();
      var $swatchContainer = $(e.currentTarget).closest('.swatch');
      $swatchContainer.find('input[type="radio"]').prop('checked', false);
      $(e.currentTarget).find('input[type="radio"]').prop('checked', true);
      // Update Variant Selected for ATC      
      var $form = $(e.currentTarget).closest('.product_form');
      var selectedColor = $form.find('.swatch[data-option-index="0"] input:checked').val();
      var selectedSize = $form.find('.swatch[data-option-index="1"] input:checked').val();
      var product_id = $form.data('product-id');

      var product = _.filter(_products, function(product) {
        return product.id == product_id;
      })[0].json;

      var variant = _.filter(product.variants, function(variant) {
        return variant.option1 == selectedColor && variant.option2 == selectedSize;
      })[0];
      if (variant !== undefined) {
        var $select = $form.find('select[name="id"]');
        $select.val(variant.id).trigger('change');

        var $quickForm = $('form#form--quick-atc-' + product.id);
        var $quickFormVariant = $quickForm.find('input[name="id"]');
        $quickFormVariant.val(variant.id);


        var $atc = $quickForm.find('.btn');
        $atc.prop('disabled', !variant.available).val(variant.available ? 'Add to cart' : 'Sold out');




        // Update link url
        var $link = $form.closest('.product-link');
        $link.attr('href', product.url + '?variant=' + variant.id);
		//update variant image
        var $hoverCarousel = $form.closest('.ci').find('.hover-carousel');
        var images = _.filter(product.images, function(image) {
          return image.alt.indexOf('swatch') == -1;
        });
        var imagePosition = _.map(images, function(image) {
          return image.alt;
        }).indexOf(selectedColor);
        
        $hoverCarousel.slick('slickGoTo', imagePosition);
      
      }
    });
    $('#product-loop .product, .collection-carousel .product').each(function(i, item) {
      var $product = $(item);
      var product_id = parseInt($product.attr('id').replace('prod-', ''));
      var $hoverCarousel = $(item).find('.hover-carousel');
      var product = _.filter(_products, function(product) {
        return product.id == product_id;
      });
      product = product.length > 0 ? product[0].json : undefined;
      
     if (product !== undefined) {
        var images = _.filter(product.images, function(image) {
          return image.alt.indexOf('swatch') == -1;
        });
        //console.log(images);

        if (images !== undefined) {
          images.forEach(function(image) {
            $hoverCarousel.append(
              '<div class="cell" data-alt="' + image.alt + '"><img class="lozad" data-src="' + image.src + '" /></div>'
            );
          });

          const observeLozad = lozad();
          observeLozad.observe();

          const carouselImages = document.querySelectorAll('.hover-carousel .lozad');
          carouselImages.forEach(function(image) {
            observeLozad.triggerLoad(image);
          });

          var hoverIndex = $hoverCarousel.data('hover-index') >= images.length ? (images.length-1) : $hoverCarousel.data('hover-index') ;
          //if (product.id == 817487904804) debugger;
          
          $hoverCarousel.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            //initialSlide: isMobile ? 0 : 1,
            //initialSlide: isMobile ? hoverIndex - 1 : hoverIndex,
            initialSlide: 0,
            arrows: true,
            fade:  false,
            prevArrow: '<button class="flickity-button flickity-prev-next-button previous" type="button" aria-label="Previous"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg></button>',
            nextArrow: '<button class="flickity-button flickity-prev-next-button next" type="button" aria-label="Next"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>'
          }); 
          
          $hoverCarousel.on('afterChange', function(event, slick, direction) {
            var product_id = slick.$slider.data('product-id');
            var $form = $('.product-form-' + product_id);
            var color = slick.$slider.find('.slick-active').data('alt');
            var selectedColor = $form.find('.swatch[data-option-index="0"] input:checked').val();
            
            if (color !== selectedColor) {
              $form.find('.swatch[data-option-index="0"] input').prop("checked", false);
              $form.find('.swatch-element[data-value="' + color + '"] input').prop("checked", true);
              $form.find('.swatch-element[data-value="' + color + '"]').trigger('click', ['swatchColorChange']);
            }
          });          
        }
      }
    })
    // On hyperlink click, take them to product page

    $(".slick-slide .lozad").on("click",function(){
      let url = $(this).parents(".slick-initialized").attr("data-href");
      location.href = url;
    });
  }
  
  
  $(function() {
    var isProductPage = $('body').hasClass('product');
    if (isProductPage) {
      initProduct();
      initRelatedItemCarousel();
    }
    
    // Collection page carousel
    var isCollectionPage = $('body').hasClass('collection');
    var isHomePage = $('body').hasClass('index');
    if (isCollectionPage || isHomePage ) {
      initProductsHover();
    }
    if (isCollectionPage){
      $("#product-loop .form--quick-atc").on("click",function(){
        if($(this).parents(".product-details").find(".cta-soldout-style").length > 0){
		window.location.href = $(this).parents(".product-details").find("a").first().attr("href")
        }
      })
    }
    
    // Reorder sizes to XS/S/M/L/XL
    var sizes = ['XS', 'S', 'M', 'L', 'XL'];
    $('[data-option-name="Size"]').each(function() {
      var $xs = $(this).find('[data-value="XS"]');
      $xs.prependTo($(this).find('.content'));
    });
    
    function markSoldOutColors(){
      $(".swatch-element.color").each(function(){
        var product_id = parseInt($(this).parents("form").attr('data-product-id'));
        var product = _.filter(_products, function(product) {
          return product.id == product_id;
        })[0].json;
        let this_color = $(this).attr("data-value");
        let $options = $(this).parents("form").find("option");
        let available_variants = 0;
        let $selected_option;
        $options.each(function(){
          if(typeof $(this).attr("selected") != "undefined"){
          $selected_option = $(this);
          }
          if($(this).attr("js-available") != undefined && $(this).attr('data-color-value') == this_color){
            available_variants += 1;
          }
        })
        if(available_variants == 0){
          $(this).removeClass("available").addClass("soldout");
          if(typeof $(this).find("input").attr("checked") != "undefined"){
            $(this).find("input").removeAttr("checked");
            $(this).siblings(".available").first().find("input").attr("checked","true");
            this_color = $(this).siblings(".available").first().find("input").val();
			sizeSwatchAvailability(product,this_color);
          }
        }
      })
      // confirm size availabililty for current color
      $('[data-option-name="Size"] input[checked]').each(function(){
        if($(this).parent().hasClass("soldout")){
          $(this).removeAttr("checked");
          $(this).parent().siblings(".available").first().find("input").attr("checked","true");
        }
      })
    }
    // mark sold out colors on page load
    markSoldOutColors();
  });
})(jQuery);