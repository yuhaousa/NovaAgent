"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Fragment, type ContextType, type ReactNode } from "react";
import { setRenderLang } from "@/lib/i18n/tr";
import { LangContext } from "./lang";

// Each screen keeps the design canvas's logic shape: state + setState, renderVals()
// computes the values the markup reads, view() is the markup itself (its text goes through tr()).
export abstract class DCLogic extends Component<object, any> {
  static contextType = LangContext;
  declare context: ContextType<typeof LangContext>;

  abstract renderVals(): any;
  abstract view(v: any): ReactNode;

  render() {
    setRenderLang(this.context.lang);
    // Keyed by language so uncontrolled fields (textarea drafts, selects) re-mount in the new language
    return <Fragment key={this.context.lang}>{this.view(this.renderVals())}</Fragment>;
  }
}
