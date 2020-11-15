import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users_details')
export class UserDetails extends BaseEntity{
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true})
    name: string;

    @Column({ type: 'varchar', nullable: true})
    lastname: string;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @UpdateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true})
    creatAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_at', nullable: true})
    updateAt: Date;
}