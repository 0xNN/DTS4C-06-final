import {useState} from 'react'
import './forms.css'
import {auth} from './firebase'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useAuthValue} from './AuthContext'
import { Button, Form, Input, Card, Alert, message } from "antd"

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {setTimeActive} = useAuthValue()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = () => {
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
      console.log(password);
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)   
          .then(() => {
            setTimeActive(true)
            navigate('/verify-email')
          }).catch((err) => message(err.message))
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const onFinish = values => {
    console.log('Success:', values);
    register();
  };

  const cardStyle = {
    width: 500, 
    borderRadius: 15, 
    boxShadow: "rgb(0 0 0 / 9%) 0px 4px 4px 0px",
    transition: "0.3s"
  }

  return (
    <div className='center'>
      <Card 
        title="REGISTER" 
        style={cardStyle}
      >
        {error && <><Alert message={error} type="error" showIcon /><br/></>}
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
            <Input onChange={e => setEmail(e.target.value)} value={email} />
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
            <Input.Password onChange={e => setPassword(e.target.value)} value={password}/>
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="password_confirm"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <Input.Password onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
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
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </center>
      </Card>
      {/* <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

            <input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

          <button type='submit'>Register</button>
        </form>
        <span>
          Already have an account?  
          <Link to='/login'>login</Link>
        </span>
      </div> */}
    </div>
  )
}

export default Register