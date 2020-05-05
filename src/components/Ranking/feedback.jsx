import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import axios from 'axios';

class Feedback extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {name, message} = this.state;
        const form = await axios.post('/api/form', {
            name,
            message
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{ width: '600px' }}>
                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="message">Message:</Label>
                    <Input
                        type="textarea"
                        name="message"
                        onChange={this.handleChange} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default Feedback;