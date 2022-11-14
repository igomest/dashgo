import { render, screen, fireEvent } from '@testing-library/react'
import SignIn from '../../pages/index'

describe('SignIn page', () => {
  beforeEach(() => {
    render(<SignIn />)
  })

  it('should display matching error when email is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox'), {
      target: {
        value: 'test'
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

    fireEvent.click(logIn)

    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe('test')
    expect(screen.getByLabelText<HTMLInputElement>('Senha').value).toBe(
      'password'
    )
    expect(screen.getByText('E-mail inválido'))
  })

  // it('should display min length error when password is invalid', async () => {
  //   fireEvent.input(screen.getByRole('textbox'), {
  //     target: {
  //       value: 'test@email.com'
  //     }
  //   })

  //   fireEvent.input(screen.getByPlaceholderText('Senha'), {
  //     target: {
  //       value: 'pass'
  //     }
  //   })

  //   const logIn = screen.getByRole('button', {
  //     name: 'Entrar'
  //   })

  //   userEvent.click(logIn)

  //   expect(screen.getByRole('textbox', { name: /email/i }).value).toBe(
  //     'test@mail.com'
  //   )
  // })
})
