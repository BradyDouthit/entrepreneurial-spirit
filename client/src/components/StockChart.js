import React from 'react';

function StockChart (props) {
    return (
        <div className="stock-chart" intrinio-widget-type="small_stock_chart" intrinio-widget-ticker="MSFT"></div>
    );
}

export default StockChart;