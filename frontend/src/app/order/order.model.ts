export class Order {
  private _id: string;
  private _user: string;
  private _productName: string;
  private _price: number;
  private _orderDate: Date = new Date();
  private _created: Date;

  constructor(
    productName: string,
    price: number,
    user: string,
    orderDate: Date,
    created: Date = null
  ) {
    this._productName = productName;
    this._user = user;
    this._price = price;
    this._orderDate = orderDate;
    this._created = created ? created : new Date();
  }
  static fromJSON(json: any): Order {
    const order = new Order(
      json.productName,
      json.price,
      json.user,
      json.orderDate,
      json.created
    );
    order._id = json._id;
    return order;
  }

  toJSON() {
    return {
      _id: this._id,
      user: this._user,
      productName: this._productName,
      price: this._price,
      orderDate: this._orderDate,
      created: this._created
    };
  }

  get id(): string {
    return this._id;
  }

  get productName(): string {
    return this._productName;
  }
  get price(): number {
    return this._price;
  }
  get orderDate(): Date {
    return this._orderDate;
  }
  get created(): Date {
    return this._created;
  }

  get user(): string {
    return this._user;
  }
}
