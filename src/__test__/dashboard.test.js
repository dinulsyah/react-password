import React from "react";
import Dashboard from "../components/Dashboard";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

afterEach(cleanup)

describe('Dashboard Testing', () => {
    it('should rendered correctly', async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <BrowserRouter>
            <Provider store={store}>
                <Dashboard email={'tara@mail.com'} />
            </Provider>
            </BrowserRouter>
        );
        expect(getByTestId("title")).toHaveTextContent("My Password List");
    })
})
