import "react-quill/dist/quill.snow.css";

import React, { Component } from "react";
import ReactQuill from "react-quill";

class MyEditor extends Component {
  constructor(props) {
    super(props);
    console.log("props: ", this.props);
  }

  render() {
    return (
      <ReactQuill
        theme="snow"
        className="add-new-post__editor mb-1"
        value={this.props.description}
        onChange={this.props.onDescriptionChange}
      />
    );
  }
}

export default MyEditor;
