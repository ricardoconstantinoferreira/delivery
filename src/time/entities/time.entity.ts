import { Store } from "src/stores/entities/store.entity";
import { Week } from "src/week/entities/week.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Time {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(() => Store)
    @JoinColumn({name: "store_id"})
    store: Store;

    @OneToOne(() => Week)
    @JoinColumn({name: "week_id"})
    week: Week;
}
