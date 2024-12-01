import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {  selectCurrentCafeShop, updateCafeShop, clearCurrentCafeShop, createCafeShop } from '../../store/CafeShopSlice';
import { useNavigate,useLocation } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';
import { postData, putData } from '../../api/FetchServices'; 
import { API_ENDPOINTS } from '../../utils/ApiConfig';

import 'antd/dist/reset.css';

import TextBox from '../../components/TextBox';
import ActionButtons from '../../components/ActionButtons';
import ConfirmModal from '../../components/ConfirmModal'; 
import SuccessModal from '../../components/SuccessModal';


const CafeShopForm = () => {
  const { state } = useLocation(); 
  const isEdit = state?.isEdit || false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cafeShop = useSelector(selectCurrentCafeShop); 
  const [showModal, setShowModal] = useState(false);  
  const [logoBase64, setLogoBase64] = useState(isEdit && cafeShop ? cafeShop.logo : '');
  const [modalVisible, setModalVisible] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: isEdit && cafeShop ? cafeShop.name : '',
      description: isEdit && cafeShop ? cafeShop.description : '',
      logo: isEdit && cafeShop ? cafeShop.logo : '',
      location: isEdit && cafeShop ? cafeShop.location : '',
      status: isEdit && cafeShop ? cafeShop.status : '',
    },
  });
  
  const onSubmit = async (data) => {
    try {

      const requestBody = {
        id: isEdit ? cafeShop.id : null, 
        name: data.name,
        description: data.description,
        logo: logoBase64 || null,
        location: data.location,
        status: data.status,
      };

      const endpoint = isEdit ?  API_ENDPOINTS.CAFE_SHOP.UPDATE  :API_ENDPOINTS.CAFE_SHOP.INSERT;
      const response = isEdit
      ? await putData(endpoint, requestBody)
      : await postData(endpoint, requestBody);

      if (!response.success) {
        throw new Error(response.message || 'Failed to save cafe shop');
      }

      if (isEdit) {
        dispatch(updateCafeShop(requestBody)); 
      } else {
        dispatch(createCafeShop(requestBody));
      }
      
      dispatch(clearCurrentCafeShop()); 

      setModalMessage(isEdit ? 'Cafe Shop updated successfully!' : 'Cafe Shop created successfully!');
      setModalVisible(true);
    } catch (error) {
      console.error('Error saving cafe Shop:', error);
      alert('Failed to save cafe Shop.');
    }
  };


  const handleCancel = () => {
    setShowModal(true); 
  };

  const handleConfirmCancel = () => {
    navigate('/');
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleModalOk = () => {
    setModalVisible(false); // Close the modal
    navigate('/'); // Navigate to homepage
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <TextBox
        name="name"
        label="Name"
        control={control}
        placeholder="Enter name"
        rules={{
          required: 'Name is required',
          minLength: { value: 6, message: 'Minimum 6 characters' },
          maxLength: { value: 10, message: 'Maximum 10 characters' },
        }}
      />


      <TextBox
        name="description"
        label="Description"
        control={control}
        placeholder="Enter description"
        rules={{
          required: 'Description is required',
          maxLength: { value: 256, message: 'Maximum 256 characters' },
        }}
        isTextArea={true}
      />


      <TextBox
        name="location"
        label="Location"
        control={control}
        placeholder="Enter Location"
        rules={{
          required: 'Location is required',
          maxLength: { value: 256, message: 'Maximum 256 characters' },
        }}
        isTextArea={true}
      />

      <FileUpload onFileSelect={setLogoBase64} />

      <ActionButtons 
        isEdit={isEdit} 
        onCancel={handleCancel} 
        actionType="cafeShop" 
      />

      <ConfirmModal
        open={showModal}
        title="Changes will be lost. Are you sure?"
        onConfirm={handleConfirmCancel}
        onCancel={handleCloseModal}
      />


      <SuccessModal open={modalVisible} message={modalMessage} onOk={handleModalOk} />

    </form>
  );
};

export default CafeShopForm;
