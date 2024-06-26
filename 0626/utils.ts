
function last<T>(arr: T[]): T {
    return arr[arr.length - 1];
}

function prepend<T>(item: T, arr: T[]): T[] {
    return [item, ...arr];
}

function mix<T>(target: T[], src: T[]): T[] {
    return [...target, ...src];
}

function count<T>(arr: T[]): number {
    return arr.length;
}

/**
 * 이렇게 JSON.stringify로 코드를 짜면 안좋다. 
 * 하지만 props가 제한되어 있다면 아래와 같이 사용하는것도 좋은 방법이라고 생각함.
 */
function findIndex<T>(arr: T[], item: T): number | null {
    const result = arr.findIndex((curItem: T) => 
        JSON.stringify(item) === JSON.stringify(curItem)
    )
    return result === -1 ? null : result;
}

function slice<T>(arr: T[], startIndex: number, endIndex?: number): T[] {
    return arr.slice(startIndex, endIndex);
}

const arr: {id: number}[] = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
]


function test() {
    console.log(
        last(arr)
    );

    console.log(
        prepend(
            last(arr), arr
        ),
    )
    console.log(
        mix(
            prepend(
                last(arr), arr
            ), arr
        )
    )

    console.log(count(
        mix(
            prepend(
                last(arr), arr
            ), arr
        )
    ))

    console.log(
        findIndex(arr, {id: 3})
    )

    console.log(
        slice(arr, 3)
    )
}

test();