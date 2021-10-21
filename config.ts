export class Configurations {
    public static get port() {
        return 3000 || process.env.port;
    }
}