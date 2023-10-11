import crypto from 'crypto';

const hashPassword = (password: string) => {
    const sha1Hash = crypto.createHash("sha1");
    sha1Hash.update(password);
    const hashedPass = sha1Hash.digest("hex");
    return hashedPass
};

export default hashPassword;