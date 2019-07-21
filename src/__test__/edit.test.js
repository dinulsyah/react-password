import React from "react";
import Edit from "../components/Edit";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup)

describe('Edit Testing', () => {
    it("should get the input value", async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <Provider store={store}>
                <Edit match={{ params: { id: '0qWQuMPhrlojlhJcd3FP' } }} />
            </Provider>
        );
        expect(getByTestId("testaja")).toHaveTextContent("Submit");
        const inputPassword = "Abc123!";
        const password = getByTestId("password");
        const inputUrl = "https://github.com";
        const url = getByTestId("url");
        const inputUsername = "amiibo";
        const username = getByTestId("username");

        fireEvent.change(password, { target: { value: inputPassword } });

        fireEvent.change(url, { target: { value: inputUrl } });

        fireEvent.change(username, { target: { value: inputUsername } });

        expect(url.value).toBe("https://github.com");
        expect(username.value).toBe("amiibo");
        expect(password.value).toBe("Abc123!");
    })

    it("should not get symbol, uppercase and minimum length in the document", () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <Provider store={store}>
                <Edit match={{ params: { id: '0qWQuMPhrlojlhJcd3FP' } }} />
            </Provider>
        );

        const inputPassword2 = "123ab";
        const password2 = getByTestId("password");
        fireEvent.change(password2, { target: { value: inputPassword2 } });

        expect(password2.value).toBe("123ab");

        expect(getByTestId("special").className).toBe("fade alert-custom alert alert-danger show")
        expect(getByTestId("lower").className).toBe('fade alert-custom alert alert-success show')
        expect(getByTestId("upper").className).toBe('fade alert-custom alert alert-danger show');
        expect(getByTestId("length").className).toBe('fade alert-custom alert alert-danger show');
        expect(getByTestId("number").className).toBe('fade alert-custom alert alert-success show');
    })


    it("should not get lower and number in the document", () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <Provider store={store}>
                <Edit match={{ params: { id: '0qWQuMPhrlojlhJcd3FP' } }} />
            </Provider>
        );

        const inputPassword3 = "ABC!@W";
        const password3 = getByTestId("password");
        fireEvent.change(password3, { target: { value: inputPassword3 } });

        expect(password3.value).toBe("ABC!@W");

        expect(getByTestId("special").className).toBe("fade alert-custom alert alert-success show")
        expect(getByTestId("lower").className).toBe('fade alert-custom alert alert-danger show')
        expect(getByTestId("upper").className).toBe('fade alert-custom alert alert-success show');
        expect(getByTestId("length").className).toBe('fade alert-custom alert alert-success show');
        expect(getByTestId("number").className).toBe('fade alert-custom alert alert-danger show');
    })

    it("editing new password success", async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <Provider store={store}>
                <Edit match={{ params: { id: '0qWQuMPhrlojlhJcd3FP' } }} />
            </Provider>
        );

        await wait(() => {
            expect(getByTestId("testaja")).toBeInTheDocument();
            // const inputPassword4 = "Abc123!";
            // const password4 = getByTestId("password");
            // const inputUrl4 = "https://github.com";
            // const url4 = getByTestId("url");
            // const inputUsername4 = "amiibo";
            // const username4 = getByTestId("username");
    
            // fireEvent.change(password4, { target: { value: inputPassword4 } });
            // fireEvent.change(url4, { target: { value: inputUrl4 } });
            // fireEvent.change(username4, { target: { value: inputUsername4 } });
    
            // const create = getByTestId("testaja");
            // fireEvent.click(create);
        })
    })

    it("editing new password failed", async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <Provider store={store}>
                <Edit match={{ params: { id: '0qWQuMPhrlojlhJcd3FP' } }} />
            </Provider>
        );

        expect(getByTestId("testaja")).toBeInTheDocument();
        const inputPassword = "Abc123";
        const password = getByTestId("password");
        const inputUrl = "https://github.com";
        const url = getByTestId("url");
        const inputUsername = "amiibo";
        const username = getByTestId("username");

        fireEvent.change(password, { target: { value: inputPassword } });
        fireEvent.change(url, { target: { value: inputUrl } });
        fireEvent.change(username, { target: { value: inputUsername } });

        const create = getByTestId("testaja");
        fireEvent.click(create);

        await wait(() => {
            expect(url.value).toBe("https://github.com");
            expect(username.value).toBe("amiibo");
            expect(password.value).toBe("Abc123");
        });
    })
})