'use strict';

describe("loadAllItems",function(){
    it("should return all Items of the store",function(){
      let result=loadAllItems();
    let items=[
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];

    expect(result).toEqual(items);
  });
});
describe("formattedTags",function(){
  it("should return the array of the barcode and amount",function(){
    let tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    let result=formattedTags(tags);
    let expectResult=
      [ { barcode: 'ITEM000001', amount: 1 },
      { barcode: 'ITEM000001', amount: 1 },
      { barcode: 'ITEM000001', amount: 1 },
      { barcode: 'ITEM000001', amount: 1 },
      { barcode: 'ITEM000001', amount: 1 },
      { barcode: 'ITEM000003', amount: 2.5 },
      { barcode: 'ITEM000005', amount: 1 },
      { barcode: 'ITEM000005', amount: 2 } ]
      expect(result).toEqual(expectResult);
  });
});

describe("mergeBarcodes",function(){
  it("should return the afterMerge ",function(){
    let generateBarcodes=
      [ { barcode: 'ITEM000001', amount: 1 },
        { barcode: 'ITEM000001', amount: 1 },
        { barcode: 'ITEM000001', amount: 1 },
        { barcode: 'ITEM000001', amount: 1 },
        { barcode: 'ITEM000001', amount: 1 },
        { barcode: 'ITEM000003', amount: 2.5 },
        { barcode: 'ITEM000005', amount: 1 },
        { barcode: 'ITEM000005', amount: 2 } ];

    let expectResult=
    [ { barcode: 'ITEM000001', amount: 5 },
      { barcode: 'ITEM000003', amount: 2.5 },
      { barcode: 'ITEM000005', amount: 3 } ];
    let result=mergeBarcodes(generateBarcodes);
    expect(result).toEqual(expectResult);
  });
});
describe("generateItems",function(){
  it("should return the array of add the amount in the  generateBarcodes",function(){
   let merBarcodes=
    [ { barcode: 'ITEM000001', amount: 5 },
      { barcode: 'ITEM000003', amount: 2.5 },
      { barcode: 'ITEM000005', amount: 3 } ];

    let items=[
      {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode: 'ITEM000002',
        name: '苹果',
        unit: '斤',
        price: 5.50
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
    ];
    let result=generateItems(items,merBarcodes);
    let expectResult=
      [ { barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3,
      amount: 5 },
      { barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15,
        amount: 2.5 },
      { barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5,
        amount: 3 } ];
    expect(result).toEqual(expectResult);
  });
});

describe("computeSubtotal",function(){
  it("should return the subtotal",function (){
    let mergeItems=
      [ { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        amount: 5 },
        { barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15,
          amount: 2.5 },
        { barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,
          amount: 3 } ];

    let result=computeSubtotal(mergeItems);
    let expectResult=[ { barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3,
      amount: 5,
      subtotal: 15 },
      { barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15,
        amount: 2.5,
        subtotal: 37.5 },
      { barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5,
        amount: 3,
        subtotal: 13.5 } ];
    expect(result).toEqual(expectResult);
  });
});
describe ("computeTotal",function(){
  it("should return the total",function() {
    let subtotalItems=
      [ { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        amount: 5,
        subtotal: 15 },
        { barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15,
          amount: 2.5,
          subtotal: 37.5 },
        { barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,
          amount: 3,
          subtotal: 13.5 } ];
    let result=computeTotal(subtotalItems);
    let expectResult=66;
    expect(result).toEqual(expectResult);
  });
});

describe("generatePromotionItems",function(){
  it("should return the items after promotion",function(){
    let subtotalItems=
      [ { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        amount: 5,
        subtotal: 15 },
        { barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15,
          amount: 2.5,
          subtotal: 37.5 },
        { barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,
          amount: 3,
          subtotal: 13.5 } ];
    let promotionBarcodes=
      [ { type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [ 'ITEM000000', 'ITEM000001', 'ITEM000005' ] } ];
    let result=generatePromotionItems(subtotalItems,promotionBarcodes);
    let expectResult=[ { barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3,
      amount: 5,
      promotionSubtotal: 12 },
      { barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15,
        amount: 2.5,
        promotionSubtotal: 37.5 },
      { barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.5,
        amount: 3,
        promotionSubtotal: 9 } ];
    expect (result).toEqual(expectResult);
  });
});
describe ("computePromotionTotal",function(){
  it("should retrun the sum of promotionItems",function(){
    let promotionTotals=
      [ { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        amount: 5,
        promotionSubtotal: 12 },
        { barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15,
          amount: 2.5,
          promotionSubtotal: 37.5 },
        { barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,
          amount: 3,
          promotionSubtotal: 9 } ];
    let result=computePromotionTotal(promotionTotals);
    let expectResult=58.5;
    expect(result).toEqual(expectResult);
  });
});
describe("print",function(){
  it("should return the receipt of the cart",function(){
    let promotionSubTotals=
      [ { barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3,
        amount: 5,
        promotionSubtotal: 12 },
        { barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15,
          amount: 2.5,
          promotionSubtotal: 37.5 },
        { barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5,
          amount: 3,
          promotionSubtotal: 9 } ];
    let total=66;
    let promotionTotal=58.5;
    let result=print(promotionSubTotals,total,promotionTotal);
    const expectResult = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;
      expect(result).toEqual(expectResult);
  });
});

describe('pos', () => {


  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
