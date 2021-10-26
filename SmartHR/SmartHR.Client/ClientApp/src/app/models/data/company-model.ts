export class CompanyModel {
  constructor(
    public companyId?:number,
    public companyName?:string,
    public companySlogan?:string,
    public companyEstablishYear?:number,
    public companyAddress?:string,
    public companyPhone?:string,
    public companyMail?:string,
    public companyWebUrl?:string,
    public accessKey?:string
  ){}
}
