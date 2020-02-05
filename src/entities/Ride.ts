import { BaseEntity, Column, CreateDateColumn,  Entity, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { rideStatus } from "src/types/types";
import User from "./User";

@Entity()
class Ride extends BaseEntity{
    @PrimaryGeneratedColumn() id: number 
    @Column({type: "text", enum: ["ACCEPTED" , "FINISHED" , "CANCELED", "REQUESTING" , "ONROUTE"]})
    status: rideStatus;
    @Column({type: "text"})
    pickUpAddress: string;
    @Column({ type: "double precision", default: 0 })
    pickUpLat: number;
    @Column({ type: "double precision", default: 0 })
    pickUpLon: number;
    @Column({type: "text"})
    dropOffAddress: string;
    @Column({ type: "double precision", default: 0 })
    dropOffLat: number;
    @Column({ type: "double precision", default: 0 })
    dropOffLon: number;
    @Column({ type: "double precision", default: 0 })
    price: number;
    @Column({type: "text"})
    distance: string;
    @Column({type: "text"})
    duration: string;
    @ManyToOne( type => User, user => user.rideAsPassenger)
    passenger: User;
    @ManyToOne( type => User, user => user.rideAsDriver)
    driver: User;
    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;
}

export default Ride;