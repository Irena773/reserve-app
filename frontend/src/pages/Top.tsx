import React, { useEffect } from 'react'
import {useState} from "react"
import ReactModal from 'react-modal'
import "./Top.css"
import axios from "../api/axios";
import appImage from "../images/app-logo.png"
import QRcode from "../images/QRcode.png"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const Top: React.FC<{ setAccessToken: (accessToken: string | null) => any }> = ( {setAccessToken} ) => {
  
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [FinishAssessIsOpen, setFinishAssessIsOpen] = useState(false);
  const [datas, setData] = useState<SecondHand[]>([]);
  const [AssessDatas, setAssessData] = useState<SecondHand[]>([]);
  const [callDatas, setCallData] = useState<SecondHand[]>([]);
  const [userID, setUserID] = useState(0);
  const url = "http://127.0.0.1:8000/secondhand";
  const [nowTime, setNowTime] = useState("2022-10-07T23:00:53.775346+09:00");
  ReactModal.setAppElement('#root')
  type SecondHand = {
    status: string,
    id: number,
    reserve_time : string,
    elapsed_time : string,
    done: boolean
  }

// 1000ms間隔で現在日時を取得する
  const updateTime = setInterval( () => {
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
        if(res.data[i].status === "査定中"){
          AssessDatas.push(res.data[i]);
        }else if(res.data[i].status === "呼び出し中"){
          callDatas.push(res.data[i]);
        }
          let reserve_tmp = res.data[i].reserve_time;
          let elapse_tmp  = res.data[i].elapsed_time;
          reserve_tmp = reserve_tmp.replace(/(.+)-(.+)-(.+)T/gi,'');
          elapse_tmp  = elapse_tmp.replace(/(.+)-(.+)-(.+)T/gi,'');
          
          res.data[i].reserve_time = reserve_tmp;
          res.data[i].elapsed_time = elapse_tmp;
      }
      console.log(AssessDatas)
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

  const updateStatus = async(userID:number) =>{
    await axios.put(url+"/"+ userID, {
      id:userID,
      status:"呼び出し中",
    })
    .then((res) => {
      let reserve_tmp = res.data.reserve_time;
      let elapse_tmp  = res.data.elapsed_time;
      reserve_tmp = reserve_tmp.replace(/(.+)-(.+)-(.+)T/gi,'');
      elapse_tmp  = elapse_tmp.replace(/(.+)-(.+)-(.+)T/gi,'');
          
      res.data.reserve_time = reserve_tmp;
      res.data.elapsed_time = elapse_tmp;
      //査定中タブのデータの更新
      setAssessData((AssessDatas) =>AssessDatas.filter((data:SecondHand)=>(data.id !== res.data.id)))
      //全てタブのデータの更新
      setData((datas) => datas.map((data:SecondHand)=>(data.id === res.data.id ? {
          id:res.data.id,
          status: res.data.status,
          reserve_time: res.data.reserve_time,
          elapsed_time: res.data.elapsed_time,
          done:true
      }:data)))
      //呼び出し中タブのデータの更新
      setCallData((calldata) => ([...callDatas, res.data]))
      console.log(AssessDatas);
    })
  }

  useEffect(()=>{
    getData();
  }, []);

  const closeModal = () => {
    setEditModalIsOpen(false);
    setFinishAssessIsOpen(false);
  };

  return (
    
        <div className="Top">
          <img alt="" className="App-logo" src={appImage}/>
        <Tabs className="Tab">
            <TabList>
              <Tab className="Tab-white"><p className="Tab-white-text">全て</p></Tab>
              <Tab className="Tab-white"><p className="Tab-white-text">査定中</p></Tab>
              <Tab className="Tab-white"><p className="Tab-white-text">呼び出し中</p></Tab>
              <Tab className="Tab-white"><p className="Tab-white-text">対応完了</p></Tab>
              <Tab className="Tab-red" onClick={addData} ><p className="Tab-red-text">番号発行</p></Tab>  
            </TabList>

        <div className="Table">
          <p className="Table-reserve-num">受付番号</p>
          <p className="Table-reserve-time">受付時間</p>
          <p className="Table-elapsed-time">経過時間</p>
          <p className="Table-status">ステータス</p>
          <p className='Table-detail'>発券番号</p>
        </div>
        
        <div className='Table-column-bar'>'               '</div>
          <TabPanel>
          {datas.map((data:SecondHand, i)=>(
            <div className="num-background" key={i+1}>
              <p className="num">{data.id}</p>
              <p className="num-reserve-time">{data.reserve_time}</p>
              <p className="num-elapse-time">{data.elapsed_time}</p>
              <p className="num-status">{data.status}</p>
              <button type="button" className='button-detail' onClick={() => {setEditModalIsOpen(true);setUserID(i+1)}}><p className="button-detail-text">詳細</p></button>
              <ReactModal  isOpen={editModalIsOpen} onRequestClose={closeModal} className="react-modal"  overlayClassName="Overlay">
                <img alt="" className="modal-logo" src={appImage}/>
                <p className='modal-text'>{nowTime}</p>
                <p className='modal-text'>お客様のお呼び出し番号</p>
                <p className='modal-text'>{userID}番</p>
                <img alt="" className="" src={QRcode}/>
              </ReactModal>

              
            </div>
          ))}
          </TabPanel>
          
          <TabPanel>
          {AssessDatas.map((data:SecondHand, i)=>(
            <div className="num-background" key={i+1}>
              <p className="num">{data.id}</p>
              <p className="num-reserve-time">{data.reserve_time}</p>
              <p className="num-elapse-time">{data.elapsed_time}</p>
              <p className="num-status">{data.status}</p>
              <button type="button" className='button-detail' onClick={() => {setEditModalIsOpen(true);setUserID(data.id)}}><p className="button-detail-text">詳細</p></button>
              <button type="button" className="button-detail" onClick={() => {setFinishAssessIsOpen(true);setUserID(data.id)}}><p className="button-detail-text">査定完了</p></button>
              <ReactModal  isOpen={editModalIsOpen} onRequestClose={closeModal} className="react-modal"  overlayClassName="Overlay">
                <img alt="" className="modal-logo" src={appImage}/>
                <p className='modal-text'>{nowTime}</p>
                <p className='modal-text'>お客様のお呼び出し番号</p>
                <p className='modal-text'>{userID}番</p>
                <img alt="" className="" src={QRcode}/>
              </ReactModal>

              <ReactModal isOpen={FinishAssessIsOpen} onRequestClose={closeModal} className="react-modal"  overlayClassName="Overlay">
                <p className='modal-text'>査定を完了しますか？</p>
                <p className='modal-text'>お客様のお呼び出し番号</p>
                <p className='modal-text'>{userID}番</p>
                <button type="button" className="button-detail" onClick={() => {updateStatus(userID);setFinishAssessIsOpen(false)}}><p className="button-detail-text">はい</p></button>
                <button type="button" className="button-detail" onClick={() => {setFinishAssessIsOpen(false)}}><p className="button-detail-text">いいえ</p></button>
              </ReactModal>
            </div>
          ))}
          </TabPanel>

          <TabPanel>
          {callDatas.map((data:SecondHand, i)=>(
            <div className="num-background" key={i+1}>
              <p className="num">{data.id}</p>
              <p className="num-reserve-time">{data.reserve_time}</p>
              <p className="num-elapse-time">{data.elapsed_time}</p>
              <p className="num-status">{data.status}</p>
              <button type="button" className='button-detail' onClick={() => {setEditModalIsOpen(true);setUserID(i+1)}}><p className="button-detail-text">詳細</p></button>
              <ReactModal  isOpen={editModalIsOpen} onRequestClose={closeModal} className="react-modal"  overlayClassName="Overlay">
                <img alt="" className="modal-logo" src={appImage}/>
                <p className='modal-text'>{nowTime}</p>
                <p className='modal-text'>お客様のお呼び出し番号</p>
                <p className='modal-text'>{userID}番</p>
                <img alt="" className="" src={QRcode}/>
              </ReactModal>
            </div>
          ))}
          </TabPanel>
        </Tabs>
      </div>
    );}

export default Top