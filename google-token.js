{\rtf1\ansi\ansicpg1250\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // api/google-token.js\
import \{ google \} from "googleapis";\
\
export default async function handler(req, res) \{\
  try \{\
    const serviceAccount = \{\
      type: "service_account",\
      project_id: process.env.GOOGLE_PROJECT_ID,\
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,\
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\\\n/g, '\\n'),\
      client_email: process.env.GOOGLE_CLIENT_EMAIL,\
      client_id: process.env.GOOGLE_CLIENT_ID,\
      auth_uri: "https://accounts.google.com/o/oauth2/auth",\
      token_uri: "https://oauth2.googleapis.com/token",\
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",\
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL\
    \};\
\
    const jwtClient = new google.auth.JWT(\{\
      email: serviceAccount.client_email,\
      key: serviceAccount.private_key,\
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]\
    \});\
\
    const token = await jwtClient.authorize();\
\
    res.status(200).json(\{\
      success: true,\
      access_token: token.access_token,\
      expires_in: token.expiry_date\
    \});\
  \} catch (err) \{\
    console.error("Error generating token:", err);\
    res.status(500).json(\{ success: false, error: err.message \});\
  \}\
\}\
}