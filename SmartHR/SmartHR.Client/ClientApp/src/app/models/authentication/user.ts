

export class User {
  constructor(
    public userName?: string,
    public accessToken?: string,
    public refreshToken?: string,
    public expires?: string,
    public role?: string[]
  ) { }
}
