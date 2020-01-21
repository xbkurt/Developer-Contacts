import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";



class CommentProfile extends Component {

    constructor() {
        super();
        this.state = {
            check: 0
        }
    }

    render() {
        const { profile } = this.props;

        return (
            <p className="text-center">
            {profile ? (
                <Link to={`/profile/${profile.handle}`} className="btn btn-info mr-1" onClick={this.setState= {
                  check : 0
                }} onChange={this.state.check}> {profile.handle} </Link>
              ) : <button
                href=""
                type="button"
                className="btn btn-info mr-1"
              >{profile.handle}
                </button>
              }
            </p>

        )
    }
}


CommentProfile.propTypes = {
    profile: PropTypes.object.isRequired
};


export default CommentProfile;