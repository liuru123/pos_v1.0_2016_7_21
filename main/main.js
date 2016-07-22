'use strict';

let items=loadAllItems() ;
let promotionBarcodes=loadPromotions();
function formattedTags(tags)
{
    return tags.map(function(tag){
        let temp=tag.split('-');
        return { barcode:temp[0],amount:parseFloat(temp[1]) || 1};
    });
}

let generateBarcodes=formattedTags(tags);

function mergeBarcodes(generateBarcodes)
{
    let result=[];
    for(let i=0;i<generateBarcodes.length;i++)
    {
        let exist=result.find(function(item){ return item.barcode===generateBarcodes[i].barcode;});
        if(exist)
        {
            exist.amount+=generateBarcodes[i].amount;
        }
        else
        {
            result.push(Object.assign({},generateBarcodes[i]));
        }
    }
    return result;
}

let merBarcodes=mergeBarcodes(generateBarcodes);

function generateItems(items,merBarcodes)
{
    let result=[];
    for(let i=0;i<merBarcodes.length;i++)
    {
        let exist=items.find(function(item){ return item.barcode===merBarcodes[i].barcode;});
        if(exist)
        {
            result.push(Object.assign({},exist, {amount: merBarcodes[i].amount}));

        }
    }
    return result;
}

let mergeItems=generateItems(items,merBarcodes);

function computeSubtotal(mergeItems)
{
    let result=[];
    for(let i=0;i<mergeItems.length;i++)
    {
        result.push(Object.assign({},mergeItems[i],{subtotal:mergeItems[i].amount*mergeItems[i].price}));
    }
    return result;
}
let subtotalItems=computeSubtotal(mergeItems);

function computeTotal(subtotalItems)
{
    let sum=0;
    for(let i=0;i<subtotalItems.length;i++)
    {
        sum+=subtotalItems[i].subtotal;
    }
    return sum;
}
let total=computeTotal(subtotalItems);

function generatePromotionItems(subtotalItems,promotionBarcodes)
{
    let result=[];
    let promotionType='BUY_TWO_GET_ONE_FREE';
    for(let i=0;i<subtotalItems.length;i++)
    {
        var exist;
         for(let j=0;j<promotionBarcodes.length;j++) {
             var barcodesType = promotionBarcodes[j].type;

             exist = promotionBarcodes[j].barcodes.find(function (item) {
                 return item === subtotalItems[i].barcode;
             });
             if(exist)
             {
                 break;
             }
         }

             if (exist)
             {

                 if (barcodesType === promotionType) {
                     result.push(Object.assign({}, {barcode:subtotalItems[i].barcode,name:subtotalItems[i].name,unit:subtotalItems[i].unit,price:subtotalItems[i].price,amount:subtotalItems[i].amount,promotionSubtotal: parseFloat(subtotalItems[i].subtotal - parseInt(subtotalItems[i].amount / 3) * subtotalItems[i].price)}));
                 }
                 // if(exist && promotionBarcodes[i].type!=promotionType)
                 // {
                 //
                 // }
             }
             else
             {
                 result.push(Object.assign({},{barcode:subtotalItems[i].barcode,name:subtotalItems[i].name,unit:subtotalItems[i].unit,price:subtotalItems[i].price,amount:subtotalItems[i].amount,promotionSubtotal: parseFloat(subtotalItems[i].subtotal - parseInt(subtotalItems[i].amount / 3) * subtotalItems[i].price)}));
             }

    }
    return result;
}
let promotionItems=generatePromotionItems(subtotalItems,promotionBarcodes);
console.log(promotionItems);
function computePromotionTotal(promotionItems)
{
    let sum=0;
    for(let i=0;i<promotionItems.length;i++)
    {
        sum+=promotionItems[i].promotionSubtotal;
    }
    return sum;
}
let promotionTotals=computePromotionTotal(promotionItems);

function print(promotionItems,total,promotionTotals)
{
    let result='***<没钱赚商店>收据***';
    for(let i=0;i<promotionItems.length;i++)
    {
        result+="\n名称："+promotionItems[i].name+"，"+"数量："+promotionItems[i].amount+promotionItems[i].unit+"，"+"单价："+promotionItems[i].price.toFixed(2)+"(元)，"+"小计："+promotionItems[i].promotionSubtotal.toFixed(2)+"(元)";
    }
    result+="\n----------------------";
    result+="\n总计："+promotionTotals.toFixed(2)+"(元)";
    result+="\n节省："+(total-promotionTotals).toFixed(2)+"(元)";
    result+="\n**********************";
    return result;
    console.log(result);
}


function printReceipt(tags)
{
    let items=loadAllItems() ;
    let promotionBarcodes=loadPromotions();
    let generateBarcodes=formattedTags(tags);
    let merBarcodes=mergeBarcodes(generateBarcodes);
    let mergeItems=generateItems(items,merBarcodes);
    let subtotalItems=computeSubtotal(mergeItems);
    let total=computeTotal(subtotalItems);
    let promotionItems=generatePromotionItems(subtotalItems,promotionBarcodes);
    let promotionTotals=computePromotionTotal(promotionItems);
    let result=print(promotionItems,total,promotionTotals);
    console.log(result);
}

printReceipt(tags);
