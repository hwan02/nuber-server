import bcrypt from "bcrypt-nodejs";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Ride from "./Ride";
import Place from "./Place";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text", nullable: true})
  fbId: string | null;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;
  
  @ManyToOne(type => Chat, chat => chat.messages)
    chat: Chat;
  @OneToMany(type => Message, messages => messages.user)
    messages: Message[];  
  @OneToMany(type => Ride, ride => ride.passenger)
  rideAsPassenger: Ride[];  
  @OneToMany(type => Ride, ride => ride.driver)
  rideAsDriver: Ride[];  

  @OneToMany(type => Place, place => place.user)
  places: Place[] | any;
  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword(password: string): Promise<boolean> {
    const tPassword = this.password;
    let flag: boolean;
    return new Promise(function(resolve, reject){
      bcrypt.compare(password, tPassword, function(err, res){
        if(err) flag = false;
        else if(res){
          if(res) flag=true;
          else flag= false;
      }
      if(flag) resolve(flag)
      else reject(new Error("Compare password Failed"))
    }); 
  });
}

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(BCRYPT_ROUNDS);
    return new Promise(function(resolve, reject) {
      const hashedPassword = bcrypt.hashSync(password, salt);
      if (hashedPassword) {
        resolve(hashedPassword);
      }
      reject(new Error("Hashed Failed"));
    });
  }
}

export default User;