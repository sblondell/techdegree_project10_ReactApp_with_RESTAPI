import React, { Component } from 'react';
import {Redirect, BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';

import CourseDetail from './CourseDetail.js';
import UpdateCourse from './UpdateCourse.js';
import CreateCourse from './CreateCourse.js';



class Courses extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/courses")
        .then(res => res.json())
        .then(res => {
            let uniqueKey = 0;
            // Individual course buttons
            let scratch_courses = res.map((item, index) => {
                uniqueKey += 1;
                return (
                    <div className="grid-33" key={index}> 
                        <NavLink className="course--module course--link" to={`/courses/${item._id}`}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{item.title}</h3>
                        </NavLink>
                    </div>);
                }
            );

            // Add "new course" button
            scratch_courses.push(
                <div className="grid-33" key={uniqueKey}>
                    <NavLink className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                    </NavLink>
                </div>
            )

            this.setState(() => ({courses : scratch_courses}));
        });
    }

    render() {
        const {props} = this.props;
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/courses" render={ routeProp => {
                                                        return  (<div className="bounds">
                                                                    {this.state.courses}
                                                                </div>)
                                                        } 
                    }/>
                    {/* <Route exact path="/courses/create" render={() => <CreateCourse props={this.props.props} />} /> */}
                    <Route exact path="/courses/create" render={ routeProp => <CreateCourse props={props} />} />
                    <Route exact path="/courses/:course_id/update" component={UpdateCourse} />
                    <Route exact path="/courses/:course_id" component={CourseDetail} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Courses;