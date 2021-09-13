export class carDetails {
    constructor(
    public id:number = 0,
    public manufacturer:string = "",
    public model:string = "",
    public year:number = 0,
    public odometer:number = 0,
    public type:string = "",
    public price:number = 0,
    public transmission:string = "",
    public color:string = "",
    public fuel:string = "",
    public address:string = "",
    public city:string = "",
    public imageUrl:string = ""
    ) {}
  }

  export class carFilter {
    constructor(
    public manufacturer:string[] = [] as string[],
    public type:string[] = [] as string[]
    ) {}
  }

