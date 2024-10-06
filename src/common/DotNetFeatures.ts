export interface Action<T>
{
    (item: T): void;
}

export interface Func<T, TRes>
{
    (item: T): TRes
}
