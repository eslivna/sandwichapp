export class Product {
  private _id: string;
  private _name: string;
  private _ingredients = new Array<string>();
  private _category: string;
  private _price: number;

  constructor(
    name: string,
    ingredients: [string],
    price: number,
    category: string
  ) {
    this._name = name;
    this._ingredients = ingredients;
    this._price = price;
    this._category = category;
  }

  static fromJSON(json: any): Product {
    const prod = new Product(
      json.name,
      json.ingredients,
      json.price,
      json.category
    );
    prod._id = json._id;
    return prod;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this._name,
      ingredients: this._ingredients,
      category: this._category,
      price: this._price
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get ingredients(): string[] {
    return this._ingredients;
  }

  set ingredients(ingredients: string[]) {
    this._ingredients = ingredients;
  }

  get category(): string {
    return this._category;
  }

  set category(category: string) {
    this._category = category;
  }

  addIngredient(name: string) {
    this._ingredients.push(name);
  }
}
