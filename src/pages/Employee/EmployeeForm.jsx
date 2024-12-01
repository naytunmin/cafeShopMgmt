import React, { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCafeShopOptions, selectCurrentEmployee, updateEmployee, 
clearCurrentEmployee, createEmployee } from '../../store/EmployeeSlice';
import { useNavigate,useLocation } from 'react-router-dom';
import { getData, postData, putData } from '../../api/FetchServices'; 
import { API_ENDPOINTS } from '../../utils/ApiConfig';
import TextBox from '../../components/TextBox';
import ActionButtons from '../../components/ActionButtons';
import Dropdown from '../../components/Dropdown';
import RadioGroup from '../../components/RadioGroup';
import ConfirmModal from '../../components/ConfirmModal'; 
import SuccessModal from '../../components/SuccessModal';
const EmployeeForm = () => {
  const { state } = useLocation(); 
  const isEdit = state?.isEdit || false;
  console.log('isEdit' + isEdit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector(selectCurrentEmployee); 
  const cafeShopOptions = useSelector((state) => state.employee.cafeShopOptions);
  const [showModal, setShowModal] = useState(false);  
  const [modalVisible, setModalVisible] = useState(false);  
  const [modalMessage, setModalMessage] = useState(''); 

  useEffect(() => {
    const fetchCafeShops = async () => {
      const response = await getData(API_ENDPOINTS.CAFE_SHOP.GET);
      if (response.success) {
        dispatch(setCafeShopOptions(response.data.data));
      } else {
        console.error('Failed to fetch CafeShop data:', response.message);
      }
    };

    fetchCafeShops();
  }, [dispatch]);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: isEdit && employee ? employee.name : '',
      emailAddress: isEdit && employee ? employee.emailAddress : '',
      phoneNumber: isEdit && employee ? employee.phoneNumber : '',
      gender: isEdit && employee ? employee.gender : '',
      cafeShopId: isEdit && employee ? employee.cafeShopId : '',
      status: isEdit && employee ? employee.status : '',
    },
  });
  
  const onSubmit = async (data) => {
    console.log('onSubmit' + JSON.stringify(data));
    try {
      const requestBody = {
        id: isEdit ? employee.id : null, 
        name: data.name,
        emailAddress: data.emailAddress,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        cafeShopId: data.cafeShopId || null,
        status: data.status,
      };

      console.log('onSubmit requestBody' + JSON.stringify(requestBody));
        const endpoint = isEdit ? API_ENDPOINTS.EMPLOYEE.UPDATE : API_ENDPOINTS.EMPLOYEE.INSERT;      
        const response = isEdit
          ? await putData(endpoint, requestBody)
          : await postData(endpoint, requestBody);

      console.log('onSubmit response' + JSON.stringify(response));
      if (!response.success) {
        throw new Error('Failed to save employee');
      }

      if (isEdit) {
        dispatch(updateEmployee(requestBody)); 
      } else {
        dispatch(createEmployee(requestBody)); 
      }
      dispatch(clearCurrentEmployee()); 
      console.error('setModalMessage');
      setModalMessage(isEdit ? 'Employee updated successfully!' : 'Employee created successfully!');
      setModalVisible(true);
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Failed to save employee.');
    }
  };

  const handleCancel = () => {
    setShowModal(true); 
  };

  const handleConfirmCancel = () => {
    navigate('/employee'); 
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleModalOk = () => {
    setModalVisible(false); 
    navigate('/employee'); 
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
        name="emailAddress"
        label="Email Address"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email format',
          },
        }}
        placeholder="Enter email"
      />

      <TextBox
        name="phoneNumber"
        label="Phone Number"
        control={control}
        rules={{
          required: 'Phone number is required',
          pattern: {
            value: /^[89][0-9]{7}$/,
            message: 'Phone number must start with 8 or 9 and have 8 digits',
          },
        }}
        placeholder="Enter phone number"
      />
      <RadioGroup
        name="gender"
        label="Gender"
        control={control}
        options={[
          { value: 'M', label: 'Male' },
          { value: 'F', label: 'Female' },
        ]}
        rules={{ required: 'Gender is required' }}
      />
   
      <Dropdown
        name="cafeShopId"
        label="Cafe Shop"
        control={control}
        options={cafeShopOptions}
      />
  
      <ActionButtons 
        isEdit={isEdit} 
        onCancel={handleCancel} 
        actionType="employee" 
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

export default EmployeeForm;
