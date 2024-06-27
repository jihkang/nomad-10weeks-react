/**
 *  Goal
 *  [ ] add: 단어를 추가함.
 *  [ ] get: 단어의 정의를 리턴함.
 *  [ ] delete: 단어를 삭제함.
 *  [ ] update: 단어를 업데이트 함.
 *  [ ] showAll: 사전 단어를 모두 보여줌.
 *  [ ] count: 사전 단어들의 총 갯수를 리턴함.
 *  [ ] upsert 단어를 업데이트 함. 존재하지 않을시. 이를 추가함. (update + insert = upsert)
 *  [ ] exists: 해당 단어가 사전에 존재하는지 여부를 알려줌.
 *  [ ] bulkAdd: 다음과 같은 방식으로. 여러개의 단어를 한번에 추가할 수 있게 해줌. [{term:"김치", definition:"대박이네~"}, {term:"아파트", definition:"비싸네~"}]
 *  [ ] bulkDelete: 다음과 같은 방식으로. 여러개의 단어를 한번에 삭제할 수 있게 해줌. ["김치", "아파트"]
*/



abstract class AbstractDict {
    protected item: Record<string, unknown> = {};

    abstract add<T>(key: string, value: T): void;
    abstract get(key: string): unknown | undefined;
    abstract delete(key: string): void;
    abstract update<T>(key: string, value: T): void;
    abstract showAll(): void;
    abstract count(): number;
    abstract upsert<T>(key: string, value: T): void;
    abstract exists(key: string): boolean;
    abstract bulkAdd(items: Record<string, unknown>[]): void;
    abstract bulkDelete(keyArray: string[]): void;
}

class Dict extends AbstractDict {
    constructor() {
        super();
        this.add.bind(this);
        this.show.bind(this);
    }

    add<T>(key: string, value: T) : void {
        this.item = {
            ...this.item,
            [key]: value
        };
    }

    get(key: string): unknown | undefined {
        return this.exists(key) ? this.item[key] : undefined;
    }

    delete(key: string) {
        console.log('delete');
        delete this.item[key];
    }

    update<T>(key: string, value: T): void {
        if (this.exists(key)) {
            return ;
        }
        this.add(key, value);
    }

    show<T>(key:string, value: T): void {
        console.log(`key: ${key}, value: ${value}`)
    }

    objectEntries<T>(item: Record<string, unknown>) {
        return Object.entries(item);
    }

    showAll(): void{
       this.objectEntries(this.item).forEach(
            ([key, value]) => this.show(key, value)
        );
    }

    count(): number {
        return Object.keys(this.item).length;
    }

    upsert<T>(key: string, value: T): void{
        this.add(key, value);
    }

    exists(key: string): boolean {
        return Object.keys(this.item).includes(key);
    }

    bulkAdd(items: Record<string, unknown>[]): void{
        items.forEach((cur) => {
            Object.entries(cur).forEach(([key, value]) => 
                this.show(key, value)
            );
        });
    }

    bulkDelete(keyArray: string[]): void{
        Object.keys(this.item).forEach((key) => {
            keyArray.includes(key) && delete this.item[key]
        })
    }
}


function test() {
    const dict = new Dict();
    dict.add("test", "hi");
    dict.showAll();
    console.log(dict.count());
    dict.bulkAdd([{"test": "kimchi"}, {"test2": "chunkookjang"}]);
    dict.showAll();
    dict.showAll();
    dict.delete("test");
    dict.showAll();
}

test();