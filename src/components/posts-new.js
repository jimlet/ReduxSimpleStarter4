import React from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends React.Component {
  renderField(field) {
    // field.input from redux-form contains some event handlers for onChange, onBlur, and other props.
    // We just have to expand those inline inside the <input> tag.
    // Any other props on the Field component will also be passed in on the field param to the component prop function.
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input 
          className="form-control" 
          type="text" 
          {...field.input}
        />
        {field.meta.error}
      </div>
    );
  }
  
  render() {
    return (
      <form>
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
  form: 'PostsNewForm',
 })(PostsNew);