import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FaBeer } from 'react-icons/fa';
import translate from "translate";

function Converter(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const[inputval,setinputval]=useState("");
  const data = props.data

 





  

  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if(!selectedImage) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(selectedImage);
    setTextResult(data.text);
    translate.engine = "google"; // Or "yandex", "libre", "deepl"
    translate.key = process.env.GOOGLE_KEY;
    translate.from = "en";
    const text = translate(textResult, { to: "ja" }).then((result)=>{
      setinputval(result)
      console.log(result)
    });
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
        <CopyToClipboard text={textResult}>
        <button>Copy</button>
        </CopyToClipboard>
      </div>
      {inputval}
    </div>
  );
}

export default Converter;