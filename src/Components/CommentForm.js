import React, { Component } from 'react';
import { Form, Button, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';

import { authCheck } from '../redux/authActionCreators';

const mapStateToProps = state => {
    // console.log('Token:', state.token);
    return {
        token: state.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    };
};

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            rating: '',
            comment: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = event => {
        //console.log(this.state);
        this.props.addComment(
            this.props.photoId,
            this.state.rating,
            this.state.author,
            this.state.comment,
            this.props.token
        );

        this.setState({
            author: '',
            rating: '',
            comment: '',
        });

        event.preventDefault();
    };

    componentDidMount() {
        this.props.authCheck();
    }

    render() {
        //console.log(this.props);
        let form = (
            <Form onSubmit={this.handleSubmit}>
                <Input
                    type='text'
                    name='author'
                    value={this.state.author}
                    placeholder='Your Name'
                    onChange={this.handleInputChange}
                    required
                />
                <br />
                <Input
                    type='select'
                    name='rating'
                    value={this.state.rating}
                    onChange={this.handleInputChange}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
                <br />
                <Input
                    type='textarea'
                    name='comment'
                    value={this.state.comment}
                    placeholder='Your Comment'
                    onChange={this.handleInputChange}
                    required
                ></Input>
                <br />
                <Button type='submit'>Submit Comment</Button>
            </Form>
        );

        let alert = (
            <Alert color='danger'>
                <strong>You MUST Login first to provide feedback</strong>
            </Alert>
        );
        return <div>{this.props.token == null ? alert : form}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
