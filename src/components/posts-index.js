import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // posts is an object, not an array.
    // lodash has a map method that takes an object and calls a function on each value
    // just like Array.map().
    return _.map(this.props.posts, post => 
      <li className="list-group-item" key={post.id}>
        <Link to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      </li>
    )
  }

  render(){
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

// Instead of using a custom mapDispatchToProps function like we have in
// past lessons, since we don't need to do anything extra to configure
// how we want to call the action, we can just pass an object of the form
// { actionName: actionFunction } to connect.
// connect will then wire it up using bindActionCreators for us, and we get
// access to this.props.fetchPosts in PostsIndex.
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);