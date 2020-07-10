import React from 'react';

type ErrorBoundaryState = { error: string };
export default class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: '',
    };
  }

  componentDidCatch(err: any) {
    this.setState({ error: err.response?.data?.message || err.message });
  }

  render() {
    return (
      <>
        (<p>{this.state.error}</p>
        {this.props.children}
      </>
    );
  }
}
