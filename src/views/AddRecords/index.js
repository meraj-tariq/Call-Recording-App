/* eslint-disable multiline-ternary */
import React, { Fragment, useEffect, useState } from 'react'
import { FileText, X, Upload, Speaker } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, Button, ListGroup, ListGroupItem, Label, Input, Row, Col, Spinner, Badge, Alert } from 'reactstrap'
import { clearTarPathList, handleRemovePath, UNTAR_SINGLE_FILE, UPLOAD_TAR_FOLDER } from './store/AddRecordSlice'
// import $ from 'jquery'
// ** Third Party Imports

const AddRecordApp = () => {
    // ** State
    const dispatch = useDispatch()
    const { listTarFolderPath, message } = useSelector(state => state.AddRecorder)
    const [filePath, setFilePath] = useState("")
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.AuthUserSlice)
    useEffect(() => {
        if (userData === null) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        if (userData?.user_type === "1") { // admin
            navigate("/addRecord")
        }
    }, [])

    useEffect(() => {
        if (userData?.user_type === "2") { //user
            navigate("/home")
        }
    }, [])

    const handleFileInput = (value) => {
        const str = value.split('')
        const invertSlashes = str => {
            let res = ''
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== "\\") {
                    res += str[i]
                    continue
                };
                res += '//'
            }
            return res
        }

        setFilePath(invertSlashes(str))
        console.log(invertSlashes(str))
        // const acceptedFiles = event.target.files

        // setAllFiles(acceptedFiles)
        // const list = Object.values(acceptedFiles)
        // const filterList = list ? list?.filter(file => (file.name.split('.')[1] === 'tar' && Object.assign(file))) : []
        // document.getElementById("folder").setAttribute("value", 'Success')
        // setFiles(filterList)

        // document.getElementById('folder').value = 'Success.'
    }

    const renderFilePreview = file => {
        if (file?.type?.startsWith('image')) {
            return <img className='rounded' alt={file.path} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <Speaker size='28' />
        }
    }

    const handleRemoveFile = path => {
        console.log(path)
        const uploadedFiles = listTarFolderPath
        const filtered = uploadedFiles?.filter(i => i.path !== path)
        dispatch(handleRemovePath([...filtered]))
    }

    // const renderFileSize = size => {
    //     if (Math.round(size / 100) / 10 > 1000) {
    //         return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    //     } else {
    //         return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    //     }
    // }

    const handleRemoveAllFiles = () => {
        dispatch(clearTarPathList())
        setFilePath("")
    }

    const HandleUpload = () => {

        if (filePath) {
            dispatch(UPLOAD_TAR_FOLDER(filePath))
        } else {
            alert("File Not Found!")
        }
    }

    const API_CALL_HANDLE = async () => {
        await Promise.all(
            listTarFolderPath.map(async ({ path }) => {
                dispatch(UNTAR_SINGLE_FILE(path))
                // const result = response
            }))
    }

    const HandleSaveTarTODB = () => {
        if (filePath) {
            API_CALL_HANDLE()
            // dispatch(UNTAR_ARRAY_FILE(listTarFolderPath))
        } else {
            alert("File Not Found!")
        }
    }

    const HandleUntarSingleFile = (path) => {
        dispatch(UNTAR_SINGLE_FILE(path))
    }

    const fileList = listTarFolderPath && listTarFolderPath?.map((file, index) => (
        <ListGroupItem key={`${file?.path}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.path}</p>
                    <p className='file-size mb-0 fs-6 fw-bolder '>{file.fileLength && `File Name: ${`${file.filename}, ${file.fileLength}`} files are added in db`}</p>
                </div>
            </div>
            <div>
                {!file.progress ?
                    <div>
                        {!file.UploadStatus &&
                            <Button color='danger' outline size='sm' className='btn-icon me-1'
                                onClick={() => handleRemoveFile(file.path)}>
                                <X size={12} />
                            </Button>
                        }

                        <Button
                            color='primary'
                            size='sm'
                            className='btn-icon'
                            disabled={file.UploadStatus}
                            onClick={() => HandleUntarSingleFile(file.path)}>
                            {file.UploadStatus ?
                                <>
                                    <Spinner color="#7367f0 " size='sm' out />
                                    <span className='ms-50'>Loading...</span>
                                </>
                                :
                                < Upload size={12} />}
                        </Button>

                    </div>
                    : <div>  <Alert color='success'><div className='alert-body' >{file.message}</div></Alert></div>
                }

            </div>

        </ListGroupItem>
    ))

    return (
        <Card>
            <CardHeader>
                {/* <CardTitle tag='h4'>Restrictions</CardTitle>     */}
            </CardHeader>
            <CardBody>
                <h2>Please past tar folder path*</h2>
                {message && <Alert color='primary'>
                    <div className='alert-body fs-4'>{message}.</div>
                </Alert>}
                <Row>
                    <Col md='6' sm='12'>
                        {/* <Label className='form-label fs-6 fw-bolder' for='exampleMultipleFileBrowser'>
                            Select Tar Folder
                        </Label> */}
                        {/* <Input
                            type='file'
                            id='folder'
                            className="folder"
                            onChange={(e) => handleFileInput(e)}
                            accept="file/tar/*"
                            webkitdirectory
                            mozdirectory /> */}
                        <Input
                            type='text'
                            id='folder'
                            className="folder fs-6 fw-bold mt-1"
                            value={filePath}
                            placeholder="Z:/example/tar-folder/"
                            onChange={(event) => handleFileInput(event.target.value)}
                        // accept="file/tar/*"
                        // webkitdirectory
                        // mozdirectory
                        />

                    </Col>
                </Row>
                {filePath ? (
                    <Fragment>
                        <div className='d-flex justify-content-between -end mt-2'>
                            <Row>
                                <Col md='12' sm='12'>
                                    <Badge color='primary' pill href='#'>
                                        {/* <span className='align-middle fw-bolder fs-5 m-1'>
                                            Total Data Row:
                                            {listTarFolderPath?.length !== 0 && listTarFolderPath?.reduce((previousValue, currentValue) => { return previousValue?.fileLength !== 0 && previousValue?.fileLength + currentValue?.fileLength !== 0 && currentValue?.fileLength }, 0)}
                                        </span> */}
                                    </Badge>
                                </Col>
                            </Row>
                            <div>
                                {listTarFolderPath && <Button className='me-2' color='danger' outline onClick={handleRemoveAllFiles}>
                                    Remove all
                                </Button>}
                                {!listTarFolderPath ? <Button color='primary' onClick={() => HandleUpload()}>Upload files</Button> :
                                    <Button color='primary' onClick={() => HandleSaveTarTODB()}>
                                        < Upload size={14} />
                                        <span className='align-middle ms-25'>Upload All</span>
                                    </Button>}
                            </div>
                        </div>
                        <ListGroup className='my-2'>{fileList}</ListGroup>
                    </Fragment>
                ) : null}


            </CardBody>
        </Card >
    )
}
export default AddRecordApp
