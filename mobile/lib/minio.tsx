import axios from 'axios';

export const uploadImageToBackend = async (imageUri: string): Promise<string> => {
  try {

    const response = await fetch(imageUri);
    const blob = await response.blob();
    

    const file = new File([blob], 'product-image.jpg', { type: blob.type });


    const formData = new FormData();
    formData.append('file', file);  
  

    const { data } = await axios.post(`http://192.168.8.175:4000/upload`,
      formData
    );

    return data.imageUrl;
  } catch (error) {
    console.error('Image upload failed:', error);

    return 'https://i.pinimg.com/736x/70/8c/08/708c08614099f90b849c6f7089f8effb.jpg';
  }
};