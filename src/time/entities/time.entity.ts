import { Store } from "src/stores/entities/store.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Time {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(() => Store)
    @JoinColumn({name: "store_id"})
    store: Store;
}
