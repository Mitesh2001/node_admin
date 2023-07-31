import { Column, JoinColumn, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: "role_id" })
    role: Role
}