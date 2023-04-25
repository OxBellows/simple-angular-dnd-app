export interface Race {
    name: string,
    slug: string,
    desc: string,
    asi_desc: string,
    asi: Array<any>, // TODO: replace with Array<ASI>
    age: string,
    alignment: string,
    size: string,
    speed: any, // TODO: replace with SpeedType
    speed_desc: string,
    languages: string,
    vision: string,
    traits: string,
    subraces: Array<any>, // replace with Array<Subrace>
    document__slug: string,
    document__title: string,
    document__license_url: string
}