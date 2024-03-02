
export interface ILimitItem {
  label: string,
  price: number,
}
export interface IPackageItem {
  packageId: number,
  packageName: string,
  price: number,
  packageDescription: string,
  categoryId: number,
  limitDetails: ILimitItem[]
}
export interface IPackageData {
  packages: IPackageItem[],
}
