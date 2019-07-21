import React from "react";
import Nopage from "../components/NoPage";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

afterEach(cleanup)

describe('No Page Test', () => {
    it("Nopage render successfully", () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <Nopage />
          </Provider>
        </BrowserRouter>
        );
        expect(getByTestId("nopage")).toBeInTheDocument();
    })
})