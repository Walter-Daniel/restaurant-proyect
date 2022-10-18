import { useEffect, useState  } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Title } from "../components";
import { OrderList } from "./OrderList";
import { ModalOrder } from "./ModalOrder";

import { getEnvVariables } from '../../helpers/getEnvVariables';


const { VITE_API_URL } = getEnvVariables();

const URL = `${VITE_API_URL}/orders`;

export const OrderPage = () => {
    const auth = useAuth();

    const [order, setOrder] = useState([]);
    const [orderToEdit, setOrderToEdit] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
      setIsModalVisible(true);
    }
    const closeModal = () => {
      setIsModalVisible(false);
    }

    useEffect(() => {
        getOrders();
      }, [])

    async function getOrders() {
        const OrdersDB = await axios(URL, {
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                }
        })
        const ordersList= OrdersDB.data.orders;
        setOrder(ordersList);
    };

    const title = 'Ordenes'

    async function editOrder(id) {
      try { 
        const newStatus = order.find( order => order._id === id);
        setOrderToEdit(newStatus);
        openModal();
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
        <Title title={title} />
        <hr />
        <h3>Cantidad total de ordenes: {order.length}</h3>
        <OrderList orders={order} editOrder={editOrder} />
        <ModalOrder order={orderToEdit} closeModal={closeModal} isModalVisible={isModalVisible}/>
    </>
  )
}

