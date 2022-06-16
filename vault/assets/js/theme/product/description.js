export default function description() {
    let desHtml = ``;
    let des = $('.product-description-content .description').toArray().map(item =>{
        return {
            desTitle:$(item).attr("title"),
            desContent:$('.product-description-content .description').html()
        }
    });
    des.map((item,index) =>{
        console.log(index);
        if(index == 0){
            console.log(item);
            $("#ui-id-1 .tab-title").text(`${item.desTitle}`);
            $("#ui-id-2").html(`${item.desContent}`);
        }else{
            desHtml+= `
            <h3 class="product-description ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all" data-title-num="${index}"><span class="tab-title" >${item.desTitle}</span> <svg class="accordion-icon arrow down"><use xlink:href="#icon-v-down"></use></svg></h3>
            <div class="product-description-content ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content " data-content-num="${index}" id="">
            ${item.desContent}
            </div>
        `;
        }
        
    });
    // console.log(desHtml);
    $(".product-description-content").after(desHtml);
    $("[data-title-num]").on("click",function(){
        const num = $(this).attr("data-title-num");
        if($("[data-content-num='"+num+"'].ui-accordion-content-active").length){
            $(this).addClass("ui-accordion-header-collapsed");
            $(this).removeClass("ui-accordion-header-active");
            $("[data-content-num='"+num+"']").removeClass("ui-accordion-content-active");
            $("[data-content-num='"+num+"']").slideUp();
        }else{
            $(this).addClass("ui-accordion-header-active");
            $(this).removeClass("ui-accordion-header-collapsed");
            $("[data-content-num='"+num+"']").addClass("ui-accordion-content-active");
            $("[data-content-num='"+num+"']").slideDown();
        }
        
    })

}
