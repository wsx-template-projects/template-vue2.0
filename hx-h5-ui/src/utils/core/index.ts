export const getTagGroup = (list: any, fn: Function) => {
    const tagGroup = list.map((item: any, index: number) => () =>
        fn(item, index),
    )
    return tagGroup
}
