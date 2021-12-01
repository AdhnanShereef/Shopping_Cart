// Add to Cart
function addToCart(proId){
    $.ajax({
      url:'/add-to-cart/'+proId,
      method:'get',
      success:(response)=>{
          if(response.status){
              let count=$('#cart-count').html()
              count=parseInt(count)+1
              $('#cart-count').html(count)
          }
      }
    })
  }
  // Change Quantity and Total Amount
  function changeQuantity(cartId,proId,count,userId){
    let quantity=parseInt(document.getElementById(proId).innerHTML)
    count=parseInt(count)
  $.ajax({
      url:'/change-product-quantity',
      data:{
          user:userId,
          cart:cartId,
          product:proId,
          count:count,
          quantity:quantity
      },
      method:'post',
      success:(response)=>{
          if(response.removeProduct){
              alert("Product Removed from Cart")
              location.reload()
          }else{
              document.getElementById(proId).innerHTML=quantity+count
              document.getElementById('total').innerHTML=response.total
          }
      }
  })
}
//Checkout product
$("#checkout").submit((e)=>{
    e.preventDefault()
    $.ajax({
        url:'/place-order',
        method:'post',
        data:$('#checkout').serialize(),
        success:(response)=>{
            if(response.status){
                location.href='/order-success'
            }
        }
    })
})
//Make a order as Shipped
function shipped(orderId){
    $.ajax({
        url:'/admin/shipped/'+orderId,
        method:'post',
        success:(response)=>{
            if(response.status){
                location.reload()
            }
        }
    })
}
function cancelShipped(orderId){
    $.ajax({
        url:'/admin/cancel-shipped/'+orderId,
        method:'post',
        success:(response)=>{
            if(response.status){
                location.reload()
            }
        }
    })
}
$("#checkout-buy-now").submit((e)=>{
    e.preventDefault()
    $.ajax({
        url:'/buy-now',
        method:'post',
        data:$('#checkout-buy-now').serialize(),
        success:(response)=>{
            if(response.status){
                location.href='/order-success'
            }
        }
    })
})
