/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    Form,
    Input,
    Button,
    Spinner
} from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import InputPasswordToggle from '@components/input-password-toggle'
import { ADD_USER_API } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_type: "",
    status: ""

}
const DashboardApp = () => {
    const dispatch = useDispatch()
    const { isProcess } = useSelector(state => state.dashboardSlice)
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.AuthUserSlice)

    useEffect(() => {
        if (userData === null) {
            navigate("/login")
        }
    }, [])
    
    useEffect(() => {
        if (userData?.user_type === "2") {
            navigate("/home")
        }
    }, [])


    const {
        control,
        // setValue,
        reset,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })


    const onSubmit = data => {

        if (Object.values(data).every(field => field.length > 0)) {
            dispatch(ADD_USER_API(data))
            reset()
            navigate("/admin-portal")
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
        <div className='app-user-list'>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Add User</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md='6'>
                                <h5 className='fw-bold w-100 mt-2'>First Name</h5>
                                <Controller
                                    name='first_name'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='John'
                                            invalid={errors.first_name && true}
                                            type="text"
                                            {...field} />
                                    )}
                                />
                            </Col>
                            <Col md='6'>
                                <h5 className='fw-bold w-100 mt-2'>Last Name</h5>
                                <Controller
                                    name='last_name'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='Adam'
                                            invalid={errors.last_name && true}
                                            type="text"
                                            {...field} />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6'>
                                <h5 className='fw-bold w-100 mt-2'>Email</h5>
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder='John@gmai.com'
                                            invalid={errors.email && true}
                                            type="email"
                                            {...field} />
                                    )}
                                />
                            </Col>
                            <Col md='6'>
                                <h5 className='fw-bold w-100 mt-2'>Password</h5>
                                <Controller
                                    name='password'
                                    control={control}
                                    render={({ field }) => (
                                        <InputPasswordToggle className='input-group-merge mb-2' id="password" label='' htmlFor='basic-default-password'
                                            invalid={errors.password && true} {...field} />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md='6'>
                                <h5 className='fw-bold w-100 mt-2'>User Type</h5>
                                <Controller
                                    name='user_type'
                                    control={control}
                                    render={({ field }) => (
                                        <Input type='select' id='select-plan' name='user_type'
                                            invalid={errors.user_type && true} {...field}>
                                            <option value=''>Select User Type </option>
                                            <option value='1'>Admin</option>
                                            <option value='2'>User</option>
                                        </Input>
                                    )}
                                />
                            </Col>
                            <Col md='6'>
                                <h5 className='fw-bold w-100 mt-2'>Status</h5>
                                <Controller
                                    name='status'
                                    control={control}
                                    render={({ field }) => (
                                        <Input type='select' id='select-plan' name='status'
                                            invalid={errors.status && true} {...field}>
                                            <option value={""}>Select User Status</option>
                                            <option value={"1"}>Active</option>
                                            <option value={"2"}>Deactive</option>
                                        </Input>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col md='12' className='d-flex justify-content-end mt-1'>
                                <Button type='submit' className='me-1' color='primary' disabled={isProcess}>
                                    {isProcess ?
                                        <><Spinner color='white' size='sm' type='grow' /><span className='ms-50'>Loading...</span></> : "Submit"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default DashboardApp
