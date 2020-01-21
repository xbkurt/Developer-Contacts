import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike, addDisLike, removeDisLike } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';



class PostItem extends Component {
  constructor(){
    super();
    this.state = {
      check : 0
    }
  }

  
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  onDisLikeClick(id) {
    this.props.addDisLike(id);
  }

  onRemoveDisLikeClick(id) {
    this.props.removeDisLike(id);
  }


  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  findUserDisLike(dislikes) {
    const { auth } = this.props;
    if (dislikes.filter(dislike => dislike.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {


    const { post, auth, showActions } = this.props;

    

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={require('../layout/default.png')}
              alt=""
            />
            <br />
            <p className="text-center">
              {post.name ? (
                <Link to={"/profiles"} className="btn btn-info mr-1" onClick={this.setState= {
                  check : 0
                }} onChange={this.state.check}> {post.name} </Link>
              ) : <button
                href=""
                type="button"
                className="btn btn-info mr-1"
              >{post.name}
                </button>
              }
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onDisLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('text-secondary fas fa-thumbs-down', {
                      'text-info': this.findUserDisLike(post.dislikes)
                    })}
                  />
                  <span className="badge badge-light">{post.dislikes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  addDisLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  removeDisLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile , deletePost, addLike, removeLike, addDisLike, removeDisLike })(
  PostItem
);
