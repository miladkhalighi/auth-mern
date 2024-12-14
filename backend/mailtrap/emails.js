import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email,verificationCode) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : 'Verify your email !',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',verificationCode),
            category : "Email Verification"

        })
    } catch (error) {
        throw new Error(`sending verification email failed: ${error.message}`)
    }
}

export const sendWelcomeEmail = async(email,name) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            template_uuid: process.env.MAILTRAP_WELCOME_UUID,
            template_variables: {
              "company_info_name": "Company Name",
              "name": name
            },

        })
    } catch (error) {
        throw new Error(`sending verification email failed: ${error.message}`)
    }
}

export const sendResetPasswordEmail = async(email,token) => {
    const recipient = [{email}]
    const resetURL = `${process.env.CLIENT_URL}/forgot-password/${token}`
    console.log(resetURL);
    
    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject : 'Reset your Password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetURL),
            category : "Reset Password"

        })
        
    } catch (error) {
        throw new Error(`sending reset password email failed: ${error.message}`)
    }
}

export const sendUpdatePasswordSuccessEmail = async (email) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            subject : 'Password Updated Successfully'

        })
    } catch (error) {
        throw new Error(`sending update password email failed: ${error.message}`)
    }
}
