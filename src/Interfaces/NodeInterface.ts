import LinkInterface from "./LinkInterface";
import {AuthTypeInterface} from "./AuthTypeInterface";

export default interface NodeInterface {
    node: string
    group: string
    layout: JSX.Element
    authType: AuthTypeInterface
    urls: LinkInterface[]
}