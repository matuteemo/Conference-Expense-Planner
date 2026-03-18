import React, {useState, useEffect} from "react";
import "./totalCost.css";

const TotalCost = ({totalCost, ItemsDisplay}) => {
    const total_amount = totalCost.venue + totalCost.av + totalCost.meal;
    return (
        <div className="pricing-app">
            <div className = 'display_box'>
                <div className="header">
                    <p className="preheading"><h3>Total cost for the event</h3></p>
                </div>
                <div>
                    <h2 id='pre_fee_cost_display' className="price">{total_amount.toFixed(2)}</h2>
                    <div className="render_items"><ItemsDisplay /></div>
                </div>
            </div>
        </div>
    );
};

export default TotalCost;