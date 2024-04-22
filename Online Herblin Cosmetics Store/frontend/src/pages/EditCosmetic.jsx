import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditCosmetic = () => {
  const [item, setItem] = useState('');
  const [skinType, setSkinType] = useState('');
  const [price, setPrice] = useState('');
  const [availableItem, setAvailableItem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/cosmetics/${id}`)
      .then((response) => {
        setItem(response.data.item);
        setSkinType(response.data.skinType)
        setPrice(response.data.price)
        setAvailableItem(response.data.availableItem)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happend. Please check console');
        console.log(error);
      });
  },[])

  const handleEditCosmetic = () => {
    const data = {
      item,
      skinType,
      price,
      availableItem,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/cosmetics/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Cosmetic Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Cosmetic</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Item</label>
          <input
            type='text'
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Skin Type</label>
          <input
            type='text'
            value={skinType}
            onChange={(e) => setSkinType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Available Item</label>
          <input
            type='number'
            value={availableItem}
            onChange={(e) => setAvailableItem(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditCosmetic}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditCosmetic;