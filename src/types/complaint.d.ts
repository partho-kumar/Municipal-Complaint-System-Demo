import { IUserDetails } from "./user";

export interface IComplaint {
    _id: string;
    category: string;
    userId: string | IUserDetails;
    status: string;
    createdAt: string;
    description: string;
    location: string;
    imageUrl?: string;
}
