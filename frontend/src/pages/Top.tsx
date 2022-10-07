import React, { useEffect } from 'react'
import {useState} from "react";
import "./Top.css"
import axios from "../api/axios";
import appImage from "../images/app-logo.png"
import redBar from "../images/red-bar.png"

export const Top: React.FC<{ setAccessToken: (accessToken: string | null) => any }> = ( {setAccessToken} ) => {

  const [datas, setData] = useState([]);
  const url = "http://127.0.0.1:8000/secondhand";
  const [nowTime, setNowTime] = useState("2022-10-07T23:00:53.775346+09:00");

type SecondHand = {
  status: string,
  id: number,
  reserve_time : string,
  elapsed_time : string,
  done: boolean
}

  const temp = setInterval( () => {
      const today = new Date();
      // console.log(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()
      // + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
      setNowTime(today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()
      + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds())
    },1000)
  
  //DBから買い取り一覧を取得
  const getData = async () => {
    await axios.get(url)
    .then((res) => {
      setData(res.data);
      //受付時間の表示形式の変更
      for(let i = 0; i < res.data.length; i++){
          let reserve_tmp = res.data[i].reserve_time;
          let elapse_tmp  = res.data[i].elapsed_time;
          console.log(reserve_tmp);
          reserve_tmp = reserve_tmp.replace(/(.+)-(.+)-(.+)T/gi,'');
          elapse_tmp  = elapse_tmp.replace(/(.+)-(.+)-(.+)T/gi,'');
          
          res.data[i].reserve_time = reserve_tmp;
          res.data[i].elapsed_time = elapse_tmp;
      }
    },)
  }

  const addData = async() => {
    await axios.post(url, {
      status:"査定中",
      reserve_time:nowTime,
      elapsed_time:nowTime
    })
    .then((res) => {
      getData();
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
          <button type="button" className="Tab-red" onClick={addData} ><p className="Tab-red-text">番号発行</p></button>
          
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

      
        {datas.map((data:SecondHand)=>(
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