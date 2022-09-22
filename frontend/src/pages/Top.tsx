import React from 'react'
import "./Top.css"
import appImage from "../images/app-logo.png"
import redBar from "../images/red-bar.png"

export const Top: React.FC<{ setAccessToken: (accessToken: string | null) => any }> = ( {setAccessToken} ) => {
    
  const buttonAlert = () =>{
    console.log("hoge")
  }
  return (
        <div className="Top">
        <img
          alt=""
          className="App-logo"
          src={appImage}
        />
        
        <div className="Tab">
          <div className="Tab-red"><p className="Tab-red-text">全て</p></div>
          <div className="Tab-white"><p className="Tab-white-text">査定中</p></div>
          <div className="Tab-white"><p className="Tab-white-text">呼び出し中</p></div>
          <div className="Tab-white"><p className="Tab-white-text">対応完了</p></div>
          <button type="button" className="Tab-white"onClick={buttonAlert}><p className="Tab-white-text">番号発行</p></button>
          
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
        <div className="num-background">
          <p className="num">1</p>
          <p className="num-reserve-time">11:10</p>
          <p className="num-elapse-time ">--分</p>
          <p className="num-status">対応完了</p>
        </div>
        <div className="num-background">
          <p className="num">2</p>
          <p className="num-reserve-time">11:30</p>
          <p className="num-elapse-time">--分</p>
          <p className="num-status">呼び出し中</p>
        </div>
        <div className="num-background">
          <p className="num">3</p>
          <p className="num-reserve-time">12:30</p>
          <p className="num-elapse-time">20分</p>
          <p className="num-status">査定中</p>
        </div>
        <div className="num-background">
          <p className="num">4</p>
          <p className="num-reserve-time">12:40</p>
          <p className="num-elapse-time">10分</p>
          <p className="num-status">査定中</p>
        </div>
      </div>
    );}

export default Top