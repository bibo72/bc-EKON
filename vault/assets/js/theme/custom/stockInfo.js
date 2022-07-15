const stockInfo ={
    getCardStockInfo(){
        const store_hash = window.jsContext.store_hash;
        let skuList = $('[data-storck-sku]').toArray().map(item =>{
            const sku = $(item).attr('data-storck-sku');
            return sku
        })
        const skuStr= {sku : skuList.join()};
        $.ajax({
            url: 'https://api.ekon-opac.silksoftware.net/api/v1/catalog/products/batch-inventorys',
            method: 'POST',
            headers: {
                'X-Auth-Token': '12345abc',
                'X-storeHash': store_hash, //当前店铺的storehash， 需要动态获取
            },
            data: JSON.stringify(skuStr),
            success: function (res) {
                // console.log(res);
                res.data.list.map(item => {
                    if(item.inventory_level>=100){
                        $("[data-storck-sku='"+item.sku+"']")
                        .addClass("greenStock")
                        .text("In Stock");
                    }else if(item.inventory_level>0){
                        $("[data-storck-sku='"+item.sku+"']")
                        .addClass("redStock")
                        .text("Low Stock");
                    }else{
                        $("[data-storck-sku='"+item.sku+"']")
                        .addClass("blueStock")
                        .text("Usually ships in 1-3 weeks");
                    }
                })
            },
            error: function (err) {
                console.log(err)
            }
        })
    },
    getStoreInfo(sku,fn){
        const store_hash = window.jsContext.store_hash;
        const skus = {sku : sku};
        $.ajax({
            url: 'https://api.ekon-opac.silksoftware.net/api/v1/catalog/products/batch-inventorys',
            method: 'POST',
            headers: {
                'X-Auth-Token': '12345abc',
                'X-storeHash': store_hash, //当前店铺的storehash， 需要动态获取
            },
            data: JSON.stringify(skus),
            success: function (res) {
                // console.log(res);
                fn(res.data.list[0]);
            },
            error: function (err) {
                console.log(err)
                fn(err);
            }
        })
    }

};

export default stockInfo;

