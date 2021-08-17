import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export class UpdateModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.updateFun}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.selectData.strDrink} name="strDrink"/>
                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>IMAGE</Form.Label>
                                <Form.Control type="text" defaultValue={this.props.selectData.strDrinkThumb} name="strDrinkThumb" />
                                
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="number" defaultValue={this.props.selectData.idDrink} name="idDrink" />
                                
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                update
                            </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

export default UpdateModal
