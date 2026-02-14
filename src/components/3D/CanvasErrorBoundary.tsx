"use client";

import { Component, type ReactNode } from "react";

import { ErrorState } from "@/components";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorState
            title="3D scene failed to load"
            message="Your browser might not support WebGL."
            onRetry={() => this.setState({ hasError: false })}
          />
        )
      );
    }

    return this.props.children;
  }
}
