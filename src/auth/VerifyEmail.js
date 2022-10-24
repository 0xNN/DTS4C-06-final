import "./verifyEmail.css";
import { useAuthValue } from "./AuthContext";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Card, Alert, message, Result } from "antd"

function VerifyEmail() {
  const {currentUser} = useAuthValue()
  const [time, setTime] = useState(60)
  const {timeActive, setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setTimeActive(true)
    })
    .catch((err) => {
      alert(err.message);
    });
  };
  
  useEffect(() => {
    let interval = null
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive])

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, currentUser])

  const cardStyle = {
    width: 500, 
    borderRadius: 15, 
    boxShadow: "rgb(0 0 0 / 9%) 0px 4px 4px 0px",
    transition: "0.3s"
  }

  return (
    <div className="center">
      <Card 
        title="Verify Email" 
        style={cardStyle}
      >
        <Result
          status="success"
          title="A Verification email has been sent to:"
          subTitle={currentUser?.email}
          extra={[
            <Button key="resend" type="primary" onClick={resendEmailVerification} disabled={timeActive}>
              Resend Email {timeActive && time}
            </Button>
          ]}
        />
      </Card>
      {/* <div className="verifyEmail">
        <h1>Verify your Email Address</h1>
        <button 
  onClick={resendEmailVerification}
  disabled={timeActive}
>Resend Email {timeActive && time}</button>
      </div> */}
    </div>
  );
}

export default VerifyEmail;
