import { Store } from "src/stores/entities/store.entity";
import { Week } from "src/week/entities/week.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Time {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column('decimal', { precision: 6, scale: 2 })
    price: number;

    @ManyToOne(() => Store)
    @JoinColumn({name: "store_id"})
    store_id: number;

    @ManyToOne(() => Week)
    @JoinColumn({name: "week_id"})
    week_id: number;
}
