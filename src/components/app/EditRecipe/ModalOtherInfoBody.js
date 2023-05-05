import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "components/common/IconButton"
import { Button, CloseButton, Col, Form, Modal, Row, Spinner, Tab, Table, Tabs } from "react-bootstrap"
import SimpleBarReact from 'simplebar-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { RecipeContext } from 'context/ReciepeProvider';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { OmnifoodServer } from 'config';
import AppContext from 'context/Context';
import { toast } from 'react-toastify';
import _ from 'lodash';

export const ModalOtherInfoBody = () => {
    const { userInfo, handleRecipeInfoData } = useContext(AppContext);
    const [loading, setLoading] = useState(false)
    const { handleClose, showModal } = useContext(RecipeContext);
    const [key, setKey] = useState('category');

    const { register, handleSubmit: handleSubmitModal, formState: { errors }, reset, control } = useForm();

    const { fields: categoryFields, append: categoryApend, remove: categoryRemove } = useFieldArray({
        control,
        name: 'categoryData',

    });
    const { fields: areaFields, append: areaAppend, remove: areaRemove } = useFieldArray({
        control,
        name: 'areaData',
    });
    const { fields: tagFields, append: tagAppend, remove: tagRemove } = useFieldArray({
        control,
        name: 'tagData'
    });

    const setRecipeInfo = async () => {
        const RecipeInfoRef = doc(OmnifoodServer, userInfo.uid, 'RecipeInfoData')
        const RecipeInfoSnap = await getDoc(RecipeInfoRef);
        if (RecipeInfoSnap.exists()) {
            handleRecipeInfoData(RecipeInfoSnap.data())
        } else {
            handleRecipeInfoData({
                'RecipeInfoData': {
                    CategoryData: [],
                    AreaData: [],
                    TagData: []
                }
            })
        }
        setLoading(false)
        handleClose()
    }

    const onSubmitModal = async (data) => {
        setLoading(true)
        let modifiedData = {
            CategoryData: data.categoryData ? data.categoryData.length > 0 ? data.categoryData.map((ele, index) => {
                return {
                    value: index + '-' + ele.category,
                    label: ele.category
                }
            }) : [] : [],
            AreaData: data.areaData ? data.areaData.length > 0 ? data.areaData.map((ele, index) => {
                return {
                    value: index + '-' + ele.area,
                    label: ele.area
                }
            }) : [] : [],
            TagData: data.tagData ? data.tagData.length > 0 ? data.tagData.map((ele, index) => {
                return {
                    value: index + '-' + ele.tag,
                    label: ele.tag
                }
            }) : [] : []
        }
        const dataRef = doc(OmnifoodServer, userInfo.uid, 'RecipeInfoData')
        const dataSnap = await getDoc(dataRef);
        if (dataSnap.exists()) {
            modifiedData = {
                CategoryData: dataSnap.data().RecipeInfoData.CategoryData.concat(modifiedData.CategoryData),
                AreaData: dataSnap.data().RecipeInfoData.AreaData.concat(modifiedData.AreaData),
                TagData: dataSnap.data().RecipeInfoData.TagData.concat(modifiedData.TagData)
            };
            const result = _.map(modifiedData, (arr) => _.uniqBy(arr, 'label'));
            modifiedData = {
                CategoryData: result[0],
                AreaData: result[1],
                TagData: result[2]
            };
            await updateDoc(dataRef, { 'RecipeInfoData': modifiedData }, { capital: true }, { merge: true });
        } else {
            await setDoc(dataRef, { 'RecipeInfoData': modifiedData }, { capital: true }, { merge: true });
        }
        setRecipeInfo()
        reset();
        toast.success(`Recipe information added successfully`, {
            theme: 'colored'
        });
    };

    return (
        <Modal show={showModal}
            onHide={handleClose}
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={false}>
            <Modal.Header>
                <Modal.Title>Add New Info</Modal.Title>
                <CloseButton
                    className="btn btn-circle btn-sm transition-base p-0"
                    onClick={handleClose}
                />
            </Modal.Header>
            <Form onSubmit={handleSubmitModal(onSubmitModal)}>
                <Modal.Body>
                    <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k)}>
                        <Tab eventKey="category" title="Category" className='border-bottom border-x p-3'>
                            <>
                                <SimpleBarReact>
                                    <Table className="bg-white mb-2 dark__bg-1100" bordered responsive>
                                        <tbody className="event-ticket-body">
                                            {categoryFields.map((row, index) => (
                                                <tr key={row.id}>
                                                    <td>
                                                        <Form.Control
                                                            size="sm"
                                                            type="text"
                                                            placeholder="Category"
                                                            className='border border-0 border-200'
                                                            {...register(`categoryData.${index}.category`, {
                                                                required: true
                                                            })}
                                                        />
                                                        {errors?.categoryData?.[index]?.category?.type === 'required' && <p className='fs--2 text-danger'>*Required</p>}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <Button variant="link" size="sm" onClick={() => categoryRemove(index)}>
                                                            <FontAwesomeIcon className="text-danger" icon="times-circle" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </SimpleBarReact>
                                <IconButton
                                    onClick={() => categoryApend({ category: '' })}
                                    variant="falcon-default"
                                    size="sm"
                                    icon="plus"
                                    transform="shrink-3"
                                    disabled={errors.categoryData}
                                >
                                    Add Category
                                </IconButton>
                            </>
                        </Tab>
                        <Tab eventKey="area" title="Area" className='border-bottom border-x p-3'>
                            <>
                                <SimpleBarReact>
                                    <Table className="bg-white mb-2 dark__bg-1100" bordered responsive>
                                        <tbody className="event-ticket-body">
                                            {areaFields.map((row, index) => (
                                                <tr key={row.id}>
                                                    <td>
                                                        <Form.Control
                                                            size="sm"
                                                            type="text"
                                                            placeholder="Area"
                                                            className='border border-0 border-200'
                                                            {...register(`areaData.${index}.area`, {
                                                                required: true
                                                            })}
                                                        />
                                                        {errors?.areaData?.[index]?.area?.type === 'required' && <p className='fs--2 text-danger'>*Required</p>}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <Button variant="link" size="sm" onClick={() => areaRemove(index)}>
                                                            <FontAwesomeIcon className="text-danger" icon="times-circle" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </SimpleBarReact>
                                <IconButton
                                    onClick={() => areaAppend({ area: '' })}
                                    variant="falcon-default"
                                    size="sm"
                                    icon="plus"
                                    transform="shrink-3"
                                    disabled={errors.areaData}
                                >
                                    Add Area
                                </IconButton>
                            </>
                        </Tab>
                        <Tab eventKey="tags" title="Tags" className='border-bottom border-x p-3'>
                            <>
                                <SimpleBarReact>
                                    <Table className="bg-white mb-2 dark__bg-1100" bordered responsive>
                                        <tbody className="event-ticket-body">
                                            {tagFields.map((row, index) => (
                                                <tr key={row.id}>
                                                    <td>
                                                        <Form.Control
                                                            size="sm"
                                                            type="text"
                                                            placeholder="Tag"
                                                            className='border border-0 border-200'
                                                            {...register(`tagData.${index}.tag`, {
                                                                required: true
                                                            })}
                                                        />
                                                        {errors?.tagData?.[index]?.tag?.type === 'required' && <p className='fs--2 text-danger'>*Required</p>}
                                                    </td>
                                                    <td className="text-center align-middle">
                                                        <Button variant="link" size="sm" onClick={() => tagRemove(index)}>
                                                            <FontAwesomeIcon className="text-danger" icon="times-circle" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </SimpleBarReact>
                                <IconButton
                                    onClick={() => tagAppend({ tag: '' })}
                                    variant="falcon-default"
                                    size="sm"
                                    icon="plus"
                                    transform="shrink-3"
                                    disabled={errors.tagData}
                                >
                                    Add Tag
                                </IconButton>
                            </>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                {loading ? <Modal.Footer>
                    <Row className="g-0 w-100 h-100" >
                        <Col xs={12} className='d-flex align-items-center justify-content-center w-100 bg-white opacity-75' style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                            <Spinner animation="border" variant="primary" />
                        </Col>
                    </Row>
                </Modal.Footer> : <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" >Submit</Button>
                </Modal.Footer>}
            </Form>
        </Modal>
    )
}
