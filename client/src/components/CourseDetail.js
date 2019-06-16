import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
            courseDetails: {
                course: {
                    "title": "",
                    "description": "",
                    "estimatedTime": "",
                    "materialsNeeded": ""
                },
                user: {
                    "firstName": "",
                    "lastName": "",
                    "emailAddress": "",
                }
            }
        }
    }

    componentDidMount() {
        let courseId = this.props.match.params.course_id;

        fetch(`http://localhost:5000/api/courses/${courseId}`)
            .then(res => res.json())
            .then(res => this.setState(({courseDetails: res})))
            .catch(err => err);
    }

    delete_course = courseId => {
        fetch(`http://localhost:5000/api/courses/${this.state.courseDetails.course._id}`, {
            method: 'DELETE'
        }).then(res => res)
        .catch((err, next) => next(err));
    }

    render() {
        let {user, course} = this.state.courseDetails;
        let courseMaterials = course.materialsNeeded ? course.materialsNeeded.split("\n") : [];

        return (
            <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            <NavLink className="button" to={`/courses/${course._id}/update`}>Update Course</NavLink>
                            <a className="button" href="/#" onClick={this.delete_course}>Delete Course</a>
                        </span>
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>By {user.firstName} {user.lastName}</p>
                    </div>
                    <div className="course--description">
                        <p>{course.description}</p>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{course.estimatedTime}</h3>
                            </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <ul>
                                {courseMaterials.map((material, index) => <li key={index}>{material}</li>)}
                            </ul>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default CourseDetail;