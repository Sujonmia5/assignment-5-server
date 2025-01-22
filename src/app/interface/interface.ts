export type TSource = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  source: TSource;
};

export type SortOrder = 1 | -1 | "asc" | "desc"; // For MongoDB-like sort
