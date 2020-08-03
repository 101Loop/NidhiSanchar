import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

class DEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: " " };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <ReactQuill
        theme="snow"
        className="d-editor__editor mb-1"
        defaultValue=""
        onChange={this.props.onDescriptionChange}
        onBlur="true"
      />
    );
  }
}

export default DEditor;
