import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';


class CommentItem extends Component {
  constructor(){
    super();
    this.state = {
      check : 0
    }
  }

  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a>
              <img
                className="rounded-circle d-none d-md-block"
                src={require('../layout/default.png')}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">
            {comment ? (
                <Link to={"/profiles"} className="btn btn-info mr-1" onClick={this.setState= {
                  check : 0
                }} onChange={this.state.check}> {comment.name} </Link>
              ) : <button
                href=""
                type="button"
                className="btn btn-info mr-1"
              >{comment.name}
                </button>
              }
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteComment })(CommentItem);
