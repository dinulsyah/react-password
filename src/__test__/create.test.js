import React from "react";
import Create from "../components/Create";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup)

describe('Create Testing', () => {
    it("should get the input value", async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
          <Provider store={store}>
            <Create />
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
            <Create />
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
            <Create />
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

      it("creating new password success", async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
          <Provider store={store}>
            <Create />
          </Provider>
        );
        expect(getByTestId("testaja")).toBeInTheDocument();
        const inputPassword = "Abc123!";
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
          expect(queryByTestId("lower")).not.toBeInTheDocument();
          expect(queryByTestId("upper")).not.toBeInTheDocument();
          expect(queryByTestId("length")).not.toBeInTheDocument();
          expect(queryByTestId("number")).not.toBeInTheDocument();
          expect(queryByTestId("symbol")).not.toBeInTheDocument();
        });
    })

    it("creating new password failed", async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
          <Provider store={store}>
            <Create />
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
            expect(url.value).toBe("");
            expect(username.value).toBe("");
            expect(password.value).toBe("");
        });
    })
})