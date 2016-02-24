import React from 'react';

const ResourceList = (props) => (
    <div className="row"> 
      <div className="col s12 m10">
      <h4>Resources</h4>
        <div className="card white">
          <div className="card-content black-text" >
            <span className="card-title"><strong>The guide, the good, and best practice</strong></span>
            <div className="row">
            <h7 className="left-align col s12">Resource links:</h7>
              <a className="left-align col s12" href={'https://guides.github.com/introduction/flow/'}>The guide on Understanding the GitHub workflow</a>
              <p className="left-align col s12">jadfadf</p> 
              <a  className="left-align col s12" href={'https://guides.github.com/activities/contributing-to-open-source/'}>The guide on Open Source contribution</a>
              <p className="left-align col s12">jadfadf</p>
              <a className="left-align col s12" href={'https://help.github.com/articles/creating-a-pull-request/'}>How to do a pull request</a>
              <p className="left-align col s12">jadfadf</p>
              <a className="left-align col s12" href={'https://guides.github.com/activities/forking/'}>Forking your projects</a>
              <p className="left-align col s12">jadfadf</p>
              <a className="left-align col s12" href={'http://chris.beams.io/posts/git-commit/#seven-rules'}>The seven rules of a great git commit message</a>
              <p className="left-align col s12">jadfadf</p>
              <a className="left-align col s12" href={'http://gitimmersion.com/'}>The git immersion practice</a>
              <p className="left-align col s12">jadfadf</p>
              <a className="left-align col s12" href={'http://nvie.com/posts/a-successful-git-branching-model/'}>A successful Git branching model</a>
              <p className="left-align col s12">jadfadf</p>
            </div>
          </div>
        </div>


      </div>
    </div>
);

module.exports = ResourceList;