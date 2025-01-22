import { FilterQuery, Query } from "mongoose";
import { SortOrder } from "../interface/interface";

class QueryClass<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // method Scarch
  search(searchAbleField: string[]) {
    const scarchText = this.query?.search || "";
    if (scarchText) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleField.map((field) => {
          return field === "amenities"
            ? { [field]: { $elemMatch: { $regex: scarchText, $options: "i" } } }
            : { [field]: { $regex: scarchText, $options: "i" } };
        }),
      });
    }
    return this;
  }

  // method Filter
  filter(exCludeFields: string[]) {
    const queryObj = { ...this.query };
    exCludeFields.forEach((field) => delete queryObj[field]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // method limited or pagination
  paginate() {
    const page = parseInt(this.query?.page as string) || 1;
    const limit = parseInt(this.query?.limit as string) || 10;
    const skip = (page - 1) * limit || 0;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // method Sorting
  sort() {
    const query = parseInt(this.query?.sort as string) || 1;
    const sort = {
      pricePerSlot: query as SortOrder,
    };

    if (sort) {
      this.modelQuery = this.modelQuery.sort(sort);
    }

    return this;
  }

  field() {
    const field =
      (this.query?.field as string)?.split(",")?.join(" ") || "-__V";
    this.modelQuery = this.modelQuery.select(field);

    return this;
  }
}

export default QueryClass;
