import 'dotenv/config'
import axios from 'axios'

export const sendRequest = (apiKey) => ({
  data,
  url 
}) => {
  try {
    return axios({
      method: 'post',
      url,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      data
    }) 
  } catch (error) {
    throw new Error(error)
  }
}

export const completions = (apiKey) => async (data) => {
  const url = 'https://api.openai.com/v1/completions'
  const results = await sendRequest(apiKey)({
    url,
    data
  })

  return results
}

export const edits = (apiKey) => async (data) => {
  const url = 'https://api.openai.com/v1/edits'

  if (!data.instruction) {
    throw new Error('No instruction given.')
  }

  console.log(url, data)

  const results = await sendRequest(apiKey)({
    url,
    data
  })

  return results
}