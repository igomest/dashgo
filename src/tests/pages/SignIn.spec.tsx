import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider } from "contexts/AuthContext";
import { useRouter } from "next/router";
import SignIn from "../../pages/index";

jest.mock('next/router')
jest.mock('broadcast-channel')

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

  it('should redirect the user to the dashboard page when signing In', async () => {
    const useRouterMocked = jest.mocked(useRouter)
    const pushMock = jest.fn()

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

    useRouterMocked.mockImplementationOnce(() => ({ push: pushMock } as any))

    fireEvent.click(logIn)

    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe(
      'test@email.com'
    )
    expect(screen.getByLabelText<HTMLInputElement>('Senha').value).toBe(
      'password'
    )

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/dashboard'))
  })
});
