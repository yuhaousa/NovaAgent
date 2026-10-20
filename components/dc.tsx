"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, type ReactNode } from "react";

// Each screen keeps the design canvas's logic shape: state + setState, renderVals()
// computes the values the markup reads, view() is the markup itself.
export abstract class DCLogic extends Component<object, any> {
  abstract renderVals(): any;
  abstract view(v: any): ReactNode;

  render() {
    return this.view(this.renderVals());
  }
}
