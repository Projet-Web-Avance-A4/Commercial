import jwt, { JwtPayload } from 'jsonwebtoken';

export const decodeAccessToken = (accessToken: string | null) => {
    if (accessToken) {
        const decodedToken = jwt.decode(accessToken);
        if (decodedToken && typeof decodedToken !== 'string') {
            const data: JwtPayload = decodedToken;
            const userData = {
                name: data.name ?? '',
                surname: data.surname ?? '',
                street: data.street ?? '',
                city: data.city ?? '',
                postal_code: data.postal_code ?? '',
                phone: data.phone ?? '',
                mail: data.mail ?? '',
                role: data.role ?? '',
                code_referral: data.code_referral ?? '',
            };
            return userData;
        }
    }
    return null;
};