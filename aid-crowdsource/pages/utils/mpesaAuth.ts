import fetch from 'node-fetch';

type AuthData = {
    access_token: string,
    expires_in: string
}

const auth = async () => {
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const base64 = Buffer.from(`${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`).toString('base64');
    const headers = {
        Authorization: `Basic ${base64}`
    };
    const response = await fetch(url, { headers });
    if (response.status === 200) {
        const data = await response.json() as AuthData;
        return data.access_token
    } else if (response.status === 400) {
        throw new Error(response.statusText);
    } else {
        throw new Error('Mpesa auth service is unreachable');
    }   
}

export default auth;