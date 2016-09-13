import React, { Component } from 'react';

import AddModal from './AddModal';
import StepsController from './StepsController';
import EditPanel from './EditPanel';
import DownloadButton from './DownloadButton';
import ImportButton from './ImportButton';

export default class Editor extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div>
        <AddModal actions={this.props.actions}/>
        <StepsController actions={this.props.actions}/>
        <EditPanel {...this.props}/>
        <DownloadButton slides={this.props.slides}/>
        <ImportButton actions={this.props.actions}/>
      </div>
    );
  }
}