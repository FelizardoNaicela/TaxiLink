export interface Rating {
  id: number;
  value: number;
  userId: number;
}

export interface Favorite {
  id: number;
  userId: number;
  groupId: number;
}

export interface Group {
 id: number;
 name: string;
 description: string;
 onlineDrivers: number;
 region: string;
 price: number;
 ownerId: number;
 type: string;
 ratings: Rating[];
 province: string;
 district: string;
 favorites: Favorite[];
}