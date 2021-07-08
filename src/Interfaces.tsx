export interface UserInfo {
    id: number | undefined,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    admin: boolean | null,
    role: string,
}

export interface ItemInfo {
    id: number | undefined,
    maker_id : number | undefined,
    name : string,
    description : string,
    volume: number | undefined,
    volumeUnit: string,
    weight: number | undefined,
    weightUnit: string,
    height: number | undefined,
    width: number | undefined,
    depth: number | undefined,
    lengthUnit : string,
    category: string,
    available : boolean,
    price :  number | undefined,
    totalQuantity : number,
    location_id : number | undefined,
    quantityListed : number | undefined,
    quantitySold: number
}

export interface LocationInfo {
    id: number | undefined,
    maker_id: number | undefined,
    name: string,
    url: string,
    address: string,
    notes: string
}