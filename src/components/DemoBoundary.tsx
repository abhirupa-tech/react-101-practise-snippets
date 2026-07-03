import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  /** Remounts the boundary when this changes (e.g. on task navigation). */
  resetKey: string;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render errors from a live drill so one broken/throwing exercise
 * can't take down the whole page. Several drills (e.g. Error Boundary From
 * Scratch) deliberately throw, so this is load-bearing.
 */
export class DemoBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Drill demo crashed:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm">
          <p className="font-medium text-rose-300">This demo threw an error</p>
          <pre className="mt-2 overflow-auto font-mono text-xs text-rose-200/80">
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
