import { Store } from "src/stores/entities/store.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Week {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    days: string;

    @ManyToOne(() => Store)
    @JoinColumn({name: "store_id"})
    store_id: number;
}
