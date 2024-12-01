import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { setCurrentCafeShop } from '../store/CafeShopSlice';
import { setCurrentEmployee } from '../store/EmployeeSlice';
import { deleteData } from '../api/FetchServices';
import { API_ENDPOINTS } from '../utils/ApiConfig';
import '../style.css';  // Import the CSS file

const CommonButtom = ({ data, api, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (type === 'cafe') {
      dispatch(setCurrentCafeShop(data));
      navigate('/cafe-form', { state: { isEdit: true } });
    } else if (type === 'employee') {
      dispatch(setCurrentEmployee(data));
      navigate('/employee-form', { state: { isEdit: true } });
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: `Are you sure you want to delete the record for ${data.name}?`,
      onOk: async () => {
        try {
          let response;
          if (type === 'cafe') {
            response = await deleteData(API_ENDPOINTS.CAFE_SHOP.DELETE, { cafeShopId: data.id });
          } else if (type === 'employee') {
            response = await deleteData(API_ENDPOINTS.EMPLOYEE.DELETE, { EmployeeId: data.id });
          }

          if (response.success) {
            api.applyTransaction({ remove: [data] }); // Remove the deleted row from the grid
          } else {
            console.error('Error deleting record:', response.message);
          }
        } catch (error) {
          console.error('Error deleting record:', error);
        }
      },
      onCancel: () => console.log('Delete canceled'),
    });
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={handleEdit}
        style={{ marginRight: 8 }}
      >
        Edit
      </Button>
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default CommonButtom;
