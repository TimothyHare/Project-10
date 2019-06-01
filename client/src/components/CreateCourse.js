import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            errors: []
        };

}

export default CreateCourse;