import { render, screen, fireEvent, waitFor, act, within } from "@testing-library/react";

import { AuthProvider } from "contexts/AuthContext";

import { useRouter } from "next/router";

import SignIn from "../../pages/index";

import { api } from "services/apiClient";
import MockAdapter from "axios-mock-adapter";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("broadcast-channel");

const mock = new MockAdapter(api);

describe("SignIn page", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    );
  });

  it("should display matching error when email is invalid", async () => {
    fireEvent.input(screen.getByRole("textbox"), {
      target: {
        value: "test",
      },
    });

    fireEvent.input(screen.getByLabelText("Senha"), {
      target: {
        value: "password",
      },
    });

    const logIn = screen.getByRole("button", {
      name: "Entrar",
    });

    fireEvent.click(logIn);

    expect(screen.getByRole<HTMLInputElement>("textbox").value).toBe("test");
    expect(screen.getByLabelText<HTMLInputElement>("Senha").value).toBe(
      "password"
    );

    await waitFor(() => expect(screen.getByText("E-mail inválido")));
  });

  it("should redirect the user to the dashboard page when signing In", async () => {
    const useRouterMocked = jest.mocked(useRouter, { shallow: false });
    const pushMock = jest.fn();

    mock.onPost("/sessions").reply(200, {
      token: "fake-token",
      refresh_token: "fake-refresh-token",
      user: {
        id: "fake-id",
        name: "Joseph",
        isAdmin: true,
      },
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    fireEvent.input(screen.getByRole("textbox"), {
      target: {
        value: "test@email.com",
      },
    });

    fireEvent.input(screen.getByLabelText("Senha"), {
      target: {
        value: "password",
      },
    });

    const logIn = screen.getByRole("button", {
      name: "Entrar",
    });

    fireEvent.click(logIn);

    expect(screen.getByRole<HTMLInputElement>("textbox").value).toBe(
      "test@email.com"
    );

    expect(screen.getByLabelText<HTMLInputElement>("Senha").value).toBe(
      "password"
    );

    await waitFor(() => expect(useRouterMocked().push).toHaveBeenCalled());
  });

  it('should render a toast when an error occurs', async () => {
    mock.onPost('/sessions').reply(400, {
      message: 'Ops! Ocorreu um erro, tente novamente mais tarde.'
    })

    fireEvent.input(screen.getByRole('textbox'), {
      target: {
        value: 'test@email.com'
      }
    })

    fireEvent.input(screen.getByLabelText('Senha'), {
      target: {
        value: 'password'
      }
    })

    const logIn = screen.getByRole('button', {
      name: 'Entrar'
    })

    act(() => {
      fireEvent.click(logIn)
    })

    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe(
      'test@email.com'
    )

    expect(screen.getByLabelText<HTMLInputElement>('Senha').value).toBe(
      'password'
    )

    const listitem = screen.getByRole('listitem')

    await waitFor(() => expect(within(listitem).getByRole('alert')))
  })
});
