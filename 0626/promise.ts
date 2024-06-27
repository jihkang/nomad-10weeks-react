

const delay = (ms: number, callback: (resolve: Promise) => void) => new Promise((resolve) => setTimeout(resolve, ms));

const getFile = (id: number) => {

}

const asyncPromiseHelper = async <T>(limitCount: T) => (ps: Promise<unknown>[]) => {
    console.log(limitCount);
    // await Promise.all(ps.splice(0, limitCount))/
}


export async function main(): Promise<void> {
    asyncPromiseHelper(3)(
        getFile(1),
        getFile(2),
        getFile(3),
        getFile(4),
        getFile(5),
        getFile(6),
    )
}