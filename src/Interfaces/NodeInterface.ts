import LinkInterface from "./LinkInterface";

export default interface NodeInterface {
    node: string
    layout: JSX.Element
    urls: LinkInterface[]
}