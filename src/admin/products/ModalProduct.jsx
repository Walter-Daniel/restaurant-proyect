
import { useAuth } from "../../context/AuthContext";
import { Form, Modal } from "antd"
import axios from "axios";
import { ModalComponent } from "./ModalComponent";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;


const URL = 'http://rolling-food.herokuapp.com/api/product';

export const ModalProduct = ({ closeModal, product, isModalVisible }) => {


    const auth = useAuth();
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
      confirm({
        title: 'Quiéres finalizar la edición?',
        icon: <ExclamationCircleOutlined />,
        content: 'Al darle OK se guardaran los cambios realizados',
        
        async onOk() {
          const editProduct = await axios.put(`${URL}/${product._id}` , values, {
            headers:  {
              'Authorization': 'Bearer ' + auth.token
                      }
            })
            form.resetFields();
            closeModal();
        },
        
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    const title = "Editar un producto";
  return (
    <ModalComponent isModalVisible={isModalVisible} closeModal={closeModal} onFinish={onFinish} product={product} title={title}/>
  )
}
