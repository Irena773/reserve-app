import React, { useEffect } from 'react'
import {useState} from "react";
import "./Top.css"
import axios from "../api/axios";
import appImage from "../images/app-logo.png"
import redBar from "../images/red-bar.png"

export const Top: React.FC<{ setAccessToken: (accessToken: string | null) => any }> = ( {setAccessToken} ) => {

  const [data, setData] = useState([]);
  const url = "http://127.0.0.1:8000/secondhand";

 type SecondHand = {
  status: string,
  id: number,
  reserve_time : number,
  elapsed_time : number,
  done: boolean
 }
  const getData = async () => {
    await axios.get(url)
    .then((res) => {
      setData(res.data);
    })
  }

  useEffect(()=>{
    getData();
  }, []);

  return (
        <div className="Top">
        <img
          alt=""
          className="App-logo"
          src={appImage}
        />
        <div className="Tab">
          <button className="Tab-white"><p className="Tab-white-text">全て</p></button>
          <button className="Tab-white"><p className="Tab-white-text">査定中</p></button>
          <button className="Tab-white"><p className="Tab-white-text">呼び出し中</p></button>
          <button className="Tab-white"><p className="Tab-white-text">対応完了</p></button>
          <button type="button" className="Tab-red" onClick={getData} ><p className="Tab-red-text">番号発行</p></button>
          
        </div>
        <div className="Table">
          <p className="Table-reserve-num">受付番号</p>
          <p className="Table-reserve-time">受付時間</p>
          <p className="Table-elapsed-time">経過時間</p>
          <p className="Table-status">ステータス</p>
        </div>
        <img
          alt=""
          className=""
          src={redBar}
        />

        
         {data.map((data:SecondHand)=>(
          <div className="num-background" key={data.id}>
            <p className="num">{data.id}</p>
            <p className="num-reserve-time">{data.reserve_time}</p>
            <p className="num-elapse-time">{data.elapsed_time}</p>
            <p className="num-status">{data.status}</p>
            </div>
         ))}
          
          
        
      </div>
    );}

export default Top