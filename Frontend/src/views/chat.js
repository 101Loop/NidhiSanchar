import React, { Component } from "react";
class Chatbot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "19c6bfb936ef3ba79b267350ea19162f",
        popupWidget: true,
        voiceInput: true,
        automaticChatOpenOnNavigation: true,
        onInit: function () {
          var cssChanges = ".mck-running-on { display: none!important; }";
          window.Kommunicate.customizeWidgetCss(cssChanges);
        },
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return <div></div>;
  }
}

export default Chatbot;
