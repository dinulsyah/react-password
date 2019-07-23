import React from "react";
import Detail from "../components/Detail";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

afterEach(cleanup)

describe('Detail Testing', () => {
    it("should render correctly with correct value", async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <BrowserRouter>
            <Provider store={store}>
                <Detail match={{ params: { id: 1 } }}/>
            </Provider>
            </BrowserRouter>
        );

        await wait(() => {
            expect(getByTestId("edit")).toHaveTextContent("Edit");
            expect(getByTestId("delete")).toHaveTextContent("Delete");
            expect(getByTestId("url")).toHaveTextContent("Url:");

            const edit = getByTestId("edit");
            fireEvent.click(edit);
            expect(getByTestId("url").innerHTML).toBe("Url:<b>github.com</b>");
        });
    })

    it("should render no such document", async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <BrowserRouter>
            <Provider store={store}>
                <Detail match={{ params: { id: 1 } }} history={[]}/>
            </Provider>
            </BrowserRouter>
        );
        const deleting = getByTestId("delete");
        fireEvent.click(deleting);
    })
})