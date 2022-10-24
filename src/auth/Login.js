import { useState } from "react";
import { Link } from "react-router-dom";
import "./forms.css";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "./AuthContext";
import { Button, Form, Input, Card, Alert, message } from "antd";
import 'antd/dist/antd.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            setTimeActive(true);
            navigate("/verify-email");
          })
          .catch((err) => message.error(err.message));
        } else {
          navigate("/");
        }
      })
      .catch((err) => setError(err.message));
  };

  const onFinish = values => {
    login();
  };

  const cardStyle = {
    width: 500, 
    borderRadius: 15, 
    boxShadow: "rgb(0 0 0 / 9%) 0px 4px 4px 0px",
    transition: "0.3s"
  }

  return (
    <div className="center">
      <Card 
        title="LOGIN" 
        style={cardStyle}
      >
        {error && <><Alert message={error} type="error" showIcon /><br/></>}
        {/* <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Login</button>
        </form> */}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          // initialValues={{
          //   remember: true,
          // }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: 'email',
              },
            ]}
          >
            <Input onChange={e => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={e => setPassword(e.target.value)}/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <center>
          <p>
            Don't have account?
            <Link to="/register">Register</Link>
          </p>
        </center>
      </Card>
      {/* <div className="auth">
      </div> */}
    </div>
  );
}

export default Login;
