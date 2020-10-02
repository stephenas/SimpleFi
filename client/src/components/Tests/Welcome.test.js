import React from "react";
import {
  act,
  render,
  wait,
  fireEvent,
  screen
} from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Welcome from "../Welcome/Welcome"
import '@testing-library/jest-dom/extend-expect'

describe("Welcome", () => {
  it("loads the page content", () => {
    render(
      <BrowserRouter>
        <Welcome/>
      </BrowserRouter>
    );

    // is this test even necessary? we know that if we can render the page that this should be here?
    expect(screen.getByText("Decentralised finance investing made easy!")).toBeInTheDocument();
  })
  

  // it("routes to the wallet dashboard when the connect wallet button is clicked")


  // it("alerts that you do not have a Metamask account if it is not installed")
})