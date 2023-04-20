import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

//  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

dotenv.config()

const router = express.Router()
console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL.E ROUTES' })
})

router.route('/').post(async (req, res) => {
    try {

        const { prompt } = req.body
        console.log('prompt', prompt)

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })

        const image = response.data.data[0].b64_json
        console.log('image', image)

        res.status(200).json({ photo: image })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something went wrong' })
    }
})

export default router