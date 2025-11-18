import { FunctionComponent } from 'react';
import { TChildrenRendererProps } from './shared-types';
import renderChildren from './renderChildren';


export const tchildrenRendererDefaultProps: Pick<TChildrenRendererProps,
    'propsForChildren'
> = {
  propsForChildren: {}
};

/**
 * A component to render collections of tnodes.
 * Especially useful when used with {@link useTNodeChildrenProps}.
 */
const TChildrenRenderer: FunctionComponent<TChildrenRendererProps> = (props:any) =>
    renderChildren({ ...tchildrenRendererDefaultProps, ...props });


export default TChildrenRenderer;