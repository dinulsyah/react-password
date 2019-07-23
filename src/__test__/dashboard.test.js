import React from "react";
import Dashboard from "../components/Dashboard";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

afterEach(cleanup)

describe('Dashboard Testing', () => {
    it('when user is logged in', async () => {
        let value = {
            isLogin: true,
            email:'dinulsyah@gmail.com',
            passwords:{
                alldata:[
                    {
                        url:'github.com',
                        username:'tamvan',
                        password:'12345',
                        createdAt:'12-08-2018',
                        updatedAt:'12-08-2018',
                    },
                    {
                        url:'github.com',
                        username:'tamvan',
                        password:'12345',
                        createdAt:'12-08-2018',
                        updatedAt:'12-08-2018',
                    },
                    {
                        url:'github.com',
                        username:'tamvan',
                        password:'12345',
                        createdAt:'12-08-2018',
                        updatedAt:'12-08-2018',
                    }
                ]
            }
        }
        const mockStore = (state = value) => configureMockStore([thunk])(state);
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <BrowserRouter>
            <Provider store={mockStore()} >
                <Dashboard history={[]}/>
            </Provider>
            </BrowserRouter>
        );
        const inputUrl = "https://github.com";
        const url = getByTestId("searchurl");
        fireEvent.change(url, { target: { value: inputUrl } });
        expect(url.value).toBe("https://github.com");
        expect(getByTestId("title")).toHaveTextContent("My Password List");
    })

    it('when user is not logged in', async () => {
        let value = {
            isLogin: false,
            email:'dinulsyah@gmail.com',
            passwords:{
                alldata:[
                    {
                        url:'github.com',
                        username:'tamvan',
                        password:'12345',
                        createdAt:'12-08-2018',
                        updatedAt:'12-08-2018',
                    },
                    {
                        url:'github.com',
                        username:'tamvan',
                        password:'12345',
                        createdAt:'12-08-2018',
                        updatedAt:'12-08-2018',
                    },
                    {
                        url:'github.com',
                        username:'tamvan',
                        password:'12345',
                        createdAt:'12-08-2018',
                        updatedAt:'12-08-2018',
                    }
                ]
            }
        }
        const mockStore = (state = value) => configureMockStore([thunk])(state);
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <BrowserRouter>
            <Provider store={mockStore()}>
                <Dashboard history={[]}/>
            </Provider>
            </BrowserRouter>
        );
        const inputUrl = "https://github.com";
        const url = getByTestId("searchurl");
        fireEvent.change(url, { target: { value: inputUrl } });
        expect(url.value).toBe("https://github.com");
        expect(getByTestId("title")).toHaveTextContent("My Password List");
    })
})
