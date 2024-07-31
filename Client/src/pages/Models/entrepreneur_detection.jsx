import { useEffect, useState } from "react";
import axiosApi from "../../utils/axiosApi";
import MyLayout from "../MyLayout";
import ModelLoading from "./ModelLoading";

const EntrepreneurDetection = () => {
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axiosApi
        .get("/get_model/entrepreneur_detection")
        .then((response) => {
          console.log(response);
          setModel(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    return (
        <MyLayout model={model}>
        <div>{loading && <ModelLoading />}</div>
        <div >HEYYYYY</div>
        <div>
            <p>Some Content.....</p>
            <p>Some Content.....</p>
            
            <p>Some Content.....</p>
            
            <p>Some Content.....</p>
            
            <p>Some Content.....</p>
            
            <p>Some Content.....</p>
            
        </div>
      </MyLayout>
    );
    }

    export default EntrepreneurDetection;