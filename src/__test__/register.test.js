import React from "react";
import Register from "../components/Register";
import store from "../store";
import { Provider } from "react-redux";
import { render, wait, fireEvent, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup)

describe('Register Testing', () => {
    it('User Success Register', async () => {
        const { container, getByText, debug, getByTestId, queryByTestId } = render(
            <Provider store={store}>
              <Register history={[]}/>
            </Provider>
          );
          expect(getByTestId("testaja")).toHaveTextContent("Submit");

          const inputUsername = "tamvan123";
          const username = getByTestId("username");

          const inputEmail = "tamvan@gmail.com";
          const email = getByTestId("email");
  
          const inputPassword = "tamvan123";
          const password = getByTestId("password");
  
          fireEvent.change(email, { target: { value: inputEmail } });
          fireEvent.change(password, { target: { value: inputPassword } });
          fireEvent.change(username, { target: { value: inputUsername } });
  
          const login = getByTestId("testaja");
          fireEvent.click(login);
  
          await wait(() => {
              expect(queryByTestId("email")).toBeInTheDocument();
              expect(queryByTestId("password")).toBeInTheDocument();
              expect(queryByTestId("username")).toBeInTheDocument();
          })
    })

    it('User Success Register', async () => {
      const { container, getByText, debug, getByTestId, queryByTestId } = render(
          <Provider store={store}>
            <Register history={[]}/>
          </Provider>
        );
        expect(getByTestId("testaja")).toHaveTextContent("Submit");

        const inputUsername = "tamvan123";
        const username = getByTestId("username");

        const inputEmail = "existinguser@mail.com";
        const email = getByTestId("email");

        const inputPassword = "tamvan123";
        const password = getByTestId("password");

        fireEvent.change(email, { target: { value: inputEmail } });
        fireEvent.change(password, { target: { value: inputPassword } });
        fireEvent.change(username, { target: { value: inputUsername } });

        const login = getByTestId("testaja");
        fireEvent.click(login);

        await wait(() => {
            expect(queryByTestId("email")).toBeInTheDocument();
            expect(queryByTestId("password")).toBeInTheDocument();
            expect(queryByTestId("username")).toBeInTheDocument();
        })
  })
})