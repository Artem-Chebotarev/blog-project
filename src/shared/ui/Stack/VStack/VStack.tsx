import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

// в memo нет смысла, так как есть пропс children и он будет меняться почти всегда
export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;

    return <Flex {...props} direction="column" align={align} />;
};
