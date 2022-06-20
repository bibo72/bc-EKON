export default function checkout(){
    console.log(123);
    console.log(window.location.pathname === "/checkout");
    if(window.location.pathname === "/checkout"){
        console.log($(".cart.optimizedCheckout-orderSummary"));
    }
}
