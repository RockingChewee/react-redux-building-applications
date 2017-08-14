import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

// It is helpful to create a setup function that will return the output of rendering component under test.
function setup(saving) {
  let props = {
    course: {},
    saving: saving,
    errors: {},
    onSave: () => { },
    onChange: () => { }
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

// The 'describe' block is used to group and label the tests, so we can nest multiple tests inside.
describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => { // this is the actual test
    const { output } = setup(false); // same as: const output = setup().output;
    expect(output.type).toBe('form');
    let [ h1 ] = output.props.children; // destructuring the array that is returned from children and say that the first element is an h1
    expect(h1.type).toBe('h1');
  });

  it('save button is labeled "Save" when not saving', () => {
    const { output } = setup(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const { output } = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  });
});
