import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

// в memo нет смысла, так как есть пропс children и он будет меняться почти всегда
export const HStack = (props: HStackProps) => (
    <Flex
        {...props}
        direction="row"
    />
);
