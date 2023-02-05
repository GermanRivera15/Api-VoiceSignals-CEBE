import React, { Component } from 'react'

export default class ContainerModel extends Component {
  
  componentDidMount() {
    this.elmRef = React.createRef();
}

  render() {
    return (
      <model-viewer
        src={"/Canoe.glb"}
        alt="A rock"
        camera-controls
        ref={(ref) => {
          this.elmRef = ref;
        }}
      >
      </model-viewer>
    )
  }
}
