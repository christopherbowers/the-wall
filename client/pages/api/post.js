import axios from 'axios'
import cookie from 'cookie'
import { BASE_URL } from '../../globals'

export default async (req, res) => {
  if (req.method === 'POST') {
    const cookies = cookie.parse(req.headers.cookie ?? '')
    const access = cookies.access ?? false

    const body = req.body

    if (access === false) {
      return res.status(401).json({
        error: 'User unauthorized to make this request',
      })
    }

    try {
      const apiRes = await axios.post(`${BASE_URL}/posts/create/`,
        body, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${access}`,
        }
      })
      const data = await apiRes.data

      if (apiRes.status === 200) {
        return res.status(200).json({
          user: data.user,
        })
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        })
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Something went wrong when retrieving user',
      })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    })
  }
}
