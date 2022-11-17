import axios, { AxiosError } from 'axios'

import { parseCookies, setCookie } from 'nookies'

import { signOut } from '../contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

type AxiosErrorResponse = {
  code?: string
}

let isRefreshing = false
let failedRequestQueue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'https://vindicceapp.fly.dev',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'Invalid token!!!') {
          cookies = parseCookies(ctx)

          const { 'nextauth.refresh_token': refresh_token } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/refresh-token', {
                refresh_token
              })
              .then((response) => {
                const { token } = response.data

                setCookie(ctx, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // (30 days)
                  path: '/'
                })

                setCookie(
                  ctx,
                  'nextauth.refresh_token',
                  response.data.refresh_token,
                  {
                    maxAge: 60 * 60 * 24 * 30, // (30 days)
                    path: '/'
                  }
                )

                api.defaults.headers['Authorization'] = `Bearer ${token}`

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                )
                failedRequestQueue = []
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err))
                failedRequestQueue = []

                if (typeof window !== 'undefined') {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              }
            })
          })
        } else {
          if (typeof window !== 'undefined') {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
