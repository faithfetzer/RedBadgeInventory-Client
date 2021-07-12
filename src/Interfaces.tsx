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
    id: number| null,
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
    location: string,
    totalQuantity : number,
    quantityListed : number | undefined,
    quantitySold: number,
    userId: number | undefined,
    locationId: number | null,
    user: {id: number | undefined,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        admin: boolean | null,
        role: string}
}

export interface LocationInfo {
    id: number | null,
    name: string,
    url: string,
    address: string,
    notes: string,
    userId: number | undefined
}