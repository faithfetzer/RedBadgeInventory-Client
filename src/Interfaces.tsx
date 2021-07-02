export interface UserInfo {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    admin: boolean,
    role: string,
}

export interface ItemInfo {
    maker_id : number,
    name : string,
    description : string,
    volume: number,
    volumeUnit: string,
    weight: number,
    weightUnit: string,
    height: number,
    width: number,
    depth: number,
    lengthUnit : string,
    category: string,
    available : boolean,
    price :  number,
    totalQuantity : number,
    location_id : number,
    quantityListed : number,
    quantitySold: number
}

export interface LocationInfo {
    maker_id: number,
    name: string,
    url: string,
    address: string,
    notes: string
}