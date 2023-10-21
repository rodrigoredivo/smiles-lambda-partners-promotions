export default class Promotion {
    constructor(
      public id: string,
      public name: string,
      public startDate: Date,
      public endDate: Date,
      public type: string,
    ) {}
}
