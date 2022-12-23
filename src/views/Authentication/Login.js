/* eslint-disable multiline-ternary */
// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
// ** Icons Imports

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, FormFeedback, Spinner, Alert } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import logo from "../../assets/images/logo/logo2.png"
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN } from './store'
import { useEffect } from 'react'

const defaultValues = {
  email: "",
  password: ""
}

const LoginBasic = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData, isProcess, message } = useSelector(state => state.AuthUserSlice)
  const {
    control,
    // setValue,
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    if (userData) {
      // dispatch(handleLogin(userData))
      if (userData !== null) {
        if (userData?.user_type === "1" || userData?.user_type === "2") {
          navigate("/home")
          reset()
        } else {
          reset()
          // navigate("/home")
        }
      }
    }
  }, [userData])

  const onSubmit = data => {

    if (Object.values(data).every(field => field.length > 0)) {
      dispatch(LOGIN(data))
    } else {
      for (const key in data) {
        if (data[key]?.length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }
  return (
    <div className='auth-wrapper auth-basic px-2' style={{ backgroundColor: "#0070787d" }}>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody style={{ backgroundColor: "#00707836" }}>
            <Link className='brand-logo mb-1' to='/' onClick={e => e.preventDefault()}>
              <img src={logo} width={180}>
              </img>
            </Link>
            <CardTitle tag='h3' className='mb-1'>
              <h2 className='ms-1 fw-bold'
                style={{ color: "#007078", textAlign: "center", fontWeight: "bold !important" }}
              >CDR PLAYER APP</h2>
            </CardTitle>
            <CardText className='mb-1' style={{ color: "#000000b8", fontWeight: 500 }}>
              Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      placeholder='john@example.com'
                      invalid={errors.email && true}
                      type="email"
                      {...field} />
                  )}
                />
                {errors.email && <FormFeedback>Please enter email</FormFeedback>}
              </div>
              <div className='mb-1 mt-2'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/pages/forgot-password-basic'>
                    {/* <small>Forgot Password?</small> */}
                  </Link>
                </div>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className='input-group-merge mb-2'
                      id="password"
                      label=''
                      htmlFor='basic-default-password'
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password && <FormFeedback>Please enter password</FormFeedback>}

              </div>
              {/* <div className='form-check mb-1'> */}
              {message && <Alert color='danger'>
                <div className='alert-body'>
                  {message}
                </div>
              </Alert>}
              {/* </div> */}
              {/* <Button color='primary' block type='submit'>
              </Button> */}
              <Button type='submit' className='me-1' color='primary' disabled={isProcess}>
                {isProcess ?
                  <><Spinner color='white' size='sm' type='grow' /><span className='ms-50'>Loading...</span></> : "Sign in"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginBasic
