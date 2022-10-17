import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function Converter(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const data = props.data

 

  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if(!selectedImage) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(selectedImage);
    setTextResult(data.text);
  }, [worker, selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText])

  const handleChangeImage = () => {
    if(data) {
      setSelectedImage(data);
      console.log(data,"Sumi")
    } else {
      setSelectedImage(null);
      setTextResult("")
      console.log("hi")
    }
  }
 

  return (
    <div className="App">
    
      <div className="input-wrapper">
    
        <br></br>
        <br></br>
        <button onClick={handleChangeImage}>Convert</button>
  
      </div>

      <div className="result">
        {textResult && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Converter;