import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends React.Component {
  componentDidMount() {
    // this.props.match.params.id gives us the id wildcard token defined on the route by :id.
    this.props.fetchPost(this.props.match.params.id);
  }

  onDeleteClick() {
    // Get the ID from the URL, don't rely on the post itself
    // because it may not be there yet.
    this.props.deletePost(this.props.match.params.id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    // The first time this component renders, there will be no post
    // because the lifecycle is render, componentDidMount, fetchPost, reducer adds the post to state, render again
    // So we need to not blow up on that very first render by checking for undefined post here.
    // The user will see Loading... until the fetch comes back from teh backend API, state is updated,
    // and the component is rerendered.
    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button 
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  // Don't pass the whole list of all posts into this component.
  // Keep the dependency honest - we really only care about the post for :id in here,
  // so isolate the logic for pulling that out of the list here.
  // ownProps gives react-redux access to the props that were passed to the component.
  // Here, react-router-dom gave us params.
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);