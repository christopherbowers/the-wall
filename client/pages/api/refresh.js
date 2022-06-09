import cookie from 'cookie'
import { BASE_URL } from '../../globals'

export default async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '')
    const refresh = cookies.refresh ?? false

    if (refresh === false) {
      return res.status(401).json({
        error: 'User unauthorized to make this request',
      })
    }

    const body = JSON.stringify({
      refresh: refresh
    })

    console.log(body)

    try {
      const apiRes = await axios.post(`${BASE_URL}/token/refresh/`, body, {
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      )

      const data = await apiRes.data

      if (apiRes.status === 200) {
        console.log(data)
        res.setHeader('Set-Cookie', [
          cookie.serialize('access', data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 30,
            sameSite: 'strict',
            path: '/api/',
          }),
          // cookie.serialize('refresh', data.refresh, {
          //   httpOnly: true,
          //   secure: process.env.NODE_ENV !== 'development',
          //   maxAge: 60 * 60 * 24,
          //   sameSite: 'strict',
          //   path: '/api/',
          // }),
        ])

        return res.status(200).json(data)
      } else {
        return res.status(apiRes.status).json({
          error: 'Failed to fulfill refresh request',
        })
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Something went wrong when trying to fulfill refresh request',
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
