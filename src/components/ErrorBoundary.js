import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // you could also log to an external service here
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-900 text-white p-6">
          <div className="max-w-3xl w-full bg-gray-900/80 border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
            <p className="text-gray-300 mb-4">An unexpected error occurred. Details are shown below and logged to the console.</p>
            <div className="bg-black/60 p-3 rounded text-xs text-gray-200 overflow-auto max-h-48">
              <pre>{this.state.error && this.state.error.toString()}</pre>
              {this.state.info && <pre>{this.state.info.componentStack}</pre>}
            </div>
            <div className="mt-4 text-right">
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-amber-500 rounded text-black font-semibold">Reload</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
