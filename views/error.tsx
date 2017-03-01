import * as React from 'react';


export default class ErrorView extends React.Component <any, any> {

  private error: any;

  constructor(props) {
    super(props);
    this.error = props.error;
  }

  render() {
    return (
      <div>
        {this.error.stack || this.error}
      </div>)
  }
}