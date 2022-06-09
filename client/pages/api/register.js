import axios from 'axios'
import { BASE_URL } from '../../globals'

export default async (req, res) => {
  if (req.method === 'POST') {
    const body = req.body

    try {
      const apiRes = await axios.post(`${BASE_URL}/user/register/`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (apiRes.status === 201) {
        return res.status(201).json({ success: apiRes.success })
      } else {
        return res.status(apiRes.status).json({
          error: apiRes.error,
        })
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Something went wrong when registering for an account',
      })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
