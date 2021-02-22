
var shipping = 0.00;
var fadeTime = 300;

$(document).ready(function(){
    $('.checkout').hide();
    $('.number-input input').click(function(){
        updateQuantity(this);
    });
    $('.clear-btn').click(function(){
        $('.product-price-total').text('0.00');
        $('.product-price-total').removeClass('product-in-basket');
        $('.number-input input').val('0');
        updateQuantity();
        calcBasket();
    })
    $('.filter').click(function(){
    $('.filter-content').slideToggle('slow');
    $('i', this).toggleClass('fas fa-eye fas fa-eye-slash');
    $('.filter-text').text(function(i, text){
        return text == 'Hide filters' ? 'Show filters' : 'Hide filters';
    })
  });
  $('.filter-choose').change(function(){
      var filter = $('.filter-choose:checked').map(function(index, element){
          return "."+element.value;
      }).toArray().join("");
      $('.category').hide();
      $('.category').filter(filter).show();
  })
  $('.open-modal').click(function(){
      $('.modal, .modal-content').addClass('active');
      $('.main').hide();
      $('footer').hide();
  });
  $('.close-modal').click(function(){
      $('.modal, .modal-content').removeClass('active');
      $('.main').show();
      $('footer').show();
  });
})

function calcBasket(){
    var subTotal = 0;
    $('.product-card').each(function(){
        subTotal += parseFloat($(this).children('.product-price-total').text());
    });
    var shippingPrice = (subTotal > 0 ? shipping : 0);
    var total = subTotal + shippingPrice;

    $('.total-value').fadeOut(fadeTime, function(){
        $('#subtotal').html("Subtotal: $"+subTotal.toFixed(2));
        $('#shipping').html("Shipping: $"+shippingPrice.toFixed(2));
        $('#total').html("Total: $"+total.toFixed(2));
        $('#subtotal-mobile').html("Subtotal: $"+subTotal.toFixed(2));
        $('#shipping-mobile').html("Shipping: $"+shippingPrice.toFixed(2));
        $('#total-mobile').html("Total: $"+total.toFixed(2));
        if(total == 0){
            $('.checkout').fadeOut(fadeTime);
        }else{
            $('.checkout').fadeIn(fadeTime);
        }
        $('.total-value').fadeIn(fadeTime);
    });
}
function updateQuantity(input){
    var product = $(input).parent().parent();
    var price = parseFloat(product.children('.product-price').text());
    var quantity = $(input).val();
    var newPrice = price * quantity;

    product.children('.product-price-total').each(function(){
        $(this).fadeOut(fadeTime, function(){
            $(this).text(newPrice.toFixed(2));
            calcBasket();
            $(this).fadeIn(fadeTime);
            if(newPrice>0){
                $(this).addClass('product-in-basket');
            }else{
                $(this).removeClass('product-in-basket');
            }   
        });  
    });
    updateSumItems()
}
function updateSumItems(){
    var sumItems = 0;
    $('.number-input input').each(function(){
        sumItems += parseInt($(this).val());
    });
    if(sumItems == 1){
        $('.sum-items').text(sumItems+" item in your bag");
    }else if(sumItems == 0){
        $('.sum-items').text("No items in your bag");
    }
    else{
        $('.sum-items').text(sumItems+" items in your bag");
    }
    if(sumItems > 10){
        shipping = 8.00;
    }else if(sumItems >= 4 && sumItems <= 10){
        shipping = 5.00;
    }else{
        shipping = 0.00;
    }
}