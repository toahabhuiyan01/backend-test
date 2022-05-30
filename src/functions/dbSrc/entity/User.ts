import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column({ unique: true })
    phoneNo: string
}

export interface IUser {
    id?: string;
    phoneNumber?: string;
}