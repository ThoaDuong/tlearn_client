export default interface Topic {
    id: string,
    name: string,
    numberOfWords: number,
    userID?: string,
    createdBy: 'admin' | 'user'
}