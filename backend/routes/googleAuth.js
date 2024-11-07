import { configDotenv } from "dotenv"
configDotenv();
import express from "express"
import {OAuth2Client} from "google-auth-library"
import userModel from "../models/user.js"
import jwt from "jsonwebtoken"
const authRouter = express.Router()

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

async function getUserInfo(accessToken){
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

authRouter.post("/api/google", async (req,res) => {
    try{
        const authorizeUrl = await oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile email',
            prompt: 'consent'
        })

        res.json({redirectURI: authorizeUrl})
        
    }catch(err){
        console.error(err.message)
        throw new Error(err.message)
    }
})

authRouter.get("/google/oauth", async (req,res) => {
    
    const { code } = req.query
    try {
        const { tokens } = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials(tokens)
        const {name,email,picture} = await getUserInfo(tokens.access_token)
        const userExists = await userModel.findOne({email})
        const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN,{expiresIn: "1h"})
        if(!userExists){
            const newUser = new userModel({
                name: name,
                email: email,
                provider: "google"
            })
            const refreshToken = jwt.sign({email: email},process.env.REFRESH_TOKEN,{expiresIn: "30d"})
            newUser.token = refreshToken
            await newUser.save()
        }
        res.redirect(`${process.env.FRONTEND_REDIRECT_URL}/home?token=${accessToken}&email=${email}`)
    } catch (error) {
        console.error('Error during Google Auth:', error)
        res.redirect(`${process.env.FRONTEND_REDIRECT_URL}/google/oauth?status=failed`)
    }

})

export default authRouter