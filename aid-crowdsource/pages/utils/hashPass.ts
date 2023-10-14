import crypto from 'crypto';

class hashPassword {
    hashPassword(password: string) {
        const sha1Hash = crypto.createHash("sha1");
        sha1Hash.update(password);
        const hashedPass = sha1Hash.digest("hex");
        return hashedPass;
    }

    compare(password: string, hashedPassword: string) {
        const sha1Hash = crypto.createHash("sha1");
        sha1Hash.update(password);
        const hashedPass = sha1Hash.digest("hex");
        return hashedPass === hashedPassword;
    }
}

const hashPass = new hashPassword();

export default hashPass;