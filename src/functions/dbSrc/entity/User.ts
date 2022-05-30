import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column({ unique: true })
    phone_no: string
}

export interface IUser {
    id?: string;
    phoneNumber?: string;
}