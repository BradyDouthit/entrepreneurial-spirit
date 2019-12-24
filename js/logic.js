let startingMoney = 5;
let applesPrice = $('#apples-price').data('price');
let applesStock = $('#apples-stock').data('stock');

$('#apples-button').on('click', () => {
    if (startingMoney > 0) {
        applesStock++
        startingMoney = startingMoney - applesPrice;
        $('#money-value').text('$' + startingMoney);
        $('#apples-stock').text(applesStock)
    }
})