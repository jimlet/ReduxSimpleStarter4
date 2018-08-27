import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends React.Component {
  renderField(field) {
    // field.input from redux-form contains some event handlers for onChange, onBlur, and other props.
    // We just have to expand those inline inside the <input> tag.
    // Any other props on the Field component will also be passed in on the field param to the component prop function.

    // Two-level/nested destructuring example:
    const { meta: { touched, error } } = field;

    // Handle dynamic styling when validation fails.
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          className="form-control" 
          type="text" 
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      // This is a helper that react router gives us when it renders a component.
      // By pushing onto history, we tell the router to navigate somewhere programmatically.
      // It's in a callback instead of inline with the createPost action call so that it 
      // happens only AFTER the post is successful.
      this.props.history.push('/');
    });
  }
  
  render() {
    // handleSubmit (and many other helpers and callbacks) is passed to the component on behalf of redux-form 
    // by virtue of the reduxForm()(PostsNew) call at the bottom of this file.
    // handleSubmit does all the validation, state changes, etc. and then if everything is ok,
    // it calls the function we hand it.
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field 
          name="title" 
          label="Title for Post" 
          component={this.renderField}
        />
        <Field 
          name="categories" 
          label="Categories" 
          component={this.renderField}
        />
        <Field 
          name="content" 
          label="Post Content" 
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'.
  if (!values.title){
    // The name of the property here MUST be identical to the name on the Field component
    // in order for it to show up in field.meta.error above.
    errors.title = 'Enter a title.'
  }

  if (!values.categories){
    errors.categories = 'Enter some categories.'
  }

  if (!values.content){
    errors.content = 'Enter some content.'
  }

  // If errors comes back empty, redux-form knows the form passes validation.
  // If it has ANY properties, redux-form knows there's a problem.
  return errors;
}

export default reduxForm({ 
  validate,
  form: 'PostsNewForm'
})(
   connect(null, { createPost })(PostsNew)
);