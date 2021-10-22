export class Configurations {
    public static get port() {
        return 3000 || process.env.port;
    }
    public static get smtpConnections(): {} {
        const smtpConnections = {
            'host': 'smtp.gmail.com',
            'port': 587,
            auth: {
                user: '[USERNAME]',
                pass: '[PASSWORD]'
            }
        }
        return smtpConnections
    }
}