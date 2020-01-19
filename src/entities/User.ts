import { IsEmail} from "class-validator ";
import { BaseEntity, Column, Entity,  PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { copyFile } from "fs";

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text", unique: true})
    @IsEmail
    email: string;

    @Column({type: "boolean", default:false})
    verifiedEamil:boolean;

    @Column({type:"text"})
    firstName: string;

    @Column({type:"text"})
    lastName: string;

    @Column({type:"int"})
    age: number;

    @Column({type:"text"})
    password: string;

    @Column({type:"text"})
    phoneNumber: string;

    @Column({type:"boolean", default:false})
    verifiedPhoneNumber: string;

    @Column({type:"text"})
    profilePhoto: string;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default User;