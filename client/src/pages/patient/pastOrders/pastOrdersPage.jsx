import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './pastOrdersPage.module.css';

import { useNavigate } from 'react-router-dom';

const PastOrders = () => {

    const [pastOrdersList, setPastOrdersList] = useState([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken')

    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: `http://localhost:5000/authentication/checkAccessToken`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                navigate('/login');
            });
    }

    checkAuthentication();


    const fetchAllPastOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/patient/pastOrders', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
            });
            if (response && response.data) {
                setPastOrdersList(response.data);
            }
        } catch (error) {
            throw new Error('Invalid response data');
        }
    };

    //handle cancel order
    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.post('http://localhost:5000/patient/pastOrders',
                { orderId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': accessToken,
                    },
                });

            if (response.data) {
                alert('Order Cancelled!')
                fetchAllPastOrders();
            } else {
                console.log(response.data.message);
            }

        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    useEffect(() => {
        fetchAllPastOrders();
    }, []);




    return (
        <>

            <h1>My Orders</h1>
            < div>
                <table className={styles["orders-table"]}>
                    <thead>
                        <th>Order ID</th>
                        <th>Order Items</th>
                        <th>Quantity</th>
                        <th>price/item</th>
                        <th>Order Total(LE)</th>
                        <th>Delivery Address</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {
                            pastOrdersList && pastOrdersList.map((order) => (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.orderItems.map((item, index) => (
                                        <li key={index}>{item.medName}</li>
                                    ))}</td>
                                    <td>{order.orderItems.map((item, index) => (
                                        <li key={index}>{item.quantity}</li>
                                    ))}</td>
                                    <td>{order.orderItems.map((item, index) => (
                                        <li key={index}>{item.price_per_item}</li>
                                    ))}</td>
                                    <td>{order.orderPrice}</td>
                                    <td>{order.deliveryAddress}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>{order.status}</td>
                                    <td>{order.status === "Processing" ? (<button className={styles["cancel-button"]} onClick={() => cancelOrder(order._id)}>Cancel</button>) : ""}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        </>
    );
};

export default PastOrders;
