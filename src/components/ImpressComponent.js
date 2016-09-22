import React, { Component } from 'react';
import {step} from '../types/step';

export default class ImpressComponent extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidUpdate(prevProps){
    this.updateFromImpress();
  }

  handleClick(e){
    let {actions, slides} = this.props;
    let target = e.target;
    
    while( !target.classList.contains('step') &&
           !target.classList.contains('active') &&
            target !== document.documentElement) {
      target = target.parentNode;          
    }
    
    if (target !== document.documentElement)
    {
      target = slides.find((s) => s.id === target.id);
      actions.activeStep(target.id);
    }
  }
  
  updateFromImpress(){
    let _api = impress();
  
    // update steps in impress.js
    _api.reInitSteps();
    
    // active the current step
    let _activeStep = _api.getActiveStep();
    if (_activeStep)
      _api.goto(_activeStep.id);
  }
  
  render() {
    const {slides} = this.props;

    return (
      <div id='impress'>
        <div>
        
        {
          slides.map((step, index) => {
            return (
              <div className={ step.slide ? 'step slide' : 'step'} key={index}
                   id={step.id}
                   data-x={step.data.x || 0}
                   data-y={step.data.y || 0} 
                   data-z={step.data.z || 0}
                   data-scale={step.data.scale || 1}
                   data-rotate={step.data.rotate || 0}
                   data-rotate-x={step.data.rotateX || 0}
                   data-rotate-y={step.data.rotateY || 0}
                   data-rotate-z={step.data.rotateZ || step.data.rotate || 0}
                   dangerouslySetInnerHTML={{__html: step.content}}
                   onClick={this.handleClick.bind(this)}
                   style={{ position: step.style ? step.style.position : '',
                            transform: step.style ? step.style.transform : ''
                   }}>
              </div>
            );
          })
        }
        </div>
      </div>
    );
  }
}