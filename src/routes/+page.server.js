import { OPENAI_API_KEY } from '$env/static/private'

export const load = async () => {
  return {
    key: OPENAI_API_KEY 
  }
}
