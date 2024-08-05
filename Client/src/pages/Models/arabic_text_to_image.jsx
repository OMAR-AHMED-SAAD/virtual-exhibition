// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axiosApi from '../../utils/axiosApi';
import MyLayout from '../MyLayout';
import { Button } from 'antd';
//import './arabic_text_to_image.css';

const ArabicTextToImage = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const onGenerate = () => {
    setLoading(true);
    axiosApi
      .post('/generate_image', { text })
      .then((response) => {
        setGeneratedImage(response.data.image);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error generating image:', error);
        setLoading(false);
      });
  };

  return (
    <MyLayout modelName="Arabic Text to Image" modelDescription="Generate images from Arabic text">
      <div className="arabic-text-to-image-container">
        <div className="left-half">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Arabic text here"
          />
          <Button
            type="primary"
            loading={loading}
            size="large"
            onClick={onGenerate}
          >
            Generate
          </Button>
        </div>
        <div className="right-half">
          {generatedImage && <img src={`data:image/jpeg;base64,${generatedImage}`} alt="Generated" />}
        </div>
      </div>
    </MyLayout>
  );
};

export default ArabicTextToImage;
