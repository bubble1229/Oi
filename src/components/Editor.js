import React, { Component } from 'react';

import AddModal from './AddModal';
import StepsController from './StepsController';
import EditPanel from './EditPanel';
import DownloadButton from './DownloadButton';
import ImportButton from './ImportButton';

import Joyride from 'react-joyride';

export default class Editor extends Component {
  constructor(props){
    super(props);
    this.state = {
      steps: [],
      ready: false
    };
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        ready: true
      });
    }, 6000);
  }
  
  componentDidUpdate (prevProps, prevState) {
    if (!prevState.ready && this.state.ready) {
        this.refs.joyride.start();
    }
  }
  
  // Add teaching steps into joyride
  addSteps(steps){
    let joyride = this.refs.joyride;
    
    if (!Array.isArray(steps))
      steps = [steps];
      
    if (!steps.length)
      return false;
      
    this.setState((currentState) => {
      currentState.steps = currentState.steps.concat(joyride.parseSteps(steps));
      return currentState;
    });
  }
  
  // Add tooltip into joyride( but not use in anywhere now XDD)
  addTooltip(data) {
    let joyride = this.refs.joyride;
    joyride.addTooltip(data);
  }
  
  // callback for joyride
  callback(data) {
    console.log(data);
    if (data.type === 'finished')
    {
      this.props.actions.activeStep(1);
      impress().goto(1);
    }
  }
  
  render() {
    return (
      <div>
        <Joyride ref='joyride' 
                 steps={this.state.steps}
                 type={'continuous'}
                 keyboardNavigation={false}
                 showSkipButton={true}
                 showStepsProgress={true}
                 showOverlay={true}
                 callback={this.callback.bind(this)}/>
                 
        <AddModal actions={this.props.actions}
                  addSteps={this.addSteps.bind(this)}/>
                         
        <EditPanel {...this.props}
                   addSteps={this.addSteps.bind(this)}/>
                   
        <StepsController actions={this.props.actions}
                         addSteps={this.addSteps.bind(this)}/>
                   
        <DownloadButton slides={this.props.slides}
                        addSteps={this.addSteps.bind(this)}/>
                         
        <ImportButton actions={this.props.actions}
                      addSteps={this.addSteps.bind(this)}/>
      </div>
    );
  }
}