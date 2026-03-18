import React, { useEffect, useState } from "react";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity as incrementAV, decrementQuantity as decrementAV } from "./avSlice";
import { toggleMealSelection } from "./mealSlice";
import TotalCost from "./totalCost";

const ConferenceEventPlanner = () => {
    const dispatch = useDispatch();
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [showDetails, setShowDetails] = useState(false);
    const venuesItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealItems = useSelector((state) => state.meal);
    const isIncrementDisabled = (venue) => {
        return venue.name === "Auditorium Hall (Capacity:200)" && venue.quantity >= 3;
    };
    const handleMealSelection = (index) => {
        const item= mealItems[index];
        if(item.selected && item.type === 'mealForPeople'){
            const newNumberOfPeople = item.selected ? numberOfPeople : 0;
            dispatch(toggleMealSelection(index, newNumberOfPeople))
        }else{
            dispatch(toggleMealSelection(index))
        }
    }
    const avTotalCost = avItems.reduce((total, av) => total + (av.cost * av.quantity), 0);
    const mealTotalCost = mealItems.filter((item) => item.selected).reduce((total, item) => total + (item.cost * numberOfPeople), 0);
    const venueTotalCost = venuesItems.reduce((total, venue) => total + (venue.cost * venue.quantity), 0);

    // Now I want to create an object that contains the total cost for each category and the overall total cost
    const totalCost = {
        venue : venueTotalCost,
        av: avTotalCost,
        meal: mealTotalCost,
        overall: venueTotalCost + avTotalCost + mealTotalCost,
    };

    // Now I will retrieve the items from the total cost object.

    const getItemsFromTotalCost = () => {
        const items = [];
        venuesItems.forEach((item) => {
            if (item.quantity > 0){
                items.push({ ...item, type: 'venue' })
            }
        });
        avItems.forEach((item) => {
            if (item.quantity > 0 && !items.some((i) => i.name === item.name && i.type === 'av')){
                items.push({ ...item, type: 'av' })
            };
        });
        mealItems.forEach((item) => {
            if(item.selected){
                const itemForDisplay = { ...item, type: 'meal', numberOfPeople };
                items.push(itemForDisplay);
            }
        });
        return items;
    }

    const items = getItemsFromTotalCost();
    
    const itemsDisplay = ({items}) => {
        console.log(items);
        return <>
            <div className="display_box1">
                {items.length === 0 && <p>No items selected</p>}
                <table className="table_item_data">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.cost.toFixed(2)}</td>
                                <td>
                                    {item.type === 'meal' || item.numberOfPeople ? `For ${item.numberOfPeople} people` : item.quantity}
                                </td>
                                <td>
                                    {item.type === 'meal' || item.numberOfPeople ? (item.cost * item.numberOfPeople).toFixed(2) : (item.cost * item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    }

    const ItemsDisplay = () => itemsDisplay({ items });
    const handleOpenDetails = () => setShowDetails(true);
    const handleCloseDetails = () => setShowDetails(false);

    useEffect(() => {
        if (!showDetails) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowDetails(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showDetails]);
    return (
        <>
            <navbar className="planner-navbar">
                <div className="planner-logo">Conference Expense Planner</div>
                <ul className="planner-nav-links">
                    <li><a href="#meals">Meals</a></li>
                    <li><a href="#add-ons">Add-ons</a></li>
                    <li><a href="#venue">Venue</a></li>
                </ul>
                <button className="view-details" onClick={handleOpenDetails}>View Details</button>
            </navbar>
            {showDetails && (
                <div className="modal-overlay" onClick={handleCloseDetails} role="presentation">
                    <div className="modal-content" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Total cost details">
                        <button className="modal-close" onClick={handleCloseDetails} aria-label="Close details">Close</button>
                        <TotalCost totalCost={totalCost} ItemsDisplay={ItemsDisplay} />
                    </div>
                </div>
            )}
            <div id="venue" className="venue_container">
                <div className="titles">
                    <h1>Venue Room Selection</h1>
                    <div className="venue_selection">

                        {venuesItems.map((venue) => (
                            <div key={venue.id} className="venue_item">
                                <img src={venue.img} alt={venue.name} className="venue_image" />
                                <div className="venue_info">
                                    <h2>{venue.name}</h2>
                                    <p>Cost: ${venue.cost}</p>
                                    <div className="quantity_controls">
                                        <button onClick={() => dispatch(decrementQuantity(venue.id))}>-
                                        </button>
                                        <span>{venue.quantity}</span>
                                        <button
                                            onClick={() => dispatch(incrementQuantity(venue.id))}
                                            disabled={isIncrementDisabled(venue)}>+
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className='total-cost'>Total Cost: ${venueTotalCost.toFixed(2)}</div>
            </div>
            <div id="meals" className="meals_container">
                <div className="titles">
                    <h1>Meals</h1>
                </div>
                <div className="input-container venue_selection">
                        <label htmlFor="numberOfPeople"><h3>Number of People</h3></label>
                        <input type="number" className="input_box5" id="numberOfPeople" value={numberOfPeople} onChange={(e) => setNumberOfPeople(parseInt(e.target.value))} min='1'/>
                </div>
                <div className="meal_selection">
                    {mealItems.map((item, index) => (
                        <div className="meal_item" key = {index}>
                            <div className="inner">
                                <input type="checkbox" id={`meal-${index}`} checked= {item.selected} onChange={() => handleMealSelection(index)} />
                                <label htmlFor={`meal-${index}`}>{item.name}</label>
                            </div>
                            <div className="meal_cost">${item.cost.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
                <div className='total-cost'>Total Cost: ${mealTotalCost.toFixed(2)}</div>
            </div>
            <div id="add-ons" className="add-ons_container">
                <div className="titles">
                    <h1>Add-ons</h1>
                    <div className="av_selection">
                        {avItems.map((av ) => (

                            <div key={av.id} className="av_item">
                                <img src={av.img} alt={av.name} className="av_image" />
                                <div className="av_info">
                                    <h2>{av.name}</h2>
                                    <p>Cost: ${av.cost}</p>
                                    <div className="quantity_controls">
                                        <button onClick={() => dispatch(decrementAV(av.id))}>-
                                        </button>
                                        <span>{av.quantity}</span>
                                        <button onClick={() => dispatch(incrementAV(av.id))}>+
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))};
                    </div>
                </div>

                <div className='total-cost'>Total Cost: ${avTotalCost.toFixed(2)}</div>
            </div>
        </>


    )}

export default ConferenceEventPlanner;