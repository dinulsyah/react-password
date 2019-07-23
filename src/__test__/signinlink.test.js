import React from "react";
import SignLink from "../components/layout/SignInLink";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

afterEach(cleanup)

describe('Sign in Link Test', () => {
    it("Test When User Click Logout", () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
           <SignLink/>
          </Provider>
        </BrowserRouter>
        );
        expect(queryByTestId("logout")).toBeInTheDocument();
        const logout = getByTestId("logout");
        fireEvent.click(logout);
    })
})