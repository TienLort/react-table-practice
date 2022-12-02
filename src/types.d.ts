export interface IUser {
    id:string
    avatar: string
    name: string
    age: number
    birthday: Date
}
export interface IGetUser {
    data: IUser[]
    total: number
    page:number
    limit:number
}
