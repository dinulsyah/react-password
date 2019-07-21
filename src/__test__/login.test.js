import React from "react";
import Login from "../components/Login";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Enzyme , { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup)

describe('Login Testing', () => {
    it('should get the input value', async () => {
        // const wrapper = mount(
        //     <Provider store={store}>
        //         <Login />
        //     </Provider>
        // );
        // expect(wrapper.state().email).toBe(undefined);

        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <Provider store={store}>
                <Login/>
            </Provider>
        );

        expect(getByTestId("testaja")).toHaveTextContent("Submit");

        const inputEmail = "dinulsyah@gmail.com";
        const email = getByTestId("email");

        const inputPassword = "dinulsyah";
        const password = getByTestId("password");

        fireEvent.change(email, { target: { value: inputEmail } });
        
        fireEvent.change(password, { target: { value: inputPassword } });

        const login = getByTestId("testaja");
        fireEvent.click(login);

        await wait(() => {
            expect(queryByTestId("email")).toBeInTheDocument();
            expect(queryByTestId("password")).toBeInTheDocument();
        })

    })
})